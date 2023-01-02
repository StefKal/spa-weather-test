import * as DialogPrimitive from '@radix-ui/react-dialog';
export const Dialog = DialogPrimitive.Root;
import MyTabs from './MyTabs'

export function DialogContent({ data }) {


    return (
        <DialogPrimitive.Portal >
            <DialogPrimitive.Overlay className=' fixed inset 0' />
            <DialogPrimitive.Content
                className='bg-stone-50 shadow-2xl border flex flex-col items-center w-min-fit w-[65%] h-fit absolute top-[25%] left-[15%] rounded-xl p-3'>
                <DialogPrimitive.Title className="text-3xl py-8">Weather Forecast</DialogPrimitive.Title>
                <MyTabs data={data}></MyTabs>
                <DialogPrimitive.Close asChild>
                    <button>Close</button>
                </DialogPrimitive.Close>
            </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
    );
}