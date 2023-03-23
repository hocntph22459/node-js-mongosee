import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const {MONGOO_URL} = process.env;
const connectMongo = () => {
    try {
        mongoose.connect(`${MONGOO_URL}/tests`)
        .then(()=>console.log('connect success'))
    } catch (error) {
        console.log('không thể kết nối');
    }
}
export default connectMongo