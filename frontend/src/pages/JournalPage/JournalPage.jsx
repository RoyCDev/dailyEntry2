import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill } from "react-icons/bs";
import ActivityList from "./ActivityList"

const daysOfTheWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

function MoodRating({ mood, setMood }) {
    const moodOptions = [
        {
            value: 0,
            id: "sad",
            icon: <BsEmojiFrownFill />,
            color: "text-red-700"
        },
        {
            value: 1,
            id: "neutral",
            icon: <BsEmojiNeutralFill />,
            color: "text-yellow-600"
        },
        {
            value: 2,
            id: "happy",
            icon: <BsEmojiSmileFill />,
            color: "text-green-700"
        }
    ]

    return (
        <div className="flex gap-2 text-5xl">
            {moodOptions.map(m => (
                <div key={m.value} className="form-control">
                    <input hidden
                        type="radio"
                        name="mood"
                        id={m.id}
                        value={m.value}
                        onChange={() => setMood(m.value)}
                    />
                    <label
                        htmlFor={m.id}
                        className={`${m.value === mood ? m.color : "text-base-300"} cursor-pointer`}
                    >
                        {m.icon}
                    </label>
                </div>
            ))}
        </div>
    )
}


function JournalPage() {
    const [date, setDate] = useState(new Date());
    const [activities, setActivities] = useState(["run", "walk"]);
    // const [mood, setMood] = useState(2);

    return (
        <div className="flex min-h-full">
            <div className="flex-1">
                <p className="text-3xl font-medium">{date.getDate()}</p>
                <p>{daysOfTheWeek[date.getDay()]}</p>
                {/* <MoodRating mood={mood} setMood={setMood} /> */}
            </div>

            <div className="border-l-2 border-base-200 pl-5 w-72.5">
                <DayPicker className="react-day-picker border-0" mode="single" selected={date} onSelect={setDate} />

                <p className="py-2 text-xs opacity-60 tracking-wide">Activities</p>
                <ActivityList activities={activities} setActivities={setActivities} />
            </div>
        </div>
    );
}

export default JournalPage