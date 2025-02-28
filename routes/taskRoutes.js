// express  gave use separate module for routing 
//  using expresss , router function to create and map routes 
const express = require("express");
const { updateTask, createTask, getAllTask, deleteTask } = require("../controllers/task");
const router = express.Router()



router.put("/:id", updateTask)
router.post("/", createTask)
router.get("/", getAllTask)
router.delete("/:id", deleteTask)

module.exports = router;


