import express from "express"
import { create, get, gets, patch, put, remove } from "../controllers/products"
const router = express.Router()

router.get('/products',gets)
router.get(`/products/:id`,get)
router.post('/products',create)
router.patch(`/products/:id`,patch)
router.put(`/products/:id`,put)
router.delete(`/products/:id`,remove)

export default router

