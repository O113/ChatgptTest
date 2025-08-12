const modules = [
  { path: 'modules/programming.json', name: 'Programmering PROG1000X' }
];

function ModuleNav({ modules, onSelect }) {
  return (
    <nav>
      {modules.map((m) => (
        <button key={m.name} onClick={() => onSelect(m)}>
          {m.name}
        </button>
      ))}
    </nav>
  );
}

function LessonNav({ lessons, current, onSelect }) {
  return (
    <aside>
      {lessons.map((lesson, idx) => (
        <button
          key={lesson.title}
          className={idx === current ? 'active' : ''}
          onClick={() => onSelect(idx)}
        >
          {lesson.title}
        </button>
      ))}
    </aside>
  );
}

function LessonView({ lesson }) {
  return (
    <div className="lesson">
      <h2>{lesson.title}</h2>
      {lesson.content.split('\n').map((paragraph, idx) => (
        <p key={idx}>{paragraph}</p>
      ))}
      {lesson.exercise && (
        <div className="exercise">
          <strong>Övning:</strong> {lesson.exercise.prompt}
        </div>
      )}
    </div>
  );
}

function App() {
  const [currentModule, setCurrentModule] = React.useState(null);
  const [currentLesson, setCurrentLesson] = React.useState(0);

  const loadModule = async (mod) => {
    const res = await fetch(mod.path);
    const data = await res.json();
    setCurrentModule(data);
    setCurrentLesson(0);
  };

  const lesson = currentModule ? currentModule.lessons[currentLesson] : null;

  return (
    <div className="app">
      <header>
        <h1>Lärplattform</h1>
      </header>
      <ModuleNav modules={modules} onSelect={loadModule} />
      <main>
        {currentModule ? (
          <div className="module-view">
            <LessonNav
              lessons={currentModule.lessons}
              current={currentLesson}
              onSelect={setCurrentLesson}
            />
            <LessonView lesson={lesson} />
          </div>
        ) : (
          <p>Välj en modul för att börja.</p>
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
