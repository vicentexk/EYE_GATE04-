// =========================
// LOGIN
// =========================
function iniciarLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await fazerLogin();
  });
}

function iniciarAdminLogin() {
  const form = document.getElementById("adminForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await fazerLoginAdmin();
  });
}

async function fazerLoginAdmin() {
  if (typeof mostrarLoading === "function") mostrarLoading("Entrando como admin...");

  try {
    const email = document.getElementById("adminEmail")?.value?.trim();
    const senha = document.getElementById("adminSenha")?.value?.trim();

    if (!email || !senha) {
      mostrarMensagem("Preencha os campos");
      return;
    }

    const client = window.supabaseClient;
    if (!client) {
      mostrarMensagem("Erro de conexão");
      return;
    }

    const { data: admin, error } = await client
      .from("admins")
      .select("*")
      .eq("email", email)
      .eq("senha", senha)
      .maybeSingle();

    if (error || !admin) {
      mostrarMensagem("Acesso negado");
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify({
      id: admin.id,
      nome: "Administrador",
      tipo: "admin",
      email: admin.email
    }));

    carregarUsuario();
    if (typeof controlarPermissoes === "function") controlarPermissoes();
    if (typeof verificarAdmin === "function") verificarAdmin();

    try {
      await carregarStats?.();
      await carregarAlunosAdmin?.();
      await carregarLogsAdmin?.();
      await carregarUsuarios?.();
      await carregarLogs?.();
    } catch (e) {}

    mostrarMensagem("Bem-vindo Admin!");
    abrirPagina("dashboardPage");

  } catch (e) {
    console.error(e);
    mostrarMensagem("Erro ao entrar");
  } finally {
    if (typeof esconderLoading === "function") esconderLoading();
  }
}

async function fazerLogin() {
  if (typeof mostrarLoading === "function") mostrarLoading("Entrando...");

  try {
    const email = document.getElementById("email")?.value?.trim();
    const senha = document.getElementById("senha")?.value?.trim();

    if (!email || !senha) {
      mostrarMensagem("Preencha os campos");
      return;
    }

    const client = window.supabaseClient;
    if (!client) {
      mostrarMensagem("Erro de conexão");
      return;
    }

    const { data: user, error } = await client
      .from("usuarios")
      .select("*")
      .eq("email", email)
      .eq("senha", senha)
      .maybeSingle();

    if (error || !user) {
      mostrarMensagem("Login inválido");
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(user));

    carregarUsuario();
    if (typeof controlarPermissoes === "function") controlarPermissoes();

    try { await carregarStats?.(); } catch (e) {}

    mostrarMensagem("Login realizado");
    abrirPagina("dashboardPage");

  } catch (e) {
    console.error(e);
    mostrarMensagem("Erro ao entrar");
  } finally {
    if (typeof esconderLoading === "function") esconderLoading();
  }
}
