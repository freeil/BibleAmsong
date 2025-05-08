const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());  // CORS 설정 추가
app.use(express.static('static'));  // static 폴더 내의 정적 파일 제공

// /dirs 엔드포인트에서 data 폴더의 모든 하위 디렉토리 목록을 반환
app.get('/dirs', (req, res) => {
  const dataDir = path.join(__dirname, 'data');  // 'data' 폴더의 경로

  fs.readdir(dataDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).send('디렉토리 읽기 실패');
    }

    // 디렉토리만 필터링하여 배열로 반환
    const dirs = files.filter(file => file.isDirectory()).map(file => file.name);
    console.log('디렉토리 목록:', dirs);  // 서버 로그에 디렉토리 목록 출력
    res.json(dirs);  // 클라이언트에 디렉토리 목록 반환
  });
});

// /data/:dir 엔드포인트에서 선택된 디렉토리 내의 파일 목록 반환
app.get('/data/:dir', (req, res) => {
  const dir = req.params.dir;  // 클라이언트에서 선택한 디렉토리
  const dirPath = path.join(__dirname, 'data', dir);  // 해당 디렉토리의 경로

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(500).send('파일 목록 읽기 실패');
    }

    res.json(files);  // 클라이언트에 파일 목록 반환
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});