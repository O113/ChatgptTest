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

  const loadModule = async (mod) => {
    const res = await fetch(mod.path);
    const data = await res.json();
    setCurrentModule(data);
  };

  return (
    <div className="app">
      <header>
        <h1>Lärplattform</h1>
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
