import * as noteService from "./note.service.js";

export const createNote = async (req, res) => {
  try {
    const result = await noteService.createNoteService(req.query.id, req.body);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const result = await noteService.updateNoteService(req.params.noteId, req.query.id, req.body);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const replaceNote = async (req, res) => {
  try {
    const result = await noteService.replaceNoteService(req.params.noteId, req.query.id, req.body);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateAllNotesTitle = async (req, res) => {
  try {
    const result = await noteService.updateAllNotesTitleService(req.query.id, req.body);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteSingleNote = async (req, res) => {
  try {
    const result = await noteService.deleteSingleNoteService(req.params.noteId, req.query.id);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const paginateAndSortNotes = async (req, res) => {
  try {
    const result = await noteService.paginateAndSortNotesService(req.query.id, req.query);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const result = await noteService.getNoteByIdService(req.params.id, req.query.id);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getNoteByContent = async (req, res) => {
  try {
    const result = await noteService.getNoteByContentService(req.query.id, req.query.content);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getNotesWithUser = async (req, res) => {
  try {
    const result = await noteService.getNotesWithUserService(req.query.id);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const aggregateNotes = async (req, res) => {
  try {
    const result = await noteService.aggregateNotesService(req.query.id, req.query.title);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteAllNotes = async (req, res) => {
  try {
    const result = await noteService.deleteAllNotesService(req.query.id);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};