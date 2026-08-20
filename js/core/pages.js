async function carregarPaginas() {

  const paginas = [
    "welcome",
    "login",
    "admin-login",
    "registro",
    "dashboard",
    "cadastro",
    "monitor",
    "registros",
    "relatorios",
    "admin"
  ];

  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = "";

  for (const pagina of paginas) {
    try {
      const resposta = await fetch(`./pages/${pagina}.html`);
      if (!resposta.ok) {
        console.warn("Página não encontrada:", pagina);
        continue;
      }
      const html = await resposta.text();
      app.insertAdjacentHTML("beforeend", html);
    } catch (e) {
      console.error("Erro ao carregar página:", pagina, e);
    }
  }

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}
