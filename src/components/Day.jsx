import * as Tabs from '@radix-ui/react-tabs';

export function Day({ dayData }) {

    const is_temp = ["temp", "feels_like", "temp_min", "temp_max"];
    const keyMapping = {
        "temp": "Temperature",
        "feels_like": "Feels Like",
        "temp_min": "Minimum Temperature",
        "temp_max": "Maximum Temperature",
        "pressure": "Pressure",
        "humidity": "Humidity",
        "grnd_level": "Ground Level",
        "sea_level": "Sea Level",
        "temp_kf": "Temperature KF"
    }


    let dayTrigger = []
    let dayContent = []
    for (let i = 0; i < dayData.length; i += 1) {
        let time = new Date(dayData[i].dt * 1000).toLocaleTimeString();
        let dayMainData = dayData[i].main
        let iconCode = dayData[i].weather[0].icon

        const dayRow = Object.keys(dayMainData).map((key, index) =>
            <div key={index} className='flex flex-row border border-dashed border-x-transparent border-slate-300 justify-between p-1'>
                <div>
                    {keyMapping[key]}
                </div>
                <div>
                    {dayMainData[key]}
                    {/* add approppriate units to values*/}
                    {is_temp.includes(key) ? " °C" : ""}
                    {key == "pressure" && " PSI"}
                    {key == "humidity" && " %"}
                    {key == "grnd_level" && " m"}
                    {key == "sea_level" && ' m'}
                    {key == "temp_kf" && ' KF'}
                </div>
            </div>

        );


        dayTrigger.push(
            <Tabs.Trigger className='focus-within:bg-stone-300 active:bg-stone-300' value={i}>
                {time}
            </Tabs.Trigger>

        );

        dayContent.push(
            <Tabs.Content className='w-full' value={i}>
                <img className='w-[5%] min-w-[5%]' src={`http://openweathermap.org/img/w/${iconCode}.png`}></img>
                {dayRow}
            </Tabs.Content>
        );

    }


    return (
        <Tabs.Root className='space-y-1 p-2' defaultValue={0}>
            <Tabs.List className='flex flex-wrap w-full pb-2 justify-between border-b-2 border-dashed border-slate-300'>
                {dayTrigger}
            </Tabs.List>

            {dayContent}

        </Tabs.Root>
    );
}
export default Day