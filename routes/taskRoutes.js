// express  gave use separate module for routing 
//  using expresss , router function to create and map routes 
const express = require("express");
const { updateTask, createTask, getAllTask, deleteTask } = require("../controllers/task");
const { authentication } = require("../middlewares/authentication");
const router = express.Router()



router.put("/:id", updateTask)
router.post("/", authentication, createTask)
router.get("/", authentication, getAllTask)
router.delete("/:id", authentication, deleteTask)

module.exports = router;


