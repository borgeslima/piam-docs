/* ==========================================================================
   BIAM (PIAM) — realce de sintaxe Java (leve, sem dependencias)
   Aplica-se a blocos <code class="language-java">.
   Estrategia: uma unica passada com regex combinada (single-scan tokenizer).
   Cada token e classificado no callback, entao nao ha reprocessamento nem
   placeholders temporarios (evita vazamento de marcadores).
   ========================================================================== */
(function () {
    "use strict";

    var KEYWORDS = {
        "abstract": 1, "assert": 1, "boolean": 1, "break": 1, "byte": 1, "case": 1,
        "catch": 1, "char": 1, "class": 1, "const": 1, "continue": 1, "default": 1,
        "do": 1, "double": 1, "else": 1, "enum": 1, "extends": 1, "final": 1,
        "finally": 1, "float": 1, "for": 1, "goto": 1, "if": 1, "implements": 1,
        "import": 1, "instanceof": 1, "int": 1, "interface": 1, "long": 1,
        "native": 1, "new": 1, "package": 1, "private": 1, "protected": 1,
        "public": 1, "return": 1, "short": 1, "static": 1, "strictfp": 1, "super": 1,
        "switch": 1, "synchronized": 1, "this": 1, "throw": 1, "throws": 1,
        "transient": 1, "try": 1, "void": 1, "volatile": 1, "while": 1, "var": 1,
        "record": 1, "yield": 1, "sealed": 1, "permits": 1
    };
    var LITERALS = { "true": 1, "false": 1, "null": 1 };

    function esc(s) {
        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function span(cls, text) {
        return '<span class="' + cls + '">' + esc(text) + "</span>";
    }

    // Ordem importa: comentarios e strings primeiro, depois anotacoes, numeros,
    // e por fim identificadores/palavras. O '.' generico consome 1 char qualquer.
    var TOKEN = new RegExp(
        "\\/\\*[\\s\\S]*?\\*\\/" +            // 1: comentario de bloco
        "|\\/\\/[^\\n]*" +                     // 2: comentario de linha
        '|"""[\\s\\S]*?"""' +                  // 3: text block
        '|"(?:\\\\.|[^"\\\\])*"' +             // 4: string
        "|'(?:\\\\.|[^'\\\\])'" +              // 5: char
        "|@[A-Za-z_][A-Za-z0-9_]*" +           // 6: anotacao
        "|\\b\\d[\\d_]*(?:\\.\\d+)?[LlFfDd]?\\b" + // 7: numero
        "|[A-Za-z_$][A-Za-z0-9_$]*" +          // 8: identificador
        "|[\\s\\S]",                            // 9: qualquer outro caractere
        "g"
    );

    function classify(tok) {
        var c0 = tok.charAt(0);
        if (tok.slice(0, 2) === "/*" || tok.slice(0, 2) === "//") return span("j-cmt", tok);
        if (c0 === '"' || c0 === "'") return span("j-str", tok);
        if (c0 === "@") return span("j-ann", tok);
        if (c0 >= "0" && c0 <= "9") return span("j-num", tok);
        // identificador ou "outro"
        if (/^[A-Za-z_$]/.test(tok)) {
            if (KEYWORDS[tok]) return span("j-kw", tok);
            if (LITERALS[tok]) return span("j-lit", tok);
            if (/^[A-Z]/.test(tok)) return span("j-type", tok);
            return esc(tok);
        }
        return esc(tok); // pontuacao/espacos
    }

    function highlight(codeEl) {
        if (codeEl.dataset.javaHighlighted === "1") return;
        var raw = codeEl.textContent;
        var out = raw.replace(TOKEN, classify);
        codeEl.innerHTML = out;
        codeEl.dataset.javaHighlighted = "1";
    }

    document.addEventListener("DOMContentLoaded", function () {
        var blocks = document.querySelectorAll("code.language-java");
        for (var i = 0; i < blocks.length; i++) highlight(blocks[i]);
    });
})();
