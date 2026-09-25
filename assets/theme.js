/* ==========================================================================
   BIAM (PIAM) — alternancia de tema claro/escuro
   Persiste a escolha em localStorage; respeita prefers-color-scheme por padrao.
   O tema inicial e aplicado por um script inline no <head> (anti-flash).
   ========================================================================== */
(function () {
    "use strict";

    var STORAGE_KEY = "BIAM-theme";

    function getStored() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }

    function store(theme) {
        try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
    }

    function systemPrefersDark() {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    function currentTheme() {
        return document.documentElement.getAttribute("data-theme") ||
            (systemPrefersDark() ? "dark" : "light");
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        updateToggle(theme);
    }

    function updateToggle(theme) {
        var btn = document.querySelector("[data-theme-toggle]");
        if (!btn) return;
        var isDark = theme === "dark";
        btn.setAttribute("aria-pressed", String(isDark));
        btn.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
        btn.title = isDark ? "Tema claro" : "Tema escuro";
        var icon = btn.querySelector("[data-theme-icon]");
        var label = btn.querySelector("[data-theme-label]");
        if (icon) icon.textContent = isDark ? "\u2600" : "\u263D"; // sol / lua
        if (label) label.textContent = isDark ? "Claro" : "Escuro";
    }

    function toggle() {
        var next = currentTheme() === "dark" ? "light" : "dark";
        applyTheme(next);
        store(next);
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Garante que o data-theme esteja definido (caso o inline nao tenha rodado).
        if (!document.documentElement.getAttribute("data-theme")) {
            applyTheme(getStored() || (systemPrefersDark() ? "dark" : "light"));
        } else {
            updateToggle(currentTheme());
        }

        var btn = document.querySelector("[data-theme-toggle]");
        if (btn) btn.addEventListener("click", toggle);

        // Acompanha mudanca do SO quando o usuario nao fez escolha explicita.
        if (window.matchMedia) {
            var mq = window.matchMedia("(prefers-color-scheme: dark)");
            var onChange = function (e) {
                if (getStored()) return; // respeita escolha manual
                applyTheme(e.matches ? "dark" : "light");
            };
            if (mq.addEventListener) mq.addEventListener("change", onChange);
            else if (mq.addListener) mq.addListener(onChange);
        }
    });
})();
