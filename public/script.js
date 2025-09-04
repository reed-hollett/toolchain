(async function () {
  const res = await fetch('registry.json');
  const tools = await res.json();


  const projectsList = document.getElementById('projects-list');
  let expandedProject = null;

  // Create project items
  tools.forEach((tool, index) => {
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';
    
    // Check if project is disabled/placeholder
    const isDisabled = !tool.url || tool.url === '';
    if (isDisabled) {
      projectItem.classList.add('disabled');
    }

    const projectNumber = String(index + 1).padStart(2, '0');
    
    projectItem.innerHTML = `
      <div class="project-row">
        <span class="project-number">${projectNumber}</span>
        <span class="project-title">${tool.name}</span>
        <span class="project-icon">${isDisabled ? 'Coming soon' : (tool.emoji || '🛠️')}</span>
        <span class="project-toggle">+</span>
      </div>
      <div class="project-details">
        <p class="project-description">${tool.description}</p>
        <div class="project-meta">
          <div class="meta-item">
            <span class="meta-label">Output:</span>
            <span class="meta-value">${Array.isArray(tool.outputs) ? tool.outputs.join(', ') : tool.outputs || 'N/A'}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Tooling:</span>
            <span class="meta-value">${Array.isArray(tool.stack) ? tool.stack.join(', ') : tool.stack || 'N/A'}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Year:</span>
            <span class="meta-value">${tool.year || 'N/A'}</span>
          </div>
        </div>
        ${tool.url ? `<a href="${tool.url}" target="_blank" class="project-link">Open in new tab</a>` : ''}
      </div>
    `;

    // Add click handler for expandable projects
    if (!isDisabled) {
      projectItem.addEventListener('click', () => {
        toggleProject(projectItem, tool);
      });
    }

    projectsList.appendChild(projectItem);
    
    // Add hover functionality for projects with videos or images
    if (projectItem && !isDisabled) {
      projectItem.addEventListener('mouseenter', () => {
        console.log('Hovering over project:', tool.name);

        // Check if project has a video
        if (tool.muxPlaybackId && tool.muxPlaybackId !== 'insertIDHere') {
          console.log('Loading video for:', tool.name);
          
          // Set playback speed based on project
          let playbackRate = '2'; // Default 2x speed
          if (tool.slug === 'type-slice' || tool.slug === 'type-type' || tool.slug === 'color-image-dither') {
            playbackRate = '3'; // 3x speed
          } else if (tool.slug === 'type-cocoon') {
            playbackRate = '1'; // Regular speed
          }
          
          logoDisplay.innerHTML = `
            <mux-player 
              playback-id="${tool.muxPlaybackId}"
              autoplay="muted"
              loop
              playbackrate="${playbackRate}">
            </mux-player>
          `;
          
          // Set styles after element is created
          const muxPlayer = logoDisplay.querySelector('mux-player');
          if (muxPlayer) {
            // Custom widths for different projects
            let maxWidth = '1000px'; // Default width (bigger)
            if (tool.slug === 'type-dither') {
              maxWidth = '400px'; // Smaller width
            } else if (['type-slice', 'type-type', 'type-gravity', 'color-image-dither'].includes(tool.slug)) {
              maxWidth = '1200px'; // Much larger width for projects 3-6
            }
            
            muxPlayer.style.maxWidth = maxWidth;
            muxPlayer.style.maxHeight = '600px';
            muxPlayer.style.width = 'auto';
            muxPlayer.style.borderRadius = '8px';
            muxPlayer.style.background = 'transparent';
            muxPlayer.style.objectFit = 'contain';
            
            // Show the video after styles are applied
            setTimeout(() => {
              muxPlayer.classList.add('loaded');
            }, 100);
          }
        }
        // Check if project has a specific image
        else if (tool.slug === 'type-blur') {
          console.log('Loading image for:', tool.name);
          logoDisplay.innerHTML = `
            <img src="images/Type-blur.png" alt="${tool.name}" 
                 style="max-width: 800px; max-height: 600px; object-fit: contain;">
          `;
          
          // Show the image after it loads
          const img = logoDisplay.querySelector('img');
          if (img) {
            img.onload = () => {
              setTimeout(() => {
                img.classList.add('loaded');
              }, 100);
            };
          }
        }
        
        logoDisplay.classList.add('show');
      });

      projectItem.addEventListener('mouseleave', () => {
        console.log('Stopped hovering over:', tool.name);
        logoDisplay.classList.remove('show');
      });
    }
  });

  function toggleProject(projectItem, tool) {
    const isExpanded = projectItem.classList.contains('expanded');
    const toggle = projectItem.querySelector('.project-toggle');
    
    // Collapse currently expanded project
    if (expandedProject && expandedProject !== projectItem) {
      expandedProject.classList.remove('expanded');
      expandedProject.querySelector('.project-toggle').textContent = '+';
    }
    
    if (isExpanded) {
      // Collapse this project
      projectItem.classList.remove('expanded');
      toggle.textContent = '+';
      expandedProject = null;
    } else {
      // Expand this project
      projectItem.classList.add('expanded');
      toggle.textContent = '−';
      expandedProject = projectItem;
    }
  }

  // Logo hover functionality - set up after project items are created
  const logoDisplay = document.getElementById('logo-display');
  console.log('Logo display element:', logoDisplay);
  const toolNames = document.querySelectorAll('.tool-name');

  toolNames.forEach(toolName => {
    toolName.addEventListener('mouseenter', () => {
      const logoFile = toolName.getAttribute('data-logo');
      if (logoFile) {
        logoDisplay.innerHTML = `<img src="images/AI Code Gen Logos/${logoFile}" alt="${toolName.textContent} logo">`;
        logoDisplay.classList.add('show');
        
        // Add loaded class to image for fade-in effect
        const img = logoDisplay.querySelector('img');
        if (img) {
          img.onload = () => {
            setTimeout(() => {
              img.classList.add('loaded');
            }, 100);
          };
        }
        
        // Get the tool name to match against project stack
        const toolText = toolName.textContent.trim();
        
        // Lighten opacity of projects NOT made with this tool
        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach(item => {
          // Find the tooling meta-value specifically
          const metaItems = item.querySelectorAll('.meta-item');
          let foundTooling = false;
          
          metaItems.forEach(metaItem => {
            const label = metaItem.querySelector('.meta-label');
            const value = metaItem.querySelector('.meta-value');
            
            if (label && label.textContent.trim() === 'Tooling:' && value) {
              const stackText = value.textContent.toLowerCase();
              const toolTextLower = toolText.toLowerCase();
              
              // Check if this project was made with the hovered tool
              if (stackText.includes(toolTextLower)) {
                item.style.opacity = '1'; // Keep fully opaque
                foundTooling = true;
              }
            }
          });
          
          // If no tooling match found, dim the project
          if (!foundTooling) {
            item.style.opacity = '0.3';
          }
        });
      }
    });

    toolName.addEventListener('mouseleave', () => {
      logoDisplay.classList.remove('show');
      
      // Restore normal opacity of all project items
      const projectItems = document.querySelectorAll('.project-item');
      projectItems.forEach(item => {
        item.style.opacity = '1';
      });
    });
  });

  // Check if there's a selected project from the landing page
  const selectedProjectSlug = sessionStorage.getItem('selectedProject');
  if (selectedProjectSlug) {
    const selectedIndex = tools.findIndex(t => t.slug === selectedProjectSlug);
    if (selectedIndex !== -1) {
      const projectItem = projectsList.children[selectedIndex];
      if (projectItem && !projectItem.classList.contains('disabled')) {
        toggleProject(projectItem, tools[selectedIndex]);
      }
    }
    // Clear the session storage
    sessionStorage.removeItem('selectedProject');
  }
})();