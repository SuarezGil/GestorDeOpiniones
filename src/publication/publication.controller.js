import Publication from "./publication.model.js";

// Se crea el post
export const createPublication = async (req, res) => {
  try {
    const { title, category, content } = req.body;

    const publication = new Publication({
      title,
      category,
      content,
      authorId: req.user.id
    });

    await publication.save();

    res.status(201).json({
      success: true,
      publication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creando publicación",
    });
  }
};
//Obterner los posts con comentario y la cantidad de comentarios
export const getPublications = async (req, res) => {
  try {
    const publications = await Publication.find().populate("comments").populate("commentsCount");
    res.json({
      success: true,
      publications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo publicaciones",
    });
  }
};

// Eliminar
export const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: "La publicación no existe",
      });
    }

    // validación con token
    if (publication.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "No autorizado para eliminar esta publicacion",
      });
    }

    await publication.deleteOne();

    res.json({
      success: true,
      message: "Eliminado",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error eliminando",
    });
  }
};

// Editar
export const updatePublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: "No existe",
      });
    }

    // 🔥 validación con token
    if (publication.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "No autorizado",
      });
    }

    publication.title = req.body.title || publication.title;
    publication.category = req.body.category || publication.category;
    publication.content = req.body.content || publication.content;

    await publication.save();

    res.json({
      success: true,
      message: "Publicación actualizada",
      publication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error actualizando",
    });
  }
};
