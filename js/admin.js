/**
 * sxanghai Studio Manager — Admin Dashboard Logic
 * Features: Passcode Protection, Drag & Drop Upload, Drag to Reorder, LocalStorage Persistence, Export
 */

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initTabs();
  initProjectDropzone();
  initProjectForm();
  renderReorderList();
  initPhotographyManager();
  initVideoSettings();
  initBrandSettings();
  initExportAndReset();
});

/* ==========================================================================
   1. Authentication Gate
   ========================================================================== */
function initAuth() {
  const gate = document.getElementById('auth-gate');
  const form = document.getElementById('auth-form');
  const input = document.getElementById('auth-input');
  const errorEl = document.getElementById('auth-error');
  const lockBtn = document.getElementById('lock-btn');

  // Check existing session
  if (checkAdminAuthenticated()) {
    gate.style.display = 'none';
  } else {
    gate.style.display = 'flex';
    input?.focus();
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const entered = input.value.trim();
    const currentCode = getAdminPasscode();

    if (entered === currentCode) {
      setAdminAuthenticated(true);
      gate.style.opacity = '0';
      gate.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        gate.style.display = 'none';
      }, 300);
      showToast('Dashboard unlocked. Welcome, sxanghai.');
    } else {
      errorEl.style.display = 'block';
      input.value = '';
      input.focus();
    }
  });

  lockBtn?.addEventListener('click', () => {
    setAdminAuthenticated(false);
    gate.style.display = 'flex';
    gate.style.opacity = '1';
    if (input) input.value = '';
    showToast('Dashboard locked.');
  });
}

/* ==========================================================================
   2. Tab Switching
   ========================================================================== */
function initTabs() {
  const tabBtns = document.querySelectorAll('.dash-tab-btn');
  const tabPanels = document.querySelectorAll('.dash-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(btn.dataset.tab);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

/* ==========================================================================
   3. Drag & Drop File Upload Zone
   ========================================================================== */
let uploadedCoverDataUrl = '';

function initProjectDropzone() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const previewWrap = document.getElementById('drop-preview-wrap');
  const previewImg = document.getElementById('preview-img');
  const previewName = document.getElementById('preview-name');
  const removeBtn = document.getElementById('remove-preview-btn');
  const hiddenUrlInput = document.getElementById('project-thumb-url');

  if (!dropzone || !fileInput) return;

  // Click to open file picker
  dropzone.addEventListener('click', () => fileInput.click());

  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  });

  // Drag visual highlight
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => dropzone.classList.add('drag-over'), false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => dropzone.classList.remove('drag-over'), false);
  });

  // Handle dropped files
  dropzone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageFile(files[0]);
    }
  });

  // Handle selected file via input
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      handleImageFile(fileInput.files[0]);
    }
  });

  function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP, SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedCoverDataUrl = e.target.result;
      previewImg.src = uploadedCoverDataUrl;
      previewName.textContent = file.name;
      previewWrap.style.display = 'flex';
      hiddenUrlInput.value = uploadedCoverDataUrl;
      showToast(`Artwork "${file.name}" uploaded successfully!`);
    };
    reader.readAsDataURL(file);
  }

  // Remove uploaded preview
  removeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    uploadedCoverDataUrl = '';
    previewImg.src = '';
    previewWrap.style.display = 'none';
    hiddenUrlInput.value = '';
    fileInput.value = '';
  });
}

/* ==========================================================================
   4. Project Form (Add & Edit)
   ========================================================================== */
