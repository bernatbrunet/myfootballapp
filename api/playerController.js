const db = require("../config/database");

exports.getAllPlayers = async (req, res) => {
  try {
    const [rows] = await db.getPromisePool().execute("SELECT * FROM players");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error obtenint jugadors" });
  }
};

exports.createPlayer = async (req, res) => {
  try {
    console.log("Request body:", req.body);  // Verifica los datos recibidos
    const { name, teamId } = req.body;
    if (!name || !teamId) {
      console.log("Validation failed:", { name, teamId });
      return res.status(400).json({ error: "Falten camps requerits" });
    }
    const [result] = await db.getPromisePool().execute("INSERT INTO players (name, teamId) VALUES (?, ?)", [name, teamId]);
    console.log("Insert result:", result);
    res.status(201).json({ id: result.insertId, name, teamId });
  } catch (error) {
    console.error("Error creant jugador:", error);
    res.status(500).json({ error: "Error creant jugador" });
  }
};
exports.getPlayerById = async (req, res) => {
  try {
    console.log(`Fetching player with ID: ${req.params.id}`);  // Agrega este log
    const [rows] = await db.getPromisePool().execute("SELECT * FROM players WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      console.log(`Player with ID: ${req.params.id} not found`);  // Agrega este log
      return res.status(404).json({ error: "Jugador no trobat" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(`Error obtenint jugador: ${error}`);  // Agrega este log
    res.status(500).json({ error: "Error obtenint jugador" });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const { name, teamId } = req.body;
    console.log(`Updating player with ID: ${req.params.id}`);  // Agrega este log
    if (!name || !teamId) {
      return res.status(400).json({ error: "Falten camps requerits" });
    }
    const [result] = await db.getPromisePool().execute("UPDATE players SET name = ?, teamId = ? WHERE id = ?", [name, teamId, req.params.id]);
    if (result.affectedRows === 0) {
      console.log(`Player with ID: ${req.params.id} not found for update`);  // Agrega este log
      return res.status(404).json({ error: "Jugador no trobat" });
    }
    res.status(200).json({ id: req.params.id, name, teamId });
  } catch (error) {
    console.error(`Error actualitzant jugador: ${error}`);  // Agrega este log
    res.status(500).json({ error: "Error actualitzant jugador" });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    console.log(`Deleting player with ID: ${req.params.id}`);  // Agrega este log
    const [result] = await db.getPromisePool().execute("DELETE FROM players WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      console.log(`Player with ID: ${req.params.id} not found for deletion`);  // Agrega este log
      return res.status(404).json({ error: "Jugador no trobat" });
    }
    res.status(204).json({ message: "Jugador eliminat correctament" });
  } catch (error) {
    console.error(`Error eliminant jugador: ${error}`);  // Agrega este log
    res.status(500).json({ error: "Error eliminant jugador" });
  }
};