// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll for same-page anchors
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href');
  if (id.length > 1) {
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    }
  }
});

// Projects page filter chips
const grid = document.getElementById('projectsGrid');
const chips = document.querySelectorAll('.chip');
if (grid && chips.length) {
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const tag = chip.dataset.filter;
      grid.querySelectorAll('.project').forEach((card) => {
        const has = tag === 'all' || (card.dataset.tags || '').includes(tag);
        card.style.display = has ? '' : 'none';
      });
    });
  });
}

// Contact form submission via FormSubmit
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    status.textContent = 'Sending...';
    try {
      const formData = new FormData(contactForm);
      // FormSubmit endpoint sends to the email embedded in URL
      const endpoint = 'https://formsubmit.co/ajax/habeebhsd4@gmail.com';
      const res = await fetch(endpoint, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Network error');
      await res.json();
      status.textContent = 'Thanks! Your message has been sent.';
      contactForm.reset();
    } catch (err) {
      status.textContent = 'Sorry, something went wrong. Please try again.';
    }
  });
}


