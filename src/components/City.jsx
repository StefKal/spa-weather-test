import { useState } from 'react'

function City({ city, setModalData, handleModalOpen }) {

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
        // let data = {
        //     'city_data': m.city,
        //     'weather_data': m.weather
        // }
        setModalData(data)
    }

    if (loadingState === "pending") {
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

export default City