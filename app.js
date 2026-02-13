import {
  calcularGarantiaTotal,
  calcularDataFinalGarantia,
} from "./garantia.js";

const btnCalcular = document.getElementById("btnCalcular");
const valorComDesconto =
  // Evento de clique
  btnCalcular.addEventListener("click", calcular);

function getValorNumerico(id) {
  return converterMoedaParaNumero(document.getElementById(id).value);
}

function calcularParcela(valorProduto, valorServico, parcelas) {
  return (valorProduto + valorServico) / parcelas;
}

function calcular() {
  const valorProduto = getValorNumerico("valorProduto");

  const garantia12 = getValorNumerico("garantia12Valor");

  const garantia24 = getValorNumerico("garantia24Valor");

  const garantia36 = getValorNumerico("garantia36Valor");

  const parcelas = Number(document.getElementById("parcelas").value);

  const produtoInvalido = valorProduto <= 0;
  const parcelasInvalidas = parcelas <= 0;

  if (produtoInvalido || parcelasInvalidas) {
    alert("Preencha o valor do produto e as parcelas corretamente.");
    return;
  }

  const descontoInput = converterMoedaParaNumero(
    document.getElementById("desconto").value,
  );

  const tipoDesconto = document.getElementById("tipoDesconto").value;

  let valorComDesconto = valorProduto;

  if (descontoInput > 0) {
    if (tipoDesconto === "percentual") {
      valorComDesconto = valorProduto - (valorProduto * descontoInput) / 100;
    } else {
      valorComDesconto = valorProduto - descontoInput;
    }
  }

  const parcelaSemGarantia = valorProduto / parcelas;

  const parcela12 = calcularParcela(valorComDesconto, garantia12, parcelas);

  const parcela24 = calcularParcela(valorComDesconto, garantia24, parcelas);

  const parcela36 = calcularParcela(valorComDesconto, garantia36, parcelas);

  document.getElementById("semGarantia").innerText =
    `${parcelas}x de ${formatarMoeda(parcelaSemGarantia)}`;

  // 12 meses
  const anos12 = calcularGarantiaTotal(12);
  const dataFinal12 = calcularDataFinalGarantia(12);

  document.getElementById("garantia12").innerHTML = `
  <div class="card-garantia">
    <div class="titulo-garantia">Garantia 12 meses</div>
    <div class="linha-parcela">
  <div class="parcelamento">
    <span class="parcelas-texto">${parcelas}x</span>
    <span class="valor-parcela">${formatarMoeda(parcela12)}</span>
  </div>

  <span class="anos-destaque">${anos12} anos</span>
</div>

    <div class="data-garantia">
      Garantia válida até: <strong>${dataFinal12}</strong>
    </div>
  </div>
`;

  // 24 meses
  const anos24 = calcularGarantiaTotal(24);
  const dataFinal24 = calcularDataFinalGarantia(24);

  document.getElementById("garantia24").innerHTML = `
  <div class="card-garantia">
    <div class="titulo-garantia">Garantia 24 meses</div>
   <div class="linha-parcela">
  <div class="parcelamento">
    <span class="parcelas-texto">${parcelas}x</span>
    <span class="valor-parcela">${formatarMoeda(parcela24)}</span>
  </div>

  <span class="anos-destaque">${anos24} anos</span>
</div>

    <div class="data-garantia">
      Garantia válida até: <strong>${dataFinal24}</strong>
    </div>
  </div>
`;

  // 36 meses
  const anos36 = calcularGarantiaTotal(36);
  const dataFinal36 = calcularDataFinalGarantia(36);

  document.getElementById("garantia36").innerHTML = `
  <div class="card-garantia">
    <div class="titulo-garantia">Garantia 36 meses</div>
    <div class="linha-parcela">
  <div class="parcelamento">
    <span class="parcelas-texto">${parcelas}x</span>
    <span class="valor-parcela">${formatarMoeda(parcela36)}</span>
  </div>
  
  <span class="anos-destaque">${anos36} anos</span>
</div>
    <div class="data-garantia">
      Garantia válida até: <strong>${dataFinal36}</strong>
    </div>
  </div>
`;

}


// selecionando o card
function ativarSelecaoCards() {
  const resultado = document.getElementById("resultado");

  resultado.addEventListener("click", function (e) {
    const card = e.target.closest(".card-garantia");

    if (!card) return;

    // Remove seleção de todos
    document.querySelectorAll(".card-garantia")
      .forEach(c => c.classList.remove("selecionado"));

    // Adiciona no clicado
    card.classList.add("selecionado");
  });
}

ativarSelecaoCards()

