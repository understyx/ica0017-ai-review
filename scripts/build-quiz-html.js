#!/usr/bin/env node
/**
 * Generates quiz.html — a self-contained interactive quiz application that
 * works in any modern browser without a server or external dependencies.
 *
 * Run `node scripts/build-quiz-html.js` (or `npm run build-quiz`) after
 * running `npm run convert-summaries` to regenerate quiz.html.
 *
 * Output: quiz.html (repository root)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const OUT_FILE = path.join(__dirname, '..', 'quiz.html');

// ---------------------------------------------------------------------------
// Load all lecture data
// ---------------------------------------------------------------------------

function loadLectures() {
    const entries = fs.readdirSync(DATA_DIR, { withFileTypes: true })
        .filter(e => e.isDirectory() && e.name.startsWith('lecture'))
        .sort((a, b) => a.name.localeCompare(b.name));

    return entries.map(entry => {
        const dir = path.join(DATA_DIR, entry.name);
        const num = parseInt(entry.name.replace('lecture', ''), 10);

        const slidesPath = path.join(dir, `${entry.name}-slides-summary.json`);
        const transcriptPath = path.join(dir, `${entry.name}-transcript-summary.json`);
        const studyPackPath = path.join(dir, 'study_pack.json');

        const slides = fs.existsSync(slidesPath)
            ? JSON.parse(fs.readFileSync(slidesPath, 'utf8')) : {};
        const transcript = fs.existsSync(transcriptPath)
            ? JSON.parse(fs.readFileSync(transcriptPath, 'utf8')) : {};
        const studyPack = fs.existsSync(studyPackPath)
            ? JSON.parse(fs.readFileSync(studyPackPath, 'utf8')) : {};

        return { id: entry.name, num, slides, transcript, studyPack };
    });
}

// ---------------------------------------------------------------------------
// HTML template
// ---------------------------------------------------------------------------

function buildHtml(lectures) {
    const dataJson = JSON.stringify(lectures);

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cloud Technologies (ICA0017) — Quiz</title>
<style>
:root {
  --primary: #2c3e50;
  --accent: #3498db;
  --bg: #f4f6f8;
  --card-bg: #fff;
  --border: #e1e4e8;
  --text: #333;
  --success: #27ae60;
  --danger: #e74c3c;
  --muted: #666;
}
*, *::before, *::after { box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: var(--bg); color: var(--text); margin: 0; min-height: 100vh; }
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
button { cursor: pointer; font-family: inherit; }

/* Layout */
.container { max-width: 900px; margin: 0 auto; padding: 20px; }
header { text-align: center; padding: 30px 0 20px; border-bottom: 1px solid var(--border); margin-bottom: 30px; }
header h1 { color: var(--primary); margin: 0 0 6px; }
header p { color: var(--muted); margin: 0; }

/* Views */
.view { display: none; }
.view.active { display: block; }

/* Lecture grid */
.lecture-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
.lecture-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 10px; padding: 22px 18px; cursor: pointer; transition: transform .15s, box-shadow .15s, border-color .15s; }
.lecture-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.1); border-color: var(--accent); }
.lecture-card h3 { margin: 0 0 8px; color: var(--accent); font-size: 1.1rem; }
.lecture-card p { margin: 0; font-size: .85rem; color: var(--muted); line-height: 1.4; }

/* Back button */
.back-btn { background: none; border: none; color: var(--accent); font-size: .95rem; font-weight: 600; padding: 0; margin-bottom: 18px; display: inline-flex; align-items: center; gap: 4px; }
.back-btn:hover { text-decoration: underline; }

/* Lecture header */
.lecture-header { margin-bottom: 20px; }
.lecture-header h2 { color: var(--primary); margin: 0 0 6px; }
.lecture-header p { color: var(--muted); margin: 0; font-size: .9rem; }

/* Tabs */
.tabs { display: flex; gap: 6px; border-bottom: 2px solid var(--border); margin-bottom: 24px; flex-wrap: wrap; }
.tab-btn { background: none; border: none; padding: 10px 18px; font-size: .95rem; color: var(--muted); border-bottom: 3px solid transparent; margin-bottom: -2px; font-weight: 500; transition: color .15s, border-color .15s; }
.tab-btn.active { color: var(--accent); border-bottom-color: var(--accent); }
.tab-btn:hover { color: var(--primary); }

