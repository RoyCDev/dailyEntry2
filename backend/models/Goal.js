import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },
    priority: { type: String, enum: ["high", "mid", "low"], required: true },
    completedAt: { type: Date, default: "" }
}, {
    timestamps: true
})

const Goal = mongoose.model("Goal", goalSchema)
export default Goal;