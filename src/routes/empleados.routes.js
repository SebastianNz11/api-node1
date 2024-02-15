import { Router } from "express";
import {
  getEmpleado,
  createEmpleado,
  deleteEmpleado,
  updateEmpleado,
  getEmpleadoId
} from "../controllers/empleado.controler.js";

const router = Router();

router.get("/empleados", getEmpleado);

router.get("/empleados/:id", getEmpleadoId);

router.post("/empleados", createEmpleado);

router.patch("/empleados/:id", updateEmpleado);

router.delete("/empleados/:id", deleteEmpleado);

export default router;
