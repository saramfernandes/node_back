const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
 user: 'postgres',   
 host: 'localhost',  
 database: 'node',   
 password: 'root',   
 port: 5432,         
});

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.get('/api/produtos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM produto');
        res.status(200).json(resultado.rows);
    } catch (err) {
        console.error('Erro ao listar produtos', err);
        res.status(500).json({ error: 'Erro ao listar produtos' });
    }
});

app.post('/api/produtos', async (req, res) => {
    const { nome, estoque, valor } = req.body;
    if (!nome || typeof estoque !== 'number' || typeof valor !== 'number') {
        return res.status(400).json({ error: 'Dados inválidos' });
    }

    try {
        const resultado = await pool.query(
            'INSERT INTO produto (nome, estoque, valor) VALUES ($1, $2, $3) RETURNING *', [nome, estoque, valor]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (err) {
        console.error('Erro ao inserir produto', err);
        res.status(500).json({ error: 'Erro ao inserir produto' });
 }
});


app.listen(port, () => {
 console.log(`Servidor rodando em http://localhost:${port}`);
});