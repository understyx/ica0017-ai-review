#!/usr/bin/env node
/**
 * Converts lectureX-slides-summary.md and lectureX-transcript-summary.md files
 * into JSON format for consumption by the quiz application.
 *
 * Originals are not deleted. Outputs:
 *   data/lectureX/lectureX-slides-summary.json
 *   data/lectureX/lectureX-transcript-summary.json
 *
 * Usage: node scripts/convert-summaries-to-json.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// ---------------------------------------------------------------------------
// Section heading normalisation
// ---------------------------------------------------------------------------

function normaliseHeading(raw) {
    const text = raw
        .replace(/^#+\s*/, '')           // strip leading # characters
        .replace(/^\*+\s*/, '')          // strip leading * characters
        .replace(/\*+$/, '')             // strip trailing * characters
        .replace(/^\d+\.\s*/, '')        // strip leading "N." numbering
        .replace(/\*\*(.*?)\*\*/g, '$1') // strip bold markers
        .toLowerCase()
        .trim();

    if (/lecture.topic/.test(text) || text === 'lecture topic') return 'lecture_topic';
    if (/executive.summary/.test(text)) return 'executive_summary';
    if (/key.concepts/.test(text)) return 'key_concepts';
    if (/main.arguments/.test(text)) return 'main_arguments';
    if (/important.examples/.test(text)) return 'important_examples';
    if (/professor.emphasized/.test(text) || /what.the.professor/.test(text)) return 'professor_emphasized';
    if (/exam.relevant/.test(text) || /likely.exam/.test(text)) return 'exam_takeaways';
    if (/review.questions/.test(text)) return 'review_questions';
    if (/flashcard/.test(text)) return 'flashcards';
    return null;
}

/**
 * Detect whether a markdown line is a section heading and return its canonical
 * key.  Returns null for non-heading lines.
 *
 * Handled formats (observed across all 8 lectures):
 *   ## Section Title          (H2/H3 markdown)
 *   **N. Section Title**      (bold-wrapped numbered line)
 *   **Section Title**         (bold-wrapped unnumbered line)
 *   N. **Section Title**      (number + inline bold)
 *   N. Plain section title    (plain numbered, e.g. lecture 6 transcript)
 */
