/**
 * public/nav.js
 * Single enhancement script per spec J3 (under 2 KB gzipped, zero libraries, loaded with defer).
 * 1. Dynamic document.title as visitor scrolls (<Section> | AntisocialWorld, restoring AntisocialWorld, Product Engineer at top).
 * 2. Updates aria-current="location" on nav link.
 * 3. Updates URL hash via history.replaceState.
 * Handles hashchange, direct load with hash, and degrades gracefully if no IntersectionObserver.
 */
(() => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const defaultTitle = 'AntisocialWorld, Product Engineer';
  const titles = {
    'hero': defaultTitle,
    'work': 'Work | AntisocialWorld',
    'rowta': 'Rowta | AntisocialWorld',
    'different': 'What makes me different | AntisocialWorld',
    'design': 'Design | AntisocialWorld',
    'opensource': 'Open source | AntisocialWorld',
    'about': 'About | AntisocialWorld',
    'off-the-clock': 'Off the clock | AntisocialWorld',
    'contact': 'Contact | AntisocialWorld'
  };

  const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const trackedSections = Object.keys(titles)
    .map(id => document.getElementById(id))
    .filter(Boolean);

  let activeId = '';

  function setActive(id) {
    if (activeId === id) return;
    activeId = id;

    // 1. Title
    document.title = titles[id] || defaultTitle;

    // 2. aria-current
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    // 3. Update hash without jumping or creating new history entries
    if (id && id !== 'hero') {
      history.replaceState(null, '', `#${id}`);
    } else if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  // Observer
  const observer = new IntersectionObserver((entries) => {
    // Pick the visible entry with greatest intersectionRatio or closest to top
    const visible = entries.filter(e => e.isIntersecting);
    if (visible.length > 0) {
      visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      setActive(visible[0].target.id);
    }
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
  });

  trackedSections.forEach(el => observer.observe(el));

  // Handle direct loads with hash
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setActive(target.id);
    }
  }

  // Handle hashchange
  window.addEventListener('hashchange', () => {
    const targetId = window.location.hash.slice(1);
    if (targetId && titles[targetId]) {
      setActive(targetId);
    } else if (!targetId) {
      setActive('hero');
    }
  });
})();
