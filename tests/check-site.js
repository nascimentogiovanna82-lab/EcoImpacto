const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const pages = [
  'index.html', 'sobre.html', 'projetos.html', 'impacto.html',
  'acessibilidade.html', 'galeria.html', 'midia.html',
  'noticias.html', 'contato.html', 'orcamento_hospedagem.html'
];
const errors = [];
const report = { pagesChecked: 0, localLinksChecked: 0, checks: [], errors };

function check(condition, message) {
  if (!condition) errors.push(message);
  else report.checks.push(message);
}

for (const page of pages) {
  const file = path.join(root, page);
  check(fs.existsSync(file), page + ' existe');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  report.pagesChecked += 1;
  check(/<html lang="pt-BR">/i.test(html), page + ': idioma pt-BR declarado');
  check(/<meta name="viewport"[^>]*width=device-width/i.test(html), page + ': viewport responsivo');
  check(/<meta name="description"/i.test(html), page + ': meta description');
  check(/<title>[^<]+<\/title>/i.test(html), page + ': título definido');
  check(/<main\b[^>]*id="conteudo"/i.test(html), page + ': região principal identificada');
  check(/<nav\b[^>]*aria-label=/i.test(html), page + ': navegação identificada');
  check(/href="css\/style\.css"/i.test(html), page + ': folha de estilos vinculada');
  check(/src="js\/main\.js"/i.test(html), page + ': JavaScript vinculado');

  const hrefs = [...html.matchAll(/\bhref="([^"]+)"/gi)].map(match => match[1]);
  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) continue;
    const localPath = href.split('#')[0].split('?')[0];
    if (!localPath) continue;
    report.localLinksChecked += 1;
    check(fs.existsSync(path.resolve(root, localPath)), page + ': link local ' + href + ' existe');
  }
}

const css = fs.readFileSync(path.join(root, 'css/style.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'js/main.js'), 'utf8');
const contact = fs.readFileSync(path.join(root, 'contato.html'), 'utf8');
const media = fs.readFileSync(path.join(root, 'midia.html'), 'utf8');

check(/@media\s*\(max-width:\s*760px\)/.test(css), 'CSS possui breakpoint para telas móveis');
check(/:focus-visible/.test(css), 'CSS apresenta foco visível para teclado');
check(/prefers-reduced-motion/.test(css), 'CSS respeita preferência por movimento reduzido');
check(/localStorage\.setItem/.test(js) && /localStorage\.getItem/.test(js), 'preferência de fonte é salva e recuperada no LocalStorage');
check(/aria-expanded/.test(js), 'JavaScript atualiza aria-expanded do menu');
check(/checkValidity\(\)/.test(js) && /reportValidity\(\)/.test(js), 'formulário possui validação no navegador');
check(/id="contact-form"/.test(contact) && /type="email"/.test(contact) && /required/.test(contact), 'formulário inclui e-mail e campos obrigatórios');
check(/play-narration/.test(media) && /narration-text/.test(media), 'página de mídia oferece narração e transcrição');
check(/youtube-nocookie\.com\/embed\//.test(media), 'página de mídia inclui vídeo incorporado');

if (errors.length) {
  console.error('Falhas nos testes do EcoImpacto:');
  for (const error of errors) console.error(' - ' + error);
  process.exitCode = 1;
} else {
  console.log('Testes do EcoImpacto concluídos sem falhas.');
  console.log('Páginas verificadas: ' + report.pagesChecked);
  console.log('Links locais verificados: ' + report.localLinksChecked);
  console.log('Verificações aprovadas: ' + report.checks.length);
}
fs.mkdirSync(path.join(root, 'artifacts'), { recursive: true });
fs.writeFileSync(path.join(root, 'artifacts', 'site-check.json'), JSON.stringify(report, null, 2));
