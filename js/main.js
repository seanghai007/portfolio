/**
 * sxanghai Creative Studio Portfolio
 * Main Interactive Logic: Navigation, Filtering, Modals, Lightbox, Video Player
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initHeader();
  initMobileMenu();
  initProjects();
  initVideoPlayer();
  initPhotographyLightbox();
  initContact();
  initSmoothScroll();
  initDataSync();
});

function initDataSync() {
  const refreshUI = () => {
    portfolioData = getStoredData();
    const activeBtn = document.querySelector('.filter-btn.active');
    const currentCategory = activeBtn ? activeBtn.dataset.filter : 'All';
    renderProjects(currentCategory);
    updateFilterCounts();
    initPhotographyLightbox();
    initVideoPlayer();
  };

  window.addEventListener('portfolioDataUpdated', refreshUI);
  window.addEventListener('storage', (e) => {
    if (e.key === 'sxanghai_portfolio_store_v1') {
      refreshUI();
    }
  });
}

/* ==========================================================================
   1. Header & Navigation
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Highlight active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop .nav-link');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
}

/* ==========================================================================
   2. Mobile Drawer Menu
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .drawer-footer a');

  if (!menuToggle || !drawer || !backdrop) return;

  const openDrawer = () => {
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.classList.add('modal-open');
  };

  const closeDrawer = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('modal-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. Selected Work & Project Detail Modal
   ========================================================================== */
let currentProjectIndex = 0;
let filteredProjects = [...portfolioData.projects];

function initProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectModal = document.getElementById('project-modal');
  const modalClose = projectModal?.querySelector('.modal-close-btn');

  if (!projectsGrid) return;

  // Render initial project cards
  renderProjects('All');
  updateFilterCounts();

  // Filtering tabs
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filter;
      renderProjects(category);
    });
  });

  // Modal Close Events
  if (projectModal && modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });

    document.addEventListener('keydown', (e) => {
      if (!projectModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeProjectModal();
      if (e.key === 'ArrowRight') navigateProject(1);
      if (e.key === 'ArrowLeft') navigateProject(-1);
    });
  }
}

function updateFilterCounts() {
  const allCount = portfolioData.projects.length;
  const designCount = portfolioData.projects.filter(p => p.category === 'Graphic Design').length;
  const videoCount = portfolioData.projects.filter(p => p.category === 'Video Editing').length;
  const photoCount = portfolioData.projects.filter(p => p.category === 'Photography').length;

  const countEls = {
    'All': document.getElementById('count-all'),
    'Graphic Design': document.getElementById('count-design'),
    'Video Editing': document.getElementById('count-video'),
    'Photography': document.getElementById('count-photo')
  };

  if (countEls['All']) countEls['All'].textContent = `(${allCount})`;
  if (countEls['Graphic Design']) countEls['Graphic Design'].textContent = `(${designCount})`;
  if (countEls['Video Editing']) countEls['Video Editing'].textContent = `(${videoCount})`;
  if (countEls['Photography']) countEls['Photography'].textContent = `(${photoCount})`;
}

