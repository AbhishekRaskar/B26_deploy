const express = require("express");

const noteRouter = express.Router();


const { auth } = require("../Middlewares/auth.middleware");
const { NoteModel } = require("../Model/note.model");

noteRouter.use(auth);



// CREATE
noteRouter.post("/create", async (req, res) => {
    try {
        const note = new NoteModel(req.body);
        await note.save()
        res.json({ msg: "New Note Has been added", note: req.body })
    } catch (error) {
        res.json({ error: error.message })
    }
})


// READ
noteRouter.get("/", async (req, res) => {
    try {
        // to get only notes related to that user we used this
        const notes = await NoteModel.find({ userID: req.body.userID });
        res.send(notes)
    } catch (error) {
        res.json({ error: error.message })
    }
})


// UPDATE
noteRouter.patch("/update/:noteID", async (req, res) => {
    // userID in user doc === userID in note doc

    // noteID
    const { noteID } = req.params

    // userID
    const userIDinUserDoc = req.body.userID

    try {
        // to catch id from note doc
        const note = await NoteModel.findOne({ _id: noteID })

        const userIDinNoteDoc = note.userID


        if (userIDinUserDoc === userIDinNoteDoc) {
            // console.log("userID in user doc", userIDinUserDoc, "userID in note doc", userIDinNoteDoc);
            // then only we update
            await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body)
            res.json({ msg: `${note.title} has been updated` })
        }
        else {
            res.json({ msg: "Not Authorized" })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})


// DELETE
noteRouter.delete("/delete/:noteID", async (req, res) => {
    // userID in user doc === userID in note doc

    // noteID
    const { noteID } = req.params

    // userID
    const userIDinUserDoc = req.body.userID

    try {
        // to catch id from note doc
        const note = await NoteModel.findOne({ _id: noteID })

        const userIDinNoteDoc = note.userID


        if (userIDinUserDoc === userIDinNoteDoc) {
            // console.log("userID in user doc", userIDinUserDoc, "userID in note doc", userIDinNoteDoc);
            // then only we update
            await NoteModel.findByIdAndDelete({ _id: noteID })
            res.json({ msg: `${note.title} has benn Deleted` })
        }
        else {
            res.json({ msg: "Not Authorized" })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})

module.exports = {
    noteRouter
}