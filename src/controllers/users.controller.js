import { pool } from './../db/db.js';

export const getUsers = async (req, res) => {
 
  try {

    const [rows] = await pool.query('SELECT * FROM users');
    
    (rows.length <= 0)
      ? res.status(404).json({ message: 'USERS NOT FOUND.' })
      : res.json({ 
          success: true,
          data: rows
        });

  } catch (error) {

    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const getUser = async (req, res) => {

  const { id } = req.params;

  try {

    const [rows] = await pool.query('SELECT * FROM users WHERE id=?', [id]);

    (rows.length <= 0)
      ? res.status(404).json({ message: 'USER NOT FOUND.' })
      : res.json({ 
          success: true,
          data: rows
        });

  } catch (error) {

    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const createUser = async (req, res) => {

  const { username, password, position } = req.body;

  try {
    
    const [rows] = await pool.query('INSERT INTO users (username, password, position) VALUES (?, ?, ?)', [username, password, position]);

    res.json({
      success: true,
      data: { id: rows.insertId, username, password, position }
    });

 } catch (error) {
   
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
 }
};


export const updateUser = async (req, res) => {

  const { id } = req.params;
  const { username, password, position } = req.body;

  try {
    
    const [result] = await pool.query('UPDATE users SET username=IFNULL(?, username), password=IFNULL(?, password), position=IFNULL(?, position) WHERE id=?', [username, password, position, id]);

    const [rows] = await pool.query('SELECT * FROM users WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'USER NOT FOUND.' })
      : res.json({
          success: true,
          data: rows[0]
        });

  } catch (error) {
    
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const deleteUser = async (req, res) => {

  const { id } = req.params;

  try {

    const [result] = await pool.query('DELETE FROM users WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'USER NOT FOUND.' })
      : res.json({ success: true });

  } catch (error) {
    
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};