const btnCalcular = document.getElementById("btnCalcular");

// Evento de clique
btnCalcular.addEventListener("click", calcular);

function getValorNumerico(id) {
    return converterMoedaParaNumero(
    document.getElementById(id).value
  );
}

function calcularParcela(valorProduto, valorServico, parcelas) {
  return (valorProduto + valorServico) / parcelas;
}


function calcular() {
  const valorProduto = getValorNumerico("valorProduto");

  const garantia12 = getValorNumerico("garantia12Valor");

  const garantia24 = getValorNumerico("garantia24Valor");

  const garantia36 = getValorNumerico("garantia36Valor");

  const parcelas = Number(
    document.getElementById("parcelas").value
    );

    const produtoInvalido = valorProduto <= 0;
    const parcelasInvalidas = parcelas <= 0;

  if ( produtoInvalido  || parcelasInvalidas ) {
    alert("Preencha o valor do produto e as parcelas corretamente.");
    return;
  }

  const parcelaSemGarantia = valorProduto / parcelas;
  const parcela12 = calcularParcela(valorProduto, garantia12, parcelas)
  const parcela24 = calcularParcela(valorProduto, garantia24, parcelas)
  const parcela36 = calcularParcela(valorProduto, garantia36, parcelas)

  document.getElementById("semGarantia").innerText =
    `${parcelas}x de ${formatarMoeda(parcelaSemGarantia)}`;

  document.getElementById("garantia12").innerText =
    `${parcelas}x de ${formatarMoeda(parcela12)}`;

  document.getElementById("garantia24").innerText =
    `${parcelas}x de ${formatarMoeda(parcela24)}`;

  document.getElementById("garantia36").innerText =
    `${parcelas}x de ${formatarMoeda(parcela36)}`;
}


// Função para formatar em Real (R$)
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatarCampoMoeda(input) {
  // Remove tudo que não for número
  let valor = input.value.replace(/\D/g, "");

  // Converte para centavos
  valor = (Number(valor) / 100).toFixed(2);

  // Formata para Real
  input.value = Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
function converterMoedaParaNumero(valor) {
  if (!valor) return 0;

  return Number(
    valor
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  ) || 0;
}
