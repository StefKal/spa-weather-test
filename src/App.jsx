import { useEffect, useState } from 'react'
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

  const searchCities = async (event) => {
    // get city
    let city = document.getElementById("cityInput").value;
    if ((event.key === "Enter") && (city)){
        let baseURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=100&appid=7a1a207152a4ac5849fca18e3bbdc380`;
        const respose = await fetch(baseURL)
        setCities(await respose.json())  
    }
  }

  if (cities) {
    return (
      <div>
        <input className='w-[20rem] h-[2rem] m-2 text-center rounded-md' id="cityInput" onKeyDown={searchCities}></input>
        <CityList cities={cities}/>
      </div>
    )
  } else {
    return (
      <input className='w-[20rem] h-[2rem] m-2 text-center rounded-md' id="cityInput" onKeyDown={searchCities}></input>
    )
  }

}

function CityList(props) {

  const [isModalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [mainData, setMainData] = useState({
    "temp": "",
    "feels_like": "",
    "temp_min": "",
    "temp_max": "",
    "pressure": "",
    "humidity": ""
  })
  const [iconCode, setIconCode] = useState("")

  const handleModalOpen = () => {
    return setModalOpen(true);
  }
  const handleModalClose = () => {
    return setModalOpen(false)
  }

  const is_temp = ["temp", "feels_like", "temp_min", "temp_max"];

  const keyMapping = {
    "temp": "Temperature",
    "feels_like": "Feels Like",
    "temp_min": "Minimum Temperature",
    "temp_max": "Maximum Temperature",
    "pressure": "Pressure",
    "humidity": "Humidity"
  }
 
  useEffect(()=> {
    if (modalData) { 
      setMainData({...modalData.main})
      setIconCode(modalData.weather[0].icon)
    }
  }, [modalData])


  const cities = props.cities;
  const cityItems = cities.map((city) =>
    <City key={cities.indexOf(city)} city={city} setModalData={setModalData} handleModalOpen={handleModalOpen}/>
  );


  const mainDataList = Object.keys(mainData).map((key) => 
    <div className='flex flex-x justify-between bg-slate-600 rounded-md p-1'>
      <div>
        {keyMapping[key]}
      </div>
      <div>
        {mainData[key]}
        {/* add approppriate units to values*/}
        {is_temp.includes(key) ? " °C" : ""} 
        {key=="pressure" ? " PSI" : ""}
        {key=="humidity" ? " %" : ""}
      </div>
    </div>
  );
  return (
    <div>
      <div>
        <ReactModal
          className={'bg-gray-500 absolute top-[35%] left-[25%] w-1/2 h-auto rounded-xl'}
          isOpen={isModalOpen}
          handleModalOpen={handleModalOpen}
          ariaHideApp={false}>
          <div className='flex flex-col space-y-1 p-2 justify-center' >
            <div className='flex flex-col space-y-3 p-2'>{mainDataList}</div>
            <img className='w-36 ' src={`http://openweathermap.org/img/w/${iconCode}.png`}></img>
            <button className='w-1/5' onClick={handleModalClose}> Close </button>
          </div>
        </ReactModal>
      </div>
      <ol className='flex justify-center space-x-2 p-2'>
        {cityItems}
      </ol>
    </div>
  );
}


function City({city, setModalData, handleModalOpen}){
  const [data, setData] = useState(null)

  const onClick = () => {
    getWeather();
    handleModalOpen();
  }

  useEffect(() => {
    setModalData(data)
  }, [data])

  const getWeather = async () => {
    let baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=7a1a207152a4ac5849fca18e3bbdc380`;
    const response = await fetch(baseURL)
    let m = await response.json()
    let data = {
      'main': m.main,
      'weather': m.weather
    }
    setData({...data})
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
