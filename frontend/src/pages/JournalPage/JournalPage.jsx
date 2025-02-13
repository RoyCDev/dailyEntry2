import { useState } from "react";
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import MoodRating from "./MoodRating"
import ActivityList from "./ActivityList"
import { DayPicker } from "react-day-picker";
import { FaSave } from "react-icons/fa";
import { journalSchema } from "shared";

const daysOfTheWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

function JournalPage() {
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [mood, setMood] = useState(5);
    const [activities, setActivities] = useState([]);

    const navigate = useNavigate();

    const openDatePickerDialog = () => {
        if (window.innerWidth < 768)   // md or smaller
            document.getElementById('datepicker_modal').showModal()
    }

    const { mutate: createJournal, isPending } = useMutation({
        mutationFn: async () => {
            const request = await fetch("/api/v1/journals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: date.toDateString(), description, mood, activities })
            });
            const data = await request.json()
            if (!request.ok)
                throw new Error(data.error || "Something went wrong");
            return data
        },
        onSuccess: () => {
            toast.success("Journal created successfully");
            navigate("/history");
        },
        onError: (error) => {
            error.issues ?
                error.issues.forEach(e => toast.error(e.message)) :
                toast.error(error.message)
        }
    });

    const handleSubmit = () => {
        try {
            journalSchema.parse({ date, description, mood, activities })
            createJournal()
        }
        catch (error) {
            error.issues.forEach(e => toast.error(e.message))
        }
    }

    return (
        <div className="flex flex-col md:flex-row h-screen py-8">
            {/* left side: date + save button + textarea */}
            <div className="flex-1 flex flex-col px-8 sm:border-r-2 border-base-200">
                <div className="flex justify-between mb-6">
                    <div className="cursor-pointer md:cursor-default" onClick={openDatePickerDialog} >
                        <p className="text-3xl font-medium">{date.getDate()}</p>
                        <p className="text-sm">{daysOfTheWeek[date.getDay()]}</p>
                    </div>
                    <button className="btn btn-xl btn-square" onClick={handleSubmit} disabled={isPending}>
                        {isPending ?
                            <span className="loading loading-spinner loading-md"></span> :
                            <FaSave />
                        }
                    </button>
                </div>
                <textarea
                    className="flex-1 textarea border-0 focus:outline-0 resize-none w-full p-0"
                    placeholder="Start documenting your day..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* right side: calendar (md & above) + activityList */}
            <div className="md:w-67 mx-5 -mt-3">
                <DayPicker className="react-day-picker border-0 hidden md:block" mode="single" selected={date} onSelect={setDate} required />

                <p className="py-3 text-xs opacity-60 tracking-wide">Mood Rating</p>
                <MoodRating mood={mood} setMood={setMood} />

                <p className="text-xs opacity-60 tracking-wide">Activities</p>
                <ActivityList activities={activities} setActivities={setActivities} />
            </div>

            {/* modal to let user change journal date (< md) since the other calendar is hidden */}
            <dialog id="datepicker_modal" className="modal md:hidden">
                <div className="modal-box w-auto p-1">
                    <DayPicker className="react-day-picker border-0" mode="single" selected={date} onSelect={setDate} required />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div >
    );
}

export default JournalPage