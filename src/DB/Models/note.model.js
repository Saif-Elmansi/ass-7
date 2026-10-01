import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (val) {
          return val !== val.toUpperCase();
        },
        message: "Title must not be entirely uppercase",
      },
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const NoteModel = mongoose.models.Note || mongoose.model("Note", noteSchema);