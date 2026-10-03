import { useState } from 'react'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <p className="project-name">Folio</p>
      <h1>Vite + React</h1>
      <p className="subtitle">A TypeScript starter application</p>
      <div className="card">
        <button type="button" onClick={() => setCount((value) => value + 1)}>
          Count: {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save the file to see your changes.
        </p>
      </div>
      <nav aria-label="Documentation">
        <a href="https://react.dev/" target="_blank" rel="noreferrer">
          React
        </a>
        <a href="https://vite.dev/" target="_blank" rel="noreferrer">
          Vite
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
          TypeScript
        </a>
      </nav>
    </main>
  )
}
