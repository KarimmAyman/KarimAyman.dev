import { PORTFOLIO } from './data.js?v=1.5';
import { CONFIG } from './config.js?v=1.5';

// Global error overlay for developer experience
window.addEventListener('error', (e) => {
  const errDiv = document.createElement('div');
  errDiv.id = 'dev-error-overlay';
  errDiv.style.position = 'fixed';
  errDiv.style.top = '0';
  errDiv.style.left = '0';
  errDiv.style.width = '100%';
  errDiv.style.height = '100%';
  errDiv.style.background = 'rgba(9, 9, 11, 0.95)';
  errDiv.style.color = '#ef4444';
  errDiv.style.padding = '20px';
  errDiv.style.zIndex = '99999';
  errDiv.style.fontFamily = 'monospace';
  errDiv.style.fontSize = '14px';
  errDiv.style.overflow = 'auto';
  errDiv.innerHTML = `
    <div style="max-w-3xl mx-auto mt-10 p-6 bg-zinc-900 border border-red-500 rounded-lg shadow-2xl">
      <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 10px; color: #ef4444;">🔴 JavaScript Runtime Error</h2>
      <p style="color: #e4e4e7; margin-bottom: 20px; font-size: 16px;">${e.message}</p>
      <div style="color: #a1a1aa; font-size: 12px;">
        <strong>Source:</strong> ${e.filename}:${e.lineno}:${e.colno}
      </div>
    </div>
  `;
  document.body.appendChild(errDiv);
});

// Helper function to report manual module loader errors
export const reportError = (title, message, stack = '') => {
  const errDiv = document.createElement('div');
  errDiv.id = 'dev-error-overlay';
  errDiv.style.position = 'fixed';
  errDiv.style.top = '0';
  errDiv.style.left = '0';
  errDiv.style.width = '100%';
  errDiv.style.height = '100%';
  errDiv.style.background = 'rgba(9, 9, 11, 0.95)';
  errDiv.style.color = '#ef4444';
  errDiv.style.padding = '20px';
  errDiv.style.zIndex = '99999';
  errDiv.style.fontFamily = 'monospace';
  errDiv.style.fontSize = '14px';
  errDiv.style.overflow = 'auto';
  errDiv.innerHTML = `
    <div style="max-w-3xl mx-auto mt-10 p-6 bg-zinc-900 border border-red-500 rounded-lg shadow-2xl">
      <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 10px; color: #ef4444;">🔴 ${title}</h2>
      <p style="color: #e4e4e7; margin-bottom: 20px; font-size: 16px;">${message}</p>
      ${stack ? `<pre style="background: #18181b; padding: 10px; border-radius: 4px; color: #d4d4d8; font-size: 12px; overflow-x: auto;">${stack}</pre>` : ''}
    </div>
  `;
  document.body.appendChild(errDiv);
};

// 1. Head Metas
const setMeta = (name, val, attr = 'name') => {
  let el = document.querySelector(`meta[${attr}="${name}"]`) || Object.assign(document.createElement('meta'), { [attr]: name });
  el.content = val;
  if (!el.parentNode) document.head.appendChild(el);
};
setMeta('description', PORTFOLIO.seo.description);
setMeta('keywords', PORTFOLIO.seo.keywords);
setMeta('theme-color', '#06b6d4');
setMeta('msapplication-TileColor', '#06b6d4');
['og:title', 'og:description', 'og:image', 'og:url', 'og:site_name', 'og:locale'].forEach(k => setMeta(k, PORTFOLIO.seo[k.split(':')[1]] || PORTFOLIO.meta.title, 'property'));
['twitter:card', 'twitter:creator', 'twitter:title', 'twitter:description', 'twitter:image'].forEach(k => setMeta(k, k === 'twitter:card' ? 'summary_large_image' : k === 'twitter:creator' ? PORTFOLIO.seo.twitterHandle : PORTFOLIO.seo[k.split(':')[1]] || PORTFOLIO.meta.title));
let canonical = document.querySelector('link[rel="canonical"]') || Object.assign(document.createElement('link'), { rel: 'canonical' });
canonical.href = PORTFOLIO.seo.canonicalUrl;
if (!canonical.parentNode) document.head.appendChild(canonical);

// 2. Schema
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify({ "@context": "https://schema.org", "@type": "Person", "name": PORTFOLIO.meta.fullName, "alternateName": PORTFOLIO.meta.name, "url": PORTFOLIO.seo.canonicalUrl, "image": PORTFOLIO.seo.ogImage, "description": PORTFOLIO.meta.bio, "jobTitle": "Full Stack Developer", "email": PORTFOLIO.meta.email, "telephone": PORTFOLIO.meta.phone, "address": { "@type": "PostalAddress", "addressLocality": PORTFOLIO.meta.location.split(',')[0].trim(), "addressCountry": "EG" }, "sameAs": PORTFOLIO.social.map(s => s.url) });
document.head.appendChild(script);

// 3. Render Nav
const getIcon = id => id === "skills" ? "fas fa-code" : id === "projects" ? "fas fa-folder" : "fas fa-user";
CONFIG.sections.filter(s => s.navLabel).forEach(s => {
  document.getElementById("nav-links").innerHTML += `<a href="#${s.id}" class="text-sm lg:text-base text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors duration-200">${s.navLabel}</a>`;
  document.getElementById("mobile-nav-links").innerHTML += `<a href="#${s.id}" class="mobile-menu-link text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 font-semibold text-base sm:text-lg transition-colors duration-200 py-3 px-2 border-b border-gray-100 dark:border-dark-100 active:bg-gray-50 dark:active:bg-dark-50 rounded-lg"><i class="${getIcon(s.id)} mr-3 text-brand-500 dark:text-brand-400 w-5"></i>${s.navLabel}</a>`;
});

// 4. Render Sections
const app = document.getElementById("app");
const resolveKeys = (keys) => !keys ? PORTFOLIO : typeof keys === 'string' ? PORTFOLIO[keys] : keys.reduce((acc, k) => ({ ...acc, [k]: PORTFOLIO[k] }), {});
const renderPromises = CONFIG.sections.map(async s => {
  try {
    const mod = await s.module();
    return { id: s.id, render: mod.default, data: resolveKeys(s.dataKeys) };
  } catch (e) {
    console.error(`Failed to load section ${s.id}:`, e);
    reportError(`Failed to load section: ${s.id}`, e.message, e.stack);
    return null;
  }
});

// 5. Initialize AOS and Managers
Promise.all(renderPromises).then((sections) => {
  sections.forEach(s => {
    if (s && s.render) {
      try {
        s.render(app, s.data);
      } catch (e) {
        console.error(`Error rendering section ${s.id}:`, e);
        reportError(`Error rendering section: ${s.id}`, e.message, e.stack);
      }
    }
  });

  if (window.AOS) window.AOS.init({ duration: 800, once: true, offset: 80 });
  Object.keys(CONFIG.features).forEach(f => {
    if (CONFIG.features[f]) {
      const p = f === 'scrollProgress' ? 'scrollProgress.js' : f === 'scrollToTop' ? 'scrollToTop.js' : f === 'lazyVideos' ? 'lazyVideo.js' : 'theme.js';
      import(`./managers/${p}?v=1.5`);
    }
  });
  import("./managers/navbar.js?v=1.5");
  import("./managers/mobileMenu.js?v=1.5");
});

document.getElementById('footer-year').textContent = PORTFOLIO.meta.copyrightYear;
document.getElementById('footer-name').textContent = PORTFOLIO.meta.name;
