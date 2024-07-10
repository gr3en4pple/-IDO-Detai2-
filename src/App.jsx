import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@nextui-org/react'
import Navbar from './components/Navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full">
      <Navbar />

      <h1 className="text-4xl text-[#e0e0e0]">Vite + React</h1>
      <div className="card">
        <Button color="danger" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
