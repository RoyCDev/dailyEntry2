import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import MoodRating from "./MoodRating"
import ActivityList from "./ActivityList"
import { DayPicker } from "react-day-picker";
import { FaSave } from "react-icons/fa";
import { journalSchema } from "shared";
import { daysOfTheWeek } from "../../utils/util";

/*  Users can access this page in 3 ways:
    1. directly from url: /journal/yyyy/mm/dd -> fetch journal for that date
    2. clicked edit button from historyPage -> journalToEdit
    3. clicked new journal from nav sidebar -> defaultJournal

    useState will have correct values after useEffect is done. 
    isInitialized true means we're still waiting for useQuery/ useEffect. */
function JournalPage() {
    const params = useParams();
    const { year, month, day } = params;
    const { state: journalToEdit } = useLocation();
    const { data: fetchedJournal, isLoading, error } = useQuery({
        queryKey: ["journal", `${year}/${month}/${day}`],
        queryFn: async () => {
            const response = await fetch(`/api/v1/journals/${year}/${month}/${day}`)
            const data = await response.json();
            if (!response.ok)
                throw new Error(data.error || "Something went wrong")
            return data
        },
        // fetch if user accesses the page directly from url
        enabled: Object.keys(params).length === 3 && !journalToEdit,
        retry: false
    })

    const navigate = useNavigate();

    // redirect if useQuery couldn't find a journal for that date
    useEffect(() => {
        if (error) {
            toast.error(error.message);
            navigate("/journal");
        }
    }, [error, navigate])

    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [mood, setMood] = useState(5);
    const [activities, setActivities] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const defaultJournal = {
            date: new Date(),
            description: "",
            mood: 5,
            activities: []
        }
        const initialData = fetchedJournal || journalToEdit || defaultJournal
        setDate(new Date(initialData.date))
        setDescription(initialData.description)
        setMood(initialData.mood)
        setActivities(initialData.activities)
        setIsInitialized(!isLoading);

    }, [fetchedJournal, journalToEdit, params, isLoading])

    const openDatePickerDialog = () => {
        if (window.innerWidth < 768)   // md or smaller
            document.getElementById('datepicker_modal').showModal()
    }

    const method = (journalToEdit || fetchedJournal) ? "PUT" : "POST";
    const endpoint = journalToEdit?._id || fetchedJournal?._id || "";

    const { mutate: saveJournal, isPending } = useMutation({
        mutationFn: async () => {
            const request = await fetch(`/api/v1/journals/${endpoint}`, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: date.toDateString(), description, mood, activities })
            });
            const data = await request.json()
            if (!request.ok)
                throw new Error(data.error || "Something went wrong");
            return data
        },
        onSuccess: () => {
            toast.success(`Journal saved successfully`);
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
            saveJournal()
        }
        catch (error) {
            error.issues.forEach(e => toast.error(e.message))
        }
    }

    return (
        <div className="flex flex-col md:flex-row h-screen py-8">
            {/* left side: date + save button + textarea */}
            <div className="flex-1 flex flex-col px-8 md:border-r-2 border-base-200">
                <div className="flex justify-between mb-6">
                    <div className="cursor-pointer md:cursor-default" onClick={openDatePickerDialog} >
                        {isInitialized && <>
                            <p className="text-3xl font-medium">{date.getDate()}</p>
                            <p className="text-sm">{daysOfTheWeek[date.getDay()]}</p></>}
                        {!isInitialized && <>
                            <div className="skeleton h-9 w-12" />
                            <div className="skeleton h-5 w-20" /></>}
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