function detectSection(line) {
    // Markdown headings: #, ##, ###
    if (/^#{1,3}\s+/.test(line)) return normaliseHeading(line);
    // **N. Title** or **Title** (starting with uppercase or digit)
    if (/^\*\*\d+\./.test(line) || /^\*\*[A-Z]/.test(line)) return normaliseHeading(line);
    // N. **Title**
    if (/^\d+\.\s+\*\*/.test(line)) return normaliseHeading(line);
    // N. Plain text heading (e.g. "1. Lecture topic in 1 sentence")
    if (/^\d+\.\s+[A-Z5-9]/.test(line)) {
        const key = normaliseHeading(line);
        if (key) return key;
    }
    return null;
}

// ---------------------------------------------------------------------------
// Content parsers
// ---------------------------------------------------------------------------

/**
 * Parse flashcard lines into [{question, answer}] pairs.
 *
 * Handled Q/A formats:
 *   **Q:** text / **A:** text          (standard bold)
 *   **Q: text** / **A: text**          (bold wrapping whole line)
 *   - **Q**: text / **A**: text        (dash + bold + external colon)
 *   * **Q**: text / **A**: text        (star + bold + external colon)
 *   Q: text / A: text                  (plain, no bold)
 */
function parseFlashcards(lines) {
    const cards = [];
    let currentQ = null;

    for (const line of lines) {
        const s = line.trim();
        if (!s) continue;

        // --- Question patterns ---
        const qBold = s.match(/\*\*Q[:.]\*\*\s*(.*)/i) || s.match(/\*\*Q:\s*(.*?)\*\*\s*$/i);
        const qDashBold = s.match(/^[*-]\s+\*\*Q[:.]\*\*[:\s]\s*(.*)/i);
        const qPlain = s.match(/^Q:\s+(.*)/i);

        // --- Answer patterns ---
        const aBold = s.match(/\*\*A[:.]\*\*\s*(.*)/i) || s.match(/\*\*A:\s*(.*?)\*\*\s*$/i);
        const aDashBold = s.match(/^[*-]\s+\*\*A[:.]\*\*[:\s]\s*(.*)/i) ||
                          s.match(/^\*\*A[:.]\*\*:\s*(.*)/i);
        const aPlain = s.match(/^A:\s+(.*)/i);

        if (qBold) {
            currentQ = qBold[1].replace(/\*\*/g, '').trim();
        } else if (qDashBold) {
            currentQ = qDashBold[1].replace(/\*\*/g, '').trim();
        } else if (qPlain) {
            currentQ = qPlain[1].trim();
        } else if (currentQ !== null) {
            if (aBold) {
                cards.push({ question: currentQ, answer: aBold[1].replace(/\*\*/g, '').trim() });
                currentQ = null;
            } else if (aDashBold) {
                cards.push({ question: currentQ, answer: aDashBold[1].replace(/\*\*/g, '').trim() });
                currentQ = null;
            } else if (aPlain) {
                cards.push({ question: currentQ, answer: aPlain[1].trim() });
                currentQ = null;
            }
        }
    }
    return cards;
}

/**
 * Parse a review-questions block into an array of question strings.
 * Handles both numbered ("1. Question") and bullet ("* Question", "- Question") formats.
 */
function parseQuestions(lines) {
    const questions = [];
    for (const line of lines) {
        const s = line.trim();
        if (!s) continue;
        const numbered = s.match(/^\d+\.\s+(.*)/);
        if (numbered) { questions.push(numbered[1].trim()); continue; }
        const bullet = s.match(/^[*-]\s+(.*)/);
        if (bullet) questions.push(bullet[1].trim());
    }
    return questions;
}

/** Return non-empty trimmed lines from a block. */
function parseContentBlock(lines) {
    return lines.map(l => l.trim()).filter(l => l.length > 0);
}

// ---------------------------------------------------------------------------
// Main parser
// ---------------------------------------------------------------------------

function parseMd(filePath, lectureNum, source) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    let title = '';
    let currentSection = null;
    const sections = {};

    for (const line of lines) {
        const trimmed = line.trim();

        // Capture H1 as the document title (first occurrence only)
        if (!title && /^#\s+/.test(trimmed)) {
            title = trimmed.replace(/^#\s+/, '');
            continue;
        }

        const sectionKey = detectSection(trimmed);
        if (sectionKey) {
            currentSection = sectionKey;
            if (!sections[currentSection]) sections[currentSection] = [];
            continue;
        }

        if (currentSection) {
            sections[currentSection].push(line);
        }
    }

    return {
        title,
        lecture_number: lectureNum,
        source,
        lecture_topic: parseContentBlock(sections.lecture_topic || []).join(' '),
        executive_summary: parseContentBlock(sections.executive_summary || []).join(' '),
        key_concepts: parseContentBlock(sections.key_concepts || []),
        main_arguments: parseContentBlock(sections.main_arguments || []),
        important_examples: parseContentBlock(sections.important_examples || []),
        professor_emphasized: parseContentBlock(sections.professor_emphasized || []),
        exam_takeaways: parseContentBlock(sections.exam_takeaways || []),
        review_questions: parseQuestions(sections.review_questions || []),
        flashcards: parseFlashcards(sections.flashcards || []),
    };
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function main() {
    if (!fs.existsSync(DATA_DIR)) {
        console.error(`Data directory not found: ${DATA_DIR}`);
        process.exit(1);
    }

    const entries = fs.readdirSync(DATA_DIR, { withFileTypes: true })
        .filter(e => e.isDirectory() && e.name.startsWith('lecture'))
        .sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
        const lectureDir = path.join(DATA_DIR, entry.name);
        const num = parseInt(entry.name.replace('lecture', ''), 10);

        const slidesFile = path.join(lectureDir, `${entry.name}-slides-summary.md`);
        const transcriptFile = path.join(lectureDir, `${entry.name}-transcript-summary.md`);

        if (fs.existsSync(slidesFile)) {
            const json = parseMd(slidesFile, num, 'slides');
            const outPath = path.join(lectureDir, `${entry.name}-slides-summary.json`);
            fs.writeFileSync(outPath, JSON.stringify(json, null, 2), 'utf8');
            console.log(`Written: ${outPath}`);
        } else {
            console.warn(`Missing: ${slidesFile}`);
        }

        if (fs.existsSync(transcriptFile)) {
            const json = parseMd(transcriptFile, num, 'transcript');
            const outPath = path.join(lectureDir, `${entry.name}-transcript-summary.json`);
            fs.writeFileSync(outPath, JSON.stringify(json, null, 2), 'utf8');
            console.log(`Written: ${outPath}`);
        } else {
            console.warn(`Missing: ${transcriptFile}`);
        }
    }

    console.log('\nDone.');
}

main();
