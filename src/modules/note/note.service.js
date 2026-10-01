import mongoose from "mongoose";
import { NoteModel } from "../../DB/Models/note.model.js";

export const createNoteService = async (userId, body) => {
  const { title, content } = body;
  const note = await NoteModel.create({ title, content, userId });
  return { status: 201, data: { message: "Note created", note } };
};

export const updateNoteService = async (noteId, userId, body) => {
  const { title, content } = body;
  const note = await NoteModel.findById(noteId);
  if (!note) {
    return { status: 404, data: { message: "Note not found" } };
  }

  if (note.userId.toString() !== userId) {
    return { status: 403, data: { message: "You are not the owner" } };
  }

  if (title) note.title = title;
  if (content) note.content = content;

  const updatedNote = await note.save();
  return { status: 200, data: { message: "updated", note: updatedNote } };
};

export const replaceNoteService = async (noteId, userId, body) => {
  const { title, content } = body;
  const note = await NoteModel.findById(noteId);
  if (!note) {
    return { status: 404, data: { message: "Note not found" } };
  }

  if (note.userId.toString() !== userId) {
    return { status: 403, data: { message: "You are not the owner" } };
  }

  const replacedNote = await NoteModel.findOneAndReplace(
    { _id: noteId },
    { title, content, userId },
    { new: true, runValidators: true }
  );

  return { status: 200, data: replacedNote };
};

export const updateAllNotesTitleService = async (userId, body) => {
  const { title } = body;
  const result = await NoteModel.updateMany({ userId }, { title }, { runValidators: true });
  if (result.matchedCount === 0) {
    return { status: 404, data: { message: "No note found" } };
  }
  return { status: 200, data: { message: "All notes updated" } };
};

export const deleteSingleNoteService = async (noteId, userId) => {
  const note = await NoteModel.findById(noteId);
  if (!note) {
    return { status: 404, data: { message: "Note not found" } };
  }

  if (note.userId.toString() !== userId) {
    return { status: 403, data: { message: "You are not the owner" } };
  }

  await NoteModel.findByIdAndDelete(noteId);
  return { status: 200, data: { message: "delete", note } };
};

export const paginateAndSortNotesService = async (userId, query) => {
  const { page = 1, limit = 3 } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const notes = await NoteModel.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  return { status: 200, data: notes };
};

export const getNoteByIdService = async (noteId, userId) => {
  const note = await NoteModel.findById(noteId);
  if (!note) {
    return { status: 404, data: { message: "Note not found" } };
  }

  if (note.userId.toString() !== userId) {
    return { status: 403, data: { message: "You are not the owner" } };
  }

  return { status: 200, data: note };
};

export const getNoteByContentService = async (userId, content) => {
  const note = await NoteModel.findOne({ userId, content });
  if (!note) {
    return { status: 404, data: { message: "No note found" } };
  }
  return { status: 200, data: note };
};

export const getNotesWithUserService = async (userId) => {
  const notes = await NoteModel.find({ userId })
    .select("title userId createdAt")
    .populate("userId", "email");

  return { status: 200, data: notes };
};

export const aggregateNotesService = async (userId, title) => {
  const pipeline = [
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        ...(title ? { title: { $regex: title, $options: "i" } } : {}),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        title: 1,
        userId: 1,
        createdAt: 1,
        "user.name": 1,
        "user.email": 1,
      },
    },
  ];

  const notes = await NoteModel.aggregate(pipeline);
  return { status: 200, data: notes };
};

export const deleteAllNotesService = async (userId) => {
  await NoteModel.deleteMany({ userId });
  return { status: 200, data: { message: "Deleted" } };
};