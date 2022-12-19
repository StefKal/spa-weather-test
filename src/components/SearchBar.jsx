import CityList from './CityList'
import { useState, useRef } from 'react'


function SearchBar() {

    const [cities, setCities] = useState(null)
    const searchRef = useRef()

    const searchCities = async (event) => {
        // get city
        let city = searchRef.current.value;
        if ((event.key === "Enter") && (city)) {
            let baseURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=100&appid=7a1a207152a4ac5849fca18e3bbdc380`;
            const respose = await fetch(baseURL)
            setCities(await respose.json())
        }
    }

    return (
        <div className="relative flex flex-col items-center">
            <div className="pointer-events-none relative -left-[11rem] top-[5.4rem]">
                <span className='h-4 w-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </span>
            </div>
            <input
                className='border-2 hover:border-blue-400 focus:border-blue-400 focus:outline-none transition-colors duration-[250ms] w-96 h-9 m-14 px-8 rounded-md'
                id="cityInput"
                ref={searchRef}
                onKeyDown={searchCities} />

            {cities && <CityList cities={cities} />}
        </div>
    )

}
export default SearchBar