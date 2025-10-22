import {use, useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'

import './App.css'
import Search  from './components/search.jsx'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_API_KEY

API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  useEffect( () => {

  }
  , [])

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
