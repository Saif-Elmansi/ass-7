import mongoose from "mongoose";
import { NoteModel } from "../../DB/Models/note.model.js";
import { errorRes } from "../../utils/error.res.js";

export const createNoteService = async (userId, body) => {
  const { title, content } = body;
  const note = await NoteModel.create({ title, content, userId });
  return note;
};

export const updateNoteService = async (noteId, userId, body) => {
  const { title, content } = body;
  const note = await NoteModel.findById(noteId);
  if (!note) {
    errorRes({ msg: "Note not found", statusCode: 404 });
  }

  if (note.userId.toString() !== userId) {
    errorRes({ msg: "You are not the owner", statusCode: 403 });
  }

  if (title) note.title = title;
  if (content) note.content = content;

  const updatedNote = await note.save();
  return updatedNote;
};

export const replaceNoteService = async (noteId, userId, body) => {
  const { title, content } = body;
  const note = await NoteModel.findById(noteId);
  if (!note) {
    errorRes({ msg: "Note not found", statusCode: 404 });
  }

  if (note.userId.toString() !== userId) {
    errorRes({ msg: "You are not the owner", statusCode: 403 });
  }

  const replacedNote = await NoteModel.findOneAndReplace(
    { _id: noteId },
    { title, content, userId },
    { new: true, runValidators: true }
  );

  return replacedNote;
};

export const updateAllNotesTitleService = async (userId, body) => {
  const { title } = body;
  const result = await NoteModel.updateMany({ userId }, { title }, { runValidators: true });
  if (result.matchedCount === 0) {
    errorRes({ msg: "No note found", statusCode: 404 });
  }
  return result;
};

export const deleteSingleNoteService = async (noteId, userId) => {
  const note = await NoteModel.findById(noteId);
  if (!note) {
    errorRes({ msg: "Note not found", statusCode: 404 });
  }

  if (note.userId.toString() !== userId) {
    errorRes({ msg: "You are not the owner", statusCode: 403 });
  }

  await NoteModel.findByIdAndDelete(noteId);
  return note;
};

export const paginateAndSortNotesService = async (userId, query) => {
  const { page = 1, limit = 3 } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const notes = await NoteModel.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  return notes;
};

export const getNoteByIdService = async (noteId, userId) => {
  const note = await NoteModel.findById(noteId);
  if (!note) {
    errorRes({ msg: "Note not found", statusCode: 404 });
  }

  if (note.userId.toString() !== userId) {
    errorRes({ msg: "You are not the owner", statusCode: 403 });
  }

  return note;
};

export const getNoteByContentService = async (userId, content) => {
  const note = await NoteModel.findOne({ userId, content });
  if (!note) {
    errorRes({ msg: "No note found", statusCode: 404 });
  }
  return note;
};

export const getNotesWithUserService = async (userId) => {
  const notes = await NoteModel.find({ userId })
    .select("title userId createdAt")
    .populate("userId", "email");

  return notes;
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
  return notes;
};

export const deleteAllNotesService = async (userId) => {
  await NoteModel.deleteMany({ userId });
  return true;
};