const languageButton = document.querySelector('.language');
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#site-menu');

languageButton.addEventListener('click', () => {
  const nextLanguage = document.documentElement.lang === 'en' ? 'ja' : 'en';
  document.documentElement.lang = nextLanguage;
  document.querySelectorAll('[data-en][data-ja]').forEach((element) => {
    element.innerHTML = element.dataset[nextLanguage];
  });
  languageButton.textContent = nextLanguage === 'en' ? 'JP' : 'EN';
  languageButton.setAttribute('aria-label', nextLanguage === 'en' ? '日本語に切り替える' : 'Switch to English');
});

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const publicationTabs = document.querySelectorAll('[data-publication-filter]');
const publicationItems = document.querySelectorAll('[data-publication-tags]');
const publicationEmpty = document.querySelector('.publication-empty');

publicationTabs.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.publicationFilter;
    let visibleCount = 0;

    publicationTabs.forEach((tab) => {
      const isActive = tab === button;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    publicationItems.forEach((item) => {
      const tags = item.dataset.publicationTags.split(' ').filter(Boolean);
      const isVisible = filter === 'all' || tags.includes(filter);
      item.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    publicationEmpty.hidden = visibleCount !== 0;
  });
});

const workTabs = document.querySelectorAll('[data-work-filter]');
const workEntries = document.querySelectorAll('[data-work-type]');
const workEmpty = document.querySelector('.work-empty');

workTabs.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.workFilter;
    let visibleCount = 0;

    workTabs.forEach((tab) => {
      const isActive = tab === button;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    workEntries.forEach((entry) => {
      const isVisible = filter === 'all' || entry.dataset.workType === filter;
      entry.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    workEmpty.hidden = visibleCount !== 0;
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
