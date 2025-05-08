// 디렉토리 목록을 로드하는 함수
async function loadDirs() {
  const dirSelect = document.getElementById('dirSelect');
  dirSelect.innerHTML = '';  // 기존 항목 삭제

  try {
    // /dirs 엔드포인트에서 디렉토리 목록을 요청
    const dirs = await fetch('/dirs').then(res => res.json());

    console.log('디렉토리 목록:', dirs);  // 디버깅을 위한 로그

    // 디렉토리 목록을 <select> 요소에 추가
    dirs.forEach(dir => {
      const option = document.createElement('option');
      option.value = dir;
      option.textContent = dir;
      dirSelect.appendChild(option);
    });

    // 첫 번째 디렉토리가 선택되었을 때 파일을 로드
    loadFiles();
  } catch (error) {
    console.error("디렉토리 목록 로딩 오류:", error);  // 오류 로그
  }
}

// 선택한 디렉토리의 파일 목록을 로드하는 함수
async function loadFiles() {
  const dir = document.getElementById('dirSelect').value;
  const fileSelect = document.getElementById('fileSelect');
  fileSelect.innerHTML = '';  // 기존 파일 목록 삭제

  if (dir) {
    // 선택한 디렉토리의 파일 목록을 요청
    const files = await fetch(`/data/${dir}`).then(res => res.json());

    // 파일 목록을 <select> 요소에 추가
    files.forEach(file => {
      const option = document.createElement('option');
      option.value = file;
      option.textContent = file;
      fileSelect.appendChild(option);
    });
  }
}

// 파일을 선택하여 화면에 표시하는 함수
async function showFile() {
  const path = document.getElementById('fileSelect').value;
  const ext = path.split('.').pop();  // 파일 확장자 추출
  const base = '/data/';  // 파일 경로의 기본 부분

  const viewer = document.getElementById('viewer');
  viewer.innerHTML = "";  // 기존 내용 초기화

  if (ext === 'txt') {
    const res = await fetch(base + path);
    const text = await res.text();
    viewer.innerHTML = `<pre>${text}</pre>`;
  } else if (ext === 'pdf') {
    viewer.innerHTML = `<iframe src="${base + path}" width="100%" height="600"></iframe>`;
  } else {
    viewer.innerHTML = `<img src="${base + path}" />`;
  }
}