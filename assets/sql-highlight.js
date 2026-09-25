/* ==========================================================================
   BIAM (Partner IAM) — realce de sintaxe SQL (leve, sem dependencias)
   Aplica-se a blocos <code class="language-sql">. Palavras-chave em verde;
   comentarios e literais recebem classes proprias.
   Estrategia: uma unica passada com regex combinada (single-scan tokenizer),
   sem placeholders temporarios.
   ========================================================================== */
(function () {
    "use strict";

    var KEYWORDS = {};
    [
        "CREATE", "TABLE", "EXTENSION", "IF", "NOT", "EXISTS", "DROP", "CASCADE",
        "CONSTRAINT", "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "UNIQUE", "INDEX",
        "ON", "DEFAULT", "NULL", "BOOLEAN", "SELECT", "FROM", "JOIN", "LEFT", "RIGHT",
        "INNER", "OUTER", "WHERE", "AND", "OR", "AS", "INSERT", "INTO", "VALUES",
        "GROUP", "BY", "ORDER", "COALESCE", "DISTINCT", "TRUE", "FALSE", "WITH",
        "TIME", "ZONE", "TIMESTAMP", "CURRENT_TIMESTAMP", "UUID", "VARCHAR", "TEXT",
        "DELETE", "UPDATE", "SET", "ADD", "ALTER", "COLUMN", "STRING_AGG", "IN", "IS",
        "INT", "INTEGER", "BIGINT", "SERIAL", "CHECK", "HAVING", "LIMIT", "OFFSET"
    ].forEach(function (k) { KEYWORDS[k] = 1; });

    function esc(s) {
        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function span(cls, text) {
        return '<span class="' + cls + '">' + esc(text) + "</span>";
    }

    var TOKEN = new RegExp(
        "--[^\\n]*" +                          // 1: comentario de linha
        "|'(?:''|[^'])*'" +                    // 2: literal string
        "|[A-Za-z_][A-Za-z0-9_]*" +            // 3: identificador/keyword
        "|[\\s\\S]",                            // 4: qualquer outro caractere
        "g"
    );

    function classify(tok) {
        if (tok.slice(0, 2) === "--") return span("sql-cmt", tok);
        if (tok.charAt(0) === "'") return span("sql-str", tok);
        if (/^[A-Za-z_]/.test(tok)) {
            if (KEYWORDS[tok.toUpperCase()]) return span("sql-kw", tok);
            return esc(tok);
        }
        return esc(tok);
    }

    function highlight(codeEl) {
        if (codeEl.dataset.sqlHighlighted === "1") return;
        codeEl.innerHTML = codeEl.textContent.replace(TOKEN, classify);
        codeEl.dataset.sqlHighlighted = "1";
    }

    document.addEventListener("DOMContentLoaded", function () {
        var blocks = document.querySelectorAll("code.language-sql");
        for (var i = 0; i < blocks.length; i++) highlight(blocks[i]);
    });
})();
