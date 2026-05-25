const projectStyles = {
  aoun: {
    shadow: "dark:hover:shadow-green-500/20",
    gradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    text: "text-green-600 dark:text-green-400",
    badgeBg: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700",
    accentText: "text-green-700 dark:text-green-300",
    buttonBg: "bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-emerald-600 hover:from-green-600 hover:to-green-700",
    borderBtn: "border-green-500 dark:border-green-400 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20"
  },
  goia: {
    shadow: "dark:hover:shadow-cyan-500/20",
    gradient: "from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20",
    text: "text-cyan-600 dark:text-cyan-400",
    badgeBg: "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700",
    accentText: "text-cyan-700 dark:text-cyan-300",
    buttonBg: "bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 hover:from-cyan-600 hover:to-blue-700",
    borderBtn: "border-cyan-500 dark:border-cyan-400 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
  },
  maona: {
    shadow: "dark:hover:shadow-blue-500/20",
    gradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    text: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
    accentText: "text-blue-700 dark:text-blue-300",
    buttonBg: "bg-gradient-to-r from-blue-500 to-cyan-600 dark:from-blue-600 dark:to-cyan-700 hover:from-blue-600 hover:to-cyan-700",
    borderBtn: "border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
  },
  audiophile: {
    shadow: "dark:hover:shadow-orange-500/20",
    gradient: "from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20",
    text: "text-orange-600 dark:text-orange-400",
    badgeBg: "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700",
    accentText: "text-orange-700 dark:text-orange-300",
    buttonBg: "bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 hover:from-orange-600 hover:to-orange-700",
    borderBtn: "border-orange-500 dark:border-orange-400 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20"
  },
  quiz: {
    shadow: "dark:hover:shadow-orange-500/20",
    gradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
    text: "text-orange-600 dark:text-orange-400",
    badgeBg: "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700",
    accentText: "text-orange-700 dark:text-orange-300",
    buttonBg: "bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 hover:from-orange-600 hover:to-orange-700",
    borderBtn: "border-orange-500 dark:border-orange-400 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20"
  }
};

const defaultStyle = {
  shadow: "dark:hover:shadow-brand-500/20",
  gradient: "from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20",
  text: "text-brand-600 dark:text-brand-400",
  badgeBg: "bg-gray-50 dark:bg-dark-200 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-dark-100",
  accentText: "text-gray-700 dark:text-gray-300",
  buttonBg: "bg-gradient-to-r from-brand-500 to-brand-600 dark:from-brand-600 dark:to-brand-700 hover:from-brand-600 hover:to-brand-700",
  borderBtn: "border-brand-500 dark:border-brand-400 text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/20"
};

function getVideoId(fileName, index) {
  if (!fileName) return `video-${index}`;
  if (fileName.includes("AppAuth") || (fileName.includes("Auth") && !fileName.includes("Driver"))) return "aoun-auth-video";
  if (fileName.includes("Driver")) return "aoun-driver-video";
  if (fileName.includes("Passenger")) return "aoun-student-video";
  if (fileName.includes("webPromo") || fileName.includes("web")) return "aoun-web-promo";
  return `aoun-video-${index}`;
}

