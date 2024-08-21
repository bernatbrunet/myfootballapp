const db = require("../config/database");

exports.getAllLeagues = async (req, res) => {
  try {
    const [rows] = await db.getPromisePool().execute("SELECT * FROM leagues");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error obtenint lligues" });
  }
};

exports.createLeague = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Falta el nom de la lliga" });
    }
    const [result] = await db.getPromisePool().execute("INSERT INTO leagues (name) VALUES (?)", [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (error) {
    res.status(500).json({ error: "Error creant lliga" });
  }
};

exports.getLeagueById = async (req, res) => {
  try {
    const [rows] = await db.getPromisePool().execute("SELECT * FROM leagues WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Lliga no trobada" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error obtenint lliga" });
  }
};

exports.updateLeague = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Falta el nom de la lliga" });
    }
    const [result] = await db.getPromisePool().execute("UPDATE leagues SET name = ? WHERE id = ?", [name, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Lliga no trobada" });
    }
    res.status(200).json({ id: req.params.id, name });
  } catch (error) {
    res.status(500).json({ error: "Error actualitzant lliga" });
  }
};

exports.deleteLeague = async (req, res) => {
  try {
    const [result] = await db.getPromisePool().execute("DELETE FROM leagues WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Lliga no trobada" });
    }
    res.status(204).json({ message: "Lliga eliminada correctament" });
  } catch (error) {
    res.status(500).json({ error: "Error eliminant lliga" });
  }
};