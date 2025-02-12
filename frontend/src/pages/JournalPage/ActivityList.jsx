import { useState, useRef, useEffect } from "react";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { toast } from "react-toastify"

const ActivityList = ({ activities, setActivities }) => {
    const [newActivity, setNewActivity] = useState("");
    const [hoverActivity, setHoverActivity] = useState(null);
    const listRef = useRef();

    const handleAddActivity = (e) => {
        e.preventDefault();
        if (!newActivity.trim()) return;

        const alreadyAdded = activities.some(a =>
            a.toLowerCase() === newActivity.trim().toLowerCase()
        )
        alreadyAdded ?
            toast.error("You already did this activity") :
            setActivities(prev => [...prev, newActivity])

        setNewActivity("");
    }

    const handleDeleteActivity = () => {
        setActivities(prev => prev.filter(a => a !== hoverActivity))
    }

    /* if we have more activites that what can displayed in the view height,
       scrollbar should be sticked to bottom so the input field always shows */
    useEffect(() => {
        listRef.current.scrollTop = listRef.current.scrollHeight
    }, [activities])

    return (
        <ul className="list max-h-35 md:max-h-58 overflow-y-scroll" ref={listRef}>
            {/* Each activity will render inside <li>. Show the delete button when we hover the <li>  */}
            {activities.map((a) => (
                <li key={a} className="list-row"
                    onMouseOver={() => setHoverActivity(a)}
                    onMouseOut={() => setHoverActivity(null)}
                >
                    {a}
                    {a === hoverActivity &&
                        <button
                            className="btn btn-circle btn-xs ml-auto h-auto max-h-5.25"
                            onClick={handleDeleteActivity}
                        >
                            <IoIosClose fontSize={16} />
                        </button>
                    }
                </li>
            ))}

            {/* Contains an input field where we can add new activity to the list  */}
            <li className="py-3">
                <form className="join w-full" onSubmit={handleAddActivity}>
                    <button className="btn btn-xs btn-ghost join-item">
                        <IoIosAdd fontSize={16} />
                    </button>
                    <input
                        className="input input-xs input-ghost text-sm focus:outline-none join-item w-full"
                        placeholder="New Activity"
                        value={newActivity}
                        onChange={(e) => setNewActivity(e.target.value)}
                    />
                </form>
            </li>
        </ul>
    )
}

export default ActivityList