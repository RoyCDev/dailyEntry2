import { moodOptions } from "../../utils/moodOptions";
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import DeleteDialog from "../../components/common/DeleteDialog";
import { daysOfTheWeek } from "../../utils/util";

function JournalTimeline({ journals }) {
    const [journalToDelete, setJournalToDelete] = useState(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: deleteJournal } = useMutation({
        mutationFn: async (id) => {
            const response = await fetch(`/api/v1/journals/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (!response.ok)
                throw new Error(data.error || "Something went wrong");
            return data
        },
        onSuccess: async () => {
            const displayMonth = new Date(journalToDelete.date).toLocaleString('default', { month: 'long', year: "numeric" });
            await queryClient.setQueryData(
                ["journals", displayMonth],
                (prev) => (prev.filter(journal => journal._id !== journalToDelete._id))
            )
            setJournalToDelete(null);
            toast.success("Journal deleted successfully")
        }
    })

    const openDeleteDialog = (journal) => {
        document.getElementById('delete_confirm_modal').showModal();
        setJournalToDelete(journal)
    }

    const viewJournal = (journal) => {
        const datePath = journal.date.slice(0, 10).replaceAll("-", "/");
        navigate(`/journal/${datePath}`, { state: journal });
    }

    return (
        <>
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
                                        {daysOfTheWeek[new Date(journal.date).getDay()]}
                                    </div>
                                </div>
                                <button className="btn btn-circle btn-sm btn-ghost ml-auto" onClick={() => viewJournal(journal)}>
                                    <MdEdit fontSize={18} />
                                </button>
                                <button className="btn btn-circle btn-sm btn-ghost" onClick={() => openDeleteDialog(journal)}>
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
            </ul >
            <DeleteDialog
                id="delete_confirm_modal"
                itemType="journal"
                handleDelete={async () => deleteJournal(journalToDelete._id)}
            />
        </>
    )
}

export default JournalTimeline