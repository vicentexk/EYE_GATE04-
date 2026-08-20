// =========================
// USER INFO
// =========================
function carregarUsuario() {

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("usuarioLogado"));
  } catch (e) {
    localStorage.removeItem("usuarioLogado");
    return;
  }

  if (!user) return;

  const nome = document.getElementById("userName");
  const tipo = document.getElementById("userType");

  if (nome) nome.innerText = user.nome || "Usuário";
  if (tipo) {
    tipo.innerText = user.tipo === "admin" ? "Administrador" : "Usuário";
  }
}

// =========================
// LOGOUT
// =========================
function logout() {
  localStorage.removeItem("usuarioLogado");
  abrirPagina("welcomePage");
}

// =========================
// SESSÃO
// =========================
function verificarSessao() {
  console.log("VERIFICAR SESSAO");

  try {
    const raw = localStorage.getItem("usuarioLogado");
    if (!raw) return;

    const user = JSON.parse(raw);
    if (!user || !user.email) {
      localStorage.removeItem("usuarioLogado");
      return;
    }

    carregarUsuario();
    if (typeof controlarPermissoes === "function") controlarPermissoes();
    abrirPagina("dashboardPage");

  } catch (e) {
    localStorage.removeItem("usuarioLogado");
  }
}
