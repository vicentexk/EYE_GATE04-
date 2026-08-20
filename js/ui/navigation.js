// =========================
// TROCAR PÁGINA
// =========================
async function abrirPagina(id) {

    if (typeof mostrarLoading === "function") {
        mostrarLoading("Abrindo página...");
    }

    if (typeof pararCameraCadastro === "function") pararCameraCadastro();
    if (typeof pararCameraMonitor === "function") pararCameraMonitor();
    if (typeof pararMonitor === "function") pararMonitor();

    setTimeout(async () => {

        // Admin: verificação assíncrona correta
        if (id === "adminPage") {
            const isAdmin = typeof verificarAdminLocal === "function"
                ? await verificarAdminLocal()
                : false;
            if (!isAdmin) {
                if (typeof mostrarMensagem === "function") {
                    mostrarMensagem("Acesso negado");
                }
                if (typeof esconderLoading === "function") esconderLoading();
                return;
            }
        }

        document.querySelectorAll(".page").forEach(page => {
            page.classList.remove("active-page");
        });

        const pagina = document.getElementById(id);

        if (!pagina) {
            console.error("Página não encontrada:", id);
            if (typeof esconderLoading === "function") esconderLoading();
            return;
        }

        pagina.classList.add("active-page");

        if (typeof esconderLoading === "function") esconderLoading();

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

        if (id === "cadastroPage" && typeof iniciarCameraCadastro === "function") {
            iniciarCameraCadastro();
        } else if (id === "monitorPage") {
            if (typeof iniciarCameraMonitor === "function") iniciarCameraMonitor();
            if (typeof iniciarMonitor === "function") iniciarMonitor();
        } else if (typeof pararMonitor === "function") {
            pararMonitor();
        }

    }, 350);
}
