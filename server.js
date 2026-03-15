const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

const db = new sqlite3.Database("database.db")

db.run(`
CREATE TABLE IF NOT EXISTS pedidos (
id INTEGER PRIMARY KEY AUTOINCREMENT,
cliente TEXT,
produto TEXT,
quantidade INTEGER
)
`)

app.post("/pedido", (req,res)=>{

const {cliente, produto, quantidade} = req.body

db.run(
"INSERT INTO pedidos (cliente, produto, quantidade) VALUES (?,?,?)",
[cliente, produto, quantidade]
)

res.send("Pedido salvo")

})

app.get("/pedidos",(req,res)=>{

db.all("SELECT * FROM pedidos",(err,rows)=>{
res.json(rows)
})

})

app.listen(3000,()=>{
console.log("Servidor rodando na porta 3000")
})