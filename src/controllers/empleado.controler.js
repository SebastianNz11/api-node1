import { pool } from "../db.js";

export const getEmpleado = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM empleado");
    res.send(rows);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const getEmpleadoId = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM empleado where id = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const createEmpleado = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO empleado (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const updateEmpleado = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const { id } = req.params;
    const [result] = await pool.query(
      "UPDATE empleado SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ mesaage: "Empleado no encontrado" });
    }

    const [rows] = await pool.query("SELECT * FROM empleado WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const deleteEmpleado = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM empleado WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
