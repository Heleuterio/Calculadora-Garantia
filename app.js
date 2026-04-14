let modoSeguroAtivo = false;

export function isModoSeguro() {
  return modoSeguroAtivo;
}

import "./features-beneficios.js"

import {
  calcularGarantiaTotal,
  calcularDataFinalGarantia,
} from "./garantia.js";

const btnCalcular = document.getElementById("btnCalcular");
const btnModoSeguro = document.getElementById("btnModoSeguro");

const icones = {
  voltar: "fa-arrow-left",
  cadeado: "fa-lock",
  beneficios: "fa-lightbulb",
  seguro: "fa-shield-halved",

  quebra: "fa-mobile-screen",
  quebraAlerta: "fa-triangle-exclamation",

  roubo: "fa-user-secret",
  rouboAlt: "fa-mask"
};

btnModoSeguro.addEventListener("click", () => {
  modoSeguroAtivo = !modoSeguroAtivo;
  
  gtag('event', 'troca_modo', {
    modo: modoSeguroAtivo ? 'fique_seguro' : 'garantia'
  });

  limparCampos()
  atualizarModoSeguro();
});

  // Evento de clique
  btnCalcular.addEventListener("click", () => {
  gtag('event', 'clicou_calcular');
  calcular();
});

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

function atualizarModoSeguro() {
  const texto = document.getElementById("textoSemGarantia");

  const tituloGarantia = document.getElementById("titulogarantia");
  const label12 = document.getElementById("label12");
  const label24 = document.getElementById("label24");
  const label36 = document.getElementById("label36");

  if (modoSeguroAtivo) {
    texto.innerText = "Sem proteção";
    btnModoSeguro.innerHTML = `<i class="fa-solid fa-arrow-left"></i>  Garantia`;

    tituloGarantia.innerText = "Fique Seguro";
    label12.innerText = "Quebra de tela";
    label24.innerText = "Roubo e Furto";
    label36.innerText = "Roubo / Furto e Quebra";
  } else {
    texto.innerText = "Sem garantia";
    btnModoSeguro.innerHTML = `<i class="fa-solid fa-lock"></i> Fique Seguro`;

    tituloGarantia.innerText = "Garantia Estendida";
    label12.innerText = "Garantia 12 meses";
    label24.innerText = "Garantia 24 meses";
    label36.innerText = "Garantia 36 meses";
  }
}

const parcelasGarantia = {
  SemGarantia: 0,
  parcela12: 0,
  parcela24: 0,
  parcela36: 0,
};

function calcular() {
  let nome12 = "Garantia 12 meses";
  let nome24 = "Garantia 24 meses";
  let nome36 = "Garantia 36 meses";

  if (modoSeguroAtivo) {
    nome12 = "Quebra de tela";
    nome24 = "Roubo e Furto";
    nome36 = "Roubo / Furto e Quebra";
  }
  let mostrarAnos = true;

  let textoRodape12 = "";
  let textoRodape24 = "";
  let textoRodape36 = "";

  let icone12 = "";
  let icone24 = "";
  let icone36 = "";

  if (modoSeguroAtivo) {
    mostrarAnos = false;

    textoRodape12 = "Proteção imediata • Sem carência";
    textoRodape24 = "Proteção imediata • Sem carência";
    textoRodape36 = "Proteção imediata • Sem carência";

    icone12 = `
  <i class="fa-solid ${icones.quebra}"></i>
  <i class="fa-solid ${icones.quebraAlerta}"></i>
    `;

    icone24 = `
  <i class="fa-solid ${icones.roubo}"></i>
    `;

    icone36 =  `
  <i class="fa-solid ${icones.roubo}"></i>
  <i class="fa-solid ${icones.quebra}"></i>
    `;
  }

  resetarInterface();

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
    <div class="titulo-garantia">${nome12} <span style="display:none">12</span> </div>
    <div class="linha-parcela">
  
    <div class="parcelamento">
      <span class="parcelas-texto">${parcelas}x</span>
      <span class="valor-parcela">${formatarMoeda(parcelasGarantia.parcela12)}</span>
    </div>

 ${mostrarAnos 
  ? `<span class="anos-destaque">${anos12} anos</span>` 
  : `<span class="icone-seguro">${icone12}</span>`}
    </div>

    <div class="data-garantia">
  ${modoSeguroAtivo 
    ? textoRodape12 
    : `Garantia válida até: <strong>${dataFinal12}</strong>`}
    </div>

  </div>
`;

  // 24 meses
  const anos24 = calcularGarantiaTotal(24);
  const dataFinal24 = calcularDataFinalGarantia(24);

  document.getElementById("garantia24").innerHTML = `
  <div class="card-garantia">
    <div class="titulo-garantia">${nome24} <span style="display:none">24</span> </div>
   <div class="linha-parcela">
  <div class="parcelamento">
    <span class="parcelas-texto">${parcelas}x</span>
    <span class="valor-parcela">${formatarMoeda(parcelasGarantia.parcela24)}</span>
  </div>

  ${mostrarAnos 
  ? `<span class="anos-destaque">${anos24} anos</span>` 
  : `<span class="icone-seguro">${icone24}</span>`}

    
</div>

    <div class="data-garantia">
  ${modoSeguroAtivo 
    ? textoRodape12 
    : `Garantia válida até: <strong>${dataFinal24}</strong>`}
    </div>
  </div>
`;

  // 36 meses
  const anos36 = calcularGarantiaTotal(36);
  const dataFinal36 = calcularDataFinalGarantia(36);

  document.getElementById("garantia36").innerHTML = `
  <div class="card-garantia">
    <div class="titulo-garantia">${nome36} <span style="display:none">36</span> </div>
    <div class="linha-parcela">
  <div class="parcelamento">
    <span class="parcelas-texto">${parcelas}x</span>
    <span class="valor-parcela">${formatarMoeda(parcelasGarantia.parcela36)}</span>
  </div>
  
  ${mostrarAnos 
  ? `<span class="anos-destaque">${anos36} anos</span>` 
  : `<span class="icone-seguro">${icone36}</span>`}
    </div>

    <div class="data-garantia">
  ${modoSeguroAtivo 
    ? textoRodape12 
    : `Garantia válida até: <strong>${dataFinal36}</strong>`}
    </div>
  </div>
`;
    setTimeout(() => {
  document.getElementById("resultado").scrollIntoView({
    behavior: "smooth",
  });
}, 100);
}

// selecionando o card
function ativarSelecaoCards() {
  const resultado = document.getElementById("resultado");

  resultado.addEventListener("click", function (e) {
    const card = e.target.closest(".card-garantia");

    if (!card) return;

    const jaSelecionado = card.classList.contains("selecionado");
    const titulo = card.querySelector(".titulo-garantia").textContent;

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

function limparCampos() {
  document.getElementById("valorProduto").value = "";
  document.getElementById("garantia12Valor").value = "";
  document.getElementById("garantia24Valor").value = "";
  document.getElementById("garantia36Valor").value = "";
  document.getElementById("desconto").value = "";
  // Limpa também resultado visual
  document.getElementById("semGarantia").innerText = "-";

  document.getElementById("garantia12").innerHTML = "";
  document.getElementById("garantia24").innerHTML = "";
  document.getElementById("garantia36").innerHTML = "";

  resetarInterface(); // 
}