function initProjectForm() {
  const form = document.getElementById('project-form');
  const editIdInput = document.getElementById('edit-project-id');
  const heading = document.getElementById('form-heading');
  const submitBtn = document.getElementById('submit-proj-btn');
  const resetBtn = document.getElementById('reset-form-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const editId = editIdInput.value;
    const title = document.getElementById('proj-title').value.trim();
    const category = document.getElementById('proj-category').value;
    const subCategory = document.getElementById('proj-subcategory').value.trim() || category;
    const year = document.getElementById('proj-year').value.trim() || new Date().getFullYear().toString();
    const aspectRatio = document.getElementById('proj-aspect').value;
    const role = document.getElementById('proj-role').value.trim() || `${category} Specialist`;
    const overview = document.getElementById('proj-overview').value.trim();
    const approach = document.getElementById('proj-approach').value.trim() || 'Custom creative solution.';
    const deliverablesRaw = document.getElementById('proj-deliverables').value.trim();
    const deliverables = deliverablesRaw ? deliverablesRaw.split(',').map(s => s.trim()).filter(Boolean) : [category];
    const videoUrl = document.getElementById('proj-video-url').value.trim();
    const thumbUrl = document.getElementById('project-thumb-url').value || 'assets/placeholder-work.svg';

    if (!title || !overview) {
      alert('Please enter a project title and overview.');
      return;
    }

    if (editId) {
      // Update existing project
      const index = portfolioData.projects.findIndex(p => p.id === editId);
      if (index !== -1) {
        portfolioData.projects[index] = {
          ...portfolioData.projects[index],
          title,
          category,
          subCategory,
          year,
          aspectRatio,
          role,
          overview,
          approach,
          deliverables,
          videoUrl: videoUrl || portfolioData.projects[index].videoUrl,
          thumbnail: thumbUrl || portfolioData.projects[index].thumbnail
        };
        showToast(`Updated "${title}"`);
      }
    } else {
      // Create new project
      const newId = 'proj-' + Date.now();
      const newProject = {
        id: newId,
        title,
        category,
        subCategory,
        year,
        featured: true,
        thumbnail: thumbUrl,
        aspectRatio,
        overview,
        role,
        approach,
        deliverables,
        videoUrl: videoUrl || undefined,
        gallery: [
          { url: thumbUrl, caption: `${title} — Project Overview` }
        ]
      };
      // Place new project at top of list
      portfolioData.projects.unshift(newProject);
      showToast(`Created & added "${title}" to top of portfolio!`);
    }

    // Save state
    savePortfolioStore(portfolioData);
    renderReorderList();
    resetForm();
  });

  resetBtn?.addEventListener('click', resetForm);

  function resetForm() {
    form.reset();
    editIdInput.value = '';
    uploadedCoverDataUrl = '';
    document.getElementById('project-thumb-url').value = '';
    document.getElementById('drop-preview-wrap').style.display = 'none';
    heading.textContent = 'Upload New Work';
    submitBtn.textContent = 'Save to Portfolio Archive';
    resetBtn.style.display = 'none';
  }

  // Populate form for editing
  window.editProject = function(id) {
    const proj = portfolioData.projects.find(p => p.id === id);
    if (!proj) return;

    editIdInput.value = proj.id;
    document.getElementById('proj-title').value = proj.title;
    document.getElementById('proj-category').value = proj.category;
    document.getElementById('proj-subcategory').value = proj.subCategory || '';
    document.getElementById('proj-year').value = proj.year || '';
    document.getElementById('proj-aspect').value = proj.aspectRatio || 'aspect-16-10';
    document.getElementById('proj-role').value = proj.role || '';
    document.getElementById('proj-overview').value = proj.overview || '';
    document.getElementById('proj-approach').value = proj.approach || '';
    document.getElementById('proj-deliverables').value = (proj.deliverables || []).join(', ');
    document.getElementById('proj-video-url').value = proj.videoUrl || '';

    // Show current thumbnail
    if (proj.thumbnail) {
      document.getElementById('project-thumb-url').value = proj.thumbnail;
      document.getElementById('preview-img').src = proj.thumbnail;
      document.getElementById('preview-name').textContent = proj.title + ' Cover';
      document.getElementById('drop-preview-wrap').style.display = 'flex';
    }

    heading.textContent = `Edit "${proj.title}"`;
    submitBtn.textContent = 'Update Project';
    resetBtn.style.display = 'inline-block';

    // Scroll up to form
    form.scrollIntoView({ behavior: 'smooth' });
  };

  // Delete project
  window.deleteProject = function(id) {
    const proj = portfolioData.projects.find(p => p.id === id);
    if (!proj) return;

    if (confirm(`Are you sure you want to delete "${proj.title}" from your portfolio?`)) {
      portfolioData.projects = portfolioData.projects.filter(p => p.id !== id);
      savePortfolioStore(portfolioData);
      renderReorderList();
      showToast(`Deleted "${proj.title}"`);
    }
  };
}

