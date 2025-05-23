const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

app.get('/api/data', (req, res) => {
 res.json({ message: "Olá do backend!" });
});

app.post('/api/calc/:oper', async (req, res) => {
 const {n1, n2} = req.body;
 const {oper} = req.params;
 let resultado = 0;
 if(oper == 1){resultado = n1 + n2;}
 if(oper == 2){resultado = n1 - n2;}
 if(oper == 3){resultado = n1 * n2;}
 if(oper == 4){resultado = n1 / n2;}
 res.status(201).json(resultado);
});
 
app.get('/api/calc', async (req, res) => {
 const {oper, n1, n2} = req.query;
 let resultado = 0;
 if(oper == 1){resultado = Number(n1) + Number(n2);}
 if(oper == 2){resultado = Number(n1) - Number(n2);}
 if(oper == 3){resultado = Number(n1) * Number(n2);}
 if(oper == 4){resultado = Number(n1) / Number(n2);}
 res.status(201).json(resultado);
});

app.listen(port, () => {
 console.log(`Servidor rodando em http://localhost:${port}`);
});