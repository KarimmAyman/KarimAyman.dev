export default function render(container, data) {
  if (container.querySelector('#hero')) return; // Idempotent guard

  const section = document.createElement('section');
  section.id = 'hero';
  section.className = 'pt-16 sm:pt-20 pb-10 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white dark:bg-transparent relative';

  const meta = data.meta;
  const baseImg = meta.profileImage;
  const img400 = baseImg.replace("-800", "-400");
  const img800 = baseImg;
  const img1200 = baseImg.replace("-800", "-1200");

  const gitSocial = data.social.find(s => s.platform === 'github') || { url: 'https://github.com/KarimmAyman' };
  const linkedinSocial = data.social.find(s => s.platform === 'linkedin') || { url: 'https://www.linkedin.com/in/karim-ayman-fawzy' };

  // Render stats HTML grid
  const statsHTML = meta.stats.map(stat => `
    <div class="text-left py-2 border-l-2 border-brand-500/20 dark:border-brand-500/30 pl-4">
      <div class="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500 dark:from-brand-400 dark:to-purple-400">
        ${stat.value}
      </div>
      <div class="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1 leading-tight">
        ${stat.label}
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <!-- Animated background gradient -->
    <div class="absolute inset-0 dark:opacity-30 opacity-0 pointer-events-none">
      <div class="absolute top-10 left-5 sm:top-16 md:top-20 md:left-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-brand-500 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-10 right-5 sm:bottom-16 md:bottom-20 md:right-10 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 2s"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
        <!-- Text Content -->
        <div data-aos="fade-right" data-aos-duration="600" class="lg:col-span-7 lg:order-1">
          <!-- Profile Image - Mobile Only (centered at top) -->
          <div class="lg:hidden flex justify-center mb-8" data-aos="fade-up" data-aos-duration="600">
            <div class="relative w-48 h-48 sm:w-56 sm:h-56">
              <!-- Glow effect behind image -->
              <div class="absolute inset-0 bg-gradient-to-r from-brand-400 to-purple-500 dark:from-brand-500 dark:to-purple-600 rounded-2xl blur-2xl opacity-30 dark:opacity-40 animate-pulse"></div>

              <!-- Main Image -->
              <img
                srcset="
                  ${img400}   400w,
                  ${img800}   800w,
                  ${img1200} 1200w
                "
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 400px"
                src="${img800}"
                alt="${meta.name} - Full Stack Developer"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                width="800"
                height="800"
                class="relative rounded-2xl shadow-2xl dark:shadow-brand-500/20 border-4 border-white dark:border-dark-100 object-cover w-full h-full"
              />
            </div>
          </div>

          <!-- Available For Hire Badge -->
          ${meta.availableForHire ? `
          <div class="inline-flex items-center px-3 py-1.5 rounded-full border-2 border-brand-400/40 dark:border-brand-400/60 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold mb-5 sm:mb-6 backdrop-blur-sm pulse-glow">
            <span class="flex h-2 w-2 rounded-full bg-brand-500 dark:bg-brand-400 mr-2 animate-pulse"></span>
            AVAILABLE FOR HIRE
          </div>
          ` : ''}

          <!-- Tagline -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3 leading-tight">
            ${meta.tagline}
          </h1>

          <!-- Subtitle (Skills) -->
          <p class="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 dark:from-brand-400 dark:via-brand-400 dark:to-purple-400 mb-5">
            ${meta.subtitle}
          </p>

          <!-- Bio -->
          <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
            ${meta.bio}
          </p>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-10">
            ${statsHTML}
          </div>

          <!-- Actions Row -->
          <div class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
            <a
              href="#projects"
              class="btn-press px-6 sm:px-7 py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm sm:text-base font-bold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all duration-200 shadow-xl shadow-brand-500/30 dark:shadow-brand-500/50 hover:shadow-brand-500/40 glow text-center flex items-center justify-center gap-2"
            >
              <i class="fas fa-rocket text-sm"></i>
              View My Work
            </a>
            <a
              href="${meta.cvUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-press px-6 sm:px-7 py-3.5 bg-white dark:bg-dark-100 border-2 border-gray-300 dark:border-dark-200 text-gray-700 dark:text-gray-200 text-sm sm:text-base font-bold rounded-xl hover:border-brand-400 dark:hover:border-brand-400 hover:bg-gray-50 dark:hover:bg-dark-50 transition-all duration-200 text-center flex items-center justify-center gap-2"
            >
              <i class="fas fa-file-download text-sm"></i>
              Download CV
            </a>
            <a
              href="${linkedinSocial.url}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-press px-6 sm:px-7 py-3.5 bg-white dark:bg-dark-100 border-2 border-gray-300 dark:border-dark-200 text-gray-700 dark:text-gray-200 text-sm sm:text-base font-bold rounded-xl hover:border-brand-400 dark:hover:border-brand-400 hover:bg-gray-50 dark:hover:bg-dark-50 transition-all duration-200 text-center flex items-center justify-center gap-2"
            >
              <i class="fab fa-linkedin text-sm"></i>
              LinkedIn
            </a>
            <a
              href="${gitSocial.url}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-press px-6 sm:px-7 py-3.5 bg-white dark:bg-dark-100 border-2 border-gray-300 dark:border-dark-200 text-gray-700 dark:text-gray-200 text-sm sm:text-base font-bold rounded-xl hover:border-brand-400 dark:hover:border-brand-400 hover:bg-gray-50 dark:hover:bg-dark-50 transition-all duration-200 text-center flex items-center justify-center gap-2"
            >
              <i class="fab fa-github text-sm"></i>
              GitHub
            </a>
          </div>

          <!-- Location & Target Roles -->
          <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium flex-wrap">
            <span class="flex items-center gap-1.5">
              <i class="fas fa-map-marker-alt text-brand-500 dark:text-brand-400"></i>
              ${meta.location}
            </span>
            <span class="text-gray-300 dark:text-gray-700">•</span>
            <span>${meta.targetRoles}</span>
          </div>
        </div>

        <!-- Profile Image - Desktop Only (right side) -->
        <div class="hidden lg:block lg:col-span-5 relative lg:ml-auto lg:order-2" data-aos="fade-left" data-aos-duration="600">
          <div class="relative w-full max-w-md mx-auto aspect-square">
            <!-- Glow effect behind image -->
            <div class="absolute inset-0 bg-gradient-to-r from-brand-400 to-purple-500 dark:from-brand-500 dark:to-purple-600 rounded-3xl blur-3xl opacity-30 dark:opacity-40 animate-pulse"></div>

            <!-- Main Image -->
            <img
              srcset="
                ${img400}   400w,
                ${img800}   800w,
                ${img1200} 1200w
              "
              sizes="(max-width: 1024px) 0px, (max-width: 1280px) 448px, 560px"
              src="${img800}"
              alt="${meta.name} - Full Stack Developer"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              width="800"
              height="800"
              class="relative rounded-3xl shadow-2xl dark:shadow-brand-500/20 border-4 border-white dark:border-dark-100 object-cover w-full h-full transform rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(section);
}
