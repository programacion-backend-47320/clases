import { Router } from "express";
import { getUserById, getUsers, saveUsers } from "../controllers/user.controller.js";

const router = Router()

router.get('/', getUsers)
router.get('/:uid', getUserById)
router.post('/', saveUsers)

export default router