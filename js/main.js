const $ = document.querySelector.bind(document);

const htmlCard = $("[data-cards]");

const btnPaginaAtual = $("[data-pagina-atual]");
const btnPrimeiraPagina = $("[data-primeira-pagina]");
const btnUltimaPagina = $("[data-ultima-pagina]");
const btnVoltarPagina = $("[data-anterior-pagina]");
const btnProximaPagina = $("[data-proxima-pagina]");
const btn2PaginasSeguintes = $("[data-duas-pagina-seguintes]");
const btn2PaginasAnteriores = $("[data-duas-pagina-anteriores]");

const state = {
  paginaAtual: 1,
  itensPorPagina: 5,
  totalDeItens: 100,
  totalDePaginas: null,
  itens: Array(100),

  calcularTotalDePaginas() {
    state.totalDePaginas = state.totalDeItens / state.itensPorPagina;
  }
};

const lista = {
  atualizar() {
    const primeiroItem = Math.floor((state.paginaAtual - 1) * 5);
    const ultimoItem = primeiroItem + state.itensPorPagina;
  
    htmlCard.innerHTML = "";
    for (let i = primeiroItem; i < ultimoItem; i++) {
      htmlCard.innerHTML += state.itens[i];
    }
  }
}

const controls = {
  init() {
    state.paginaAtual <= 2
      ? (btn2PaginasAnteriores.style.display = "none")
      : (btn2PaginasAnteriores.textContent = state.paginaAtual - 2);
    state.paginaAtual >= 18
      ? (btn2PaginasSeguintes.style.display = "none")
      : (btn2PaginasSeguintes.textContent = state.paginaAtual + 2);

    btnPaginaAtual.textContent = state.paginaAtual;
  },
  ultimaPagina() {
    state.paginaAtual = state.totalDePaginas;
    uptate();
  },
  primeiraPagina() {
    state.paginaAtual = 1;
    uptate();
  },
  proximaPagina() {
    if (state.paginaAtual >= 20) {
      return;
    }
    state.paginaAtual = ++state.paginaAtual;
    uptate();
  },
  voltarPagina() {
    if (state.paginaAtual <= 1) {
      return;
    }
    state.paginaAtual = --state.paginaAtual;
    uptate();
  },
  duasPaginasSeguintes() {
    if (state.paginaAtual >= 19) {
      return;
    }
    state.paginaAtual = state.paginaAtual + 2;
    uptate();
  },
  duasPaginasAnteriores() {
    if (state.paginaAtual <= 2) {
      return;
    }
    btn2PaginasAnteriores.textContent = state.paginaAtual;
    state.paginaAtual = state.paginaAtual - 2;
    uptate();
  },
};

const stateButtons = {
  atualizar() {
    btn2PaginasAnteriores.textContent = state.paginaAtual - 2;
    btnPaginaAtual.textContent = state.paginaAtual;
    btn2PaginasSeguintes.textContent = state.paginaAtual + 2;

    stateButtons.podeExibirEmTela();
  },
  podeExibirEmTela() {
    state.paginaAtual <= 2
      ? (btn2PaginasAnteriores.style.display = "none")
      : (btn2PaginasAnteriores.style.display = "block", btn2PaginasAnteriores.textContent = state.paginaAtual - 2);
    state.paginaAtual >= 19
      ? (btn2PaginasSeguintes.style.display = "none")
      : (btn2PaginasSeguintes.style.display = "block", btn2PaginasSeguintes.textContent = state.paginaAtual + 2);
  }
};

const handleClick = () => {

  const htmlControls = [
    [btnPrimeiraPagina, controls.primeiraPagina],
    [btnUltimaPagina, controls.ultimaPagina],
    [btnProximaPagina, controls.proximaPagina],
    [btnVoltarPagina, controls.voltarPagina],
    [btn2PaginasSeguintes, controls.duasPaginasSeguintes],
    [btn2PaginasAnteriores, controls.duasPaginasAnteriores]
  ]

  htmlControls.forEach(([element, controle]) =>
    element.addEventListener("click", controle)
  );
}

function uptate() {
  lista.atualizar();
  stateButtons.atualizar();
}

function gerarTemplate(array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = `<article>${i + 1}</article>`;
  }
  return array;
};

function inicializacao() {
    state.itens = gerarTemplate(state.itens);
    lista.atualizar();
    state.calcularTotalDePaginas();
    controls.init();
    handleClick();
}

inicializacao();