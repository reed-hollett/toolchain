(async function () {
  const res = await fetch('registry.json');
  const tools = await res.json();

  // Logo hover functionality
  const logoDisplay = document.getElementById('logo-display');
  const toolNames = document.querySelectorAll('.tool-name');

  toolNames.forEach(toolName => {
    toolName.addEventListener('mouseenter', () => {
      const logoFile = toolName.getAttribute('data-logo');
      if (logoFile) {
        logoDisplay.innerHTML = `<img src="images/AI Code Gen Logos/${logoFile}" alt="${toolName.textContent} logo">`;
        logoDisplay.classList.add('show');
      }
    });

    toolName.addEventListener('mouseleave', () => {
      logoDisplay.classList.remove('show');
    });
  });

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
        ${tool.url ? `<a href="${tool.url}" target="_blank" class="project-link">Open in a new tab</a>` : ''}
        <div class="project-meta">
          <div class="meta-item">
            <span class="meta-label">Outputs:</span>
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
      </div>
    `;

    // Add click handler for expandable projects
    if (!isDisabled) {
      projectItem.addEventListener('click', () => {
        toggleProject(projectItem, tool);
      });
    }

    projectsList.appendChild(projectItem);
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