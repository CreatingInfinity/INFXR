import React from 'react'
import { Navigation } from './components/Navigation'
import { Main } from './components/Main'

const App = () => {
  return (
    <div className='h-screen bg-obsidian'>
      <Navigation/>
      <Main/>
    </div>
  )
}

export default App