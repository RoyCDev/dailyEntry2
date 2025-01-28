import mongoose from "mongoose"

const journalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String },
    date: { type: Date },
    mood: { type: Number, min: 1, max: 10 },
    activities: [{ type: String }]
})

const Journal = mongoose.model("Journal", journalSchema)
export default Journal