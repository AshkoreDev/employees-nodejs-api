import { pool } from './../db/db.js';

export const getEmployees = async (req, res) => {
 
  try {

    const [rows] = await pool.query('SELECT * FROM employees');

    (rows.length <= 0)
      ? res.status(404).json({ message: 'EMPLOYEES NOT FOUND.' })
      : res.json({ 
          success: true,
          data: rows
        });

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
      : res.json({ 
          success: true,
          data: rows
        });

  } catch (error) {

    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};


export const createEmployee = async (req, res) => {

  const { dni, first_name, last_name, date_of_birth, gender, nationality, degree, telephone, email, address } = req.body;

  try {
    
    const [rows] = await pool.query('INSERT INTO employees (dni, first_name, last_name, date_of_birth, gender, nationality, degree, telephone, email, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [dni, first_name, last_name, date_of_birth, gender, nationality, degree, telephone, email, address]);

    res.json({ 
      success: true,
      data: { id: rows.insertId, dni, first_name, last_name, date_of_birth, gender, nationality, degree, telephone, email, address }
    });

 } catch (error) {
    
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
 }
};


export const updateEmployee = async (req, res) => {

  const { id } = req.params;
  const { dni, first_name, last_name, date_of_birth, gender, nationality, degree, telephone, email, address } = req.body;

  try {
    
    const [result] = await pool.query('UPDATE employees SET dni=IFNULL(?, dni), first_name=IFNULL(?, first_name), last_name=IFNULL(?, last_name), date_of_birth=IFNULL(?, date_of_birth), gender=IFNULL(?, gender), nationality=IFNULL(?, nationality), degree=IFNULL(?, degree), telephone=IFNULL(?, telephone), email=IFNULL(?, email), address=IFNULL(?, address) WHERE id=?', [dni, first_name, last_name, date_of_birth, gender, nationality, degree, telephone, email, address, id]);

    const [rows] = await pool.query('SELECT * FROM employees WHERE id=?', [id]);

    (result.affectedRows <= 0)
      ? res.status(404).json({ message: 'EMPLOYEE NOT FOUND.' })
      : res.json({ 
        success: true,
        data: rows[0]
      });

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
      : res.json({ success: true });

  } catch (error) {
    
    return res.status(500).json({ message: 'SOMETHING GOES WRONG.' });
  }
};