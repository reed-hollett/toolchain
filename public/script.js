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
    
    // Hide divider lines above and below the selected card
    const allDividers = document.querySelectorAll('.card-divider');
    allDividers.forEach(divider => divider.style.display = 'block'); // Show all dividers first
    
    const cardIndex = parseInt(cardElement.dataset.toolIndex);
    
    // Hide divider above selected card (if it exists)
    if (cardIndex > 0) {
      const dividerAbove = allDividers[cardIndex - 1];
      if (dividerAbove) dividerAbove.style.display = 'none';
    }
    
    // Hide divider below selected card (if it exists)
    if (cardIndex < allDividers.length) {
      const dividerBelow = allDividers[cardIndex];
      if (dividerBelow) dividerBelow.style.display = 'none';
    }
    
    // Update preview content
    updatePreview(tool);
  }

  function updatePreview(tool) {
    let previewContent = '';
    
    // Show iframes first (if they exist)
    if (tool.slug === 'type-dither') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://www.type-tools.com/dither/dither.html" 
            width="100%" 
            height="800" 
            frameborder="0"
            style="border-radius: var(--radius);"
            title="Type Dither Tool">
          </iframe>
        </div>
      `;
    }
    
    if (tool.slug === 'type-blur') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://www.type-tools.com/blur/blur.html" 
            width="100%" 
            height="800" 
            frameborder="0"
            style="border-radius: var(--radius);"
            title="Type Blur Tool">
          </iframe>
        </div>
      `;
    }
    
    if (tool.slug === 'type-slice') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://www.type-tools.com/slice/slice.html" 
            width="100%" 
            height="800" 
            frameborder="0"
            style="border-radius: var(--radius);"
            title="Type Slice Tool">
          </iframe>
        </div>
      `;
    }
    
    if (tool.slug === 'type-line') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://www.type-tools.com/line/line.html" 
            width="100%" 
            height="800" 
            frameborder="0"
            style="border-radius: var(--radius);"
            title="Type Line Tool">
          </iframe>
        </div>
      `;
    }
    
    if (tool.slug === 'type-type') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://www.type-tools.com/type/type.html" 
            width="100%" 
            height="800" 
            frameborder="0"
            style="border-radius: var(--radius);"
            title="Type Type Tool">
          </iframe>
        </div>
      `;
    }
    
    if (tool.slug === 'type-gravity') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://poster-tools.vercel.app/" 
            width="100%" 
            height="800" 
            frameborder="0"
            style="border-radius: var(--radius);"
            title="Type Gravity Tool">
          </iframe>
        </div>
      `;
    }
    
    if (tool.slug === 'poster-gradient') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://poster-works.vercel.app/" 
            width="100%" 
            height="800" 
            frameborder="0"
            style="border-radius: var(--radius);"
            title="Poster Gradient Tool">
          </iframe>
        </div>
      `;
    }
    
    if (tool.slug === 'hotel-dust') {
      previewContent += `
        <div class="iframe">
          <iframe 
            src="https://hotel-dust.vercel.app/" 
            width="100%" 
            height="800" 
            frameborder="0"
            style="border-radius: var(--radius);"
            title="Hotel Dust Tool">
          </iframe>
        </div>
      `;
    }
    
    if (tool.slug === 'border-gen') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://preview--border-bloom-canvas-creator.lovable.app/" 
            width="100%" 
            height="800" 
            frameborder="0"
            style="border-radius: var(--radius);"
            title="Border Generator Tool">
          </iframe>
        </div>
      `;
    }
    
    if (tool.slug === 'color-image-dither') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://preview--vibrant-image-weaver.lovable.app/" 
            width="100%" 
            height="800" 
            frameborder="0"
            style="border-radius: var(--radius);"
            title="Vibrant Image Weaver Tool">
          </iframe>
        </div>
      `;
    }
    
    if (tool.slug === 'image-dither') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://poster-tools.vercel.app/" 
            width="100%" 
            height="800" 
            frameborder="0"
            style="border-radius: var(--radius); border: 1px solid #e5e7eb;"
            title="Poster Tools - Image Dither">
          </iframe>
        </div>
      `;
    }
    
    if (tool.slug === 'type-cocoon') {
      previewContent += `
        <div class="project-iframe">
          <iframe 
            src="https://poster-tools.vercel.app/" 
            width="100%" 
            height="800" 
            frameborder="0"
            style="border-radius: var(--radius);"
            title="Poster Tools - Cocoon">
          </iframe>
        </div>
      `;
    }
    
    // Show project details below iframes
    previewContent += `
      <div class="preview-details">
        <div class="project-meta">
          <span class="badge">${tool.year}</span>
          ${tool.status ? `<span class="badge">${tool.status}</span>` : ""}
          ${Array.isArray(tool.outputs) ? tool.outputs.map(o => `<span class="badge">${o}</span>`).join("") : ""}
                          ${tool.url ? `<a href="${tool.url}" target="_blank" class="project-link">Open in a new tab</a>` : ''}
        </div>
      </div>
    `;
    

    

    

    

    

    
    document.getElementById('preview-content').innerHTML = previewContent;
  }

  tools.forEach((t, index) => {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.toolIndex = index;
    
    // Check if project is clickable (has a URL or has an iframe)
    const hasIframe = ['type-dither', 'type-blur', 'type-slice', 'type-line', 'type-type', 'type-gravity', 'poster-gradient', 'hotel-dust', 'border-gen', 'color-image-dither', 'image-dither', 'type-cocoon'].includes(t.slug);
    if ((!t.url || t.url === '') && !hasIframe) {
      el.classList.add('unclickable');
    }
    
    el.innerHTML = `
      <div class="title-row">
        <span class="emoji">${t.emoji ?? "🛠️"}</span>
        <h2>${t.name}</h2>
      </div>
      <p>${t.description}</p>
    `;
    
    // Add click handler for projects with URLs or iframes
    if ((t.url && t.url !== '') || hasIframe) {
      el.addEventListener('click', () => {
        selectCard(el, t);
      });
    }
    
    grid.appendChild(el);
    
    // Add divider line after each card (except the last one)
    if (index < tools.length - 1) {
      const divider = document.createElement('div');
      divider.className = 'card-divider';
      grid.appendChild(divider);
    }
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
  