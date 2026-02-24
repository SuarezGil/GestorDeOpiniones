import { body, param } from "express-validator";

/* =====================
   POSTS
===================== */

export const createPublicationValidator = [
  body("title")
    .notEmpty().withMessage("¡Tu publicación necesita un título!")
    .isLength({ min: 3 }).withMessage("El título es muy corto, escribe al menos 3 caracteres"),

  body("category")
    .notEmpty().withMessage("Selecciona una categoría para tu publicación")
    .isLength({ min: 3 }).withMessage("La categoría debe tener al menos 3 caracteres"),

  body("content")
    .notEmpty().withMessage("No puedes publicar algo vacío, escribe tu contenido ")
    .isLength({ min: 10 }).withMessage("Cuéntanos un poco más... mínimo 10 caracteres"),
];

export const updatePublicationValidator = [
  param("id")
    .isMongoId().withMessage("Ups… esa publicación no existe o el ID no es válido"),

  body("title")
    .optional()
    .isLength({ min: 3 }).withMessage("El título es muy corto, agrega más información"),

  body("category")
    .optional()
    .isLength({ min: 3 }).withMessage("La categoría debe tener al menos 3 caracteres"),

  body("content")
    .optional()
    .isLength({ min: 10 }).withMessage("El contenido es muy corto, agrega más detalles"),
];

/* =====================
   COMMENTS
===================== */

export const createCommentValidator = [
  body("content")
    .notEmpty().withMessage("Escribe algo antes de comentar ")
    .isLength({ min: 3 }).withMessage("Tu comentario es muy corto, escribe un poco más"),

  body("publicationId")
    .notEmpty().withMessage("No se encontró la publicación a la que quieres comentar")
    .isMongoId().withMessage("La publicación seleccionada no es válida"),
];

export const updateCommentValidator = [
  param("id")
    .isMongoId().withMessage("Ese comentario no existe o el ID no es válido"),

  body("content")
    .optional()
    .isLength({ min: 3 }).withMessage("Tu comentario es muy corto, agrega más contenido"),
];