import * as DialogPrimitive from '@radix-ui/react-dialog';
export const Dialog = DialogPrimitive.Root;

import * as Tabs from '@radix-ui/react-tabs';

function Day({ dayData }) {

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

        console.log(dayMainData)

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
            <Tabs.Trigger className='focus:bg-stone-300 active:bg-stone-300' value={i}>
                {time}
            </Tabs.Trigger>

        );

        dayContent.push(
            <Tabs.Content className='w-full' value={i}>
                <img className='w-[10%]' src={`http://openweathermap.org/img/w/${iconCode}.png`}></img>
                {dayRow}
            </Tabs.Content>
        );

    }


    return (
        <Tabs.Root className='space-y-1 p-2' defaultValue={0}>
            <Tabs.List className='flex flex-row w-full justify-between'>
                {dayTrigger}
            </Tabs.List>

            {dayContent}

        </Tabs.Root>
    );
}

function MyTabs({ data }) {


    // create an array of days which will include the original data split every 8 times
    const days = []
    for (let i = 0; i < data.list.length; i += 8) {
        const slice = data.list.slice(i, i + 8);
        let date = new Date(slice[0].dt * 1000).toLocaleDateString();
        const day = {

            date: date,
            weather_data: slice
        }
        days.push(day)
    }

    const renderDays = days.map((day, index) =>
        <Tabs.Trigger className='focus:bg-stone-300 active:bg-stone-300 bg-stone-200' value={index}>
            {day.date}
        </Tabs.Trigger>
    );

    const renderDaysContent = days.map((day, index) =>
        <Tabs.Content className='w-full text-sm' value={index}>
            <Day key={index} dayData={day.weather_data} />
        </Tabs.Content>

    );

    return (
        <Tabs.Root className='flex flex-col w-full' defaultValue={0}>
            <Tabs.List className='flex flex-row w-full justify-evenly'>
                {renderDays}
            </Tabs.List>
            {renderDaysContent}

        </Tabs.Root>
    );
}


export function DialogContent({ data }) {


    return (
        <DialogPrimitive.Portal >
            <DialogPrimitive.Overlay className=' fixed inset 0' />
            <DialogPrimitive.Content
                className='bg-stone-50 shadow-2xl border flex flex-col items-center w-[65%] h-[40rem] absolute top-[15%] left-[15%] rounded-xl p-3'>
                <DialogPrimitive.Title className="text-3xl py-8">Weather Forecast</DialogPrimitive.Title>
                <MyTabs data={data}></MyTabs>
                <DialogPrimitive.Close asChild>
                    <button>Close</button>
                </DialogPrimitive.Close>
            </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
    );
}