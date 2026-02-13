// Função para formatar em Real (R$)
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
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
    currency: "BRL",
  });
}

function converterMoedaParaNumero(valor) {
  if (!valor) return 0;

  return (
    Number(
      valor.replace("R$", "").replace(/\./g, "").replace(",", ".").trim(),
    ) || 0
  );
}
