import { Router } from "express";
import {
  createPublication,
  getPublications,
  deletePublication,
  updatePublication,
} from "./publication.controller.js";

import { validateJWT } from "../../middlewares/validate-jwt.js";
import { validateFields } from "../../middlewares/validate-fields.js";

import {
  createPublicationValidator,
  updatePublicationValidator,
} from "../../middlewares/validators.js";

const router = Router();

router.get("/", getPublications);

router.post(
  "/",
  validateJWT,
  createPublicationValidator,
  validateFields,
  createPublication
);

router.put(
  "/:id",
  validateJWT,
  updatePublicationValidator,
  validateFields,
  updatePublication
);

router.delete("/:id", validateJWT, deletePublication);

export default router;