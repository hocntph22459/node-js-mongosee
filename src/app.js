import express from "express"
import connectMongo from "./connect/connect.js";
import routerproduct from "./routes/product.js";
// middlewera
const app = express()
// để chạy phương thức post
app.use(express.json())
// router
app.use('/api',routerproduct)
// connect mongo
connectMongo()
// vite config
export const viteNodeApp = app;