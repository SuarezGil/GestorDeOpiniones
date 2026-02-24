import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    publicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publication",
      required: true,
    },
    //Este vien del token
    authorId: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
