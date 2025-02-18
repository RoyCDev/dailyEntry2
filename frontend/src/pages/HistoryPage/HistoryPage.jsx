import { DayPicker } from "react-day-picker"
import { useQuery } from "@tanstack/react-query"
import JournalTimeline from "./JournalTimeline";

function HistoryPage() {
    const { data: journals, isLoading } = useQuery({
        queryKey: ["journals"],
        queryFn: async () => {
            const response = await fetch("/api/v1/journals/2025/02");
            const data = await response.json();
            if (!response.ok)
                throw new Error(data.error || "Something went wrong");
            return data;
        }
    });

    const averageMonthlyMood = journals?.length ?
        journals.reduce((acc, currJorunal) => acc + currJorunal.mood, 0) / journals.length :
        0

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen py-8 overflow-scroll">
            {/* left side */}
            <div className="flex-1 px-8 md:border-r-2 border-base-200">
                <div className="text-xl font-semibold">
                    February 2025
                </div>

                {/* <div className="stats">
                    <div className="stat">
                        <div className="stat-value">{journals.length}</div>
                        <div className="stat-title">Journals</div>
                    </div>
                    <div className="stat">
                        <div className="stat-value">{averageMonthlyMood.toFixed(2)}
                            <span className="text-sm">/5</span>
                        </div>
                        <div className="stat-title">Avg Mood Raing</div>
                    </div>
                </div> */}
                <JournalTimeline journals={journals} />
            </div>

            {/* right side: calendar (md & above) */}
            <div className="w-67 mx-5 -mt-3">
                <DayPicker className="react-day-picker border-0 hidden md:block" mode="single" />
            </div>
        </div>
    )
}

export default HistoryPage