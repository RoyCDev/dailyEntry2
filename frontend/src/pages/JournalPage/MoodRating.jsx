import { moodOptions } from "../../utils/moodOptions"

function MoodRating({ mood, setMood }) {
    return (
        <div className="flex gap-2 text-2xl pb-4">
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

export default MoodRating