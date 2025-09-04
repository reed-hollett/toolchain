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
          
          // Create video with absolute positioning to bypass all layout constraints
          const existingVideo = document.querySelector('.project-video');
          if (existingVideo) {
            existingVideo.remove();
          }
          
          const muxPlayer = document.createElement('mux-player');
          muxPlayer.setAttribute('playback-id', tool.muxPlaybackId);
          muxPlayer.setAttribute('autoplay', 'muted');
          muxPlayer.setAttribute('loop', '');
          muxPlayer.setAttribute('playbackrate', playbackRate);
          muxPlayer.className = 'project-video';
          
          document.body.appendChild(muxPlayer);
          
          // Set styles directly on the mux-player element with aggressive sizing
          // Custom widths for different projects - using fixed width instead of max-width
          let width = '800px'; // Default width
          if (tool.slug === 'type-dither') {
            width = '400px'; // Smaller width
          } else if (['type-slice', 'type-type', 'type-gravity', 'color-image-dither', 'image-dither', 'border-gen', 'poster-gradient', 'type-cocoon'].includes(tool.slug)) {
            width = '1200px'; // Much larger width for projects 3-10
          }
          
          // Force styles with setProperty to override any CSS
          muxPlayer.style.setProperty('position', 'fixed', 'important');
          muxPlayer.style.setProperty('top', '50%', 'important');
          muxPlayer.style.setProperty('left', 'calc(50% + var(--sidebar-width) / 2)', 'important');
          muxPlayer.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
          muxPlayer.style.setProperty('z-index', '200', 'important');
          muxPlayer.style.setProperty('width', width, 'important');
          muxPlayer.style.setProperty('height', '675px', 'important');
          muxPlayer.style.setProperty('border-radius', '0px', 'important');
          muxPlayer.style.setProperty('background', 'transparent', 'important');
          muxPlayer.style.setProperty('object-fit', 'contain', 'important');
          muxPlayer.style.setProperty('border', 'none', 'important');
          muxPlayer.style.setProperty('outline', 'none', 'important');
          muxPlayer.style.setProperty('opacity', '0', 'important');
          muxPlayer.style.setProperty('transition', 'opacity 0.4s ease-in', 'important');
          muxPlayer.style.setProperty('max-width', 'none', 'important');
          muxPlayer.style.setProperty('max-height', 'none', 'important');
          
          // Show the video after styles are applied and force video element styling
          setTimeout(() => {
            muxPlayer.style.setProperty('opacity', '1', 'important');
            
            // Force styling on the internal video element
            const videoElement = muxPlayer.querySelector('video');
            if (videoElement) {
              videoElement.style.setProperty('background', 'transparent', 'important');
              videoElement.style.setProperty('object-fit', 'contain', 'important');
              videoElement.style.setProperty('border', 'none', 'important');
              videoElement.style.setProperty('outline', 'none', 'important');
            }
          }, 100);
        }
        // Check if project has a specific image
        else if (tool.slug === 'type-blur') {
          console.log('Loading image for:', tool.name);
          
          // Create image with absolute positioning to bypass all layout constraints
          const existingImage = document.querySelector('.project-image');
          if (existingImage) {
            existingImage.remove();
          }
          
          const img = document.createElement('img');
          img.src = 'images/Type-blur.png';
          img.alt = tool.name;
          img.className = 'project-image';
          
          // Set styles directly on the image element
          img.style.position = 'fixed';
          img.style.top = '50%';
          img.style.left = 'calc(50% + var(--sidebar-width) / 2)';
          img.style.transform = 'translate(-50%, -50%)';
          img.style.zIndex = '200';
          img.style.maxWidth = '800px';
          img.style.maxHeight = '600px';
          img.style.objectFit = 'contain';
          img.style.opacity = '1';
          
          document.body.appendChild(img);
        }
      });

      projectItem.addEventListener('mouseleave', () => {
        console.log('Stopped hovering over:', tool.name);
        logoDisplay.classList.remove('show');
        
        // Clean up video/image displays
        const existingVideo = document.querySelector('.project-video');
        const existingImage = document.querySelector('.project-image');
        if (existingVideo) {
          existingVideo.remove();
        }
        if (existingImage) {
          existingImage.remove();
        }
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