import mongoose from "mongoose"

const journalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String },
    date: { type: Date },
    mood: { type: Number, min: 1, max: 5 },
    activities: { type: [{ type: String }], default: [] }
})

const Journal = mongoose.model("Journal", journalSchema)
export default Journal