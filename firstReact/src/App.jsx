import {use, useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'


import './App.css'
import Search  from './components/search.jsx'
import { MovieCard } from './components/MovieCard.jsx'

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
console.log('API Key:', API_KEY)

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
    
  }
}

function App() {


  const [searchTerm, setSearchTerm] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const [Movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
      console.log(endpoint)
      const response = await fetch(endpoint, API_OPTIONS)
      if (!response.ok) {
      throw new Error('Error fetching movies') 
      }
      const data = await response.json()
      console.log(data)

      if(data.response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies.')
        setMovies([])
        return
      }

      setMovies(data.results || [])


    } catch (error) {
      console.error('Error fetching movies: ', error)
      setErrorMessage('Failed to fetch movies. Please try again later.')
    }finally {
      setIsLoading(false)
    }
  }

    useEffect( () => {
    fetchMovies()
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
          <h2 className='mt-[40px]'>ALL Movies</h2>

          {isLoading ? (
            <p>Loading movies...</p>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {Movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}></MovieCard>
              ))}
                 
            </ul>
          )}

          {/* {errorMessage && <p className='text-red-500'>{errorMessage}</p>} */}
        </section>

      </div>
    </main>
  )
}



export default App
