import { useState } from 'react'
// import reactLogo from './assets/react.svg'

import './App.css'
import Search  from './components/search.jsx'

function App() {

  const [searchTerm, setSearchTerm] = useState('')


  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">

        <header>
          <img src='./hero.png' alt='hero-Banner' className='hero-image'/>
          <h1 className="text-white text-3xl">Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
        
        </header>
        
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
    </main>
  )
}



export default App
