import { BsEmojiSunglassesFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiDizzyFill } from "react-icons/bs";

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

export { moodOptions };