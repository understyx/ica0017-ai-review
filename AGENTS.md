# Agents Guide for Self-Study Application

This application allows students to review course material via generated study packs (quizzes, notes, flashcards).

## Folder Structure
* `data/`: Contains all lecture material.
  * `data/lectureX/`: Contains material for a specific lecture.
    * `study_pack.json`: The structured JSON file containing the study pack data.
* `server.js`: Main Express.js application file.
* `views/`: EJS templates (`index.ejs`, `lecture.ejs`).
* `static/`: Static assets (CSS, JS).

## Development Instructions
* Ensure you have Node.js installed.
* Run `npm install` to install dependencies (express, ejs).
* Start the server using `node server.js`.
* The application runs on port 5000 by default.

## Future Work
* When new lectures are added (PDFs/VTTs), a script should parse them into a `study_pack.json` structure and place it in the respective `data/lectureX/` directory. The application will automatically detect and serve these lectures without hardcoding paths.
