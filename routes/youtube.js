import { Router } from "express";
import { youtube } from "../controllers/youtubeController.js";


const router = Router()

router.route('/')
    .post(youtube)

export default router;