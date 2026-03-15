function enviarPedido(){

const cliente = document.getElementById("cliente").value
const produto = document.getElementById("produto").value
const quantidade = document.getElementById("quantidade").value

fetch("/pedidos", {
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
cliente,
produto,
quantidade
})
})
.then(()=>{
carregarPedidos()
})

}

function carregarPedidos(){

fetch("/pedidos")
.then(res => res.json())
.then(dados => {

const lista = document.getElementById("lista")

lista.innerHTML=""

dados.forEach(p =>{

lista.innerHTML += `
<li>
Cliente: ${p.cliente} | Produto: ${p.produto} | Quantidade: ${p.quantidade}
</li>
`

})

})

}

carregarPedidos()


function enviarPedido(){

const cliente = document.getElementById("cliente").value
const produto = document.getElementById("produto").value
const quantidade = document.getElementById("quantidade").value

fetch("/pedido",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
cliente: cliente,
produto: produto,
quantidade: quantidade
})
})
.then(res => res.text())
.then(data => {

console.log(data)

carregarPedidos()

})

}
