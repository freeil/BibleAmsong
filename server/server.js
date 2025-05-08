const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 10000;

app.use(express.static('static'));

// data 디렉토리 내의 모든 하위 디렉토리 목록을 반환
app.get('/dirs', (req, res) => {
  const dataDir = path.join(__dirname, 'data');
  fs.readdir(dataDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).send('디렉토리 읽기 실패');
    }

    const dirs = files.filter(file => file.isDirectory()).map(file => file.name);
    res.json(dirs);
  });
});

// 파일 목록을 반환하는 엔드포인트
app.get('/data/:dir', (req, res) => {
  const dir = req.params.dir;
  const dirPath = path.join(__dirname, 'data', dir);

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(500).send('파일 목록 읽기 실패');
    }

    res.json(files);
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});