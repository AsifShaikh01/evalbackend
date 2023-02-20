const express = require("express");
const {connection} = require("./db")
const {postRouter} = require("./routes/Post.routes");
const {userRouter} = require("./routes/User.routes");
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors())
app.use("/users" , userRouter)
app.use("/posts" , postRouter)


app.listen(process.env.port, async()=>{
     try {
        await connection
        console.log("Connected to db")
     } catch (error) {
        console.log(error)
     }
     console.log(`server is running at port ${process.env.port}`)
})