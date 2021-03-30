const $ = document.querySelector.bind(document);
const htmlCard = $("[data-cards]");

const paginacao = {
  paginaAtual: 1,
  itensPorPagina: 5,
  totalDeItens: 100,
  totalDePaginas: null,
  itens: Array(100),

  calcularTotalDePaginas() {
    this.totalDePaginas = this.totalDeItens / this.itensPorPagina;
  },
    
  buttons() {
    const btnPaginaAtual = $("[data-pagina-atual]");
    const btnPrimeiraPagina = $("[data-primeira-pagina]");
    const btnUltimaPagina = $("[data-ultima-pagina]");

    const btn2PaginasAnterior = $("[data-duas-pagina-anterior]");
    const btn2PaginasProxima = $("[data-duas-pagina-proximo]");

    btnPrimeiraPagina.addEventListener('click', () => {
        this.paginaAtual = 1;
        btnPaginaAtual.textContent = this.paginaAtual;
        this.renderizar();
    });
    btnUltimaPagina.addEventListener('click', () => {
        this.paginaAtual = this.totalDePaginas;
        btnPaginaAtual.textContent = this.paginaAtual;
        this.renderizar();
    });

    const btnPaginaAnterior = $("[data-anterior-pagina]");
    const btnPaginaProxima = $("[data-proxima-pagina]");

    btnPaginaAnterior.addEventListener('click', () => {
        if(this.paginaAtual <= 1) {
            return;
        }
        this.paginaAtual = this.paginaAtual - 1;
        btnPaginaAtual.textContent = this.paginaAtual;
        this.renderizar();
    });
    btnPaginaProxima.addEventListener('click', () => {
        if (this.paginaAtual >= this.totalDePaginas) {
          return;
        }
        this.paginaAtual = this.paginaAtual + 1;
        btnPaginaAtual.textContent = this.paginaAtual;

        if (this.paginaAtual >= 3) {
            btn2PaginasAnterior.style.display = "block"
            btn2PaginasAnterior.textContent = this.paginaAtual - 2;
            btn2PaginasAnterior.addEventListener("click", () => {
            });
        } else {
            btn2PaginasAnterior.style.display = "none";
        }

        btn2PaginasProxima.addEventListener("click", () => {});


        this.renderizar();
    });
  },

  renderizar() {
    const primeiroItem = Math.floor((this.paginaAtual - 1) * 5);
    const ultimoItem = primeiroItem + this.itensPorPagina;

    htmlCard.innerHTML = "";
    for (let i = primeiroItem; i < ultimoItem; i++) {
      htmlCard.innerHTML += this.itens[i];
    }
  },

  gerarTemplate() {
    const gerarTemplateComNumeros = (array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = `<article>${i + 1}</article>`;
      }
      return array;
    };

    this.itens = gerarTemplateComNumeros(this.itens);
  },

  inicializacao() {
    this.gerarTemplate();
    this.renderizar();
    this.calcularTotalDePaginas();
    this.buttons();
  },
};

paginacao.inicializacao();
