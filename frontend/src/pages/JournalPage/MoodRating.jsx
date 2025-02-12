import { BsEmojiSunglassesFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiDizzyFill } from "react-icons/bs";

function MoodRating({ mood, setMood }) {
    const moodOptions = [
        {
            value: 1,
            id: "worst",
            icon: <BsEmojiDizzyFill />,
            color: "text-red-900"
        },
        {
            value: 2,
            id: "sad",
            icon: <BsEmojiFrownFill />,
            color: "text-red-700"
        },
        {
            value: 3,
            id: "neutral",
            icon: <BsEmojiNeutralFill />,
            color: "text-yellow-600"
        },
        {
            value: 4,
            id: "happy",
            icon: <BsEmojiSmileFill />,
            color: "text-green-700"
        },
        {
            value: 5,
            id: "best",
            icon: <BsEmojiSunglassesFill />,
            color: "text-green-900"
        }
    ]

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