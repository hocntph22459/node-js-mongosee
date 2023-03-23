import express from "express"
import connectMongo from "./connect/connect.js";
import routerauth from "./routes/auth.js";
import routerproduct from "./routes/product.js";
// middlewera
const app = express()
// để chạy phương thức post
app.use(express.json())
// router
app.use('/api',routerproduct)
app.use('/api',routerauth)
// connect mongo
connectMongo()
// vite config
export const viteNodeApp = app;