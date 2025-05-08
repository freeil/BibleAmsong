document.addEventListener('DOMContentLoaded', () => {
  const dirSelect = document.getElementById('dirSelect');
  const fileSelect = document.getElementById('fileSelect');
  const viewer = document.getElementById('viewer');

  async function fetchDirs() {
    const response = await fetch('data/');
    const text = await response.text();
    const matches = [...text.matchAll(/href="([^"?]+)\/"/g)];
    const dirs = matches.map(m => m[1]).filter(n => !n.startsWith('.'));
    dirSelect.innerHTML = '<option value="">선택</option>' + dirs.map(d => `<option value="${d}">${d}</option>`).join('');
  }

  async function fetchFiles(dir) {
    const response = await fetch(`data/${dir}/`);
    const text = await response.text();
    const matches = [...text.matchAll(/href="([^"?]+)"/g)];
    const files = matches.map(m => m[1]).filter(n => !n.endsWith('/'));
    fileSelect.innerHTML = '<option value="">선택</option>' + files.map(f => `<option value="${f}">${f}</option>`).join('');
  }

  async function showFile(dir, file) {
    const ext = file.split('.').pop().toLowerCase();
    const path = `data/${dir}/${file}`;
    if (ext === 'txt') {
      const res = await fetch(path);
      const text = await res.text();
      viewer.innerHTML = `<pre>${text}</pre>`;
    } else if (ext === 'pdf') {
      viewer.innerHTML = `<iframe src="${path}"></iframe>`;
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
      viewer.innerHTML = `<img src="${path}" alt="${file}">`;
    } else {
      viewer.innerHTML = `이 형식은 미리보기를 지원하지 않습니다: ${file}`;
    }
  }

  dirSelect.addEventListener('change', () => {
    const dir = dirSelect.value;
    viewer.innerHTML = '파일을 선택하세요';
    if (dir) fetchFiles(dir);
    fileSelect.innerHTML = '';
  });

  fileSelect.addEventListener('change', () => {
    const dir = dirSelect.value;
    const file = fileSelect.value;
    if (dir && file) showFile(dir, file);
  });

  fetchDirs();
});