
import City from './City'
import Modal from './Modal'
import { useState } from 'react'


function CityList({ cities }) {

    const [open, setOpen] = useState(false)
    const [modalData, setModalData] = useState(null)


    const cityItems = cities.map((city, index) =>
        <City key={index} city={city} setModalData={setModalData} handleModalOpen={() => setOpen(true)} />
    );

    return (
        <div>
            <ol className='flex flex-wrap justify-center gap-2 p-2'>
                {cityItems}
            </ol>
            {modalData && <Modal data={modalData} setModalOpen={setOpen} isOpen={open} />}
        </div>
    );
}

export default CityList