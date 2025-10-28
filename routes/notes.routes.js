import express from "express"
const router = express.Router()
import  User from "../model/user.model.js" 
import Notes from "../model/notes.model.js"




// data receive => username
router.get("/", async (req, res) => {
      const username = req.query.username

      if(!username){
        return res.status(400).json({
            success: false,
            message: "Username is required",
        })
      } 
      if(!username.length>3){
        return res.status(400).json({
            success: false,
            message: "Username must be at least 3 characters long",
        })
      }

      // check of user exits: 
      try{

      const foundUser = await User.findOne({username})
      console.log("foundUser",foundUser)

      if(!foundUser){
        const newUser = await User.create({username})
       return res.status(200).json({
            success: true,
            message: "User created successfully",
        })
      }

      let allNotesOfthisUser =  await Notes.find({user: foundUser._id})

      res.status(200).json({
        success: true,
        message: "User found successfully",
        data: allNotesOfthisUser,
      })

      }

      catch(err){
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
      }
})


router.post("/create/:username", async (req, res) => {

  const username = req.params.username 
  const {title, content} = req.body


  if(!title || !content){
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
    })
  } 

  try{
  const foundUser = await User.findOne({username})

  if(!foundUser){
    return res.status(400).json({
      success: false,
      message: "User not found",
    })
  }
   let newNotes = new Notes({
     user: foundUser._id,
     title,
     content,
   })
    const savedNotes = await newNotes.save()

   res.status(200).json({
    success: true,
    message: "Notes created successfully",
    data: savedNotes,
   })



}
catch(err){
  res.status(500).json({
    success: false,
    message: "Internal server error",
  })
}

})

router.patch("/update/:username/:id", async (req, res) => {
  const username = req.params.username
  const notesId = req.params.id
  const {title, content} = req.body 

  if(!title && !content){
    return res.status(400).json({
      success: false,
      message: "Title or content is required",
    })
  }

  try{
      let foundUser =  await User.findOne({username})
      if(!foundUser){
        return res.status(400).json({
          success: false,
          message: "User not found",
        })
      }
      let foundNotes =  await Notes.findById(notesId)
      if(!foundNotes){
        return res.status(400).json({
          success: false,
          message: "Notes not found",
        })
      }

      if(foundNotes.user.toString() !== foundUser._id.toString()){
        return res.status(400).json({
          success: false,
          message: "You are not authorized to update this notes",
        })
      }

      let updatedNotes = await Notes.findByIdAndUpdate(notesId,{
        title,
        content,
      },{
        new: true,
      })

      res.status(200).json({
        success: true,
        message: "Notes updated successfully",
        data: updatedNotes,
      })
  }

  catch(err){
    res.status(500).json({
    success: false,
    message: "Internal server error",
  })
  }

})


router.delete("/delete/:username/:id", async (req, res) => {
  const username = req.params.username
  const notesId = req.params.id

  try{
    let foundUser =  await User.findOne({username})
    if(!foundUser){
      return res.status(400).json({ 
        success: false,
        message: "User not found",
      })
    }
    let foundNotes =  await Notes.findById(notesId)
    if(!foundNotes){
      return res.status(400).json({
        success: false,
        message: "Notes not found",
      })
    }
    if(foundNotes.user.toString() !== foundUser._id.toString()){
      return res.status(400).json({
        success: false,
        message: "You are not authorized to delete this notes",
      })
    }
    await Notes.findByIdAndDelete(notesId)
    res.status(200).json({
      success: true,
      message: "Notes deleted successfully",
    })
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }

})



export default router;