(() => {
  const WHATSAPP = '917208354187';
  const params = new URLSearchParams(window.location.search);
  const source = params.get('source_campaign') || params.get('utm_source') || params.get('source') || 'CareerDekho Website';
  const campaign = params.get('campaign_name') || params.get('utm_campaign') || '';
  const adGroup = params.get('ad_group_name') || params.get('utm_content') || '';
  const adName = params.get('ads_name') || params.get('utm_term') || '';

  function trackedWhatsAppUrl(message) {
    const tracking = [
      `Source: ${source}`,
      campaign ? `Campaign: ${campaign}` : '',
      adGroup ? `Ad group: ${adGroup}` : '',
      adName ? `Ad: ${adName}` : '',
      `Page: ${window.location.pathname}`
    ].filter(Boolean).join('\n');
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`${message}\n\n${tracking}`)}`;
  }

  document.querySelectorAll('.wa-link').forEach(link => {
    link.href = trackedWhatsAppUrl('Hi CareerDekho, I want guidance regarding Manipal University Jaipur online programs.');
  });

  function validateLead(name, phone, program, errorEl) {
    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (!name.trim()) { errorEl.textContent = 'Please enter your name.'; return false; }
    if (cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) { errorEl.textContent = 'Please enter a valid 10-digit Indian mobile number.'; return false; }
    if (!program) { errorEl.textContent = 'Please select a program.'; return false; }
    errorEl.textContent = '';
    return cleanPhone;
  }

  function openLeadOnWhatsApp(name, phone, program) {
    const msg = [
      'Hi CareerDekho, I want details about Manipal University Jaipur online programs.',
      '',
      `Name: ${name.trim()}`,
      `Mobile: +91 ${phone}`,
      `Program: ${program}`,
      '',
      'Please guide me on the current payable fee, eligibility, intake and whether MUJ suits my profile.'
    ].join('\n');
    window.open(trackedWhatsAppUrl(msg), '_blank', 'noopener');
  }

  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const program = document.getElementById('program').value;
      const errorEl = document.getElementById('formError');
      const cleanPhone = validateLead(name, phone, program, errorEl);
      if (!cleanPhone) return;
      openLeadOnWhatsApp(name, cleanPhone, program);
    });
  }

  const modal = document.getElementById('leadModal');
  const modalProgram = document.getElementById('modalProgram');

  function showModal(program = '') {
    if (program && modalProgram) modalProgram.value = program;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('modalName')?.focus(), 60);
  }

  function hideModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.js-open-form').forEach(btn => btn.addEventListener('click', () => showModal()));
  document.querySelectorAll('.js-program-cta').forEach(btn => btn.addEventListener('click', () => showModal(btn.dataset.program || '')));
  document.querySelectorAll('.js-close-modal').forEach(el => el.addEventListener('click', hideModal));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) hideModal(); });

  const modalForm = document.getElementById('modalLeadForm');
  if (modalForm) {
    modalForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('modalName').value;
      const phone = document.getElementById('modalPhone').value;
      const program = document.getElementById('modalProgram').value;
      const errorEl = document.getElementById('modalFormError');
      const cleanPhone = validateLead(name, phone, program, errorEl);
      if (!cleanPhone) return;
      openLeadOnWhatsApp(name, cleanPhone, program);
    });
  }

  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.program-card').forEach(card => {
        card.classList.toggle('hidden', !(filter === 'all' || card.dataset.group === filter));
      });
    });
  });

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }) : null;

  document.querySelectorAll('.reveal').forEach(el => {
    if (observer) observer.observe(el); else el.classList.add('visible');
  });
})();
