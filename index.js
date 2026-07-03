document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Navigation ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Animate burger menu
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });
  }

  // --- Interactive Remote Control Simulation ---
  const screenContent = document.getElementById('screenContent');
  const screenText = document.getElementById('screenText');
  const screenRef = document.getElementById('screenRef');
  const mockScreen = document.getElementById('mockScreen');
  const screenBg = document.getElementById('screenBg');
  
  const btnClear = document.getElementById('btnClear');
  const btnBlack = document.getElementById('btnBlack');
  const btnLogo = document.getElementById('btnLogo');
  
  const playlistItems = document.querySelectorAll('.phone-item');

  // Slide database
  const slides = {
    'tu-fidelidad': {
      text: 'Tu fidelidad es grande,<br>Tu fidelidad incomparable es.<br>Nadie como Tú, bendito Dios,<br>Grande es Tu fidelidad.',
      ref: 'Himno de Adoración'
    },
    'genesis-1-1': {
      text: '\"En el principio creó Dios los cielos y la tierra.\"',
      ref: 'Génesis 1:1'
    },
    'juan-3-16': {
      text: '\"Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.\"',
      ref: 'Juan 3:16'
    },
    'cuan-grande-el': {
      text: 'Señor, mi Dios, al contemplar los cielos,<br>El firmamento y las estrellas mil,<br>Al oír Tu voz en los potentes truenos<br>Y ver brillar al sol en su cenit...',
      ref: 'Cuan Grande es Él'
    }
  };

  let currentSlideId = 'juan-3-16';
  let isCleared = false;
  let isBlack = false;
  let isLogoShown = false;

  function updateScreen() {
    // If black screen active
    if (isBlack) {
      mockScreen.style.backgroundColor = '#000000';
      screenBg.style.opacity = '0';
      screenContent.style.opacity = '0';
      return;
    }

    mockScreen.style.backgroundColor = '';
    screenBg.style.opacity = '1';

    // If logo active
    if (isLogoShown) {
      screenText.innerHTML = '<div style="display:flex; flex-direction:column; align-items:center; gap:10px;"><img src="images/logo.png" style="height: 60px; filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));"> <span style="font-family:\'Outfit\',sans-serif; font-weight:800; font-size:1.6rem; letter-spacing: 0.05em;">PROCLAMA</span></div>';
      screenRef.textContent = 'Pantalla Activa';
      screenContent.style.opacity = '1';
      return;
    }

    // If cleared (dimmed/no text)
    if (isCleared) {
      screenContent.style.opacity = '0';
      return;
    }

    // Standard slide update
    const slide = slides[currentSlideId];
    if (slide) {
      screenText.innerHTML = slide.text;
      screenRef.textContent = slide.ref;
      screenContent.style.opacity = '1';
    }
  }

  // Playlist selection
  playlistItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove selected class from all
      playlistItems.forEach(i => i.classList.remove('selected'));
      
      // Add to clicked
      item.classList.add('selected');
      
      // Update current slide id
      currentSlideId = item.getAttribute('data-slide-id');
      
      // Reset clear/logo states when changing slide
      isCleared = false;
      isLogoShown = false;
      btnClear.classList.remove('active');
      btnLogo.classList.remove('active');
      
      updateScreen();
    });
  });

  // Action Buttons
  btnClear.addEventListener('click', () => {
    isCleared = !isCleared;
    btnClear.classList.toggle('active', isCleared);
    
    // Deactivate logo
    if (isCleared && isLogoShown) {
      isLogoShown = false;
      btnLogo.classList.remove('active');
    }
    
    updateScreen();
  });

  btnBlack.addEventListener('click', () => {
    isBlack = !isBlack;
    btnBlack.classList.toggle('active', isBlack);
    updateScreen();
  });

  btnLogo.addEventListener('click', () => {
    isLogoShown = !isLogoShown;
    btnLogo.classList.toggle('active', isLogoShown);
    
    // Deactivate clear
    if (isLogoShown && isCleared) {
      isCleared = false;
      btnClear.classList.remove('active');
    }
    
    updateScreen();
  });

  // --- Dark/Light Mode Screenshot Switcher ---
  const tabDarkBtn = document.getElementById('tabDarkBtn');
  const tabLightBtn = document.getElementById('tabLightBtn');
  const mockupImage = document.getElementById('mockupImage');

  if (tabDarkBtn && tabLightBtn && mockupImage) {
    tabDarkBtn.addEventListener('click', () => {
      tabDarkBtn.classList.add('active');
      tabLightBtn.classList.remove('active');
      mockupImage.src = 'images/proclama_dark.png';
      mockupImage.alt = 'Proclama Software Dashboard - Modo Oscuro';
    });

    tabLightBtn.addEventListener('click', () => {
      tabLightBtn.classList.add('active');
      tabDarkBtn.classList.remove('active');
      mockupImage.src = 'images/proclama_light.png';
      mockupImage.alt = 'Proclama Software Dashboard - Modo Claro';
    });
  }

  // Initialize
  updateScreen();
});
