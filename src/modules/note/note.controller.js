import * as noteService from "./note.service.js";
import { successRes } from "../../utils/success.res.js";

export const createNote = async (req, res) => {
  const note = await noteService.createNoteService(req.query.id, req.body);
  return successRes({
    res,
    status: 201,
    msg: "Note created",
    data: { note },
  });
};

export const updateNote = async (req, res) => {
  const note = await noteService.updateNoteService(req.params.noteId, req.query.id, req.body);
  return successRes({
    res,
    status: 200,
    msg: "updated",
    data: { note },
  });
};

export const replaceNote = async (req, res) => {
  const note = await noteService.replaceNoteService(req.params.noteId, req.query.id, req.body);
  return successRes({
    res,
    status: 200,
    msg: "done",
    data: { note },
  });
};

export const updateAllNotesTitle = async (req, res) => {
  const result = await noteService.updateAllNotesTitleService(req.query.id, req.body);
  return successRes({
    res,
    status: 200,
    msg: "All notes updated",
    data: { result },
  });
};

export const deleteSingleNote = async (req, res) => {
  const note = await noteService.deleteSingleNoteService(req.params.noteId, req.query.id);
  return successRes({
    res,
    status: 200,
    msg: "delete",
    data: { note },
  });
};

export const paginateAndSortNotes = async (req, res) => {
  const notes = await noteService.paginateAndSortNotesService(req.query.id, req.query);
  return successRes({
    res,
    status: 200,
    msg: "done",
    data: { notes },
  });
};

export const getNoteById = async (req, res) => {
  const note = await noteService.getNoteByIdService(req.params.id, req.query.id);
  return successRes({
    res,
    status: 200,
    msg: "done",
    data: { note },
  });
};

export const getNoteByContent = async (req, res) => {
  const note = await noteService.getNoteByContentService(req.query.id, req.query.content);
  return successRes({
    res,
    status: 200,
    msg: "done",
    data: { note },
  });
};

export const getNotesWithUser = async (req, res) => {
  const notes = await noteService.getNotesWithUserService(req.query.id);
  return successRes({
    res,
    status: 200,
    msg: "done",
    data: { notes },
  });
};

export const aggregateNotes = async (req, res) => {
  const notes = await noteService.aggregateNotesService(req.query.id, req.query.title);
  return successRes({
    res,
    status: 200,
    msg: "done",
    data: { notes },
  });
};

export const deleteAllNotes = async (req, res) => {
  await noteService.deleteAllNotesService(req.query.id);
  return successRes({
    res,
    status: 200,
    msg: "Deleted",
  });
};