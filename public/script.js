
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


function enviarPedido(){

const cliente = document.getElementById("cliente").value
const produto = document.getElementById("produto").value
const quantidade = document.getElementById("quantidade").value
const preco = document.getElementById("preco").value

fetch("/pedido",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
cliente,
produto,
quantidade,
preco
})
})
.then(()=>{

carregarPedidos()

})

}

function carregarPedidos(){

let totalPedidos = 0
let totalProdutos = 0
let totalVendido = 0

fetch("/pedidos")
.then(res => res.json())
.then(dados => {

const lista = document.getElementById("lista")

lista.innerHTML = ""



dados.forEach(p => {

totalPedidos++

totalProdutos += Number(p.quantidade)

const total = Number(p.quantidade) * Number(p.preco)

totalVendido += total

document.getElementById("totalPedidos").innerText = totalPedidos
document.getElementById("totalProdutos").innerText = totalProdutos
document.getElementById("totalVendido").innerText = totalVendido

lista.innerHTML += `
<tr>
<td>${p.cliente}</td>
<td>${p.produto}</td>
<td>${p.quantidade}</td>
<td>R$ ${Number(p.preco).toFixed(2)}</td>
<td>R$ ${total.toFixed(2)}</td>
<td>
<button onclick="excluirPedido(${p.id})">Excluir</button>
</td>
</tr>
`

})

})

}

function excluirPedido(id){

fetch("/excluir/" + id, {
method: "DELETE"
})
.then(res => res.json())
.then(() => {
carregarPedidos()
})

}


carregarPedidos()

setInterval(carregarPedidos, 500)






