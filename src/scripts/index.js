document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.features-quick .quick-stat:nth-child(3)')?.remove();
  document.querySelector('.download-section')?.removeAttribute('id');
  document.querySelector('.platform-downloads')?.setAttribute('id', 'download');
  const pagePrefix = window.location.pathname.startsWith('/Proclama/') ? '/Proclama/' : '/';
  document.querySelectorAll('img[src^="/images/"]').forEach((image) => {
    image.src = pagePrefix + image.getAttribute('src').slice('/images/'.length);
  });
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
  const screenLogoImg = document.querySelector('.screen-logo img');
  
  const btnClear = document.getElementById('btnClear');
  const btnBlack = document.getElementById('btnBlack');
  const btnLogo = document.getElementById('btnLogo');
  
  const playlistItems = document.querySelectorAll('.phone-item');

  // Localized slide database for the interactive demo
  const lang = document.querySelector('main')?.dataset.lang || 'es';
  const slidesByLanguage = {
    es: {
      'tu-fidelidad': { text: 'Sublime gracia del Señor,<br>Que a un infeliz salvó,<br>Fui ciego mas hoy veo yo,<br>Perdido y Él me halló.', ref: 'Sublime Gracia' },
      'romans-8-28': { text: '\"Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.\"', ref: 'Romanos 8:28' },
      'juan-3-16': { text: '\"Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.\"', ref: 'Juan 3:16' },
      'cuan-grande-el': { image: true, imageLabel: 'Cruz', ref: 'Cruz' }
    },
    en: {
      'tu-fidelidad': { text: 'Amazing grace! How sweet the sound<br>That saved a wretch like me!<br>I once was lost, but now am found,<br>Was blind, but now I see.', ref: 'Amazing Grace' },
      'romans-8-28': { text: '\"And we know that all things work together for good to them that love God.\"', ref: 'Romans 8:28' },
      'juan-3-16': { text: '\"For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.\"', ref: 'John 3:16' },
      'cuan-grande-el': { image: true, imageLabel: 'Cross', ref: 'Cross' }
    },
    pt: {
      'tu-fidelidad': { text: 'Maravilhosa graça, quão doce é o som<br>Que salvou alguém como eu.<br>Eu estava perdido, mas fui encontrado;<br>Estava cego, mas agora vejo.', ref: 'Maravilhosa Graça' },
      'romans-8-28': { text: '\"Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus.\"', ref: 'Romanos 8:28' },
      'juan-3-16': { text: '\"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.\"', ref: 'João 3:16' },
      'cuan-grande-el': { image: true, imageLabel: 'Cruz', ref: 'Cruz' }
    }
  };
  const slides = slidesByLanguage[lang] || slidesByLanguage.es;

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
      screenText.innerHTML = `<div style="display:flex; flex-direction:column; align-items:center; gap:10px;"><img src="${screenLogoImg.src}" style="height: 60px; filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));"> <span style="font-family:'Outfit',sans-serif; font-weight:800; font-size:1.6rem; letter-spacing: 0.05em;">PROCLAMA</span></div>`;
      screenRef.textContent = lang === 'en' ? 'Active Screen' : lang === 'pt' ? 'Tela Ativa' : 'Pantalla Activa';
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
      if (slide.image) {
        screenText.innerHTML = `<div class="screen-cross" role="img" aria-label="${slide.imageLabel}"></div>`;
        screenRef.textContent = slide.ref;
        screenContent.style.opacity = '1';
        return;
      }
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
  const mockupDark = document.getElementById('mockupDark');
  const mockupLight = document.getElementById('mockupLight');

  if (tabDarkBtn && tabLightBtn && mockupDark && mockupLight) {
    tabDarkBtn.addEventListener('click', () => {
      tabDarkBtn.classList.add('active');
      tabLightBtn.classList.remove('active');
      mockupDark.style.display = '';
      mockupLight.style.display = 'none';
    });

    tabLightBtn.addEventListener('click', () => {
      tabLightBtn.classList.add('active');
      tabDarkBtn.classList.remove('active');
      mockupLight.style.display = '';
      mockupDark.style.display = 'none';
    });
  }

  // Initialize
  updateScreen();
});
