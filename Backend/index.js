import express from 'express';
import { Pool } from 'pg';
import 'dotenv/config'; 

const app = express();
const port = process.env.PORT || 3005; 

app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(1); 
});

(async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connected successfully:', res.rows[0].now);
    } catch (err) {
        console.error('Database connection failed:', err);
    }
})();

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});





// ----------------------------------------------------
// 1. CREATE (POST) - Create a new announcement
// ----------------------------------------------------
app.post('/announcements', async (req, res) => {
    try {
        const { title, categories, content } = req.body;
        
        // Note: publication_date defaults to CURRENT_DATE in the DB
        // last_update will be null initially

        const query = `
            INSERT INTO announcements (title, categories, content)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [title, categories, content];

        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating announcement' });
    }
});

// ----------------------------------------------------
// 2. READ (GET) - Get all announcements
// ----------------------------------------------------
app.get('/announcements', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM announcements ORDER BY publication_date DESC;');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching announcements' });
    }
});

// ----------------------------------------------------
// 3. READ (GET) - Get a single announcement by ID
// ----------------------------------------------------
app.get('/announcements/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM announcements WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Announcement not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching announcement' });
    }
});

// ----------------------------------------------------
// 4. UPDATE (PUT/PATCH) - Update an announcement
// ----------------------------------------------------
app.put('/announcements/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, categories, content } = req.body;
        
        // Include setting the last_update timestamp
        const query = `
            UPDATE announcements
            SET 
                title = COALESCE($1, title),
                categories = COALESCE($2, categories),
                content = COALESCE($3, content),
                last_update = NOW()
            WHERE id = $4
            RETURNING *;
        `;
        // COALESCE ($x, col_name) ensures that if a field is null in the request, the original value is kept.
        const values = [title, categories, content, id]; 

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Announcement not found for update' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating announcement' });
    }
});

// ----------------------------------------------------
// 5. DELETE (DELETE) - Delete an announcement
// ----------------------------------------------------
app.delete('/announcements/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM announcements WHERE id = $1 RETURNING id', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Announcement not found for deletion' });
        }
        res.status(204).send(); // 204 No Content for successful deletion
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting announcement' });
    }
});