/* Tab panels */
.tab-panel { display: none; }
.tab-panel.active { display: block; }

/* Notes */
.notes-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; padding: 24px; margin-bottom: 20px; }
.notes-card h3 { color: var(--primary); margin: 0 0 14px; text-transform: uppercase; letter-spacing: .05em; font-size: .85rem; }
.notes-card p { margin: 0 0 10px; line-height: 1.65; }
.notes-card ul { margin: 0 0 10px; padding-left: 20px; }
.notes-card li { margin-bottom: 6px; line-height: 1.55; }

/* Flashcard mode */
.fc-progress { text-align: center; color: var(--muted); font-size: .9rem; margin-bottom: 20px; }
.fc-card-wrap { perspective: 1000px; height: 260px; margin-bottom: 24px; }
.fc-card { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform .5s; cursor: pointer; }
.fc-card.flipped { transform: rotateY(180deg); }
.fc-face { position: absolute; inset: 0; background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.fc-face.back { transform: rotateY(180deg); background: #f0f9ff; border-color: var(--accent); }
.fc-face .label { font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); margin-bottom: 12px; }
.fc-face .content { font-size: 1.1rem; line-height: 1.5; color: var(--primary); }
.fc-hint { text-align: center; color: var(--muted); font-size: .82rem; margin-bottom: 16px; }
.fc-controls { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.btn { padding: 10px 22px; border-radius: 6px; border: none; font-size: .95rem; font-weight: 600; transition: opacity .15s; }
.btn:hover { opacity: .85; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-outline { background: transparent; border: 2px solid var(--border); color: var(--primary); }
.btn-success { background: var(--success); color: #fff; }
.btn-danger { background: var(--danger); color: #fff; }

/* Quiz mode */
.quiz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.quiz-score { font-size: .9rem; color: var(--muted); }
.quiz-question-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 30px; margin-bottom: 20px; min-height: 160px; display: flex; align-items: center; justify-content: center; text-align: center; }
.quiz-question-card p { font-size: 1.15rem; line-height: 1.55; color: var(--primary); margin: 0; }
.quiz-answer-card { background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 20px; margin-bottom: 20px; display: none; }
.quiz-answer-card p { margin: 0; color: #166534; line-height: 1.55; }
.quiz-controls { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.quiz-result { text-align: center; padding: 40px 20px; }
.quiz-result .score-big { font-size: 3.5rem; font-weight: 700; color: var(--accent); }
.quiz-result p { color: var(--muted); font-size: 1rem; }

/* Review questions */
.rq-list { list-style: none; padding: 0; counter-reset: rq; }
.rq-item { counter-increment: rq; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px 14px 50px; margin-bottom: 10px; position: relative; line-height: 1.5; }
.rq-item::before { content: counter(rq); position: absolute; left: 14px; top: 14px; background: var(--accent); color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .8rem; font-weight: 700; }

/* Responsive */
@media (max-width: 600px) {
  .tabs { gap: 2px; }
  .tab-btn { padding: 8px 12px; font-size: .85rem; }
  .fc-face .content { font-size: .95rem; }
}
</style>
</head>
<body>
<div class="container">
  <header>
    <h1>&#9729;&#65039; ICA0017 &mdash; Cloud Technologies</h1>
    <p>Self-contained interactive quiz &mdash; no internet required</p>
  </header>

  <!-- Home view -->
  <div id="view-home" class="view active">
    <h2 style="color:var(--primary);margin:0 0 20px">Select a Lecture</h2>
    <div class="lecture-grid" id="lecture-grid"></div>
  </div>

  <!-- Lecture view -->
  <div id="view-lecture" class="view">
    <button class="back-btn" onclick="showHome()">&#8592; Back to all lectures</button>
    <div class="lecture-header">
      <h2 id="lec-title"></h2>
      <p id="lec-topic"></p>
    </div>
    <div class="tabs">
      <button class="tab-btn active" onclick="showTab('notes', this)">&#128221; Notes</button>
      <button class="tab-btn" onclick="showTab('flashcards', this)">&#127183; Flashcards</button>
      <button class="tab-btn" onclick="showTab('quiz', this)">&#129504; Quiz</button>
      <button class="tab-btn" onclick="showTab('questions', this)">&#10067; Review Questions</button>
    </div>

    <!-- Notes tab -->
    <div id="tab-notes" class="tab-panel active"></div>

    <!-- Flashcards tab -->
    <div id="tab-flashcards" class="tab-panel">
      <div class="fc-progress"><span id="fc-current">1</span> / <span id="fc-total">0</span></div>
      <div class="fc-card-wrap">
        <div class="fc-card" id="fc-card" onclick="flipCard()">
          <div class="fc-face front">
            <div class="label">Question</div>
            <div class="content" id="fc-question"></div>
          </div>
          <div class="fc-face back">
            <div class="label">Answer</div>
            <div class="content" id="fc-answer"></div>
          </div>
        </div>
      </div>
      <p class="fc-hint">Click the card to flip it</p>
      <div class="fc-controls">
        <button class="btn btn-outline" onclick="prevCard()">&#8592; Prev</button>
        <button class="btn btn-primary" onclick="shuffleCards()">&#128256; Shuffle</button>
        <button class="btn btn-outline" onclick="nextCard()">Next &#8594;</button>
      </div>
    </div>

    <!-- Quiz tab -->
    <div id="tab-quiz" class="tab-panel">
      <div class="quiz-header">
        <span id="quiz-progress">Question 1 of 0</span>
        <span class="quiz-score">&#10003; <span id="quiz-correct">0</span> &nbsp; &#10007; <span id="quiz-wrong">0</span></span>
      </div>
      <div class="quiz-question-card"><p id="quiz-question"></p></div>
      <div class="quiz-answer-card" id="quiz-answer-card"><p id="quiz-answer"></p></div>
      <div class="quiz-controls" id="quiz-controls">
        <button class="btn btn-primary" id="quiz-show-btn" onclick="showQuizAnswer()">Show Answer</button>
        <button class="btn btn-success" id="quiz-correct-btn" style="display:none" onclick="markQuiz(true)">&#10003; Got it</button>
        <button class="btn btn-danger" id="quiz-wrong-btn" style="display:none" onclick="markQuiz(false)">&#10007; Missed it</button>
      </div>
      <div class="quiz-result" id="quiz-result" style="display:none">
        <div class="score-big" id="result-pct"></div>
        <p id="result-msg"></p>
        <button class="btn btn-primary" onclick="startQuiz()">&#128260; Retry</button>
      </div>
    </div>

    <!-- Review Questions tab -->
    <div id="tab-questions" class="tab-panel">
      <ul class="rq-list" id="rq-list"></ul>
    </div>
  </div>
</div>

<script>
// ---- Embedded data ----
const LECTURES = ${dataJson};

// ---- State ----
var currentLecture = null;
var fcCards = [];
var fcIndex = 0;
var quizCards = [];
var quizIndex = 0;
var quizCorrect = 0;
var quizWrong = 0;

// ---- Navigation ----
function showHome() {
  document.getElementById('view-home').classList.add('active');
  document.getElementById('view-lecture').classList.remove('active');
}

function showLecture(lectureId) {
  currentLecture = null;
  for (var i = 0; i < LECTURES.length; i++) {
    if (LECTURES[i].id === lectureId) { currentLecture = LECTURES[i]; break; }
  }
  if (!currentLecture) return;

  document.getElementById('view-home').classList.remove('active');
  document.getElementById('view-lecture').classList.add('active');

  document.getElementById('lec-title').textContent =
    'Lecture ' + currentLecture.num + ': ' + (currentLecture.studyPack.title || '');
  document.getElementById('lec-topic').textContent =
    (currentLecture.slides.lecture_topic || currentLecture.transcript.lecture_topic || '');

  // Reset to notes tab
  showTab('notes', document.querySelector('.tab-btn'));

  buildNotes();
  buildFlashcards();
  buildQuiz();
  buildReviewQuestions();
}

function showTab(name, btn) {
  var panels = document.querySelectorAll('.tab-panel');
  for (var i = 0; i < panels.length; i++) panels[i].classList.remove('active');
  var btns = document.querySelectorAll('.tab-btn');
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
  document.getElementById('tab-' + name).classList.add('active');
  if (btn) btn.classList.add('active');
}

// ---- Minimal markdown renderer ----
function md(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\\*\\*\\*(.*?)\\*\\*\\*/g, '<strong><em>$1</em></strong>')
    .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*(.*?)\\*/g, '<em>$1</em>')
    .replace(/\`(.*?)\`/g, '<code>$1</code>');
}

function renderList(items) {
  if (!items || !items.length) return '';
  return '<ul>' + items.map(function(i) { return '<li>' + md(i) + '</li>'; }).join('') + '</ul>';
}

function noteSection(title, content) {
  if (!content || (Array.isArray(content) && !content.length) ||
      (!Array.isArray(content) && !String(content).trim())) return '';
  var body = Array.isArray(content) ? renderList(content) : '<p>' + md(content) + '</p>';
  return '<div class="notes-card"><h3>' + escHtml(title) + '</h3>' + body + '</div>';
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function dedup(arr) {
  var seen = {};
  return arr.filter(function(x) { if (seen[x]) return false; seen[x] = true; return true; });
}

// ---- Notes tab ----
function buildNotes() {
  var L = currentLecture;
  var sp = L.studyPack;
  var sl = L.slides;
  var tr = L.transcript;
  var html = '';

  var summary = tr.executive_summary || sl.executive_summary;
  if (summary) html += noteSection('Executive Summary', summary);

  var kc = dedup((sl.key_concepts || []).concat(tr.key_concepts || []));
  if (kc.length) html += noteSection('Key Concepts & Definitions', kc);

  var ma = dedup((sl.main_arguments || []).concat(tr.main_arguments || []));
  if (ma.length) html += noteSection('Main Arguments', ma);

  var pe = dedup((sl.professor_emphasized || []).concat(tr.professor_emphasized || []));
  if (pe.length) html += noteSection('What the Professor Emphasized', pe);

  var et = dedup((sl.exam_takeaways || []).concat(tr.exam_takeaways || []));
  if (et.length) html += noteSection('Likely Exam Takeaways', et);

  var crammer = (sp.crammer || []).filter(function(l) { return l !== '---'; });
  if (crammer.length) html += noteSection('1-Page Crammer', crammer);

  var traps = (sp.traps || []).filter(function(l) { return l !== '---'; });
  if (traps.length) html += noteSection('Exam Traps to Avoid', traps);

  document.getElementById('tab-notes').innerHTML = html || '<p>No notes available.</p>';
}

// ---- Flashcards tab ----
function buildFlashcards() {
  var L = currentLecture;
  fcCards = (L.slides.flashcards || []).concat(L.transcript.flashcards || []);
  fcIndex = 0;
  renderFlashcard();
}

function renderFlashcard() {
  var card = document.getElementById('fc-card');
  card.classList.remove('flipped');
  var total = fcCards.length;
  document.getElementById('fc-total').textContent = total;
  if (!total) {
    document.getElementById('fc-current').textContent = '0';
    document.getElementById('fc-question').textContent = 'No flashcards available.';
    document.getElementById('fc-answer').textContent = '';
    return;
  }
  document.getElementById('fc-current').textContent = fcIndex + 1;
  document.getElementById('fc-question').textContent = fcCards[fcIndex].question;
  document.getElementById('fc-answer').textContent = fcCards[fcIndex].answer;
}

function flipCard() {
  document.getElementById('fc-card').classList.toggle('flipped');
}

function nextCard() {
  if (!fcCards.length) return;
  fcIndex = (fcIndex + 1) % fcCards.length;
  renderFlashcard();
}

function prevCard() {
  if (!fcCards.length) return;
  fcIndex = (fcIndex - 1 + fcCards.length) % fcCards.length;
  renderFlashcard();
}

function shuffleCards() {
  for (var i = fcCards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = fcCards[i]; fcCards[i] = fcCards[j]; fcCards[j] = tmp;
  }
  fcIndex = 0;
  renderFlashcard();
}

// ---- Quiz tab ----
function buildQuiz() {
  var L = currentLecture;
  quizCards = (L.slides.flashcards || []).concat(L.transcript.flashcards || []);
  startQuiz();
}

function startQuiz() {
  for (var i = quizCards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = quizCards[i]; quizCards[i] = quizCards[j]; quizCards[j] = tmp;
  }
  quizIndex = 0;
  quizCorrect = 0;
  quizWrong = 0;
  document.getElementById('quiz-result').style.display = 'none';
  document.getElementById('quiz-question').parentElement.style.display = 'flex';
  document.getElementById('quiz-controls').style.display = 'flex';
  renderQuizQuestion();
}

function renderQuizQuestion() {
  var total = quizCards.length;
  document.getElementById('quiz-progress').textContent = 'Question ' + (quizIndex + 1) + ' of ' + total;
  document.getElementById('quiz-correct').textContent = quizCorrect;
  document.getElementById('quiz-wrong').textContent = quizWrong;

  if (!total) {
    document.getElementById('quiz-question').textContent = 'No quiz questions available.';
    return;
  }

  document.getElementById('quiz-question').textContent = quizCards[quizIndex].question;
  document.getElementById('quiz-answer').textContent = quizCards[quizIndex].answer;
  document.getElementById('quiz-answer-card').style.display = 'none';
  document.getElementById('quiz-show-btn').style.display = 'inline-block';
  document.getElementById('quiz-correct-btn').style.display = 'none';
  document.getElementById('quiz-wrong-btn').style.display = 'none';
}

function showQuizAnswer() {
  document.getElementById('quiz-answer-card').style.display = 'block';
  document.getElementById('quiz-show-btn').style.display = 'none';
  document.getElementById('quiz-correct-btn').style.display = 'inline-block';
  document.getElementById('quiz-wrong-btn').style.display = 'inline-block';
}

function markQuiz(correct) {
  if (correct) quizCorrect++; else quizWrong++;
  quizIndex++;
  if (quizIndex >= quizCards.length) {
    showQuizResult();
  } else {
    renderQuizQuestion();
  }
}

function showQuizResult() {
  var total = quizCards.length;
  var pct = total ? Math.round((quizCorrect / total) * 100) : 0;
  document.getElementById('quiz-result').style.display = 'block';
  document.getElementById('quiz-question').parentElement.style.display = 'none';
  document.getElementById('quiz-controls').style.display = 'none';
  document.getElementById('quiz-answer-card').style.display = 'none';
  document.getElementById('result-pct').textContent = pct + '%';
  var msg;
  if (pct === 100) msg = 'Perfect score! You nailed it.';
  else if (pct >= 80) msg = 'Great work! Almost there.';
  else if (pct >= 60) msg = 'Good effort — keep reviewing!';
  else msg = 'Keep studying — you\\'ll get it!';
  document.getElementById('result-msg').textContent = quizCorrect + '/' + total + ' correct — ' + msg;
}

// ---- Review Questions tab ----
function buildReviewQuestions() {
  var L = currentLecture;
  var raw = (L.slides.review_questions || [])
    .concat(L.transcript.review_questions || [])
    .concat((L.studyPack.recall_questions || []).map(function(q) {
      return q.replace(/^\\d+\\.\\s*/, '');
    }).filter(function(q) { return q !== '---' && q.trim(); }));

  var qs = dedup(raw);
  document.getElementById('rq-list').innerHTML =
    qs.map(function(q) { return '<li class="rq-item">' + md(q) + '</li>'; }).join('');
}

// ---- Init ----
(function init() {
  var grid = document.getElementById('lecture-grid');
  LECTURES.forEach(function(L) {
    var card = document.createElement('div');
    card.className = 'lecture-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.onclick = function() { showLecture(L.id); };
    card.onkeydown = function(e) { if (e.key === 'Enter' || e.key === ' ') showLecture(L.id); };
    var topic = (L.slides.lecture_topic || L.transcript.lecture_topic || '');
    var shortTopic = topic.length > 120 ? topic.slice(0, 120) + '\u2026' : topic;
    card.innerHTML = '<h3>Lecture ' + L.num + '</h3><p>' + escHtml(shortTopic || L.studyPack.title || '') + '</p>';
    grid.appendChild(card);
  });
})();
</script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function main() {
    console.log('Loading lecture data…');
    const lectures = loadLectures();
    console.log(`Loaded ${lectures.length} lectures.`);

    console.log('Building quiz.html…');
    const html = buildHtml(lectures);
    fs.writeFileSync(OUT_FILE, html, 'utf8');
    console.log(`Written: ${OUT_FILE} (${(fs.statSync(OUT_FILE).size / 1024).toFixed(1)} KB)`);
}

main();
