/* ==========================================================================
   CAFÉ DEN — DARK ATMOSPHERIC DIGITAL COLLATERAL JAVASCRIPT ENGINE
   ========================================================================== */

/* GLOBAL LIGHTBOX MODAL HANDLERS (DEFINED IMMEDIATELY AT TOP SCOPE) */
window.openImageModal = function(src) {
  const modal = document.getElementById('imageModal');
  const target = document.getElementById('imageModalTarget');
  if (modal && target) {
    if (src) target.src = src;
    modal.classList.add('open');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
  }
};

window.closeImageModal = function() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.classList.remove('open');
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
  }
};

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     Cursor Spotlight (subtle neon orange glow tracking pointer)
  --------------------------------------------------------------------- */
  const spotlight = document.createElement('div');
  spotlight.className = 'cursor-spotlight';
  document.body.appendChild(spotlight);
  let spotlightRAF = null;
  window.addEventListener('pointermove', (e) => {
    spotlight.classList.add('active');
    if (spotlightRAF) cancelAnimationFrame(spotlightRAF);
    spotlightRAF = requestAnimationFrame(() => {
      spotlight.style.setProperty('--mx', `${e.clientX}px`);
      spotlight.style.setProperty('--my', `${e.clientY}px`);
    });
  });
  window.addEventListener('pointerleave', () => spotlight.classList.remove('active'));

  /* Parallax Hero Image Tilt */
  const heroImg = document.querySelector('.hero-bg-img');
  if (heroImg) {
    document.addEventListener('mousemove', (e) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 2;
      heroImg.style.transform = `scale(1.06) translate(${xPct * -8}px, ${yPct * -6}px)`;
    });
  }

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
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const calcToggleBtn = document.getElementById('calcToggleBtn');
  const closeImageModalBtn = document.getElementById('closeImageModalBtn');
  const imageModal = document.getElementById('imageModal');

  let currentIndex = 0;
  const totalSlides = slides.length;

  const chapterTitles = [
    "THE OPPORTUNITY",
    "THE MARKET FAILURE",
    "MARKET TIMING",
    "THE PRODUCT ENGINE",
    "MARKETING & VIRAL MOAT",
    "UNIT ECONOMICS",
    "FLAGSHIP LOCATION",
    "EXPANSION BLUEPRINT",
    "MARKET OPPORTUNITY",
    "FINANCIAL PROJECTIONS",
    "USE OF FUNDS",
    "750 SQFT KIOSK BLUEPRINT",
    "INVESTOR ROI SIMULATOR",
    "LEADERSHIP",
    "THE VISION & DEAL TERMS"
  ];

  // Initialize Dots
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

  // Initialize Grid Jumper
  if (gridJumper) {
    gridJumper.innerHTML = '';
    chapterTitles.forEach((title, index) => {
      const card = document.createElement('div');
      card.classList.add('jump-card');
      card.innerHTML = `
        <div class="jump-card-num">CHAPTER /${String(index + 1).padStart(2, '0')}</div>
        <div class="jump-card-title">${title}</div>
      `;
      card.addEventListener('click', () => {
        goToSlide(index);
        closeGridModal();
      });
      gridJumper.appendChild(card);
    });
  }

  // Animated Number Counter Engine (Massive Prominent Numbers)
  function triggerCounters(currentSlide) {
    if (!currentSlide) return;
    const counters = currentSlide.querySelectorAll('[data-count]');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-count'));
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      
      let start = 0;
      const duration = 900; // ms
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;

      if (counter._counterTimer) clearInterval(counter._counterTimer);

      counter._counterTimer = setInterval(() => {
        start += increment;
        if (start >= target) {
          counter.textContent = `${prefix}${target}${suffix}`;
          clearInterval(counter._counterTimer);
        } else {
          let displayVal = start.toFixed(target % 1 === 0 ? 0 : 1);
          counter.textContent = `${prefix}${displayVal}${suffix}`;
        }
      }, stepTime);
    });

    // Animate Bar Charts on Slide Active
    const barFills = currentSlide.querySelectorAll('.bar-fill-glow');
    barFills.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100);
    });
  }

  function updateDeckUI() {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });

    // Update Dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    // Update Progress Bar & Counter Indicator
    if (currentSlideNum) {
      currentSlideNum.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    if (progressBar) {
      const pct = ((currentIndex + 1) / totalSlides) * 100;
      progressBar.style.width = `${pct}%`;
    }

    // Trigger Animations for Active Slide
    const activeSlide = slides[currentIndex];
    triggerCounters(activeSlide);
  }

  function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
      currentIndex = index;
      updateDeckUI();
    }
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateDeckUI();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateDeckUI();
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // INTERACTIVE ROI SIMULATOR SLIDERS MATH
  const ordersSlider = document.getElementById('ordersSlider');
  const aovSlider = document.getElementById('aovSlider');
  const marginSlider = document.getElementById('marginSlider');
  const opexSlider = document.getElementById('opexSlider');

  const ordersVal = document.getElementById('ordersVal');
  const aovVal = document.getElementById('aovVal');
  const marginVal = document.getElementById('marginVal');
  const opexVal = document.getElementById('opexVal');

  const resMonthlyRev = document.getElementById('resMonthlyRev');
  const resAnnualRev = document.getElementById('resAnnualRev');
  const resMonthlyNet = document.getElementById('resMonthlyNet');
  const resAnnualNet = document.getElementById('resAnnualNet');
  const resEquityPayout = document.getElementById('resEquityPayout');
  const resRevSharePayout = document.getElementById('resRevSharePayout');
  const resPaybackTerm = document.getElementById('resPaybackTerm');

  function calculateSimulator() {
    if (!ordersSlider || !aovSlider || !marginSlider || !opexSlider) return;

    const orders = parseInt(ordersSlider.value);
    const aov = parseInt(aovSlider.value);
    const margin = parseInt(marginSlider.value) / 100;
    const opex = parseInt(opexSlider.value);

    // Update Slider Value Labels
    if (ordersVal) ordersVal.textContent = `${orders} / day`;
    if (aovVal) aovVal.textContent = `₹${aov}`;
    if (marginVal) marginVal.textContent = `${Math.round(margin * 100)}%`;
    if (opexVal) opexVal.textContent = `₹${(opex / 100000).toFixed(2)} L`;

    // Calculation Engine
    const monthlyGrossRevenue = orders * aov * 30;
    const annualGrossRevenue = monthlyGrossRevenue * 12;

    const monthlyCOGS = monthlyGrossRevenue * (1 - margin);
    const monthlyNetEBITDA = monthlyGrossRevenue - monthlyCOGS - opex;
    const annualNetEBITDA = monthlyNetEBITDA * 12;

    // Investor Payout Calculations (₹30L Raise)
    const equityAnnualPayout = Math.max(0, annualNetEBITDA * 0.15);
    const revShareMonthlyPayout = monthlyGrossRevenue * 0.05;

    // Payback Months Estimate
    const seedAsk = 3000000;
    const paybackMonths = monthlyNetEBITDA > 0 ? (seedAsk / monthlyNetEBITDA).toFixed(1) : "N/A";

    // Format & Render Outputs
    if (resMonthlyRev) resMonthlyRev.textContent = `₹${(monthlyGrossRevenue / 100000).toFixed(2)} Lakhs`;
    if (resAnnualRev) resAnnualRev.textContent = `₹${(annualGrossRevenue / 10000000).toFixed(2)} Crores`;
    
    if (resMonthlyNet) {
      resMonthlyNet.textContent = `₹${(monthlyNetEBITDA / 100000).toFixed(2)} Lakhs`;
      resMonthlyNet.style.color = monthlyNetEBITDA < 0 ? '#EF4444' : '#F59E0B';
    }

    if (resAnnualNet) {
      resAnnualNet.textContent = `₹${(annualNetEBITDA / 100000).toFixed(2)} Lakhs`;
      resAnnualNet.style.color = annualNetEBITDA < 0 ? '#EF4444' : '#F59E0B';
    }

    if (resEquityPayout) resEquityPayout.textContent = `₹${(equityAnnualPayout / 100000).toFixed(2)} Lakhs / year`;
    if (resRevSharePayout) resRevSharePayout.textContent = `₹${Math.round(revShareMonthlyPayout).toLocaleString('en-IN')} / month`;
    if (resPaybackTerm) resPaybackTerm.textContent = `Estimated Payback Period: ~${paybackMonths} months`;
  }

  // Attach slider event listeners
  [ordersSlider, aovSlider, marginSlider, opexSlider].forEach(slider => {
    if (slider) slider.addEventListener('input', calculateSimulator);
  });
  calculateSimulator();

  if (calcToggleBtn) {
    calcToggleBtn.addEventListener('click', () => {
      goToSlide(13); // Go to ROI Simulator (0-indexed 13, Slide 14)
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
      goToSlide(13);
    } else if (e.key === 'o' || e.key === 'O') {
      gridModal.classList.contains('open') ? closeGridModal() : openGridModal();
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  });

  // Modal Handlers
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

  // Automatically attach click listeners to all image frames & blueprint containers
  document.querySelectorAll('.image-frame, .blueprint-main-card, .product-item-card').forEach(container => {
    container.addEventListener('click', () => {
      const img = container.querySelector('img');
      if (img && img.src) {
        window.openImageModal(img.src);
      }
    });
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