export default function render(container, data) {
  if (container.querySelector('#projects')) return; // Idempotent guard

  const section = document.createElement('section');
  section.id = 'projects';
  section.className = 'py-10 sm:py-16 md:py-24 bg-gray-50 dark:bg-dark-800/50 border-t border-gray-200 dark:border-dark-100';

  const cardsHTML = data.map((p, idx) => {
    const style = projectStyles[p.id] || defaultStyle;
    const delay = (idx + 1) * 100;

    const baseImg = p.image;
    let imgHTML = '';
    if (baseImg) {
      const img400 = baseImg.replace("-800", "-400");
      const img800 = baseImg;
      const img1200 = baseImg.replace("-800", "-1200");
      
      const tagsHTML = p.tags ? p.tags.slice(0, 2).map((t, tIdx) => {
        const isFirst = tIdx === 0;
        const badgeColor = isFirst ? (style.text.split(' ')[0] || 'text-brand-600 dark:text-brand-400') : 'text-gray-800 dark:text-gray-200';
        const isBold = isFirst ? 'font-bold' : 'font-semibold';
        let iconHTML = '';
        if (p.id === 'audiophile' && isFirst) iconHTML = '<i class="fas fa-headphones mr-1"></i>';
        return `
          <span class="px-2.5 sm:px-3 py-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm ${badgeColor} text-xs ${isBold} rounded-lg border border-white/30 dark:border-gray-700/50 shadow-lg">
            ${iconHTML}${t}
          </span>
        `;
      }).join('') : '';

      imgHTML = `
        <div class="relative w-full h-48 sm:h-56 overflow-hidden bg-gradient-to-br ${style.gradient}">
          <img
            srcset="
              ${img400}   400w,
              ${img800}   800w,
              ${img1200} 1200w
            "
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            src="${img800}"
            loading="lazy"
            decoding="async"
            width="800"
            height="600"
            alt="${p.title}"
            class="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/40 to-gray-900/20 pointer-events-none"></div>
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span class="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-widest drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              ${p.label}
            </span>
          </div>
          <div class="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-center gap-2">
            ${tagsHTML}
          </div>
        </div>
      `;
    } else {
      // Styled placeholder div
      imgHTML = `
        <div class="relative w-full h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center border-b border-gray-100 dark:border-dark-200 project-placeholder">
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/40 to-gray-900/20 pointer-events-none"></div>
          <div class="text-center relative z-10 p-4">
            <span class="text-2xl sm:text-3xl font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              ${p.label || 'PROJECT'}
            </span>
          </div>
          ${p.tags ? `
            <div class="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
              <span class="px-2.5 sm:px-3 py-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm ${style.text.split(' ')[0]} text-xs font-bold rounded-lg border border-white/30 dark:border-gray-700/50 shadow-lg">
                ${p.tags[0]}
              </span>
            </div>
          ` : ''}
        </div>
      `;
    }

    const techHTML = p.tech.map(t => `
      <span class="px-2 sm:px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-lg border border-blue-200 dark:border-blue-700">
        ${t}
      </span>
    `).join('');

    const roleSection = p.role ? `<strong>${p.role}</strong> | ` : '';

    // Standard buttons
    let buttonsHTML = '';
    if (p.links.length === 1) {
      buttonsHTML = `
        <a
          href="${p.links[0].url}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-press inline-flex items-center justify-center w-full py-2.5 sm:py-3 ${style.buttonBg} text-white font-semibold rounded-lg transition shadow-lg group-hover:shadow-brand-500/50 text-xs sm:text-sm"
        >
          ${p.links[0].label}
          <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
        </a>
      `;
    } else if (p.links.length === 2) {
      buttonsHTML = `
        <div class="grid grid-cols-2 gap-2 sm:gap-3">
          <a
            href="${p.links[0].url}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-press text-center py-2.5 sm:py-3 border-2 ${style.borderBtn} font-semibold rounded-lg transition text-xs sm:text-sm"
          >
            ${p.links[0].label}
          </a>
          <a
            href="${p.links[1].url}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-press text-center py-2.5 sm:py-3 ${style.buttonBg} text-white font-semibold rounded-lg transition shadow-lg text-xs sm:text-sm"
          >
            ${p.links[1].label}
          </a>
        </div>
      `;
    }

    // Featured Card Layout (Full Width)
    if (p.featured) {
      const featImg400 = baseImg.replace("-800", "-400");
      const featImg800 = baseImg;
      const featImg1200 = baseImg.replace("-800", "-1200");

      const videoLinksHTML = p.videos.map((v, vIdx) => {
        const targetId = getVideoId(v.file, vIdx);
        return `
          <a
            href="#${targetId}"
            class="py-2 px-2 sm:px-3 bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 font-semibold rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition text-center active:scale-95"
          >
            ${v.emoji || '📹'} ${v.label}
          </a>
        `;
      }).join('');

      return `
        <!-- Featured - Full Width -->
        <div
          class="lg:col-span-2 group bg-white dark:bg-dark-100 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl ${style.shadow} hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-dark-200 card-hover"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div class="grid md:grid-cols-2 gap-0">
            <!-- Thumbnail -->
            <div class="relative w-full h-56 sm:h-64 md:h-80 lg:h-full overflow-hidden bg-gray-100 dark:bg-dark-200">
              <img
                srcset="
                  ${featImg400}   400w,
                  ${featImg800}   800w,
                  ${featImg1200} 1200w
                "
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                src="${featImg800}"
                alt="${p.title}"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                class="absolute inset-0 w-full h-full object-contain p-4 pb-20 group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/20 pointer-events-none"></div>

              <!-- Professional Badge -->
              <div class="absolute top-3 sm:top-4 right-3 sm:right-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/30 dark:border-gray-700/50 text-gray-900 dark:text-white text-xs font-bold rounded-lg shadow-lg">
                <i class="fas fa-graduation-cap mr-1"></i>
                ${p.label}
              </div>

              <!-- Bottom Info Card with Glass Effect -->
              <div class="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-xl p-3 sm:p-4 border border-white/30 dark:border-gray-700/50 shadow-xl">
                <p class="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-2 sm:mb-3 flex items-center">
                  <i class="fas fa-puzzle-piece text-green-600 dark:text-green-400 mr-2"></i>
                  Dual Platform Solution
                </p>
                <div class="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
                  <div class="flex items-center gap-2">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i class="fas fa-mobile-alt text-blue-600 dark:text-blue-400 text-sm"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-bold text-gray-900 dark:text-white truncate">Mobile</p>
                      <p class="text-gray-600 dark:text-gray-400 truncate text-xs">Transportation</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i class="fas fa-globe text-green-600 dark:text-green-400 text-sm"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-bold text-gray-900 dark:text-white truncate">Web</p>
                      <p class="text-gray-600 dark:text-gray-400 truncate text-xs">Housing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="p-5 sm:p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition">
                  ${p.title}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  ${roleSection}${p.description}
                </p>

                <!-- Tech Stack -->
                <div class="mb-3 sm:mb-4">
                  <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    🛠️ TECHNOLOGY STACK
                  </p>
                  <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <span class="px-2 sm:px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-lg border border-green-200 dark:border-green-700">ASP.NET Core</span>
                    <span class="px-2 sm:px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-lg border border-green-200 dark:border-green-700">React.js</span>
                    <span class="px-2 sm:px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-lg border border-green-200 dark:border-green-700">Flutter</span>
                    <span class="px-2 sm:px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-lg border border-green-200 dark:border-green-700">SQL Server</span>
                  </div>
                  <div class="flex flex-wrap gap-1.5 sm:gap-2">
                    ${p.tech.filter(t => !['ASP.NET Core', 'React.js', 'Flutter', 'SQL Server'].includes(t)).map(t => `
                      <span class="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded border border-blue-200 dark:border-blue-800">${t}</span>
                    `).join('')}
                  </div>
                </div>

                <!-- Video Demos -->
                <div class="mb-4 sm:mb-6">
                  <p class="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                    📹 Video Demonstrations:
                  </p>
                  <div class="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
                    ${videoLinksHTML}
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="grid grid-cols-2 gap-2 sm:gap-3">
                ${p.details ? `
                  <a
                    href="#${p.id}-details"
                    class="btn-press text-center py-2.5 sm:py-3 border-2 ${style.borderBtn} font-semibold rounded-lg transition text-xs sm:text-sm"
                  >
                    <i class="fas fa-info-circle mr-1 sm:mr-2"></i>Full Details
                  </a>
                ` : ''}
                <a
                  href="${p.links[0].url}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-press text-center py-2.5 sm:py-3 ${style.buttonBg} text-white font-semibold rounded-lg transition shadow-lg text-xs sm:text-sm"
                >
                  <i class="fab fa-github mr-1 sm:mr-2"></i>${p.links[0].label}
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Standard Card Layout
    return `
      <div
        class="group bg-white dark:bg-dark-100 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl ${style.shadow} hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-dark-200 card-hover"
        data-aos="fade-up"
        data-aos-delay="${delay}"
        data-aos-duration="600"
      >
        ${imgHTML}
        <div class="p-5 sm:p-6 md:p-8">
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
            ${p.title}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
            ${roleSection}${p.description}
          </p>
          <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            ${techHTML}
          </div>
          ${buttonsHTML}
        </div>
      </div>
    `;
  }).join('');

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 md:mb-16 text-center"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        Featured Projects
      </h2>

      <div class="grid lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
        ${cardsHTML}
      </div>
    </div>
  `;

  container.appendChild(section);

  // Render detail showcase section for projects with details
  const detailProject = data.find(p => p.details);
  if (detailProject) {
    renderShowcase(container, detailProject);
  }
}

function renderShowcase(container, project) {
  const details = project.details;
  const showcase = document.createElement('section');
  showcase.id = `${project.id}-details`;
  showcase.className = 'py-10 sm:py-16 md:py-24 bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-100';

  let platformsHTML = '';
  details.platforms.forEach((p, idx) => {
    platformsHTML += `
      <div class="text-center">
        <i class="${p.icon} text-xl sm:text-2xl text-green-600 dark:text-green-400 mb-1"></i>
        <p class="text-xs font-semibold text-gray-700 dark:text-gray-300">${p.label}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">${p.sub}</p>
      </div>
    `;
    if (idx < details.platforms.length - 1) {
      platformsHTML += `<div class="text-green-400 text-xl sm:text-2xl">${idx === 0 ? '+' : '='}</div>`;
    }
  });

  const highlightIcons = [
    "fas fa-lock",
    "fas fa-car",
    "fas fa-user-graduate",
    "fas fa-desktop"
  ];
  const highlightsHTML = details.highlights.map((h, idx) => {
    const video = project.videos[idx];
    const icon = highlightIcons[idx] || "fas fa-video";
    const delay = idx * 100;
    const videoId = getVideoId(video.file, idx);

    return `
      <div
        id="${videoId}"
        class="bg-gray-50 dark:bg-dark-100 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-dark-200 hover:shadow-xl transition-shadow duration-300"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        <h3 class="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
            <i class="${icon} text-sm sm:text-base"></i>
          </span>
          <span class="leading-tight">${h.title}</span>
        </h3>
        <div
          class="relative w-full rounded-lg md:rounded-xl overflow-hidden mb-3 sm:mb-4 bg-gray-900 cursor-pointer video-container"
          style="padding-top: 56.25%"
          data-video-src="${video.file}"
        >
          <div class="absolute inset-0 flex items-center justify-center bg-gray-900/80 play-overlay">
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300">
              <i class="fas fa-play text-gray-900 text-xl sm:text-2xl ml-1"></i>
            </div>
          </div>
          <div class="video-placeholder absolute top-0 left-0 w-full h-full"></div>
        </div>
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          ${h.body}
        </p>
      </div>
    `;
  }).join('');

  const backendListHTML = details.backendModules.map(m => {
    const parts = m.split(" — ");
    const strongText = parts[0];
    const restText = parts[1] || "";
    return `
      <li class="flex items-start text-gray-700 dark:text-gray-300">
        <i class="fas fa-check-circle text-purple-500 mt-0.5 mr-2.5 flex-shrink-0"></i>
        <span><strong>${strongText}:</strong> ${restText}</span>
      </li>
    `;
  }).join('');

  const webListHTML = details.webModules.map(m => {
    const parts = m.split(" — ");
    const strongText = parts[0];
    const restText = parts[1] || "";
    return `
      <li class="flex items-start text-gray-700 dark:text-gray-300">
        <i class="fas fa-check-circle text-blue-500 mt-0.5 mr-2.5 flex-shrink-0"></i>
        <span><strong>${strongText}:</strong> ${restText}</span>
      </li>
    `;
  }).join('');

  const ecosystemHTML = details.ecosystem.map((e, idx) => {
    const colors = [
      { text: "text-purple-600 dark:text-purple-400", bg: "from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10", border: "border-purple-200 dark:border-purple-800", icon: "fas fa-server", badge: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
      { text: "text-blue-600 dark:text-blue-400", bg: "from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10", border: "border-blue-200 dark:border-blue-800", icon: "fas fa-globe", badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
      { text: "text-green-600 dark:text-green-400", bg: "from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10", border: "border-green-200 dark:border-green-800", icon: "fas fa-mobile-alt", badge: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" }
    ];
    const c = colors[idx] || colors[0];
    const delay = idx * 100;
    return `
      <div
        class="bg-gradient-to-br ${c.bg} rounded-lg md:rounded-xl p-4 sm:p-6 border ${c.border}"
        data-aos="fade-up"
        data-aos-delay="${delay}"
        data-aos-duration="600"
      >
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <div class="flex items-center gap-2 sm:gap-3">
            <i class="${c.icon} text-xl sm:text-2xl ${c.text}"></i>
            <h4 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              ${e.label}
            </h4>
          </div>
          <span class="px-2 py-1 ${c.badge} rounded text-xs font-semibold">
            ${e.owner}
          </span>
        </div>
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 font-semibold">
          ${e.stack}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-500">
          ${e.summary}
        </p>
      </div>
    `;
  }).join('');

  const toolsHTML = details.tools.map((t, idx) => {
    const colors = [
      "text-blue-600 dark:text-blue-400",
      "text-cyan-600 dark:text-cyan-400",
      "text-gray-900 dark:text-white",
      "text-orange-600 dark:text-orange-400",
      "text-red-600 dark:text-red-400",
      "text-indigo-600 dark:text-indigo-400"
    ];
    const color = colors[idx % colors.length];
    return `
      <div class="flex items-start gap-2 sm:gap-3">
        <div class="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
          <i class="${t.icon} ${color} text-sm sm:text-base"></i>
        </div>
        <div class="min-w-0">
          <h4 class="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm truncate">
            ${t.name}
          </h4>
          <p class="text-xs text-gray-600 dark:text-gray-400">
            ${t.sub}
          </p>
        </div>
      </div>
    `;
  }).join('');

  const leadershipHTML = details.leadership.map(l => `
    <li class="flex items-start gap-2">
      <i class="fas fa-chevron-right text-green-500 mt-0.5 text-xs flex-shrink-0"></i>
      <span>${l}</span>
    </li>
  `).join('');

  const achievementsHTML = details.achievements.map(a => `
    <li class="flex items-start gap-2">
      <i class="fas fa-chevron-right text-green-500 mt-0.5 text-xs flex-shrink-0"></i>
      <span>${a}</span>
    </li>
  `).join('');

  const statsHTML = details.stats.map((s, idx) => {
    const textColors = [
      "text-purple-600 dark:text-purple-400",
      "text-blue-600 dark:text-blue-400",
      "text-green-600 dark:text-green-400",
      "text-cyan-600 dark:text-cyan-400"
    ];
    const textColor = textColors[idx % textColors.length];
    return `
      <div class="text-center p-3 sm:p-4 md:p-6 bg-white dark:bg-dark-100 rounded-lg md:rounded-xl border border-gray-200 dark:border-dark-200 hover:shadow-lg transition-all duration-300">
        <div class="text-2xl sm:text-3xl md:text-4xl font-bold ${textColor} mb-1 sm:mb-2">
          ${s.value}
        </div>
        <p class="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
          ${s.label}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
          ${s.sub}
        </p>
      </div>
    `;
  }).join('');

  showcase.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8 sm:mb-10 md:mb-12">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          Aoun Platform - Complete Technical Showcase
        </h2>
        <p
          class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4 sm:mb-5 md:mb-6 leading-relaxed px-4"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="600"
        >
          Dual-platform solution combining <strong>React.js web application</strong> for housing & opportunities with <strong>Flutter mobile app</strong> for transportation management. Powered by <strong>ASP.NET Core</strong> backend.
        </p>
        <div
          class="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="600"
        >
          ${platformsHTML}
        </div>
      </div>

      <!-- Video Showcase Grid -->
      <div class="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12">
        ${highlightsHTML}
      </div>

      <!-- My Technical Contributions -->
      <div
        class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-blue-200 dark:border-blue-800 mb-6 sm:mb-8 md:mb-10"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        <div class="text-center mb-6 sm:mb-8">
          <span class="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            My Role: ${details.myRole}
          </span>
          <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            My Technical Contributions
          </h3>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
            ${details.myRoleSummary}
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <!-- Backend API Modules -->
          <div class="bg-white dark:bg-dark-100 rounded-lg md:rounded-xl p-4 sm:p-6 border-2 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center gap-3 mb-4 sm:mb-6">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <i class="fas fa-server text-lg sm:text-xl text-purple-600 dark:text-purple-400"></i>
              </div>
              <div>
                <h4 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Backend API Modules</h4>
                <p class="text-xs text-purple-600 dark:text-purple-400 font-medium">ASP.NET Core</p>
              </div>
            </div>
            <ul class="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              ${backendListHTML}
            </ul>
          </div>

          <!-- Web Frontend -->
          <div class="bg-white dark:bg-dark-100 rounded-lg md:rounded-xl p-4 sm:p-6 border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center gap-3 mb-4 sm:mb-6">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <i class="fas fa-globe text-lg sm:text-xl text-blue-600 dark:text-blue-400"></i>
              </div>
              <div>
                <h4 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Web Application</h4>
                <p class="text-xs text-blue-600 dark:text-blue-400 font-medium">React.js + Vite</p>
              </div>
            </div>
            <ul class="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              ${webListHTML}
            </ul>
          </div>
        </div>
      </div>

      <!-- Complete Project Ecosystem -->
      <div class="mb-6 sm:mb-8 md:mb-10">
        <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center" data-aos="fade-up">
          Complete Project Ecosystem
        </h3>
        <div class="grid md:grid-cols-3 gap-4 sm:gap-6">
          ${ecosystemHTML}
        </div>
      </div>

      <!-- My Development Tools -->
      <div
        class="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/10 dark:to-slate-900/10 rounded-lg md:rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-800 mb-6 sm:mb-8 md:mb-10"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <i class="fas fa-tools text-gray-600 dark:text-gray-400"></i>
          <span>Development Tools & Workflow</span>
        </h3>
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          ${toolsHTML}
        </div>
      </div>

      <!-- My Leadership & Technical Impact -->
      <div
        class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg md:rounded-xl p-4 sm:p-6 md:p-8 border border-green-200 dark:border-green-800 mb-6 sm:mb-8 md:mb-10"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
          Leadership & Technical Impact
        </h3>
        <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h4 class="text-base sm:text-lg font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
              <i class="fas fa-users-cog text-sm sm:text-base"></i>
              <span>Team Leadership</span>
            </h4>
            <ul class="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              ${leadershipHTML}
            </ul>
          </div>
          <div>
            <h4 class="text-base sm:text-lg font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
              <i class="fas fa-code text-sm sm:text-base"></i>
              <span>Technical Achievements</span>
            </h4>
            <ul class="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              ${achievementsHTML}
            </ul>
          </div>
        </div>
      </div>

      <!-- Project Statistics -->
      <div
        class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        ${statsHTML}
      </div>

      <!-- Back to Projects Button -->
      <div class="text-center" data-aos="fade-up" data-aos-duration="600">
        <a
          href="#projects"
          class="btn-press inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition shadow-lg hover:shadow-green-500/50 text-sm sm:text-base"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Back to All Projects
        </a>
      </div>
    </div>
  `;

  container.appendChild(showcase);
}
