export default function render(container, data) {
  if (container.querySelector('#experience')) return; // Idempotent guard

  const section = document.createElement('section');
  section.id = 'experience';
  section.className = 'py-10 sm:py-16 md:py-24 bg-white dark:bg-transparent';

  const expHTML = data.experience.map(item => {
    const isWork = item.type === 'work';
    const bulletBg = isWork
      ? 'bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-500/50 text-white'
      : 'bg-gray-100 dark:bg-dark-100 border border-gray-300 dark:border-dark-200 text-gray-600 dark:text-gray-400';
    const iconClass = isWork ? 'fas fa-briefcase' : 'fas fa-graduation-cap';
    const tagBg = isWork
      ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10'
      : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-200';

    const techHTML = item.tech
      ? `
        <div class="flex flex-wrap gap-1.5 mt-3">
          ${item.tech.map(t => `<span class="px-2 py-0.5 bg-gray-100 dark:bg-dark-200 text-gray-500 dark:text-gray-400 text-xs rounded border border-gray-200 dark:border-dark-100">${t}</span>`).join('')}
        </div>
      `
      : '';

    return `
      <div
        class="flex gap-3 sm:gap-4 md:gap-6"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        <div class="flex flex-col items-center flex-shrink-0">
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full ${bulletBg} flex-shrink-0 flex items-center justify-center text-xs sm:text-sm">
            <i class="${iconClass}"></i>
          </div>
          <div class="w-0.5 h-full bg-gray-200 dark:bg-dark-200 mt-2"></div>
        </div>
        <div class="flex-1 pb-6 sm:pb-8">
          <span class="inline-block px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-bold uppercase tracking-wide rounded-full mb-2 sm:mb-3 ${tagBg}">
            ${item.period}
          </span>
          <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">
            ${item.role}
          </h3>
          <p class="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium mt-1">
            ${item.company}
          </p>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 sm:mt-3 leading-relaxed">
            ${item.description}
          </p>
          ${techHTML}
        </div>
      </div>
    `;
  }).join('');

  const certsListHTML = data.certifications.map(c => `
    <li class="flex items-start">
      <i class="fas fa-certificate text-brand-500 dark:text-brand-400 mt-1 mr-3 flex-shrink-0 text-sm sm:text-base"></i>
      <span>
        <strong class="text-gray-700 dark:text-gray-300 font-semibold">${c.issuer}:</strong>
        ${c.detail}
      </span>
    </li>
  `).join('');

  section.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-10 md:mb-12"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        Experience & Education
      </h2>

      <div class="space-y-8 sm:space-y-10 md:space-y-12">
        ${expHTML}

        <!-- Certifications Item -->
        <div
          class="flex gap-3 sm:gap-4 md:gap-6"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div class="flex flex-col items-center flex-shrink-0">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-dark-100 border border-gray-300 dark:border-dark-200 flex-shrink-0 flex items-center justify-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              <i class="fas fa-award"></i>
            </div>
          </div>
          <div class="flex-1">
            <span class="inline-block px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-100 dark:bg-dark-200 rounded-full mb-2 sm:mb-3">
              Certifications
            </span>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">
              Specialized Training
            </h3>
            <ul class="mt-3 sm:mt-4 space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              ${certsListHTML}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(section);
}
