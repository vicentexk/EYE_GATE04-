// =========================
// START - EYE-GATE
// =========================
window.addEventListener("DOMContentLoaded", async () => {
    console.log("[EYE-GATE] Sistema iniciado");

    try {
        // Páginas (welcome, login, etc.)
        await carregarPaginas();

        // Face API + cache + matcher
        await carregarFaceAPI();
        await carregarAlunosCache();
        await criarMatcher();

        // Auth
        iniciarLogin();
        iniciarAdminLogin();
        iniciarRegistro();
        iniciarCadastro();

        // Sessão: se já logado → dashboard; senão fica na welcome
        verificarSessao();

        carregarUsuario();
        controlarPermissoes();

        await Promise.allSettled([
            carregarStats(),
            carregarGraficoLogs(),
            carregarLogs()
        ]);

        console.log("✅ Sistema carregado com sucesso");

    } catch (error) {
        console.error("💥 Erro na inicialização:", error);
    }
});

setInterval(async () => {
    try {
        await Promise.allSettled([
            carregarStats(),
            carregarGraficoLogs(),
            carregarLogs()
        ]);
    } catch (e) {}
}, 30000);
