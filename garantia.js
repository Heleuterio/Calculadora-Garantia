// garantia.js

export function calcularGarantiaTotal(mesesAdicionais) {
  const garantiaBase = 12; // 1 ano já incluso no produto
  return (garantiaBase + mesesAdicionais) / 12;
}

export function calcularDataFinalGarantia(mesesAdicionais) {
  const hoje = new Date();

  const garantiaBase = 12;
  const totalMeses = garantiaBase + mesesAdicionais;

  const dataFinal = new Date(
    hoje.getFullYear(),
    hoje.getMonth() + totalMeses,
    hoje.getDate()
  );

  return dataFinal.toLocaleDateString("pt-BR");
}
