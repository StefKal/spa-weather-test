import * as Tabs from '@radix-ui/react-tabs';
import Day from './Day'

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
        <Tabs.Trigger className='focus-within:bg-stone-300 active:bg-stone-300 bg-stone-200 ' value={index}>
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
            <Tabs.List className='flex flex-wrap w-full pb-4 px-2 justify-between  border-b-2 border-dashed border-slate-300'>
                {renderDays}
            </Tabs.List>
            {renderDaysContent}

        </Tabs.Root>
    );
}
export default MyTabs