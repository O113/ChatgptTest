const modules = [
  { path: 'modules/programming.json', name: 'Programmering' }
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

function App() {
  const [currentModule, setCurrentModule] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(false);
  const [accent, setAccent] = React.useState('primary');

  React.useEffect(() => {
    document.body.className = `${darkMode ? 'dark' : 'light'} accent-${accent}`;
  }, [darkMode, accent]);

  const loadModule = async (mod) => {
    const res = await fetch(mod.path);
    const data = await res.json();
    setCurrentModule(data);
  };

  return (
    <div className="app">
      <header>
        <h1>Lärplattform</h1>
        <div className="mode-switch">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            {darkMode ? 'Dark' : 'Light'}
          </label>
          <select value={accent} onChange={(e) => setAccent(e.target.value)}>
            <option value="primary">Primary</option>
            <option value="neutral">Neutral</option>
          </select>
        </div>
      </header>
      <ModuleNav modules={modules} onSelect={loadModule} />
      <main>
        {currentModule ? (
          currentModule.lessons.map((lesson, idx) => (
            <div key={idx} className="lesson">
              <h2>{lesson.title}</h2>
              <p>{lesson.content}</p>
              {lesson.exercise && (
                <div className="exercise">
                  <strong>Övning:</strong> {lesson.exercise.prompt}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Välj en modul för att börja.</p>
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
