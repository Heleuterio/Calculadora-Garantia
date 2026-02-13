const descontoInput = document.getElementById("desconto");
const tipoDesconto = document.getElementById("tipoDesconto");

function atualizarComportamentoDesconto() {
  descontoInput.value = ""; // limpa ao trocar tipo

  if (tipoDesconto.value === "real") {
    descontoInput.placeholder = "0,00";
    descontoInput.oninput = function () {
      formatarCampoMoeda(this);
    };
  } else {
    descontoInput.placeholder = "0";
    descontoInput.oninput = function () {
    this.value = this.value
        .replace(/[^0-9,]/g, "")       // remove tudo que não for número ou vírgula
        .replace(/(,.*?),/g, "$1");    // permite apenas uma vírgula
;
    };
  }
}

tipoDesconto.addEventListener("change", atualizarComportamentoDesconto);

// chama uma vez ao carregar
atualizarComportamentoDesconto();
