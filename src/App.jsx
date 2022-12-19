import './App.css'
import React from "react"
import SearchBar from './components/SearchBar'


function App() {
  return (
    <div className='flex flex-col relative top-80'>

      <h1 className='select-none text-8xl font-mono'> Weather App </h1>
      <SearchBar/>

    </div>
  );
}

export default App
