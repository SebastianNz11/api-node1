import express, { json } from "express";
import { pool } from "./db.js";
import empleadosRoutes from "./routes/empleados.routes.js";
import {PORT} from'./config.js'



const app = express();
app.use(express.json());

app.get("/ping", async (req, res) => {
  const [result] = await pool.query("SELECT 1 + 1 AS result");
  res.json(result);
});



app.use("/api", empleadosRoutes);

app.use((req, res) => {
  res.json({
    message: "Endpoint not found",
  });
});

app.listen(PORT);
console.log("Escuchando en el puerto 4000");
