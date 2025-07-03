import mongoose from "mongoose";

async function dbConnect(){
    try {
        if( process.env.MONGO_URI == undefined){
            console.log("Mongo Uri is not defined in the environment variable");
            throw new Error("Database string connection is missing!!!");
        }
        await mongoose.connect(process.env.MONGO_URI)

        const connection = mongoose.connection;
        
        connection.on('connected', ()=>{
            console.log("Mongodb connected");
        })
        
        connection.on('error', (err)=>{
            console.log("Mongodb connection failed, pleases make sure DB is up and running" + err);
            process.exit();
        })
           
    } catch (error) {
        console.log("Something went wrong while connectiong to the database");
        console.log(error)
    }
}

export default dbConnect;