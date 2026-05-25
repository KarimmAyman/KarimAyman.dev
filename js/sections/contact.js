const socialStyles = {
  github: {
    bg: "from-gray-100 to-gray-200 dark:from-dark-100 dark:to-dark-200",
    text: "text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-gray-900",
    hoverBg: "from-gray-900 to-gray-700",
    shadow: "hover:shadow-gray-500/50"
  },
  linkedin: {
    bg: "from-blue-100 to-blue-200 dark:from-dark-100 dark:to-dark-200",
    text: "text-blue-600 dark:text-blue-400 hover:text-white",
    hoverBg: "from-blue-600 to-blue-700",
    shadow: "hover:shadow-blue-500/50"
  },
  instagram: {
    bg: "from-pink-100 to-purple-200 dark:from-dark-100 dark:to-dark-200",
    text: "text-pink-600 dark:text-pink-400 hover:text-white",
    hoverBg: "from-purple-600 via-pink-600 to-orange-500",
    shadow: "hover:shadow-pink-500/50"
  },
  facebook: {
    bg: "from-blue-100 to-indigo-200 dark:from-dark-100 dark:to-dark-200",
    text: "text-blue-700 dark:text-blue-400 hover:text-white",
    hoverBg: "from-blue-600 to-blue-800",
    shadow: "hover:shadow-blue-500/50"
  }
};

const defaultStyle = {
  bg: "from-gray-100 to-gray-200 dark:from-dark-100 dark:to-dark-200",
  text: "text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-gray-900",
  hoverBg: "from-gray-900 to-gray-700",
  shadow: "hover:shadow-gray-500/50"
};

export default function render(container, data) {
  if (container.querySelector('#contact')) return; // Idempotent guard

  const section = document.createElement('section');
  section.id = 'contact';
  section.className = 'py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-transparent relative overflow-hidden';

  const socialLinksHTML = data.social.map(s => {
    const style = socialStyles[s.platform] || defaultStyle;
    
    // Support correct Font Awesome brand icon classes in contact section
    let iconClass = s.icon;
    if (s.platform === 'linkedin') iconClass = 'fab fa-linkedin-in';
    if (s.platform === 'facebook') iconClass = 'fab fa-facebook-f';

    return `
      <a
        href="${s.url}"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${style.bg} flex items-center justify-center hover:${style.hoverBg} transition-all duration-300 text-xl sm:text-2xl md:text-3xl transform hover:scale-110 hover:-translate-y-1 active:scale-95 ${style.text} shadow-lg hover:shadow-2xl ${style.shadow}"
        aria-label="${s.label || s.platform}"
      >
        <i class="${iconClass} relative z-10"></i>
        <span class="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${style.hoverBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </a>
    `;
  }).join('');

  section.innerHTML = `
    <!-- Enhanced Background Decoration -->
    <div class="absolute inset-0 bg-gradient-to-br from-brand-50 via-blue-50 to-purple-50 dark:from-brand-500/5 dark:via-blue-500/5 dark:to-purple-500/5 opacity-50"></div>
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNGgtMnYyaDJ2LTJ6bTAtOGgtMnYyaDJ2LTJ6bTQgNGgtMnYyaDJ2LTJ6bS00LTRoLTJ2Mmgydi0yem0tNCA0aC0ydjJoMnYtMnptOCAwaDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40 dark:opacity-20"></div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      <!-- Header with Icon -->
      <div class="text-center mb-10 sm:mb-12 md:mb-16">
        <h2
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-brand-600 to-purple-600 dark:from-white dark:via-brand-400 dark:to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-5 md:mb-6"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          Let's Work Together
        </h2>
        <p
          class="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed px-2"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="600"
        >
          I'm currently looking for new opportunities. Whether you need a full-stack developer or have a project in mind,
          <span class="font-semibold text-brand-600 dark:text-brand-400">let's connect!</span>
        </p>
      </div>

      <!-- Enhanced Contact Cards -->
      <div class="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-10 sm:mb-12 md:mb-16">
        <!-- Email Card -->
        <a
          href="mailto:${data.meta.email}"
          class="group relative block p-6 sm:p-7 md:p-8 lg:p-10 bg-white dark:bg-dark-100 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl dark:shadow-brand-500/10 dark:hover:shadow-brand-500/30 transition-all duration-500 border border-gray-100 dark:border-dark-200 hover:border-brand-200 dark:hover:border-brand-500/50 overflow-hidden"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="600"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10">
            <div class="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-brand-100 to-blue-100 dark:from-brand-500/20 dark:to-blue-500/20 text-brand-600 dark:text-brand-400 rounded-2xl md:rounded-3xl flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-5 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-brand-500/20">
              <i class="fas fa-envelope"></i>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 text-center group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              Email Me
            </h3>
            <p class="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 text-center break-words px-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
              ${data.meta.email}
            </p>
            <div class="absolute bottom-4 right-4 text-brand-500 dark:text-brand-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <i class="fas fa-arrow-right text-xl"></i>
            </div>
          </div>
        </a>

        <!-- Phone Card -->
        <a
          href="tel:${data.meta.phone}"
          class="group relative block p-6 sm:p-7 md:p-8 lg:p-10 bg-white dark:bg-dark-100 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl dark:shadow-green-500/10 dark:hover:shadow-green-500/30 transition-all duration-500 border border-gray-100 dark:border-dark-200 hover:border-green-200 dark:hover:border-green-500/50 overflow-hidden"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="600"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10">
            <div class="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-500/20 dark:to-emerald-500/20 text-green-600 dark:text-green-400 rounded-2xl md:rounded-3xl flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-5 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-green-500/20">
              <i class="fas fa-phone-alt"></i>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 text-center group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              Call Me
            </h3>
            <p class="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 text-center group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors font-medium">
              ${data.meta.phone}
            </p>
            <div class="absolute bottom-4 right-4 text-green-500 dark:text-green-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <i class="fas fa-arrow-right text-xl"></i>
            </div>
          </div>
        </a>
      </div>

      <!-- Social Links -->
      <div
        class="text-center"
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="600"
      >
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-5 sm:mb-6 font-medium">
          <i class="fas fa-share-alt text-brand-500 dark:text-brand-400 mr-2"></i>
          Or connect with me on social media
        </p>
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5">
          ${socialLinksHTML}
        </div>
      </div>

      <!-- Download CV Button -->
      <div
        class="text-center mt-10 sm:mt-12 md:mt-14"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <a
          href="${data.meta.cvUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-brand-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg group"
        >
          <i class="fas fa-download text-lg sm:text-xl group-hover:animate-bounce"></i>
          <span>Download CV</span>
          <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </a>
      </div>
    </div>
  `;

  container.appendChild(section);
}
