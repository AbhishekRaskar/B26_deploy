

const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/user.routes");
const { noteRouter } = require("./Routes/note.routes");

const app = express();

require("dotenv").config()

// cors used here to share data between two servers
const cors = require("cors");

app.use(cors())


app.use(express.json())

app.use("/users",userRouter)

app.use("/notes",noteRouter)

app.listen(6007, async () => {
    try {
        await connection
        console.log("Connected to DB");
        console.log(`Server is Running at PORT ${process.env.port}`);
    } catch (error) {
        console.log(error);
        console.log("Something Went Wrong");
    }
})