function renderProjects(category) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  filteredProjects = category === 'All' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.category === category);

  grid.innerHTML = '';

  filteredProjects.forEach((proj, idx) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View project: ${proj.title}`);

    card.innerHTML = `
      <div class="project-thumb-container ${proj.aspectRatio || 'aspect-16-10'}">
        <img 
          src="${proj.thumbnail}" 
          alt="${proj.title} project preview" 
          class="project-thumb" 
          loading="lazy"
          onerror="this.onerror=null; this.src='assets/placeholder-work.svg';"
        />
        <div class="project-overlay">
          <span class="project-view-cue">
            View Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
      <div class="project-details">
        <div class="project-meta-row">
          <span class="project-category-tag">${proj.subCategory}</span>
          <span class="project-year">${proj.year}</span>
        </div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-sub">${proj.overview.substring(0, 95)}...</p>
      </div>
    `;

    const openHandler = () => {
      currentProjectIndex = idx;
      openProjectModal(proj);
    };

    card.addEventListener('click', openHandler);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openHandler();
      }
    });

    grid.appendChild(card);
  });
}

function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  const container = document.getElementById('project-modal-content');
  if (!modal || !container) return;

  // Build deliverables tags
  const deliverablesHtml = (project.deliverables || [])
    .map(d => `<span class="badge">${d}</span>`)
    .join('');

  // Build curated gallery images with captions
  const galleryHtml = (project.gallery || [])
    .map(img => `
      <figure class="modal-gallery-item">
        <img 
          src="${img.url}" 
          alt="${project.title} detailed asset" 
          class="modal-gallery-img" 
          loading="lazy"
          onerror="this.onerror=null; this.src='assets/placeholder-work.svg';"
        />
        ${img.caption ? `<figcaption class="modal-gallery-caption">${img.caption}</figcaption>` : ''}
      </figure>
    `).join('');

  container.innerHTML = `
    <div class="modal-header-meta">
      <span class="badge badge-featured">${project.category}</span>
      <span class="mono-label">${project.subCategory}</span>
      <span class="mono-label">•</span>
      <span class="mono-label">${project.year}</span>
    </div>

    <h2 class="modal-project-title">${project.title}</h2>

    <div class="modal-meta-grid">
      <div class="modal-meta-item">
        <span class="modal-meta-label">My Role</span>
        <span class="modal-meta-value">${project.role}</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">Location / Context</span>
        <span class="modal-meta-value">${portfolioData.brand.location}</span>
      </div>
    </div>

    <div class="modal-prose">
      <h3 class="modal-section-heading">Project Overview</h3>
      <p>${project.overview}</p>

      <h3 class="modal-section-heading">Creative Approach</h3>
      <p>${project.approach}</p>

      ${project.deliverables ? `
        <h3 class="modal-section-heading">Deliverables & Scope</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.25rem;">
          ${deliverablesHtml}
        </div>
      ` : ''}
    </div>

    <div class="modal-gallery">
      <h3 class="modal-section-heading">Curated Gallery</h3>
      ${galleryHtml}
    </div>

    <div class="modal-nav-footer">
      <button class="btn btn-secondary" onclick="navigateProject(-1)" aria-label="Previous project">
        ← Previous Project
      </button>
      <span class="mono-label">${currentProjectIndex + 1} / ${filteredProjects.length}</span>
      <button class="btn btn-secondary" onclick="navigateProject(1)" aria-label="Next project">
        Next Project →
      </button>
    </div>
  `;

  modal.classList.add('active');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close-btn')?.focus();
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

window.navigateProject = function(direction) {
  if (filteredProjects.length === 0) return;
  currentProjectIndex = (currentProjectIndex + direction + filteredProjects.length) % filteredProjects.length;
  openProjectModal(filteredProjects[currentProjectIndex]);
};

/* ==========================================================================
   4. Video Showcase & Video Player Modal
   ========================================================================== */
function initVideoPlayer() {
  const videoModal = document.getElementById('video-modal');
  const videoFrameWrap = document.getElementById('video-iframe-wrap');
  const videoClose = videoModal?.querySelector('.modal-close-btn');

  // Featured Showreel Trigger
  const showreelCard = document.getElementById('showreel-trigger');
  if (showreelCard) {
    showreelCard.addEventListener('click', () => {
      openVideo(portfolioData.videos.featured.videoUrl, portfolioData.videos.featured.title);
    });
  }

  // Secondary Videos Grid
  const subgrid = document.getElementById('videos-subgrid');
  if (subgrid) {
    subgrid.innerHTML = portfolioData.videos.items.map(vid => `
      <article class="video-subcard" data-url="${vid.videoUrl}" data-title="${vid.title}">
        <div class="video-subcard-thumb-wrap">
          <img 
            src="${vid.thumbnail}" 
            alt="${vid.title} video thumbnail" 
            class="video-subcard-thumb" 
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/placeholder-video.svg';"
          />
          <span class="video-subcard-duration">${vid.duration}</span>
          <div class="video-subcard-play" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 3 20 12 6 21 6 3"></polygon>
            </svg>
          </div>
        </div>
        <div class="video-subcard-body">
          <span class="video-subcard-cat">${vid.category}</span>
          <h4 class="video-subcard-title">${vid.title}</h4>
          <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.4;">${vid.description}</p>
        </div>
      </article>
    `).join('');

    subgrid.querySelectorAll('.video-subcard').forEach(card => {
      card.addEventListener('click', () => {
        openVideo(card.dataset.url, card.dataset.title);
      });
    });
  }

  function openVideo(url, title) {
    if (!videoModal || !videoFrameWrap) return;

    // Autoplay=1 when user explicitly clicks to play, but starts muted to prevent sudden loud audio
    const embedUrl = url.includes('?') 
      ? `${url}&autoplay=1&mute=0` 
      : `${url}?autoplay=1&mute=0`;

    videoFrameWrap.innerHTML = `
      <iframe 
        class="video-iframe" 
        src="${embedUrl}" 
        title="${title}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    `;

    videoModal.classList.add('active');
    document.body.classList.add('modal-open');
    videoClose?.focus();
  }

  function closeVideo() {
    if (!videoModal || !videoFrameWrap) return;
    videoModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    // Clear iframe src to stop video and audio playback immediately
    videoFrameWrap.innerHTML = '';
  }

  if (videoModal && videoClose) {
    videoClose.addEventListener('click', closeVideo);
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideo();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideo();
      }
    });
  }
}

