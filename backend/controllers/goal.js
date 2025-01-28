import Goal from "../models/Goal.js"

const createGoal = async (request, response) => {
    const { id: userId } = request.user
    const { description, priority, completedAt } = request.body
    try {
        const newGoal = new Goal({
            user: userId, description, priority, completedAt
        })
        await newGoal.save()
        return response.status(201).json(newGoal)
    } catch (error) {
        console.log("Error in createGoal controller", error.message);
        return response.status(500).json({ error: "Internal server error" })
    }
}

const getGoals = async (request, response) => {
    const { id: userId } = request.user
    try {
        const goals = await Goal.find({ user: userId })
        return response.status(200).json(goals)
    } catch (error) {
        console.log("Error in getGoals controller", error.message);
        return response.status(500).json({ error: "Internal server error" })
    }
}

const updateGoal = async (request, response) => {
    const { id: userId } = request.user
    const { id: goalId } = request.params
    const { description, priority, completedAt } = request.body
    try {
        const goal = await Goal.findById(goalId)
        if (!goal)
            return response.status(404).json({ error: "goal not found" })

        if (goal.user.toString() !== userId)
            return response.status(403).json({ error: "you don't have permission to update this goal" })

        const updatedGoal = await Goal.findByIdAndUpdate(goalId,
            { description, priority, completedAt },
            { new: true }
        )

        return response.status(200).json(updatedGoal)

    } catch (error) {
        console.log("Error in updateGoal controller", error.message);
        return response.status(500).json({ error: "Internal server error" })
    }
}

const deleteGoal = async (request, response) => {
    const { id: userId } = request.user
    const { id: goalId } = request.params
    try {
        const goal = await Goal.findById(goalId)
        if (!goal)
            return response.status(404).json({ error: "goal not found" })

        if (goal.user.toString() !== userId)
            return response.status(403).json({ error: "you don't have permission to delete this goal" })

        await Goal.findByIdAndDelete(goalId)
        return response.status(200).json({ message: "goal deleted successfully" })

    } catch (error) {
        console.log("Error in deleteGoal controller", error.message);
        return response.status(500).json({ error: "Internal server error" })
    }
}

export { createGoal, getGoals, updateGoal, deleteGoal }