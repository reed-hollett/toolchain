(async function () {
  // Fetch the tools registry
  const res = await fetch('registry.json');
  const tools = await res.json();

  const imageGrid = document.getElementById('image-grid');
  
  // Image data - using the actual images you have
  const imageData = [
    {
      src: 'images/Frame-1.png',
      alt: 'SPRUCE',
      projectSlug: 'type-dither', // This will be updated based on your mapping
      title: 'SPRUCE',
      description: 'Type dither project',
      size: 'large' // large, medium, or small
    },
    {
      src: 'images/Frame-2.png',
      alt: 'Unique vivid',
      projectSlug: 'type-line', // This will be updated based on your mapping
      title: 'Unique vivid',
      description: 'Type line project',
      size: 'medium'
    },
    {
      src: 'images/Frame-3.png',
      alt: 'WINTER',
      projectSlug: 'type-slice', // This will be updated based on your mapping
      title: 'WINTER',
      description: 'Type slice project',
      size: 'small'
    },
    {
      src: 'images/Frame-5.png',
      alt: 'Ornate frame pattern',
      projectSlug: 'border-gen', // This will be updated based on your mapping
      title: 'Ornate frame pattern',
      description: 'Border generator project',
      size: 'large'
    },
    {
      src: 'images/Frame-6.png',
      alt: 'Imagine light sharp texture',
      projectSlug: 'poster-gradient', // This will be updated based on your mapping
      title: 'Imagine light sharp texture',
      description: 'Poster gradient project',
      size: 'medium'
    },
    {
      src: 'images/Frame-7.gif',
      alt: 'Info Poster Tools',
      projectSlug: 'type-cocoon', // This will be updated based on your mapping
      title: 'Info Poster Tools',
      description: 'Type cocoon project',
      size: 'small'
    },
    {
      src: 'images/Frame-8.png',
      alt: 'House warming invitation',
      projectSlug: 'hotel-dust', // This will be updated based on your mapping
      title: 'House warming invitation',
      description: 'Hotel dust project',
      size: 'large'
    },
    {
      src: 'images/Frame-9.png',
      alt: 'Game Night',
      projectSlug: 'nacho-macho-taco', // This will be updated based on your mapping
      title: 'Game Night',
      description: 'Nacho macho taco project',
      size: 'medium'
    },
    {
      src: 'images/Frame-10.png',
      alt: 'Creative elegant geometric',
      projectSlug: '3d-type-rotator', // This will be updated based on your mapping
      title: 'Creative elegant geometric',
      description: '3D type rotator project',
      size: 'small'
    },
    {
      src: 'images/Frame-11.gif',
      alt: 'MBS Abstract',
      projectSlug: 'blades-mv', // This will be updated based on your mapping
      title: 'MBS Abstract',
      description: 'Blades music video generator project',
      size: 'large'
    },
    {
      src: 'images/Frame-12.png',
      alt: 'Abstract pattern',
      projectSlug: 'color-image-dither', // This will be updated based on your mapping
      title: 'Abstract pattern',
      description: 'Color image dither project',
      size: 'medium'
    },

    {
      src: 'images/Frame-14.png',
      alt: 'Trivia Night',
      projectSlug: 'type-gravity', // This will be updated based on your mapping
      title: 'Trivia Night',
      description: 'Type gravity project',
      size: 'large'
    },
    {
      src: 'images/Frame.png',
      alt: 'Trivia Night 2',
      projectSlug: 'type-type', // This will be updated based on your mapping
      title: 'Trivia Night 2',
      description: 'Type type project',
      size: 'medium'
    },
    {
      src: 'images/Frame 60.png',
      alt: '2025 Europe',
      projectSlug: 'type-dither', // This will be updated based on your mapping
      title: '2025 Europe',
      description: 'Type dither project',
      size: 'small'
    }
  ];

  // Shuffle the image data for random order each time
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const shuffledImages = shuffleArray(imageData);

  // Create infinite scrolling by duplicating images
  function createInfiniteGrid() {
    // Clear existing content
    imageGrid.innerHTML = '';
    
    // Create multiple sets of shuffled images for infinite scroll
    const numberOfSets = 3; // This creates 3 full sets of images
    
    for (let set = 0; set < numberOfSets; set++) {
      const setImages = shuffleArray([...imageData]); // Shuffle each set differently
      
      setImages.forEach((imageInfo) => {
        const card = document.createElement('div');
        card.className = `image-card image-card--${imageInfo.size}`;
        
        // Find the corresponding tool data
        const tool = tools.find(t => t.slug === imageInfo.projectSlug);
        
        card.innerHTML = `
          <img src="${imageInfo.src}" alt="${imageInfo.alt}" loading="lazy">
          <div class="image-overlay">
            <h3>${tool ? tool.name : imageInfo.title}</h3>
            <p>${tool ? tool.description : imageInfo.description}</p>
          </div>
          <div class="image-caption">Explore the tool used to create this image</div>
        `;
        
        // Add click handler to navigate to the project
        card.addEventListener('click', () => {
          if (tool) {
            // Store the selected project in sessionStorage and redirect to the main app
            sessionStorage.setItem('selectedProject', imageInfo.projectSlug);
            window.location.href = 'projects.html';
          }
        });
        
        imageGrid.appendChild(card);
      });
    }
  }

  // Initialize the infinite grid
  createInfiniteGrid();


})(); 