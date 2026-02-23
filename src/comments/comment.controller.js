import Comment from "./comment.model.js";

export const createComment = async (req, res) => {
  try {
    const comment = new Comment({
      content: req.body.content,
      postId: req.body.postId,
      authorId: req.user.id,
    });

    await comment.save();

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creando comentario",
    });
  }
};

// Editar
export const updateComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) return res.status(404).json({ message: "No existe" });

  if (comment.authorId !== req.user.id) {
    return res.status(403).json({ message: "No autorizado" });
  }

comment.content = req.body.content || comment.content;
  await comment.save();

  res.json({ message: "Comentario actualizado" });
};

// Eliminar
export const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) return res.status(404).json({ message: "No existe" });

  if (comment.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "No autorizado" });
  }

  await comment.deleteOne();

  res.json({ message: "Comentario eliminado" });
};

