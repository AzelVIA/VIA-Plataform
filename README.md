[README.html](https://github.com/user-attachments/files/28610035/README.html)
# VIA-Plataform
Visual Intelligence Architect Demonstration Platafrm
https://via-sight-flow.lovable.app
Projeto experimental para transformar dashboards em sistemas de decisão visual.
<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>Leia-me — VIA Platform</title>
<style>body{font-family:-apple-system,Segoe UI,Inter,sans-serif;max-width:780px;margin:40px auto;padding:0 20px;line-height:1.6;color:#1a1a1a}
h1{border-bottom:2px solid #0f5f7a;padding-bottom:8px}h2{margin-top:32px;color:#0f5f7a}
code{background:#f0f3f6;padding:2px 6px;border-radius:4px;font-size:.9em}
pre{background:#0b1014;color:#e8eef5;padding:16px;border-radius:8px;overflow:auto}</style></head>
<body>
<h1>VIA Platform v1.0 — Leia-me</h1>
<p>Este pacote contém tudo necessário para previsualizar, baixar e modificar a plataforma VIA.</p>
<h2>Conteúdo</h2>
<ul>
  <li><b>index.html</b> — central de documentos (abra este arquivo no navegador)</li>
  <li><b>via-guia-midia.pdf</b> — guia detalhado de como alterar imagens e vídeos</li>
  <li><b>via-platform-v1.zip</b> — código-fonte completo do projeto</li>
  <li><b>README.html</b> — este arquivo</li>
</ul>
<h2>Como rodar o projeto localmente</h2>
<ol>
  <li>Extraia <code>via-platform-v1.zip</code> em uma pasta</li>
  <li>Abra um terminal nessa pasta</li>
  <li>Instale as dependências: <code>bun install</code> (ou <code>npm install</code>)</li>
  <li>Inicie o servidor de desenvolvimento: <code>bun dev</code> (ou <code>npm run dev</code>)</li>
  <li>Acesse <code>http://localhost:3000</code></li>
</ol>
<h2>Onde alterar imagens e vídeos</h2>
<p>Consulte o <b>Guia de Mídia</b> (PDF) — ele mapeia cada página da plataforma para o arquivo <code>.tsx</code> correspondente em <code>src/routes/</code> e explica as duas pastas de mídia:</p>
<ul>
  <li><code>public/</code> — para vídeos, favicons e imagens servidas diretamente</li>
  <li><code>src/assets/</code> — para imagens importadas em componentes</li>
</ul>
<h2>Suporte</h2>
<p>Demo online: <a href="https://via-sight-flow.lovable.app">via-sight-flow.lovable.app</a></p>
</body></html>
