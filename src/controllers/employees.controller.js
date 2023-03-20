import { pool } from './../db/db.js';

export const getEmployees = async (req, res) => {
 
  try {

    const [rows] = await pool.query('SELECT * FROM employees');

    (rows.length <= 0)
      ? res.status(404).json({ message: 'EMPLOYEES NOT FOUND.' })
      : res.json(rows);

  } catch (error) {

    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const getEmployee = async (req, res) => {

  const { id } = req.params;

  try {

    const [rows] = await pool.query('SELECT * FROM employees WHERE id=?', [id]);

    (rows.length <= 0)
      ? res.status(404).json({ message: 'EMPLOYEE NOT FOUND.' })
      : res.json(rows);

  } catch (error) {

    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const createEmployee = async (req, res) => {

  const { first_name, last_name, date_of_birth, gender, nationality, dni, telephone, email, address } = req.body;

  try {
    
    const [rows] = await pool.query('INSERT INTO employees (first_name, last_name, date_of_birth, gender, nationality, dni, telephone, email, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [first_name, last_name, date_of_birth, gender, nationality, dni, telephone, email, address]);

    res.json({ id: rows.insertId, first_name, last_name, date_of_birth, gender, nationality, dni, telephone, email, address });

 } catch (error) {
   
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
 }
};


export const updateEmployee = async (req, res) => {

  const { id } = req.params;
  const { first_name, last_name, date_of_birth, gender, nationality, dni, telephone, email, address } = req.body;

  try {
    
    const [result] = await pool.query('UPDATE employees SET first_name=IFNULL(?, first_name), last_name=IFNULL(?, last_name), date_of_birth=IFNULL(?, date_of_birth), gender=IFNULL(?, gender), nationality=IFNULL(?, nationality), dni=IFNULL(?, dni), telephone=IFNULL(?, telephone), email=IFNULL(?, email), address=IFNULL(?, address) WHERE id=?', [first_name, last_name, date_of_birth, gender, nationality, dni, telephone, email, address, id]);

    const [rows] = await pool.query('SELECT * FROM employees WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'EMPLOYEE NOT FOUND.' })
      : res.json(rows[0]);

  } catch (error) {
    
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const deleteEmployee = async (req, res) => {

  const { id } = req.params;

  try {

    const [result] = await pool.query('DELETE FROM employees WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'EMPLOYEE NOT FOUND.' })
      : res.sendStatus(204);

  } catch (error) {
    
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};