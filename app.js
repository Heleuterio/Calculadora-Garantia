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

function resetarInterface() {
  // Esconde todas as diferenças
  document
    .querySelectorAll(".diferenca-box")
    .forEach((box) => box.classList.add("hidden"));

  // Remove seleção dos cards
  document
    .querySelectorAll(".card-garantia")
    .forEach((card) => card.classList.remove("selecionado"));
}

const parcelasGarantia = {
  SemGarantia: 0,
  parcela12: 0,
  parcela24: 0,
  parcela36: 0,
};

function calcular() {
  resetarInterface()

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
  parcelasGarantia.SemGarantia = parcelaSemGarantia;

  parcelasGarantia.parcela12 = calcularParcela(
    valorComDesconto,
    garantia12,
    parcelas,
  );

  parcelasGarantia.parcela24 = calcularParcela(
    valorComDesconto,
    garantia24,
    parcelas,
  );

  parcelasGarantia.parcela36 = calcularParcela(
    valorComDesconto,
    garantia36,
    parcelas,
  );

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
      <span class="valor-parcela">${formatarMoeda(parcelasGarantia.parcela12)}</span>
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
    <span class="valor-parcela">${formatarMoeda(parcelasGarantia.parcela24)}</span>
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
    <span class="valor-parcela">${formatarMoeda(parcelasGarantia.parcela36)}</span>
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

    const jaSelecionado = card.classList.contains("selecionado");
    const titulo = card.querySelector(".titulo-garantia").innerText;

    // Remove seleção de todos
    document
      .querySelectorAll(".card-garantia")
      .forEach((c) => c.classList.remove("selecionado"));

    
    // Esconde todas
    document
      .querySelectorAll(".diferenca-box")
      .forEach((box) => box.classList.add("hidden"));

      if (jaSelecionado) return;
      card.classList.add("selecionado");


    let diferenca = 0;

    if (titulo.includes("12")) {
      diferenca = parcelasGarantia.parcela12 - parcelasGarantia.SemGarantia;

      const box = document.getElementById("diferenca12");
      box.querySelector("span").innerHTML =
        `<i class="fa-solid fa-circle-plus icone-diferenca"></i>
        ${formatarMoeda(diferenca)}`;
      box.classList.remove("hidden");
    }

    if (titulo.includes("24")) {
      diferenca = parcelasGarantia.parcela24 - parcelasGarantia.parcela12;

      const box = document.getElementById("diferenca24");
      box.querySelector("span").innerHTML =
        `<i class="fa-solid fa-circle-plus icone-diferenca"></i>
        ${formatarMoeda(diferenca)}`;
      box.classList.remove("hidden");
    }

    if (titulo.includes("36")) {
      diferenca = parcelasGarantia.parcela36 - parcelasGarantia.parcela24;

      const box = document.getElementById("diferenca36");
      box.querySelector("span").innerHTML =
      `<i class="fa-solid fa-circle-plus icone-diferenca"></i>
        ${formatarMoeda(diferenca)}`;
      box.classList.remove("hidden");
    }
  });
}

ativarSelecaoCards();
