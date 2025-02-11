import { SiLivejournal } from "react-icons/si";

function Brand() {
    return (
        <div className="font-bold flex items-center gap-1.5">
            <SiLivejournal className='text-2xl' />
            <span className='text-xl'>DailyEntry</span>
        </div>
    )
}

export default Brand