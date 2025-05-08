const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

const DATA_DIR = path.join(__dirname, '..', 'data');
const STATIC_DIR = path.join(__dirname, '..', 'static');

app.use('/data', express.static(DATA_DIR));
app.use('/', express.static(STATIC_DIR));

// 디렉토리 목록
app.get('/api/dirs', (req, res) => {
  fs.readdir(DATA_DIR, { withFileTypes: true }, (err, entries) => {
    if (err) return res.status(500).send("Error reading directory");
    const dirs = entries.filter(e => e.isDirectory()).map(d => d.name);
    res.json(dirs);
  });
});

// 파일 목록
app.get('/api/files', (req, res) => {
  const subdir = req.query.dir;
  const fullPath = path.join(DATA_DIR, subdir || '');
  if (!fullPath.startsWith(DATA_DIR)) return res.status(400).send("Invalid path");

  fs.readdir(fullPath, (err, files) => {
    if (err) return res.status(500).send("Error reading files");
    res.json(files);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});