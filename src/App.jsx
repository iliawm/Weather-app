import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Hero from './components/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="page"><Nav/><Hero/></div>
    </>
  )
}

export default App
