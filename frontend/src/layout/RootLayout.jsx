import '@fontsource-variable/montserrat';
import { Outlet, Link } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Brand from "../components/common/Brand"

// icons for sidebar
import { IoMdDocument, IoMdFolder, IoIosCheckmarkCircle } from "react-icons/io";
import { RiUserSearchFill } from "react-icons/ri";
import { FaCarAlt, FaUserEdit } from "react-icons/fa";
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
        },
        {
            link: "/profile",
            icon: <FaUserEdit />,
            name: "Edit Profile"
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

    const queryClient = useQueryClient()
    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            const response = await fetch("/api/v1/auth/logout", {
                method: "POST"
            })
            const data = await response.json()
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
        }
    })

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
                    <li>
                        <Link to="/"><Brand /></Link>
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
                                <MdLogout onClick={logout} />
                            </button>}
                        </div>
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default RootLayout