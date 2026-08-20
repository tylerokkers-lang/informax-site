// Informax — interactions & scroll animation

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const navScrim = document.getElementById('navScrim');

  const closeNav = () => {
    mobileNav.classList.remove('open');
    navScrim.classList.remove('open');
  };

  navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    navScrim.classList.toggle('open');
  });
  navScrim.addEventListener('click', closeNav);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => io.observe(el));

  /* ---------- Ticker: duplicate content for seamless loop ---------- */
  const track = document.getElementById('tickerTrack');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const panel = item.querySelector('.faq-a');

    if (item.classList.contains('open')) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------- FAQ group filter ---------- */
  const groupBtns = document.querySelectorAll('[data-group].faq-group-btn');
  const faqGroupItems = document.querySelectorAll('.faq-item[data-group]');

  groupBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('href').replace('#', '');

      groupBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      faqGroupItems.forEach(item => {
        const match = item.dataset.group === target;
        item.style.display = match ? '' : 'none';
      });
    });
  });

  /* ---------- Smooth scroll offset for fixed header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
