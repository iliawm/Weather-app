import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Weather from './components/Weather'

function App() {
  const [uniti, setuniti] = useState(true);
  const [latS,setlat]=useState(null)
  const [lonS,setlon]=useState(null)

  return (
    <>
    <div className="page"><Nav  uniti={uniti} setuniti={setuniti} />
    <Hero  setlat={setlat} setlon={setlon}/>
    <Weather uniti={uniti}  latS={latS} lonS={lonS} />   
    
    
    </div>

    </>
  )
}

export default App
