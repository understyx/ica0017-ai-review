const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

const DATA_DIR = path.join(__dirname, 'data');

app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/data', express.static(DATA_DIR));

function getAvailableLectures() {
    let lectures = [];
    if (fs.existsSync(DATA_DIR)) {
        const entries = fs.readdirSync(DATA_DIR, { withFileTypes: true });
        for (let entry of entries) {
            if (entry.isDirectory() && entry.name.startsWith('lecture')) {
                const studyPackPath = path.join(DATA_DIR, entry.name, 'study_pack.json');
                if (fs.existsSync(studyPackPath)) {
                    lectures.push(entry.name);
                }
            }
        }
    }
    return lectures.sort();
}

app.get('/', (req, res) => {
    const lectures = getAvailableLectures();
    res.render('index', { lectures: lectures });
});

app.get('/lecture/:id', (req, res) => {
    const lectureId = req.params.id;
    const lectureDir = path.join(DATA_DIR, lectureId);
    const studyPackPath = path.join(lectureDir, 'study_pack.json');

    if (!fs.existsSync(lectureDir) || !fs.existsSync(studyPackPath)) {
        return res.status(404).send('Lecture or study pack not found.');
    }

    try {
        const studyPackData = fs.readFileSync(studyPackPath, 'utf8');
        const studyPack = JSON.parse(studyPackData);
        res.render('lecture', { lecture_id: lectureId, study_pack: studyPack });
    } catch (error) {
        console.error("Error reading or parsing study pack JSON:", error);
        res.status(500).send('Error loading study pack.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
