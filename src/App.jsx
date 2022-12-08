import { useEffect, useState } from 'react'
import './App.css'
import React from "react"
import ReactModal from 'react-modal';


function App() {
  return (
    <div className="App">
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
        // TODO: uncomment this
        // clear('cityInput');
        const respose = await fetch(baseURL)
        setCities(await respose.json())  
    }
  }

  if (cities) {
    return (
      <div>
        <input className='w-[20rem] h-[2rem]' id="cityInput" onKeyDown={searchCities}></input>
        <CityList className='align-top' cities={cities}/>
      </div>
    )
  } else {
    return (
      <input id="cityInput" onKeyDown={searchCities}></input>
    )
  }

}

function CityList(props) {

  const [isModalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [mainData, setMainData] = useState({
    "temp": "°C",
    "feels_like": "°C",
    "temp_min": "°C",
    "temp_max": "°C",
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

 
  useEffect(()=> {
    if (modalData) { 
      setMainData({...modalData.main})
      setIconCode(modalData.weather[0].icon)
    }
  }, [modalData])

  const cities = props.cities;
  const listItems = cities.map((city) =>
    <City key={cities.indexOf(city)} city={city} setModalData={setModalData} handleModalOpen={handleModalOpen}/>
  );
  const mainDataList = Object.keys(mainData).map((key) => 
    <li>{key}:{mainData[key]}</li>
  );
  return (
    <div>
      <div>
        <ReactModal className={'bg-gray-500 p-3 absolute inset-0 rounded-xl'} isOpen={isModalOpen} handleModalOpen={handleModalOpen} ariaHideApp={false}>
          <div>
          {mainDataList}
          <img src={`http://openweathermap.org/img/w/${iconCode}.png`}></img>
          <button onClick={handleModalClose}> Close </button>
          </div>
        </ReactModal>
      </div>
      <ol>
        {listItems}
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
    <>
      <button onClick={onClick}>
      {city.name}
      </button>
    </>
  )
}

export default App
