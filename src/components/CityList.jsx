
import City from './City'
import { useState } from 'react'
import { Dialog, DialogContent } from './Dialog'


function CityList({ cities }) {

    const [open, setOpen] = useState(false)
    const [modalData, setModalData] = useState(null)

    const onOpenChange = () => {
        setOpen(open => !open)
    }


    const cityItems = cities.map((city, index) =>
        <City key={index} city={city} setModalData={setModalData} handleModalOpen={() => onOpenChange()} />
    );

    return (
        <div>

            <ol className='flex flex-wrap justify-center gap-2 p-2'>
                {cityItems}
            </ol>
            {modalData &&
                <Dialog open={open} onOpenChange={onOpenChange}>
                    <DialogContent data={modalData} ></DialogContent>
                </Dialog>}

            {/* {modalData && <Modal data={modalData} setModalOpen={setOpen} isOpen={open} />} */}
        </div>
    );
}

export default CityList