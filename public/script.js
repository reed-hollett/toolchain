(async function () {
  // Check if MUX is available
  if (typeof mux === 'undefined') {
    console.log('MUX library not loaded, videos will show as placeholders');
  } else {
    console.log('MUX library loaded successfully');
  }

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
    
    if (tool.muxPlaybackId && typeof mux !== 'undefined' && customElements.get('mux-player')) {
      // Show video player for projects with MUX playback ID
      previewContent = `
        <mux-player 
          id="mux-player"
          playback-id="${tool.muxPlaybackId}"
          style="width: 100%; height: auto; border-radius: var(--radius);"
          autoplay
          loop
          muted
          controls="false"
          preload="auto">
        </mux-player>
      `;
    } else {
      // Show placeholder video player for projects without MUX playback ID or if MUX is not available
      previewContent = `
        <div class="video-placeholder" style="width: 100%; height: 400px; background: #f3f4f6; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: #6b7280; font-size: 18px;">
          ${tool.muxPlaybackId ? 'Video loading...' : 'Video preview coming soon'}
        </div>
      `;
    }
    
    // Always show the project details below the preview/video
    previewContent += `
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
      <div class="meta">
        <span class="badge">${t.year}</span>
        ${t.status ? `<span class="badge">${t.status}</span>` : ""}
        ${Array.isArray(t.outputs) ? t.outputs.map(o => `<span class="badge">${o}</span>`).join("") : ""}
      </div>
    `;
    
    // Add click handler for card selection
    el.addEventListener('click', () => {
      selectCard(el, t);
    });
    
    grid.appendChild(el);
  });
  
  // Select first card immediately after all cards are created
  if (tools.length > 0) {
    const firstCard = document.querySelector('.card');
    selectCard(firstCard, tools[0]);
  }
})();
  