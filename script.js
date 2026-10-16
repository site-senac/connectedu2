/* ConnectEdu — comportamentos do site */

/* Configuração do formulário: cole aqui o endereço de um serviço (ex.: Formspree).
   Enquanto estiver vazio, NENHUMA mensagem é enviada. */
const FORM_ENDPOINT = "";

/* Menu hambúrguer */
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open'); btn.setAttribute('aria-expanded', false);
}));

/* Imagens: mostra o espaço reservado se o arquivo ainda não existir */
document.querySelectorAll('.ph').forEach(box => {
  const img = box.querySelector('img');
  const ok = () => box.classList.add('loaded'), fail = () => box.classList.add('missing');
  img.addEventListener('load', ok); img.addEventListener('error', fail);
  if (img.complete) (img.naturalWidth ? ok : fail)();
});
/* Logo: se não existir, usa o nome em texto */
const logo = document.querySelector('.logo'), brandText = document.querySelector('.brand-text');
const showLogo = ok => { logo.style.display = ok ? '' : 'none'; brandText.style.display = ok ? 'none' : ''; };
showLogo(false);
logo.addEventListener('load', () => showLogo(true));
logo.addEventListener('error', () => showLogo(false));
if (logo.complete && logo.naturalWidth) showLogo(true);

/* Animações ao rolar */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 }) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

/* Destaque do link ativo no menu */
const links = [...menu.querySelectorAll('a')];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
links.forEach(l => { const s = document.querySelector(l.getAttribute('href')); if (s) spy.observe(s); });

/* Formulário: validação */
const form = document.getElementById('contact-form'), status = document.getElementById('form-status');
const rules = {
  nome: v => v.trim().length >= 2 ? '' : 'Digite seu nome (mínimo de 2 letras).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Digite um e-mail válido, como nome@exemplo.com.',
  mensagem: v => v.trim().length >= 10 ? '' : 'Escreva uma mensagem com pelo menos 10 caracteres.'
};
function check(name) {
  const f = form.elements[name], msg = rules[name](f.value);
  document.getElementById('err-' + name).textContent = msg;
  f.classList.toggle('invalid', !!msg); f.setAttribute('aria-invalid', !!msg);
  return !msg;
}
Object.keys(rules).forEach(n => form.elements[n].addEventListener('blur', () => check(n)));
form.addEventListener('submit', async e => {
  e.preventDefault(); status.className = 'status'; status.textContent = '';
  const valid = Object.keys(rules).map(check).every(Boolean);
  if (!valid) { form.querySelector('.invalid').focus(); return; }
  if (!FORM_ENDPOINT) {
    status.className = 'status info';
    status.textContent = 'Dados válidos! Porém o envio ainda não está conectado a um serviço, então nenhuma mensagem foi enviada.';
    return;
  }
  try {
    const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) });
    if (!r.ok) throw new Error();
    status.className = 'status ok'; status.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.'; form.reset();
  } catch {
    status.className = 'status bad'; status.textContent = 'Não foi possível enviar agora. Tente novamente mais tarde.';
  }
});
