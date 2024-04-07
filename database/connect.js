import { connect } from "mongoose";

const connectDB = async (URL) => {
    try {
        await connect(URL);
        console.log("database connected");
    } catch (err) {
        console.log(err);
    }
}

export default connectDB;