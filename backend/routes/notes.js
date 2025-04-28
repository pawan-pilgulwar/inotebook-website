const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// ROUTE 1 : Get all the note using: GET "api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchUser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error occurd");
    }
})

// ROUTE 2 : Add a new note using: POST "api/notes/addnote".    login required
router.post('/addnote', fetchUser, [
    body('title','Enter must be atleast 3 characters').isLength({min:3}),
    body('description','Description must be atleast 5 characters').isLength({min:5})
], async (req, res)=>{
    try {
        const {title, description, tag} = req.body;

        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json ({errors: errors.array()});
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error occurd");
    }
})

// ROUTE 3 : Update an esisting note using: PUT "api/notes/updatenote".    login required
router.put('/updatenote/:id', fetchUser, async (req, res)=>{
    try {
        const {title, description, tag} = req.body;
        //Create a new note object
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
    
        // Find the note to be update and update it
        let note = await Note.findById(req.params.id);
    
        if(!note){return res.status(404).send("Not Found")}
    
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json(note);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error occurd");
    }
})

// ROUTE 4 : Delete an esisting note using: DELETE "api/notes/deletenote".    login required
router.delete('/deletenote/:id', fetchUser, async (req, res)=>{
    try {
        const {title, description, tag} = req.body;
    
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
    
        if(!note){return res.status(404).send("Not Found")}
    
        // Allow deletion ony if owns this note
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleated", note: note});
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error occurd");
    }
})


module.exports = router