import { useQuery } from "@tanstack/react-query"
import { useState } from "react";

import MonthStats from "./MonthStats";
import JournalTimeline from "./JournalTimeline";
import HistorySidebar from "./HistorySidebar";

function HistoryPage() {
    const [monthDate, setMonthDate] = useState(new Date());
    const displayMonth = monthDate.toLocaleString('default', { month: 'long', year: "numeric" });

    const { data: journals, isLoading } = useQuery({
        queryKey: ["journals", displayMonth],
        queryFn: async () => {
            const month = monthDate.getMonth() + 1;
            const year = monthDate.getFullYear();

            const response = await fetch(`/api/v1/journals/${year}/${month}`);
            const data = await response.json();
            if (!response.ok)
                throw new Error(data.error || "Something went wrong");
            return data;
        },
    });

    const [selectedActivity, setSelectedActivity] = useState(null);
    const activityJournals = journals?.filter(j => j.activities.includes(selectedActivity))

    const sidebar =
        <HistorySidebar
            journals={journals}
            monthDate={monthDate}
            setMonthDate={setMonthDate}
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
        />

    return (
        <div className="flex flex-col md:flex-row min-h-screen py-8">
            {/* left side */}
            <div className="flex-1 px-8 md:border-r-2 border-base-200 min-w-0">
                <MonthStats journals={journals} monthDate={monthDate} />
                {!isLoading && <JournalTimeline journals={selectedActivity ? activityJournals : journals} />}
            </div>

            {/* right side: calendar (md & above) */}
            <div className="w-67 mx-5 -mt-3">{sidebar}</div>
        </div>
    )
}

export default HistoryPage