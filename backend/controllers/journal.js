import Journal from "../models/Journal.js"

const createJournal = async (request, response) => {
    const { id: userId } = request.user
    const { description, date, mood, activities } = request.body;
    try {
        const journal = await Journal.findOne({ user: userId, date })
        if (journal)
            return response.status(409).json({ error: "you already have a journal for this date" })

        const newJournal = new Journal({
            user: userId, description, date, mood, activities
        })
        await newJournal.save()
        return response.status(201).json(newJournal)

    } catch (error) {
        console.log("Error in createJournal controller", error.message)
        return response.status(500).json({ error: "Internal server error" })
    }
}

const getJournal = async (request, response) => {
    const { id: userId } = request.user
    const { id: journalId } = request.params
    try {
        const journal = await Journal.findById(journalId);
        if (!journal)
            return response.status(404).json({ error: "journal not found" })
        if (journal.user.toString() !== userId)
            return response.status(403).json({ error: "you don't have access to view this journal" })

        return response.status(200).json(journal)

    } catch (error) {
        console.log("Error in getJournal controller", error.message)
        return response.status(500).json({ error: "Internal server error" })
    }
}

const updateJournal = async (request, response) => {
    const { id: userId } = request.user
    const { id: journalId } = request.params
    const { description, date, mood, activities } = request.body;
    try {
        const journal = await Journal.findOne({ user: userId, date })
        if (journal && journal._id.toString() !== journalId)
            return response.status(409).json({ error: "you already have a journal for this date" })

        const journalToModify = await Journal.findById(journalId)
        if (!journalToModify)
            return response.status(404).json({ error: "journal not found" })
        if (journalToModify.user.toString() !== userId)
            return response.status(403).json({ error: "you don't have permission to modify this journal" })

        const updatedJournal = await Journal.findByIdAndUpdate(journalId,
            { description, date, mood, activities },
            { new: true }
        )
        return response.status(200).json(updatedJournal)

    } catch (error) {
        console.log("Error in updateJournal controller", error.message)
        return response.status(500).json({ error: "Internal server error" })
    }
}

const deleteJournal = async (request, response) => {
    const { id: userId } = request.user
    const { id: journalId } = request.params
    try {
        const journal = await Journal.findById(journalId)
        if (!journal)
            return response.status(404).json({ error: "journal not found" })
        if (journal.user.toString() !== userId)
            return response.status(403).json({ error: "you don't have permission to delete this journal" })

        await Journal.findByIdAndDelete(journalId)
        return response.status(200).json({ message: "journal deleted successfully" })

    } catch (error) {
        console.log("Error in deleteJournal controller", error.message)
        return response.status(500).json({ error: "Internal server error" })
    }
}

export { createJournal, getJournal, updateJournal, deleteJournal }