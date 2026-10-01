import { Router } from "express";
import * as noteController from "./note.controller.js";

const router = Router();

router.post("/", noteController.createNote);
router.patch("/all", noteController.updateAllNotesTitle);
router.delete("/", noteController.deleteAllNotes);
router.get("/paginate-sort", noteController.paginateAndSortNotes);
router.get("/note-by-content", noteController.getNoteByContent);
router.get("/note-with-user", noteController.getNotesWithUser);
router.get("/aggregate", noteController.aggregateNotes);

router.put("/replace/:noteId", noteController.replaceNote);
router.patch("/:noteId", noteController.updateNote);
router.delete("/:noteId", noteController.deleteSingleNote);
router.get("/:id", noteController.getNoteById);

export default router;