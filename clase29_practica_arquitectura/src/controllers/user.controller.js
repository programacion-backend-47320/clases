import { UserService } from "../services/index.js";

export const getUsers = async (req, res) => {
    const result = await UserService.getUsers()
    res.json({ status: 'success', payload: result })
}

export const getUserById = async (req, res) => {
    const { uid } = req.params
    const result = await UserService.getUserById(uid)

    res.json({ status: 'success', payload: result })
}

export const saveUsers = async (req, res) => {
    const user = req.body

    const result = await UserService.saveUser(user)
    res.send({ status: 'success', payload: result })
}