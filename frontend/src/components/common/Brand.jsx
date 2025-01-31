import { Link } from "react-router-dom";
import { SiLivejournal } from "react-icons/si";

function Brand({ to = "#" }) {
    return (
        <Link to={to} className="font-bold flex items-center gap-1.5">
            <SiLivejournal className='text-2xl' />
            <span className='text-xl'>DailyEntry</span>
        </Link>
    )
}

export default Brand