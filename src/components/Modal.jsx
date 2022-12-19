import ReactModal from 'react-modal';


function Modal({ data, setModalOpen, isOpen }) {

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
        <tr key={index} className='flex flex-row border border-dashed border-x-transparent border-slate-300 justify-between p-1'>
            <td>
                {keyMapping[key]}
            </td>
            <td>
                {data.main[key]}
                {/* add approppriate units to values*/}
                {is_temp.includes(key) ? " °C" : ""}
                {key == "pressure" && " PSI"}
                {key == "humidity" && " %"}
                {key == "grnd_level" && " m"}
                {key == "sea_level" && ' m'}
            </td>
        </tr>
    );

    return (
        <ReactModal
            className={'bg-stone-50 min-w-fit absolute top-[25%] left-[25%] w-1/2 h-auto rounded-xl'}
            isOpen={isOpen}
            handleModalOpen={setModalOpen}
            ariaHideApp={false}
            style={
                {
                    overlay: { backgroundColor: 'rgba(163, 163, 163, 0.2)' },
                }
            }>
            <div className='flex flex-col items-center space-y-1 p-2 ' >

                <img className='min-w-[20%] max-w-[50%]' src={`http://openweathermap.org/img/w/${iconCode}.png`}></img>

                <table className='flex flex-col w-full p-2 border border-separate border-spacing-2'>{mainDataList}</table>

                <button className='bg-stone-200' onClick={() => setModalOpen(false)}> Close </button>
            </div>
        </ReactModal>
    )
}

export default Modal