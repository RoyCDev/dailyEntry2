import { moodOptions } from "../../utils/moodOptions";
import { MdEdit, MdDelete } from "react-icons/md";

function JournalTimeline({ journals }) {
    return (
        <ul className="timeline timeline-vertical timeline-compact -ml-3">
            {journals.map((journal, index) => (
                <li key={journal._id} className="gap-x-3">
                    {index > 0 && <hr />}
                    <div className="timeline-middle">
                        <div className={`text-3xl ${moodOptions[journal.mood - 1].color}`}>
                            {moodOptions[journal.mood - 1].icon}
                        </div>
                    </div>

                    <div className="timeline-end timeline-box w-full mx-0 my-3">
                        {/* timeline-box header:  date + buttons */}
                        <div className="flex pt-1 pb-2">
                            <div>
                                <div className="text-xl font-medium">
                                    {journal.date.slice(8, 10)}
                                </div>
                                <div className="text-xs opacity-60 -mt-0.5">
                                    Monday
                                </div>
                            </div>
                            <button className="btn btn-circle btn-sm btn-ghost ml-auto">
                                <MdEdit fontSize={18} />
                            </button>
                            <button className="btn btn-circle btn-sm btn-ghost">
                                <MdDelete fontSize={18} />
                            </button>
                        </div>
                        {/* timeline-box body: description */}
                        <div className="py-2 border-t-1 border-base-300">
                            {journal.description}
                        </div>
                        {/* timeline-box footer: activities (if any) */}
                        {journal.activities.length > 0 &&
                            <div className="opacity-60 py-2">
                                Activities: {journal.activities.map(a => (
                                    <div key={a} className="badge badge-soft badge-neutral badge-xs">{a}</div>
                                ))}
                            </div>
                        }
                    </div>
                    {index < journals.length - 1 && <hr />}
                </li>
            ))}
        </ul>
    )
}

export default JournalTimeline