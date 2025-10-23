import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/api_handling')
        console.log("DB coonected !!")
    } catch (error) {
        console.log("DB connection issue..")
    }
}

export default connectDB