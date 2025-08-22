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
      src: 'images/Frame-10.png',
      alt: 'Creative elegant geometric',
      projectSlug: null, // Unclickable - no project link
      title: 'Creative elegant geometric',
      description: '3D type rotator project (Coming Soon)',
      size: 'small',
      unclickable: true
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




  
  // Initialize infinite scrolling with random gradient maps
  initializeInfiniteScroll();
  
  // Initialize page selector dropdown
  initializePageSelector();
  
  function initializePageSelector() {
    const pageSelector = document.querySelector('.page-selector');
    pageSelector.addEventListener('change', (e) => {
      if (e.target.value === 'index') {
        window.location.href = 'projects.html';
      }
    });
  }
  
  function initializeInfiniteScroll() {
    const totalSets = 10; // Create 10 sets for infinite scrolling
    
    // Predefined gradient maps for each set
    const gradientMaps = [
      null, // First set: no filter
      'hue-rotate(0deg) saturate(2) brightness(1.1)', // Second set: red/orange
      'hue-rotate(180deg) saturate(2) brightness(1.1)', // Third set: cyan
      'hue-rotate(240deg) saturate(2) brightness(1.1)', // Fourth set: blue
      'hue-rotate(120deg) saturate(2) brightness(1.1)', // Fifth set: green
      'hue-rotate(60deg) saturate(2) brightness(1.1)', // Sixth set: yellow
      'hue-rotate(300deg) saturate(2) brightness(1.1)', // Seventh set: magenta
      'hue-rotate(90deg) saturate(1.8) brightness(0.9)', // Eighth set: teal
      'hue-rotate(150deg) saturate(1.5) brightness(1.2)', // Ninth set: lime
      'hue-rotate(270deg) saturate(1.7) brightness(0.8)' // Tenth set: purple
    ];
    
    function createImageSet(setIndex) {
      const setImages = shuffleArray([...imageData]);
      
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
        
        // Apply the predefined gradient map for this set
        if (gradientMaps[setIndex]) {
          const img = card.querySelector('img');
          img.style.filter = gradientMaps[setIndex];
        }
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
          document.querySelectorAll('.image-card img').forEach(img => {
            if (img !== card.querySelector('img')) {
              img.style.filter = 'grayscale(100%) brightness(0.8) blur(3px)';
              img.style.opacity = '0.4';
            }
          });
        });
        
        card.addEventListener('mouseleave', () => {
          // Restore the original filter for this set
          const img = card.querySelector('img');
          if (gradientMaps[setIndex]) {
            img.style.filter = gradientMaps[setIndex];
          } else {
            img.style.filter = '';
          }
          img.style.opacity = '';
          
          // Restore other images
          document.querySelectorAll('.image-card img').forEach(otherImg => {
            if (otherImg !== img) {
              otherImg.style.filter = '';
              otherImg.style.opacity = '';
            }
          });
        });
        
        // Add click handler only for clickable images
        if (!imageInfo.unclickable) {
          card.addEventListener('click', () => {
            if (tool) {
              sessionStorage.setItem('selectedProject', imageInfo.projectSlug);
              window.location.href = 'projects.html';
            }
          });
        } else {
          // Add unclickable styling
          card.classList.add('unclickable');
        }
        
        imageGrid.appendChild(card);
      });
    }
    
    // Create initial set (set 0 - no filter)
    createImageSet(0);
    
    // Create additional sets as user scrolls
    for (let i = 1; i < totalSets; i++) {
      setTimeout(() => {
        createImageSet(i);
      }, i * 1000); // Stagger creation
    }
  }
})(); 