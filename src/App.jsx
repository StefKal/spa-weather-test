import { useEffect, useState, useRef } from 'react'
import './App.css'
import React from "react"
import ReactModal from 'react-modal';


function App() {
  return (
    <div className="App">
    <h1> WeatherApp </h1>
      <SearchBar/>
    </div>
  );
}


function SearchBar() {

  const [cities, setCities] = useState(null)
  const searchRef = useRef()

  const searchCities = async (event) => {
    // get city
    let city = searchRef.current.value;
    if ((event.key === "Enter") && (city)){
        let baseURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=100&appid=7a1a207152a4ac5849fca18e3bbdc380`;
        const respose = await fetch(baseURL)
        setCities(await respose.json())  
    }
  }

  return (
    <div>
      <input className='w-[20rem] h-[2rem] m-2 text-center rounded-md' id="cityInput" ref={searchRef} onKeyDown={searchCities}></input>
      {cities && <CityList cities={cities}/>}
    </div>
  )

}

function CityList({cities}) {

  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState(null)


  const cityItems = cities.map((city, index) =>
    <City key={index} city={city} setModalData={setModalData} handleModalOpen={() => setOpen(true)}/>
  );

  return (
    <div>
      <ol className='flex justify-center space-x-2 p-2'>
        {cityItems}
      </ol>
      {modalData && <Modal data={modalData} setModalOpen={setOpen} isOpen={open}/>}
    </div>
  );
}

function Modal({data, setModalOpen, isOpen}) {

  console.log(data);
  const iconCode = data.weather[0].icon;

  const is_temp = ["temp", "feels_like", "temp_min", "temp_max"];
  const keyMapping = {
    "temp": "Temperature",
    "feels_like": "Feels Like",
    "temp_min": "Minimum Temperature",
    "temp_max": "Maximum Temperature",
    "pressure": "Pressure",
    "humidity": "Humidity",
    "grnd_level": "Ground Level",
    "sea_level": "Sea Level"
  }

  const mainDataList = Object.keys(data.main).map((key, index) => 
    <div key={index} className='flex flex-x justify-between bg-slate-600 rounded-md p-1'>
      <div>
        {keyMapping[key]}
      </div>
      <div>
        {data.main[key]}
        {/* add approppriate units to values*/}
        {is_temp.includes(key) ? " °C" : ""} 
        {key=="pressure" && " PSI"}
        {key=="humidity" && " %"}
        {key=="grnd_level" && " m" }
        {key=="sea_level" && ' m'}
      </div>
    </div>
  );

  return (
    <ReactModal
      className={'bg-gray-500 absolute top-[35%] left-[25%] w-1/2 h-auto rounded-xl'}
      isOpen={isOpen}
      handleModalOpen={setModalOpen}
      ariaHideApp={false}>
      <div className='flex flex-col space-y-1 p-2' >
        <div className='flex flex-col space-y-3 p-2'>{mainDataList}</div>
        <img className='w-1/6' src={`http://openweathermap.org/img/w/${iconCode}.png`}></img>
        <button className='w-fit' onClick={()=> setModalOpen(false)}> Close </button>
      </div>
    </ReactModal>  
  )
}


function City({city, setModalData, handleModalOpen}){

  const [loadingState, setLoadingState] = useState("idle")

  const onClick = async () => {
    setLoadingState("pending");
    await new Promise((resolve) => setTimeout(resolve, 500));
    await getWeather();
    setLoadingState("complete");
    handleModalOpen();
  }

  const getWeather = async () => {
    let baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=7a1a207152a4ac5849fca18e3bbdc380`;
    const response = await fetch(baseURL)
    let m = await response.json()
    let data = {
      'main': m.main,
      'weather': m.weather
    }
    setModalData(data)
  }

  if (loadingState === "pending"){
    return (
      "Loading"
    )
  }

  return (
    <button className='flex flex-col items-center w-52' onClick={onClick}>
      <li>
      {city.name} 
      </li>
      <li>
      {city.state} 
      </li>
      <li>
      {city.country} 
      </li>
    </button>
  )
}

export default App
