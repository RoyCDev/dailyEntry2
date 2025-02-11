import { useState } from "react";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { toast } from "react-toastify"

const ActivityList = ({ activities, setActivities }) => {
    const [newActivity, setNewActivity] = useState("");
    const [hoverItemIndex, setHoverItemIndex] = useState(null);

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

    const deleteActivity = () => {
        setActivities(prev => prev.filter((_, index) => index !== hoverItemIndex))
    }

    return (
        <ul className="list">
            {/* Each activity will render inside <li>. Show the delete button when we hover the <li>  */}
            {activities.map((a, index) => (
                <li key={a} className="list-row"
                    onMouseEnter={() => setHoverItemIndex(index)}
                    onMouseLeave={() => setHoverItemIndex(null)}
                >
                    {a}
                    {index === hoverItemIndex &&
                        <button
                            className="btn btn-circle btn-xs ml-auto h-auto max-h-5.25"
                            onClick={deleteActivity}
                        >
                            <IoIosClose fontSize={16} />
                        </button>
                    }
                </li>
            ))}

            {/* Contains an input field where we can add new activity to the list  */}
            <li className="py-3">
                <form className="join" onSubmit={handleAddActivity}>
                    <button className="btn btn-xs btn-ghost join-item">
                        <IoIosAdd fontSize={16} />
                    </button>
                    <input
                        className="input input-xs input-ghost text-sm focus:outline-none w-full join-item"
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