const express = require("express");
const router = express.Router();
const {createForm,getAllForms,getFormById,updateForm,deleteForm} = require('../controller/forms');

// Create a new form
router.post("/", createForm);

// Get all forms
router.get("/", getAllForms);

// Get a form by ID
router.get("/:id", getFormById);

// Update a form
router.put("/:id", updateForm);

// Delete a form
router.delete("/:id", deleteForm);

module.exports = router;
