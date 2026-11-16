document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      const label = toggle.querySelector('.sr-only');
      if (label) label.textContent = open ? 'Fechar menu' : 'Abrir menu';
    });
  }

  const root = document.documentElement;
  const saved = Number(localStorage.getItem('ecoimpacto-font-size'));
  if (saved >= 14 && saved <= 22) root.style.setProperty('--base', saved + 'px');

  const announce = (message) => {
    const status = document.getElementById('access-status');
    if (status) status.textContent = message;
  };

  const changeFont = (delta) => {
    const current = parseInt(getComputedStyle(root).getPropertyValue('--base'), 10) || 16;
    const next = Math.min(22, Math.max(14, current + delta));
    root.style.setProperty('--base', next + 'px');
    localStorage.setItem('ecoimpacto-font-size', String(next));
    announce('Tamanho do texto ajustado para ' + next + ' pixels.');
  };

  document.getElementById('font-plus')?.addEventListener('click', () => changeFont(1));
  document.getElementById('font-minus')?.addEventListener('click', () => changeFont(-1));
  document.getElementById('font-reset')?.addEventListener('click', () => {
    root.style.setProperty('--base', '16px');
    localStorage.setItem('ecoimpacto-font-size', '16');
    announce('Tamanho do texto restaurado.');
  });

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = document.getElementById('form-status');
      status.className = 'form-status';
      if (!form.checkValidity()) {
        status.textContent = 'Confira os campos e preencha os dados corretamente.';
        status.classList.add('error');
        form.reportValidity();
        return;
      }
      status.textContent = 'Validação concluída! Esta é uma demonstração: sua mensagem não foi enviada nem armazenada.';
      status.classList.add('success');
      form.reset();
    });
  }

  const playNarration = document.getElementById('play-narration');
  const stopNarration = document.getElementById('stop-narration');
  const narrationStatus = document.getElementById('narration-status');
  const narrationText = document.getElementById('narration-text');

  if (playNarration && stopNarration && narrationStatus && narrationText) {
    const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    playNarration.disabled = !supported;
    stopNarration.disabled = !supported;
    if (!supported) narrationStatus.textContent = 'A narração por voz não é compatível com este navegador. Leia a transcrição abaixo.';

    playNarration.addEventListener('click', () => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(narrationText.textContent.trim());
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;
      utterance.onstart = () => { narrationStatus.textContent = 'Narração em reprodução.'; };
      utterance.onend = () => { narrationStatus.textContent = 'Narração concluída.'; };
      utterance.onerror = () => { narrationStatus.textContent = 'Não foi possível reproduzir a narração neste dispositivo.'; };
      window.speechSynthesis.speak(utterance);
    });

    stopNarration.addEventListener('click', () => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      narrationStatus.textContent = 'Narração interrompida.';
    });

    window.addEventListener('pagehide', () => {
      if (supported) window.speechSynthesis.cancel();
    });
  }
});
