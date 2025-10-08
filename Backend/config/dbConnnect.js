import mongoose from "mongoose";

const connectToDB = async (url) => {
    try {
        await mongoose.connect(url);
        // console.log("Database Connected Successfully");
    } catch (error) {
        // console.error("Database Connection Error : ", error);
    }
};

export default connectToDB;