/* ==========================================================================
   5. Drag to Reorder Dashboard (HTML5 Drag & Drop)
   ========================================================================== */
function renderReorderList() {
  const container = document.getElementById('reorder-container');
  const countEl = document.getElementById('reorder-count');
  if (!container) return;

  const projects = portfolioData.projects;
  if (countEl) countEl.textContent = `(${projects.length} Projects)`;

  container.innerHTML = '';

  let draggedItemIndex = null;

  projects.forEach((proj, index) => {
    const card = document.createElement('div');
    card.className = 'drag-card';
    card.setAttribute('draggable', 'true');
    card.dataset.index = index;
    card.dataset.id = proj.id;

    card.innerHTML = `
      <div class="drag-card-left">
        <span class="drag-handle" title="Drag to reorder">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/>
            <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
            <circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>
          </svg>
        </span>
        <span class="drag-card-index">#${index + 1}</span>
        <img 
          src="${proj.thumbnail}" 
          alt="${proj.title}" 
          class="drag-card-thumb" 
          onerror="this.src='assets/placeholder-work.svg'"
        />
        <div class="drag-card-info">
          <div class="drag-card-title">${proj.title}</div>
          <div class="drag-card-meta">${proj.category} • ${proj.year}</div>
        </div>
      </div>

      <div class="drag-card-actions">
        <button type="button" class="btn btn-secondary btn-action-sm" onclick="editProject('${proj.id}')" title="Edit details">
          Edit
        </button>
        <button type="button" class="btn btn-secondary btn-action-sm" onclick="deleteProject('${proj.id}')" style="color: #dc2626; border-color: #fecaca;" title="Delete project">
          Delete
        </button>
      </div>
    `;

    // --- HTML5 Drag Events ---
    card.addEventListener('dragstart', (e) => {
      draggedItemIndex = index;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', index);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      document.querySelectorAll('.drag-card').forEach(c => c.classList.remove('drag-target-over'));
    });

    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      card.classList.add('drag-target-over');
    });

    card.addEventListener('dragleave', () => {
      card.classList.remove('drag-target-over');
    });

    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('drag-target-over');
      const targetIndex = index;

      if (draggedItemIndex !== null && draggedItemIndex !== targetIndex) {
        // Splice and reinsert item
        const [movedItem] = portfolioData.projects.splice(draggedItemIndex, 1);
        portfolioData.projects.splice(targetIndex, 0, movedItem);

        // Save immediately
        savePortfolioStore(portfolioData);
        renderReorderList();
        showToast(`Moved "${movedItem.title}" to position #${targetIndex + 1}!`);
      }
    });

    container.appendChild(card);
  });
}

/* ==========================================================================
   6. Photography Gallery Manager
   ========================================================================== */
function initPhotographyManager() {
  const dropzone = document.getElementById('photo-dropzone');
  const fileInput = document.getElementById('photo-file-input');
  const grid = document.getElementById('photo-manager-grid');

  if (!grid) return;

  function renderPhotos() {
    grid.innerHTML = portfolioData.photography.map((item, idx) => `
      <div style="background-color: var(--bg-primary); border: 1px solid var(--border-light); border-radius: 8px; overflow: hidden; position: relative;">
        <img src="${item.thumbnail}" alt="${item.title}" style="width: 100%; height: 140px; object-fit: cover;" onerror="this.src='assets/placeholder-photo.svg'" />
        <div style="padding: 0.75rem;">
          <div style="font-weight: 600; font-size: 0.875rem;">${item.title}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">${item.category} • ${item.location}</div>
        </div>
        <button 
          onclick="deletePhoto(${idx})" 
          style="position: absolute; top: 6px; right: 6px; width: 24px; height: 24px; background: rgba(9,9,11,0.8); color: #fff; border-radius: 50%; font-size: 12px; cursor: pointer;"
          title="Delete photograph"
        >×</button>
      </div>
    `).join('');
  }

  window.deletePhoto = function(idx) {
    portfolioData.photography.splice(idx, 1);
    savePortfolioStore(portfolioData);
    renderPhotos();
    showToast('Photo removed.');
  };

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
      Array.from(fileInput.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          portfolioData.photography.unshift({
            id: 'photo-' + Date.now(),
            title: file.name.replace(/\.[^/.]+$/, ""),
            category: 'Architecture',
            location: 'Phnom Penh City',
            aspect: 'portrait',
            thumbnail: e.target.result,
            full: e.target.result,
            notes: 'Uploaded via Studio Manager'
          });
          savePortfolioStore(portfolioData);
          renderPhotos();
        };
        reader.readAsDataURL(file);
      });
      showToast('Uploaded new photo(s)!');
    });
  }

  renderPhotos();
}

