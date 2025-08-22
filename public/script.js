(async function () {

  const res = await fetch('registry.json');
  const tools = await res.json();

  const grid = document.getElementById('grid');
  const previewContent = document.getElementById('preview-content');
  let activeCard = null;

  function selectCard(cardElement, tool) {
    // Remove active class from all cards
    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
    
    // Add active class to selected card
    cardElement.classList.add('active');
    activeCard = cardElement;
    
    // Update preview content
    updatePreview(tool);
  }

  function updatePreview(tool) {
    let previewContent = '';
    
    // Always show the project details first
    previewContent = `
      <div class="preview-details">
        <h3>${tool.name}</h3>
        <p>${tool.description}</p>
        <div class="project-meta">
          <span class="badge">${tool.year}</span>
          ${tool.status ? `<span class="badge">${tool.status}</span>` : ""}
          ${Array.isArray(tool.outputs) ? tool.outputs.map(o => `<span class="badge">${o}</span>`).join("") : ""}
        </div>
        ${tool.url ? `<a href="${tool.url}" target="_blank" class="project-link">Visit Project →</a>` : ''}
      </div>
    `;
    
    // Add iframe for type-dither project
    if (tool.slug === 'type-dither') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://www.type-tools.com/dither/dither.html" 
            width="100%" 
            height="600" 
            frameborder="0"
            style="border-radius: var(--radius); border: 1px solid #e5e7eb;"
            title="Type Dither Tool">
          </iframe>
        </div>
      `;
    }
    
    // Add iframe for type-blur project
    if (tool.slug === 'type-blur') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://www.type-tools.com/blur/blur.html" 
            width="100%" 
            height="600" 
            frameborder="0"
            style="border-radius: var(--radius); border: 1px solid #e5e7eb;"
            title="Type Blur Tool">
          </iframe>
        </div>
      `;
    }
    
    // Add iframe for type-slice project
    if (tool.slug === 'type-slice') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://www.type-tools.com/slice/slice.html" 
            width="100%" 
            height="600" 
            frameborder="0"
            style="border-radius: var(--radius); border: 1px solid #e5e7eb;"
            title="Type Slice Tool">
          </iframe>
        </div>
      `;
    }
    
    // Add iframe for type-line project
    if (tool.slug === 'type-line') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://www.type-tools.com/line/line.html" 
            width="100%" 
            height="600" 
            frameborder="0"
            style="border-radius: var(--radius); border: 1px solid #e5e7eb;"
            title="Type Line Tool">
          </iframe>
        </div>
      `;
    }
    
    // Add iframe for type-type project
    if (tool.slug === 'type-type') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://www.type-tools.com/type/type.html" 
            width="100%" 
            height="600" 
            frameborder="0"
            style="border-radius: var(--radius); border: 1px solid #e5e7eb;"
            title="Type Type Tool">
          </iframe>
        </div>
      `;
    }
    
    // Add iframe for type-gravity project
    if (tool.slug === 'type-gravity') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://poster-tools.vercel.app/" 
            width="100%" 
            height="600" 
            frameborder="0"
            style="border-radius: var(--radius); border: 1px solid #e5e7eb;"
            title="Type Gravity Tool">
          </iframe>
        </div>
      `;
    }
    
    // Add iframe for poster-gradient project
    if (tool.slug === 'poster-gradient') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://poster-works.vercel.app/" 
            width="100%" 
            height="600" 
            frameborder="0"
            style="border-radius: var(--radius); border: 1px solid #e5e7eb;"
            title="Poster Gradient Tool">
          </iframe>
        </div>
      `;
    }
    
    // Add iframe for hotel-dust project
    if (tool.slug === 'hotel-dust') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://hotel-dust.vercel.app/" 
            width="100%" 
            height="600" 
            frameborder="0"
            style="border-radius: var(--radius); border: 1px solid #e5e7eb;"
            title="Hotel Dust Tool">
          </iframe>
        </div>
      `;
    }
    
    // Add iframe for border-gen project
    if (tool.slug === 'border-gen') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://preview--border-bloom-canvas-creator.lovable.app/" 
            width="100%" 
            height="600" 
            frameborder="0"
            style="border-radius: var(--radius); border: 1px solid #e5e7eb;"
            title="Border Generator Tool">
          </iframe>
        </div>
      `;
    }
    
    // Add iframe for color-image-dither project
    if (tool.slug === 'color-image-dither') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://preview--vibrant-image-weaver.lovable.app/" 
            width="100%" 
            height="600" 
            frameborder="0"
            style="border-radius: var(--radius); border: 1px solid #e5e7eb;"
            title="Vibrant Image Weaver Tool">
          </iframe>
        </div>
      `;
    }
    
    // Add iframe for image-dither project
    if (tool.slug === 'image-dither') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://poster-tools.vercel.app/" 
            width="100%" 
            height="600" 
            frameborder="0"
            style="border-radius: var(--radius); border: 1px solid #e5e7eb;"
            title="Poster Tools - Image Dither">
          </iframe>
        </div>
      `;
    }
    
    // Add iframe for cocoon project
    if (tool.slug === 'cocoon') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://poster-tools.vercel.app/" 
            width="100%" 
            height="600" 
            frameborder="0"
            style="border-radius: var(--radius); border: 1px solid #e5e7eb;"
            title="Poster Tools - Cocoon">
          </iframe>
        </div>
      `;
    }
    
    document.getElementById('preview-content').innerHTML = previewContent;
  }

  tools.forEach((t, index) => {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.toolIndex = index;
    
    el.innerHTML = `
      <div class="title-row">
        <span class="emoji">${t.emoji ?? "🛠️"}</span>
        <h2>${t.name}</h2>
      </div>
      <p>${t.description}</p>
    `;
    
    // Add click handler for card selection
    el.addEventListener('click', () => {
      selectCard(el, t);
    });
    
    grid.appendChild(el);
  });
  
  // Check if there's a selected project from the landing page
  const selectedProjectSlug = sessionStorage.getItem('selectedProject');
  let projectToSelect = 0; // Default to first project
  
  if (selectedProjectSlug) {
    const selectedIndex = tools.findIndex(t => t.slug === selectedProjectSlug);
    if (selectedIndex !== -1) {
      projectToSelect = selectedIndex;
    }
    // Clear the session storage
    sessionStorage.removeItem('selectedProject');
  }
  
  // Select the appropriate card
  if (tools.length > 0) {
    const cards = document.querySelectorAll('.card');
    if (cards[projectToSelect]) {
      selectCard(cards[projectToSelect], tools[projectToSelect]);
    }
  }
  
  // Initialize page selector dropdown
  initializePageSelector();
  
  function initializePageSelector() {
    const pageSelector = document.querySelector('.page-selector');
    pageSelector.addEventListener('change', (e) => {
      if (e.target.value === 'gallery') {
        window.location.href = 'index.html';
      }
    });
  }
})();
  