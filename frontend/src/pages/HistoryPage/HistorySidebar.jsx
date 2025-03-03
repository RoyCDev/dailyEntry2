import { DayPicker } from "react-day-picker";

function HistorySidebar({ journals, monthDate, setMonthDate, selectedActivity, setSelectedActivity }) {
    const activityDates = journals
        ?.filter(journal => journal.activities.includes(selectedActivity))
        ?.flatMap(journal => journal.date)

    let monthlyActivities = journals
        ?.filter(journal => journal.activities.length > 0)
        ?.flatMap(journal => journal.activities)

    monthlyActivities = [...new Set(monthlyActivities)]

    const handleMonthChange = (month) => {
        setMonthDate(month);
        setSelectedActivity(null)
    }

    const changeSelectedActivity = (activity) => {
        setSelectedActivity(current => current === activity ? null : activity)
    }

    return (<>
        <DayPicker key={selectedActivity}
            className="react-day-picker border-0 hidden md:block"
            classNames={{ day: "pointer-events-none" }} // view only, disable won't work since that deselects everything
            mode="multiple"
            onPrevClick={handleMonthChange}
            onNextClick={handleMonthChange}
            defaultMonth={monthDate}
            selected={activityDates}
        />

        <p className="pt-3 text-xs opacity-60 tracking-wide">Activities</p>
        <ul className="list max-h-45 md:max-h-none overflow-y-scroll">
            {monthlyActivities.map((a) => (
                <li key={a}
                    className={`list-row select-none hover:bg-base-200 ${a === selectedActivity ? "bg-base-200" : ""}`}
                    onClick={() => changeSelectedActivity(a)}
                >
                    {a}
                </li>
            ))}
        </ul>
    </>)
}

export default HistorySidebar;