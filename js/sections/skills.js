const categoryStyles = {
  Frontend: {
    icon: "fab fa-react",
    grad: "from-blue-100 to-brand-100 dark:from-blue-500/20 dark:to-brand-500/20",
    text: "text-blue-600 dark:text-brand-400",
    shadow: "dark:hover:shadow-brand-500/10"
  },
  Backend: {
    icon: "fas fa-server",
    grad: "from-purple-100 to-pink-100 dark:from-purple-500/20 dark:to-pink-500/20",
    text: "text-purple-600 dark:text-purple-400",
    shadow: "dark:hover:shadow-purple-500/10"
  },
  "Data & Tools": {
    icon: "fas fa-database",
    grad: "from-green-100 to-emerald-100 dark:from-green-500/20 dark:to-emerald-500/20",
    text: "text-green-600 dark:text-green-400",
    shadow: "dark:hover:shadow-green-500/10"
  },
  Mobile: {
    icon: "fas fa-mobile-alt",
    grad: "from-amber-100 to-orange-100 dark:from-amber-500/20 dark:to-orange-500/20",
    text: "text-amber-600 dark:text-amber-400",
    shadow: "dark:hover:shadow-amber-500/10"
  },
  "AI & Prompting": {
    icon: "fas fa-brain",
    grad: "from-cyan-100 to-indigo-100 dark:from-cyan-500/20 dark:to-indigo-500/20",
    text: "text-cyan-600 dark:text-indigo-400",
    shadow: "dark:hover:shadow-indigo-500/10"
  }
};

const defaultStyle = {
  icon: "fas fa-code",
  grad: "from-brand-100 to-purple-100 dark:from-brand-500/20 dark:to-purple-500/20",
  text: "text-brand-600 dark:text-brand-400",
  shadow: "dark:hover:shadow-brand-500/10"
};

export default function render(container, data) {
  if (container.querySelector('#skills')) return; // Idempotent guard

  const section = document.createElement('section');
  section.id = 'skills';
  section.className = 'py-10 sm:py-16 md:py-24 bg-gray-50 dark:bg-dark-800/50 border-y border-gray-200 dark:border-dark-100';

  const categories = Object.keys(data);
  const cardsHTML = categories.map((cat, idx) => {
    const style = categoryStyles[cat] || defaultStyle;
    const delay = (idx + 1) * 100;
    const skillsList = data[cat];

    const badgesHTML = skillsList.map(skill => `
      <span
        class="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-gray-100 dark:bg-dark-200 text-gray-600 dark:text-gray-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-brand-500/10 dark:hover:bg-brand-500/20 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5"
      >
        <i class="${skill.icon} text-brand-500 dark:text-brand-400"></i>
        <span>${skill.name}</span>
      </span>
    `).join('');

    return `
      <div
        class="card-hover bg-white dark:bg-dark-100 p-5 sm:p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-2xl ${style.shadow} transition-all duration-300 border border-gray-100 dark:border-dark-200 group"
        data-aos="fade-up"
        data-aos-delay="${delay}"
        data-aos-duration="600"
      >
        <div
          class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${style.grad} rounded-xl flex items-center justify-center ${style.text} text-2xl sm:text-3xl mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300"
        >
          <i class="${style.icon}"></i>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          ${cat}
        </h3>
        <div class="flex flex-wrap gap-2">
          ${badgesHTML}
        </div>
      </div>
    `;
  }).join('');

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Technical Expertise
        </h2>
        <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          My tech stack allows me to build complete solutions from database design to user interface.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
        ${cardsHTML}
      </div>
    </div>
  `;

  container.appendChild(section);
}