/* ==========================================================================
   5. Photography Gallery & Lightbox
   ========================================================================== */
let currentPhotoIndex = 0;

function initPhotographyLightbox() {
  const photoGrid = document.getElementById('photo-grid');
  const lightbox = document.getElementById('photo-lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbTitle = document.getElementById('lightbox-title');
  const lbMeta = document.getElementById('lightbox-meta');
  const lbClose = lightbox?.querySelector('.modal-close-btn');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!photoGrid) return;

  // Render photography cards
  photoGrid.innerHTML = portfolioData.photography.map((item, idx) => `
    <figure 
      class="photo-card ${item.aspect}" 
      role="button" 
      tabindex="0" 
      aria-label="View photograph: ${item.title}"
      data-index="${idx}"
    >
      <div class="photo-card-inner">
        <img 
          src="${item.thumbnail}" 
          alt="${item.title}" 
          class="photo-img" 
          loading="lazy"
          onerror="this.onerror=null; this.src='assets/placeholder-photo.svg';"
        />
        <div class="photo-overlay">
          <span class="photo-meta">${item.category} • ${item.location}</span>
          <h4 class="photo-title">${item.title}</h4>
        </div>
      </div>
    </figure>
  `).join('');

  // Click & keyboard triggers on cards
  photoGrid.querySelectorAll('.photo-card').forEach(card => {
    const handler = () => {
      const idx = parseInt(card.dataset.index, 10);
      openLightbox(idx);
    };

    card.addEventListener('click', handler);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  });

  function openLightbox(index) {
    if (!lightbox || !lbImg) return;
    currentPhotoIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.classList.add('modal-open');
    lbClose?.focus();
  }

  function updateLightboxContent() {
    const item = portfolioData.photography[currentPhotoIndex];
    if (!item) return;

    lbImg.src = item.full;
    lbImg.alt = item.title;
    if (lbTitle) lbTitle.textContent = item.title;
    if (lbMeta) {
      lbMeta.textContent = `${item.category} • ${item.location} (${currentPhotoIndex + 1} of ${portfolioData.photography.length})`;
    }
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  function stepPhoto(direction) {
    const len = portfolioData.photography.length;
    currentPhotoIndex = (currentPhotoIndex + direction + len) % len;
    updateLightboxContent();
  }

  if (lightbox) {
    lbClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-container')) {
        closeLightbox();
      }
    });

    prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      stepPhoto(-1);
    });

    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      stepPhoto(1);
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepPhoto(-1);
      if (e.key === 'ArrowRight') stepPhoto(1);
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (diff > 50) stepPhoto(-1); // swipe right -> prev
      if (diff < -50) stepPhoto(1); // swipe left -> next
    }, { passive: true });
  }
}

/* ==========================================================================
   6. Contact Form, Email Copy & Socials
   ========================================================================== */
function initContact() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast-notice');
  const toastText = document.getElementById('toast-text');
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // Copy Email button
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const emailToCopy = portfolioData.brand.email || portfolioData.brand.emailHandle;
      navigator.clipboard.writeText(emailToCopy).then(() => {
        showToast(`Email (${emailToCopy}) copied to clipboard!`);
      }).catch(() => {
        showToast(`Contact sxanghai: ${emailToCopy}`);
      });
    });
  }

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Interactive Contact Form Handling
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.elements['name']?.value.trim();
      const email = form.elements['email']?.value.trim();
      const service = form.elements['service']?.value;
      const message = form.elements['message']?.value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please fill out all required fields (Name, Email, and Project Details).';
        }
        return;
      }

      // Format mailto fallback so user can send direct message
      const subject = encodeURIComponent(`Project Inquiry: ${service || 'Creative Work'} - ${name}`);
      const body = encodeURIComponent(
        `Hi sxanghai,\n\nName: ${name}\nEmail: ${email}\nService Interested In: ${service}\n\nProject Details:\n${message}\n\nBest regards,\n${name}`
      );
      const mailtoLink = `mailto:${portfolioData.brand.email}?subject=${subject}&body=${body}`;

      // Show success feedback
      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <strong>Thank you, ${name}!</strong> Your inquiry is ready. 
          <a href="${mailtoLink}" style="text-decoration: underline; font-weight: 600; color: inherit; margin-left: 4px;">Click here to send directly via your email client</a> or check your mail app.
        `;
      }

      // Try triggering mail client
      window.location.href = mailtoLink;
      form.reset();
    });
  }
}

/* ==========================================================================
   7. Smooth Scrolling Utilities
   ========================================================================== */
function initSmoothScroll() {
  const scrollTriggers = document.querySelectorAll('a[href^="#"]');

  scrollTriggers.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
