import '@fontsource-variable/montserrat';
import { Outlet, Link } from "react-router-dom";

// icons for sidebar
import { SiLivejournal } from "react-icons/si";
import { IoMdDocument, IoMdFolder, IoIosCheckmarkCircle } from "react-icons/io";
import { RiUserSearchFill } from "react-icons/ri";
import { FaCarAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

function RootLayout({ user }) {
    const navLinks = [
        {
            link: "/journal",
            icon: <IoMdDocument />,
            name: "New Journal"
        },
        {
            link: "/history",
            icon: <IoMdFolder />,
            name: 'Journal History'
        },
        {
            link: "/goal",
            icon: < IoIosCheckmarkCircle />,
            name: "Goals"
        }
    ]

    const projects = [
        {
            link: "https://github.com/RoyCDev/AnimeCharSearch",
            icon: <RiUserSearchFill />,
            name: "AnimeCharSearch"
        },
        {
            link: "https://github.com/DuckyKay/CMPE157ACarRental",
            icon: <FaCarAlt />,
            name: "CarRental157A"
        }
    ]

    return (
        <div className="drawer lg:drawer-open font-[montserrat_variable]">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <Outlet />
            </div>
            <div className="drawer-side">
                <ul className="menu bg-base-300 text-base-content min-h-full w-80 p-4 gap-3">
                    {/* Sidebar content here */}
                    {/* brand */}
                    <li>
                        <Link to="/" className="font-bold flex items-center gap-1.5">
                            <SiLivejournal className='text-2xl' />
                            <span className='text-xl'>DailyEntry</span>
                        </Link>
                    </li>

                    {user && <li>
                        <p className='menu-title'>Navigations</p>
                        <ul>
                            {navLinks.map(l => (
                                <li key={l.name}>
                                    <Link to={l.link}>{l.icon}{l.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </li>}

                    <li>
                        <p className='menu-title'>My other projects</p>
                        <ul>
                            {projects.map(p => (
                                <li key={p.name}>
                                    <a href={p.link}>{p.icon}{p.name}</a>
                                </li>
                            ))}
                        </ul>
                    </li>

                    {/* User info + Logout Button */}
                    <li className='mt-auto'>
                        <div className="flex gap-3 items-center">
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img src={user?.profileImg || "/avatar-placeholder.png"} />
                                </div>
                            </div>
                            <div>
                                <p className='font-medium'>{user?.username || "Guest"}</p>
                                <p className="text-xs">Today: {new Date().toLocaleDateString('en-US')}</p>
                            </div>
                            {user && <button className='text-2xl ml-auto'>
                                <MdLogout />
                            </button>}
                        </div>
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default RootLayout