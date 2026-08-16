/* ==========================================================================
   CAFÉ DEN — INTERACTIVE 17-SLIDE PITCH DECK ENGINE
   ========================================================================== */

/* GLOBAL LIGHTBOX MODAL HANDLERS */
window.openImageModal = function(src) {
  const modal = document.getElementById('imageModal');
  const target = document.getElementById('imageModalTarget');
  if (modal && target) {
    if (src) target.src = src;
    modal.classList.add('open');
  }
};

window.closeImageModal = function() {
  const modal = document.getElementById('imageModal');
  if (modal) modal.classList.remove('open');
};

document.addEventListener('DOMContentLoaded', () => {

  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('slideDots');
  const currentSlideNum = document.getElementById('currentSlideNum');
  const progressBar = document.getElementById('progressBar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  const gridModal = document.getElementById('gridModal');
  const gridJumper = document.getElementById('gridJumper');
  const gridToggleBtn = document.getElementById('gridToggleBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');

  const calcModal = document.getElementById('calcModal');
  const calcToggleBtn = document.getElementById('calcToggleBtn');
  const closeCalcModalBtn = document.getElementById('closeCalcModalBtn');
  const openCalcInSlideBtn = document.getElementById('openCalcInSlideBtn');

  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const closeImageModalBtn = document.getElementById('closeImageModalBtn');
  const imageModal = document.getElementById('imageModal');

  let currentIndex = 0;
  const totalSlides = slides.length;

  const chapterTitles = [
    "INTRO & SEED THESIS",
    "THE OPPORTUNITY",
    "THE MODEL",
    "DAYPART STRATEGY",
    "PRODUCT ARCHITECTURE",
    "DAILY CONSUMPTION",
    "STORE #1 FLAGSHIP",
    "750 SQFT STORE BLUEPRINT",
    "THE GROUNDWORK",
    "FOOTFALL ENGINE",
    "FRESHNESS MODEL",
    "UNIT ECONOMICS",
    "PAYBACK SIMULATOR",
    "USE OF FUNDS",
    "EXPANSION ROADMAP",
    "FOUNDER PROFILE",
    "THE INVESTMENT"
  ];

  // Initialize Slide Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Populate Grid Jumper Overview
  if (gridJumper) {
    gridJumper.innerHTML = '';
    slides.forEach((slide, index) => {
      const title = chapterTitles[index] || `SLIDE ${index + 1}`;
      const item = document.createElement('div');
      item.classList.add('grid-item');
      item.innerHTML = `
        <span class="grid-item-num">SLIDE /${String(index + 1).padStart(2, '0')}</span>
        <div class="grid-item-title">${title}</div>
      `;
      item.addEventListener('click', () => {
        goToSlide(index);
        closeGridModal();
      });
      gridJumper.appendChild(item);
    });
  }

  function updateDeckUI() {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    if (currentSlideNum) {
      currentSlideNum.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    if (progressBar) {
      const pct = ((currentIndex + 1) / totalSlides) * 100;
      progressBar.style.width = `${pct}%`;
    }
  }

  function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
      currentIndex = index;
      updateDeckUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (slides[currentIndex]) slides[currentIndex].scrollTop = 0;
    }
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateDeckUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (slides[currentIndex]) slides[currentIndex].scrollTop = 0;
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateDeckUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (slides[currentIndex]) slides[currentIndex].scrollTop = 0;
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Touch Swipe Support
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const deckContainer = document.querySelector('.deck-container');
  if (deckContainer) {
    deckContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    deckContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
        if (diffX < 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });
  }

  // 100% WORKING INTERACTIVE PAYBACK & P&L SIMULATOR MATH
  const ordersSlider = document.getElementById('ordersSlider');
  const aovSlider = document.getElementById('aovSlider');
  const marginSlider = document.getElementById('marginSlider');
  const opexSlider = document.getElementById('opexSlider');

  const ordersVal = document.getElementById('ordersVal');
  const aovVal = document.getElementById('aovVal');
  const marginVal = document.getElementById('marginVal');
  const opexVal = document.getElementById('opexVal');

  const calcRevenue = document.getElementById('calcRevenue');
  const calcGrossProfit = document.getElementById('calcGrossProfit');
  const calcEbitda = document.getElementById('calcEbitda');
  const calcPayback = document.getElementById('calcPayback');

  function calculateSimulator() {
    if (!ordersSlider || !aovSlider || !marginSlider || !opexSlider) return;

    const orders = parseInt(ordersSlider.value);
    const aov = parseInt(aovSlider.value);
    const margin = parseInt(marginSlider.value) / 100;
    const opex = parseInt(opexSlider.value);

    // Update Slider Labels
    if (ordersVal) ordersVal.textContent = `${orders} / day`;
    if (aovVal) aovVal.textContent = `₹${aov}`;
    if (marginVal) marginVal.textContent = `${Math.round(margin * 100)}%`;
    if (opexVal) opexVal.textContent = `₹${(opex / 100000).toFixed(2)} L`;

    // Calculation Logic
    const monthlyGrossRevenue = orders * aov * 30;
    const monthlyCOGS = monthlyGrossRevenue * (1 - margin);
    const monthlyGrossProfit = monthlyGrossRevenue - monthlyCOGS;
    const monthlyNetEBITDA = monthlyGrossProfit - opex;
    const ebitdaPct = monthlyGrossRevenue > 0 ? ((monthlyNetEBITDA / monthlyGrossRevenue) * 100).toFixed(1) : "0.0";

    // Payback Months (Initial Investment Ask ₹30.0L)
    const seedCapitalAsk = 3000000;
    const paybackMonths = monthlyNetEBITDA > 0 ? (seedCapitalAsk / monthlyNetEBITDA).toFixed(1) : "N/A";

    // Render Outputs
    if (calcRevenue) calcRevenue.textContent = `₹${(monthlyGrossRevenue / 100000).toFixed(2)} Lakhs`;
    if (calcGrossProfit) calcGrossProfit.textContent = `₹${(monthlyGrossProfit / 100000).toFixed(2)} Lakhs`;
    if (calcEbitda) {
      calcEbitda.textContent = `₹${(monthlyNetEBITDA / 100000).toFixed(2)} Lakhs (${ebitdaPct}%)`;
      calcEbitda.style.color = monthlyNetEBITDA < 0 ? '#DC2626' : '#059669';
    }
    if (calcPayback) {
      calcPayback.textContent = paybackMonths !== "N/A" ? `${paybackMonths} Months` : "Negative EBITDA";
    }
  }

  [ordersSlider, aovSlider, marginSlider, opexSlider].forEach(slider => {
    if (slider) slider.addEventListener('input', calculateSimulator);
  });
  calculateSimulator();

  // Modal Open/Close Listeners
  if (calcToggleBtn) {
    calcToggleBtn.addEventListener('click', () => {
      if (calcModal) calcModal.classList.add('open');
    });
  }

  if (openCalcInSlideBtn) {
    openCalcInSlideBtn.addEventListener('click', () => {
      if (calcModal) calcModal.classList.add('open');
    });
  }

  if (closeCalcModalBtn) {
    closeCalcModalBtn.addEventListener('click', () => {
      if (calcModal) calcModal.classList.remove('open');
    });
  }

  function openGridModal() {
    if (gridModal) gridModal.classList.add('open');
  }

  function closeGridModal() {
    if (gridModal) gridModal.classList.remove('open');
  }

  if (gridToggleBtn) gridToggleBtn.addEventListener('click', openGridModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeGridModal);

  if (closeImageModalBtn) {
    closeImageModalBtn.addEventListener('click', window.closeImageModal);
  }

  if (imageModal) {
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal || e.target === closeImageModalBtn || e.target.closest('#closeImageModalBtn')) {
        window.closeImageModal();
      }
    });
  }

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'c' || e.key === 'C') {
      if (calcModal) {
        calcModal.classList.contains('open') ? calcModal.classList.remove('open') : calcModal.classList.add('open');
      }
    } else if (e.key === 'o' || e.key === 'O') {
      if (gridModal) {
        gridModal.classList.contains('open') ? closeGridModal() : openGridModal();
      }
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Fullscreen error: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  // Expose global nav
  window.goToSlide = goToSlide;

  // Initial Run
  updateDeckUI();
});
