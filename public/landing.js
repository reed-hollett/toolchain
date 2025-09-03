(async function () {
  // Fetch the tools registry
  const res = await fetch('registry.json');
  const tools = await res.json();

  const imageGrid = document.getElementById('grid');
  
  // Image data - using the actual images you have
  const imageData = [
    {
      src: 'images/Frame-1.png',
      alt: 'SPRUCE',
      projectSlug: 'image-dither', // This will be updated based on your mapping
      title: 'SPRUCE',
      description: 'Image dither project',
      size: 'large' // large, medium, or small
    },
    {
      src: 'images/Frame-2.png',
      alt: 'Unique vivid',
      projectSlug: 'image-dither', // This will be updated based on your mapping
      title: 'Unique vivid',
      description: 'Image dither project',
      size: 'medium'
    },
    {
      src: 'images/Frame-3.png',
      alt: 'WINTER',
      projectSlug: 'image-dither', // This will be updated based on your mapping
      title: 'WINTER',
      description: 'Image dither project',
      size: 'small'
    },
    {
      src: 'images/Frame-5.png',
      alt: 'Ornate frame pattern',
      projectSlug: 'type-dither', // This will be updated based on your mapping
      title: 'Ornate frame pattern',
      description: 'Type dither project',
      size: 'large'
    },
    {
      src: 'images/Frame-6.png',
      alt: 'Imagine light sharp texture',
      projectSlug: 'type-gravity', // This will be updated based on your mapping
      title: 'Imagine light sharp texture',
      description: 'Type gravity project',
      size: 'medium'
    },
    {
      src: 'images/Frame-7.gif',
      alt: 'Info Poster Tools',
      projectSlug: 'border-gen', // This will be updated based on your mapping
      title: 'Info Poster Tools',
      description: 'Border generator project',
      size: 'small'
    },
    {
      src: 'images/Frame-8.png',
      alt: 'House warming invitation',
      projectSlug: 'poster-gradient', // This will be updated based on your mapping
      title: 'House warming invitation',
      description: 'Poster gradient project',
      size: 'large'
    },
    {
      src: 'images/Frame-9.png',
      alt: 'Frame 9',
      projectSlug: 'type-blur', // This will be updated based on your mapping
      title: 'Frame 9',
      description: 'Type blur project',
      size: 'medium'
    },
    {
      src: 'images/Frame-10.png',
      alt: 'Creative elegant geometric',
      projectSlug: 'type-blur', // This will be updated based on your mapping
      title: 'Creative elegant geometric',
      description: 'Type blur project',
      size: 'small'
    },
    {
      src: 'images/Frame-11.gif',
      alt: 'MBS Abstract',
      projectSlug: null, // Unclickable - no project link
      title: 'MBS Abstract',
      description: 'Blades music video generator project (Coming Soon)',
      size: 'large',
      unclickable: true
    },
    {
      src: 'images/Frame-12.png',
      alt: 'Abstract pattern',
      projectSlug: 'border-gen', // This will be updated based on your mapping
      title: 'Abstract pattern',
      description: 'Border generator project',
      size: 'medium'
    },

    {
      src: 'images/Frame-14.png',
      alt: 'Trivia Night',
      projectSlug: 'border-gen', // This will be updated based on your mapping
      title: 'Trivia Night',
      description: 'Border generator project',
      size: 'large'
    },
    {
      src: 'images/Frame.png',
      alt: 'Trivia Night 2',
      projectSlug: 'border-gen', // This will be updated based on your mapping
      title: 'Trivia Night 2',
      description: 'Border generator project',
      size: 'medium'
    },
    {
      src: 'images/Frame 60.png',
      alt: '2025 Europe',
      projectSlug: 'type-cocoon', // This will be updated based on your mapping
      title: '2025 Europe',
      description: 'Cocoon project',
      size: 'small'
    },
    {
      src: 'images/Frame 61.png',
      alt: 'Frame 61',
      projectSlug: 'type-cocoon', // This will be updated based on your mapping
      title: 'Frame 61',
      description: 'Cocoon project',
      size: 'medium'
    },
    {
      src: 'images/Cocoon.png',
      alt: 'Cocoon',
      projectSlug: 'type-cocoon', // This will be updated based on your mapping
      title: 'Cocoon',
      description: 'Cocoon project',
      size: 'medium'
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




  
  // Initialize simple image grid
  initializeSimpleGrid();
  
  function initializeSimpleGrid() {
    // Shuffle the image data for random order
    const shuffledImages = shuffleArray([...imageData]);
    
    // Create multiple sets for infinite scrolling
    const totalSets = 5;
    
    for (let setIndex = 0; setIndex < totalSets; setIndex++) {
      shuffledImages.forEach((imageInfo) => {
        const card = document.createElement('div');
        card.className = 'image-card';
        
        // Find the corresponding tool data
        const tool = tools.find(t => t.slug === imageInfo.projectSlug);
        
        card.innerHTML = `<img src="${imageInfo.src}" alt="${imageInfo.alt}" loading="lazy">`;
        
        // Add click handler only for clickable images
        if (!imageInfo.unclickable) {
          card.addEventListener('click', () => {
            if (tool) {
              sessionStorage.setItem('selectedProject', imageInfo.projectSlug);
              window.location.href = 'index.html';
            }
          });
        } else {
          // Add unclickable styling
          card.classList.add('unclickable');
        }
        
        imageGrid.appendChild(card);
      });
    }
    
    // Add infinite scroll detection
    initializeInfiniteScroll();
  }
  
  function initializeInfiniteScroll() {
    const imageGrid = document.getElementById('grid');
    
    imageGrid.addEventListener('scroll', () => {
      // Check if user has scrolled near the bottom
      const scrollTop = imageGrid.scrollTop;
      const scrollHeight = imageGrid.scrollHeight;
      const clientHeight = imageGrid.clientHeight;
      
      // If scrolled to within 1000px of the bottom, add more images
      if (scrollTop + clientHeight >= scrollHeight - 1000) {
        addMoreImages();
      }
    });
  }
  
  function addMoreImages() {
    // Shuffle and add another set of images
    const shuffledImages = shuffleArray([...imageData]);
    
    shuffledImages.forEach((imageInfo) => {
      const card = document.createElement('div');
      card.className = 'image-card';
      
      // Find the corresponding tool data
      const tool = tools.find(t => t.slug === imageInfo.projectSlug);
      
      card.innerHTML = `<img src="${imageInfo.src}" alt="${imageInfo.alt}" loading="lazy">`;
      
      // Add click handler only for clickable images
      if (!imageInfo.unclickable) {
        card.addEventListener('click', () => {
          if (tool) {
            sessionStorage.setItem('selectedProject', imageInfo.projectSlug);
            window.location.href = 'index.html';
          }
        });
      } else {
        // Add unclickable styling
        card.classList.add('unclickable');
      }
      
      imageGrid.appendChild(card);
    });
  }
})(); 