/* ==========================================================================
   7. Video & Brand Settings
   ========================================================================== */
function initVideoSettings() {
  const form = document.getElementById('video-settings-form');
  if (!form) return;

  const f = portfolioData.videos.featured;
  document.getElementById('cfg-showreel-title').value = f.title || '';
  document.getElementById('cfg-showreel-url').value = f.videoUrl || '';
  document.getElementById('cfg-showreel-dur').value = f.duration || '';
  document.getElementById('cfg-showreel-desc').value = f.description || '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    portfolioData.videos.featured.title = document.getElementById('cfg-showreel-title').value.trim();
    portfolioData.videos.featured.videoUrl = document.getElementById('cfg-showreel-url').value.trim();
    portfolioData.videos.featured.duration = document.getElementById('cfg-showreel-dur').value.trim();
    portfolioData.videos.featured.description = document.getElementById('cfg-showreel-desc').value.trim();

    savePortfolioStore(portfolioData);
    showToast('Showreel settings updated!');
  });
}

function initBrandSettings() {
  const form = document.getElementById('brand-settings-form');
  const passcodeForm = document.getElementById('passcode-form');

  if (form) {
    const b = portfolioData.brand;
    document.getElementById('cfg-brand-name').value = b.name || '';
    document.getElementById('cfg-brand-title').value = b.title || '';
    document.getElementById('cfg-brand-location').value = b.location || '';
    document.getElementById('cfg-brand-email').value = b.email || '';

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      portfolioData.brand.name = document.getElementById('cfg-brand-name').value.trim();
      portfolioData.brand.title = document.getElementById('cfg-brand-title').value.trim();
      portfolioData.brand.location = document.getElementById('cfg-brand-location').value.trim();
      portfolioData.brand.email = document.getElementById('cfg-brand-email').value.trim();

      savePortfolioStore(portfolioData);
      showToast('Contact info saved!');
    });
  }

  if (passcodeForm) {
    passcodeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newCode = document.getElementById('new-passcode-input').value.trim();
      if (newCode) {
        setAdminPasscode(newCode);
        document.getElementById('new-passcode-input').value = '';
        showToast('Passcode updated successfully!');
      }
    });
  }
}

/* ==========================================================================
   8. Export data.js & Reset Store
   ========================================================================== */
function initExportAndReset() {
  const exportBtn = document.getElementById('export-code-btn');
  const resetBtn = document.getElementById('reset-defaults-btn');

  // Export current portfolioData as a downloadable data.js file
  exportBtn?.addEventListener('click', () => {
    const fileContent = `/**
 * sxanghai Portfolio Data Store
 * Exported from Studio Manager Dashboard on ${new Date().toLocaleDateString()}
 */

const STORAGE_KEY = 'sxanghai_portfolio_store_v1';
const PASSCODE_KEY = 'sxanghai_admin_passcode';

const initialPortfolioData = ${JSON.stringify(portfolioData, null, 2)};

${getStoredData.toString()}

let portfolioData = getStoredData();

${savePortfolioStore.toString()}

${resetPortfolioStore.toString()}

${getAdminPasscode.toString()}

${setAdminPasscode.toString()}

${checkAdminAuthenticated.toString()}

${setAdminAuthenticated.toString()}
`;

    const blob = new Blob([fileContent], { type: 'text/javascript;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Downloaded fresh data.js! Replace js/data.js to keep changes permanent.');
  });

  resetBtn?.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all portfolio data back to the default sample archive?')) {
      resetPortfolioStore();
      location.reload();
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('dash-toast');
  const text = document.getElementById('dash-toast-text');
  if (!toast || !text) return;
  text.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
