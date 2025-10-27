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


  const [searchTerm, setSearchTerm] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)
      if (!response.ok) {
      throw new Error('Error fetching movies') 
      }
      const data = await response.json()
      console.log(data)


    } catch (error) {
      console.error('Error fetching movies: ', error)
      setErrorMessage('Failed to fetch movies. Please try again later.')
    }
  }

    useEffect( () => {
    fetchMovies

  }
  , [])


  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">

        <header>
          <img src='./hero.png' alt='hero-Banner' className='hero-image'/>
          <h1 className="text-white text-3xl">Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
        
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className='all-movies'>
          <h2>ALL Movies</h2>

          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        </section>

      </div>
    </main>
  )
}



export default App
