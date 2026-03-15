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
quantidade INTEGER,
preco REAL
)
`)

app.post("/pedido",(req,res)=>{

const {cliente, produto, quantidade, preco} = req.body

db.run(
"INSERT INTO pedidos (cliente, produto, quantidade, preco) VALUES (?,?,?,?)",
[cliente, produto, quantidade, preco]
)

res.send("Pedido salvo")

})

app.get("/pedidos",(req,res)=>{

db.all("SELECT * FROM pedidos",(err,rows)=>{
res.json(rows)
})

})


app.delete("/excluir/:id", (req, res) => {

const id = req.params.id

db.run("DELETE FROM pedidos WHERE id = ?", [id], function(err){

if (err) {
console.log(err)
return res.status(500).json({erro: "Erro ao excluir"})
}

res.json({mensagem: "Pedido excluído", id: id})

})

})

app.post("/login",(req,res)=>{

let usuario = req.body.usuario
let senha = req.body.senha

if(usuario === "admin" && senha === "123"){

res.json({
mensagem:"Login realizado com sucesso"
})

}else{

res.json({
mensagem:"Usuário ou senha inválidos"
})

}

})

app.get("/login",(req,res)=>{
res.send("Use POST para fazer login")
})

app.listen(3000, () => {
console.log("Servidor rodando em http://localhost:3000")
})

app.use(express.static("public"))

