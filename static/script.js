async function loadDirs() {
  const dirSelect = document.getElementById('dirSelect');
  dirSelect.innerHTML = ''; // 기존 항목 삭제

  // /dirs 엔드포인트에서 디렉토리 목록을 불러옵니다.
  const dirs = await fetch('/dirs').then(res => res.json());

  dirs.forEach(dir => {
    const option = document.createElement('option');
    option.value = dir;
    option.textContent = dir;
    dirSelect.appendChild(option);
  });

  loadFiles(); // 디렉토리 선택 시 파일을 로드
}

async function loadFiles() {
  const dir = document.getElementById('dirSelect').value;
  const fileSelect = document.getElementById('fileSelect');
  fileSelect.innerHTML = ''; // 기존 파일 목록 삭제

  if (dir) {
    const files = await fetch(`/data/${dir}`).then(res => res.json());

    files.forEach(file => {
      const option = document.createElement('option');
      option.value = file;
      option.textContent = file;
      fileSelect.appendChild(option);
    });
  }
}

async function showFile() {
  const path = document.getElementById('fileSelect').value;
  const ext = path.split('.').pop();
  const base = '/data/';

  const viewer = document.getElementById('viewer');
  viewer.innerHTML = ""; // 기존 내용 초기화

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