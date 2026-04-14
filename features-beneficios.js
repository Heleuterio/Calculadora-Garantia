    import { isModoSeguro} from "./app.js";
    
    const icones = {
      celular: "fa-mobile-screen",
      linhaBranca: "fa-house",
      tv: "fa-tv",
      portateis: "fa-blender",
        voltar: "fa-arrow-left",
        avancar:"fa-arrow-right"

    };

    const beneficiosGarantia = {
    televisores: [
    {
        titulo: "Imagem sumiu ou ficou com manchas?",
        descricao: "Problemas como linhas, pixels queimados ou tela escura estão cobertos",
        imagem: "assets/tv.jpeg"
    },
    {
        titulo: "Sai som, mas não aparece imagem?",
        descricao: "Falhas internas que impedem o uso normal entram na garantia",
        imagem:"assets/tv-certo.jpg"
    },
    {
        titulo: "Queimou por queda de energia?",
        descricao: "Curto circuito, raios e oscilações podem ser cobertos",
        imagem: "assets/tv-fora-do-ar-768x402.webp"
    },
    {
        titulo: "Atendimento na sua casa",
        descricao: "Para TVs grandes, o técnico vai até você — sem precisar transportar",
        imagem:"assets/depositphotos_2.jpg"
    },
    {
        titulo: "Sem conserto? Sem prejuízo",
        descricao: "Você pode receber outra TV ou o valor de volta",
        imagem:"assets/tv-nova.jpg"
    }
    ],

    telefonia: [
        {
        titulo: "Bateria não dura como antes?",
        descricao: "Problemas de desgaste ou falha entram na garantia",
        imagem:"assets/telefonia-garantia-bateria.jpg"
        },
        {
        titulo: "Curto circuito",
        descricao: "Problemas elétricos internos podem acontecer e estão cobertos",
        imagem:"assets/telefonia-garantia-curto.jpg"
        },
        {
        titulo: "Parou de funcionar de repente?",
        descricao: "Falhas internas podem acontecer mesmo sem queda ou mau uso",
        imagem:"assets/telefonia-garantia-erro.jpg"
        },
        {
        titulo: "Travando ou lento?",
        descricao: "Defeitos de funcionamento podem surgir com o tempo",
        imagem:"assets/telefonia-garantia-lento.jpg"
        },
        {
        titulo: "Assistência sem complicação",
        descricao: "Suporte para resolver sem você ficar no prejuízo",
        imagem:"assets/telefonia-garantia-assistencia.jpg"
        }
    ],

    linhaBranca :[{
        titulo: "Parou de funcionar de repente?",
        descricao: "Falhas elétricas e mecânicas estão cobertas com a garantia",
        imagem: "assets/mulher-linha.png"
    },
    {
        titulo: "Vazamento ou mau funcionamento?",
        descricao: "Problemas internos e defeitos inesperados entram na cobertura",
        imagem:"assets/maquina-vazando.png"
    },
    {
        titulo: "Queimou por queda de energia?",
        descricao: "Curto circuito, raios e oscilações podem ser cobertos",
        imagem: "assets/energia-linha-branca.png"
    },
    {
        titulo: "Assistência sem complicação",
        descricao: "Encaminhamos para conserto com suporte especializado",
        imagem:"assets/suporte-linha-branca.png"
    },
    {
        titulo: "Sem precisar se preocupar com transporte",
        descricao: "Em muitos casos, o suporte orienta todo o processo pra você",
        imagem:"assets/transporte-linha-branca.png"
    }],
    portateis: [{
        titulo: "Produto até R$700? Troca garantida!",
        descricao: "Você recebe outro produto novo sem precisar aguardar conserto",
        imagem: "assets/garantia-trocaGarantida.png"
    },
    {
        titulo: "Erro de funcionamento?",
        descricao: "Falhas internas que impedem o uso normal entram na garantia",
        imagem:"assets/garantia-erro-poratatil.jpg"
    },
    {
        titulo: "Curto circuito?",
        descricao: "Se o produto apresentar curto circuito ou queimar, a garantia pode ser acionada",
        imagem: "assets/garantia-portateis-curto.png"
    },
    ]
    };

    const beneficiosSeguro = {
        telefonia:[
            {
                titulo: "Tela protegida", 
                descricao: "Você pode contar com até 2 trocas de tela durante a vigência do seguro",
                imagem:"assets/fique-quebra.jpg"
            },  
            {
                titulo: "Proteção contra roubo e furto",
                descricao: "Em caso de roubo ou furto, você pode acionar o seguro",
                imagem:"assets/fique-Roubo.jpg"
            },
            {
                titulo: "Molhou o aparelho?",
                descricao: "Você tem cobertura para danos causados por líquidos",
                imagem:"assets/fique-liquido.jpg"
            },
            {
                titulo: "Fique tranquilo e Protegido",
                descricao: "Mais segurança para usar seu aparelho sem preocupações",
                imagem:"assets/fique-seguranca.jpg"
            },
        ]
    }

    const btnBeneficios = document.getElementById("btnBeneficios");
    const modal = document.getElementById("modalBeneficios");

    btnBeneficios.addEventListener("click", () => {
    
    gtag('event', 'abriu_beneficios');

    fecharModal();
    modal.classList.remove("hidden");

    if (isModoSeguro()) {
        mostrarSlides("telefonia");
    } else {
        mostrarSetores();
    }
    });

    function mostrarSetores() {
    const lista = document.getElementById("listaSetores");

    lista.innerHTML = `
        <button data-setor="telefonia">
        <i class="fa-solid ${icones.celular}"></i> Telefonia
        </button>

        <button data-setor="linhaBranca">
        <i class="fa-solid ${icones.linhaBranca}"></i> Linha Branca
        </button>

        <button data-setor="televisores">
        <i class="fa-solid ${icones.tv}"></i> TVs
        </button>

        <button data-setor="portateis">
        <i class="fa-solid ${icones.portateis}"></i> Portáteis
        </button>
    `;

    lista.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
        
        gtag("event", "selecionou_setor", {
            setor: btn.dataset.setor,
            tela:"beneficios"
        });
        
            mostrarSlides(btn.dataset.setor);
        });
    });
    }

    function mostrarSlides(setor) {
    const slider = document.getElementById("sliderBeneficios");
    const lista = document.getElementById("listaSetores");

    lista.innerHTML = "";
    slider.classList.remove("hidden");

    let index = 0;
    let startX = 0;
    let endX = 0;

    function renderSlide(direction = "right") {
        const dados = isModoSeguro() ? beneficiosSeguro : beneficiosGarantia;
        const item = dados[setor][index];

        const slide = document.createElement("div");
        slide.classList.add("slide");

        slide.classList.add(
        direction === "right" ? "slide-enter-right" : "slide-enter-left",
        );

        slide.innerHTML = `
        <div class="slide-topo">
        
        <button id="btnVoltar" class="btn-voltar">
        <i class="fa-solid ${icones.voltar}"></i> 
        </button>
        
        </div>

        <div class="slide-conteudo">
        <h3>${item.titulo}</h3>
        <img src="${item.imagem}" class="slide-img" id="slideImagem" alt="${item.titulo}">
        <p>${item.descricao}</p>
        <div class="indicadores" id="indicadores"></div>
        </div>

        <div class="acoes-slide">
        
        <button id="btnAnterior" class="btn-nav">
        <i class="fa-solid ${icones.voltar}"></i>
        </button>

        <button id="fecharModalInterno" class="btn-fechar-centro">Fechar</button>
        
        <button id="btnProximo" class="btn-nav">
         <i class="fa-solid ${icones.avancar}"></i></button>
        </div>
    `;

        slider.innerHTML = "";
        slider.appendChild(slide);

        slide.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        });

        slide.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
        });

        slide.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        });

        slide.addEventListener("mouseup", (e) => {
        endX = e.clientX;
        handleSwipe();
        });

        const indicadores = document.getElementById("indicadores");

        indicadores.innerHTML = dados[setor]
        .map(
            (_, i) => `<div class="indicador ${i === index ? "ativo" : ""}"></div>`,
        )
        .join("");

        setTimeout(() => {
        slide.classList.add("slide-active");
        }, 10);

        document.getElementById("btnProximo").onclick = () => {
        index = (index + 1) % dados[setor].length;
        renderSlide("right");
        };

        document.getElementById("btnAnterior").onclick = () => {
        index = (index - 1 + dados[setor].length) % dados[setor].length;
        renderSlide("left");
        };

        document.getElementById("btnVoltar").onclick = () => {
        slider.classList.add("hidden");
        mostrarSetores();
        };

        document.getElementById("fecharModalInterno").onclick = () => {
        fecharModal();
        };

        const slideImagem = document.getElementById("slideImagem");

        if (slideImagem) {
        slideImagem.onclick = () => {
            const modalImagem = document.getElementById("modalImagem");
            const imagemAmpliada = document.getElementById("imagemAmpliada");

            imagemAmpliada.src = item.imagem;
            imagemAmpliada.alt = item.titulo;
            modalImagem.classList.remove("hidden");
        };
        }

        function handleSwipe() {
        const diff = startX - endX;

        if (Math.abs(diff) < 50) return;

        if (diff > 0) {
            index = (index + 1) % dados[setor].length;
            renderSlide("right");
        } else {
            index = (index - 1 + dados[setor].length) % dados[setor].length;
            renderSlide("left");
        }
        }
    }
    renderSlide();
    }


    const modalImagem = document.getElementById("modalImagem");
    const fecharImagem = document.getElementById("fecharImagem");

    fecharImagem.addEventListener("click", () => {
    modalImagem.classList.add("hidden");
    });

    modalImagem.addEventListener("click", (e) => {
    if (e.target === modalImagem) {
        modalImagem.classList.add("hidden");
    }
    });



    const btnFechar = document.getElementById("fecharModal");

    btnFechar.addEventListener("click", fecharModal);

    function fecharModal() {
    const modal = document.getElementById("modalBeneficios");

    modal.classList.add("hidden");

    // limpa setores
    document.getElementById("listaSetores").innerHTML = "";

    // limpa slider
    const slider = document.getElementById("sliderBeneficios");
    slider.innerHTML = "";
    slider.classList.add("hidden");
    }

    modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        fecharModal();
    }
    });









