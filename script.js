const modules = [
  { path: 'modules/programming.json', name: 'Programmering' }
];

const moduleNav = document.getElementById('module-nav');
const content = document.getElementById('content');

modules.forEach((m) => {
  const link = document.createElement('a');
  link.href = '#';
  link.textContent = m.name;
  link.addEventListener('click', () => loadModule(m.path));
  moduleNav.appendChild(link);
});

async function loadModule(path) {
  const res = await fetch(path);
  const data = await res.json();
  renderModule(data);
}

function renderModule(mod) {
  content.innerHTML = '';
  mod.lessons.forEach((lesson) => {
    const lessonEl = document.createElement('div');
    lessonEl.className = 'lesson';
    lessonEl.innerHTML = `<h2>${lesson.title}</h2><p>${lesson.content}</p>`;

    if (lesson.exercise) {
      const ex = document.createElement('div');
      ex.className = 'exercise';
      ex.innerHTML = `<strong>Övning:</strong> ${lesson.exercise.prompt}`;
      lessonEl.appendChild(ex);
    }

    content.appendChild(lessonEl);
  });
}
