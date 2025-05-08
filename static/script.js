async function loadDirs() {
  const res = await fetch('/api/dirs');
  const dirs = await res.json();

  const dirSelect = document.getElementById('dirSelect');
  dirSelect.innerHTML = dirs.map(dir => `<option value="${dir}">${dir}</option>`).join('');

  if (dirs.length > 0) {
    dirSelect.value = dirs[0];
    loadFiles();
  }
}

async function loadFiles() {
  const dir = document.getElementById('dirSelect').value;
  const res = await fetch(`/api/files?dir=${dir}`);
  const files = await res.json();

  const fileSelect = document.getElementById('fileSelect');
  fileSelect.innerHTML = files.map(file => `<option value="${dir}/${file}">${file}</option>`).join('');
}

async function showFile() {
  const path = document.getElementById('fileSelect').value;
  const ext = path.split('.').pop();
  const base = '/data/';

  if (ext === 'txt') {
    const res = await fetch(base + path);
    const text = await res.text();
    document.getElementById('viewer').innerHTML = `<pre>${text}</pre>`;
  } else if (ext === 'pdf') {
    document.getElementById('viewer').innerHTML = `<iframe src="${base + path}" width="100%" height="600"></iframe>`;
  } else {
    document.getElementById('viewer').innerHTML = `<img src="${base + path}" width="400" />`;
  }
}