/* ==========================================================================
   CAFÉ DEN — WARM LATTE PRESENTATION & P&L ENGINE
   ========================================================================== */

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

  const fullscreenBtn = document.getElementById('fullscreenBtn');

  let currentIndex = 0;
  const totalSlides = slides.length;

  const chapterTitles = [
    "HERO / BRAND STATEMENT",
    "THE DAILY F&B OPPORTUNITY",
    "THE OPERATING FLYWHEEL",
    "CORE AOV SHIFT (DAYPARTS)",
    "PRODUCT & BATCH ARCHITECTURE",
    "CUSTOMER DAY-PARTS MATRIX",
    "750 SQFT MODULAR LAYOUT",
    "EARLY TRACTION & GROUNDWORK",
    "LOW-PAID-MEDIA FOOTFALL ENGINE",
    "P&L SIMULATOR & UNIT ECONOMICS",
    "USE OF FUNDS (₹30 LAKHS)",
    "STRATEGIC ROADMAP",
    "FOUNDER & EXECUTION TEAM",
    "INVESTMENT TERM SHEET"
  ];

  // Render Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  // Populate Grid Jumper
  if (gridJumper) {
    gridJumper.innerHTML = '';
    slides.forEach((_, index) => {
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

  function updateUI() {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentIndex);
    });

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
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
      updateUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Touch Swipe Engine
  let startX = 0, startY = 0, endX = 0, endY = 0;
  const container = document.getElementById('deckContainer');
  if (container) {
    container.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
      startY = e.changedTouches[0].screenY;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].screenX;
      endY = e.changedTouches[0].screenY;
      const diffX = endX - startX;
      const diffY = endY - startY;
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
        if (diffX < 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });
  }

  // 100% AIRTIGHT P&L SIMULATOR MATH ENGINE
  function runCalculationEngine(prefix) {
    const ordersSlider = document.getElementById(prefix + 'OrdersSlider');
    const aovSlider = document.getElementById(prefix + 'AovSlider');
    const marginSlider = document.getElementById(prefix + 'MarginSlider');
    const opexSlider = document.getElementById(prefix + 'OpexSlider');

    if (!ordersSlider || !aovSlider || !marginSlider || !opexSlider) return;

    const ordersVal = document.getElementById(prefix + 'OrdersVal');
    const aovVal = document.getElementById(prefix + 'AovVal');
    const marginVal = document.getElementById(prefix + 'MarginVal');
    const opexVal = document.getElementById(prefix + 'OpexVal');

    const calcRevenue = document.getElementById(prefix + 'CalcRevenue');
    const calcGrossProfit = document.getElementById(prefix + 'CalcGrossProfit');
    const calcEbitda = document.getElementById(prefix + 'CalcEbitda');
    const calcPayback = document.getElementById(prefix + 'CalcPayback');

    const orders = parseInt(ordersSlider.value);
    const aov = parseInt(aovSlider.value);
    const margin = parseInt(marginSlider.value) / 100;
    const opex = parseInt(opexSlider.value);

    // Update Slider Value Displays
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

    // Payback Months (Seed Capital Ask = ₹30,00,000)
    const seedCapitalAsk = 3000000;
    let paybackMonthsText = "";

    if (monthlyNetEBITDA <= 0) {
      paybackMonthsText = "Cash Flow Negative";
    } else {
      const months = (seedCapitalAsk / monthlyNetEBITDA).toFixed(1);
      paybackMonthsText = `${months} Months`;
    }

    // Update UI Elements
    if (calcRevenue) calcRevenue.textContent = `₹${(monthlyGrossRevenue / 100000).toFixed(2)} Lakhs`;
    if (calcGrossProfit) calcGrossProfit.textContent = `₹${(monthlyGrossProfit / 100000).toFixed(2)} Lakhs`;
    if (calcEbitda) {
      calcEbitda.textContent = `₹${(monthlyNetEBITDA / 100000).toFixed(2)} Lakhs (${ebitdaPct}%)`;
      calcEbitda.style.color = monthlyNetEBITDA <= 0 ? '#DC2626' : '#059669';
    }
    if (calcPayback) {
      calcPayback.textContent = paybackMonthsText;
      calcPayback.style.color = monthlyNetEBITDA <= 0 ? '#DC2626' : '#8C5338';
    }
  }

  function syncAllSimulators() {
    runCalculationEngine('');
    runCalculationEngine('modal');
  }

  // Attach Input Listeners for In-Page Simulator
  ['ordersSlider', 'aovSlider', 'marginSlider', 'opexSlider'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', syncAllSimulators);
  });

  // Attach Input Listeners for Modal Simulator
  ['modalOrdersSlider', 'modalAovSlider', 'modalMarginSlider', 'modalOpexSlider'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', syncAllSimulators);
  });

  syncAllSimulators();

  // Modals Management
  function openGridModal() { if (gridModal) gridModal.classList.add('open'); }
  function closeGridModal() { if (gridModal) gridModal.classList.remove('open'); }

  if (gridToggleBtn) gridToggleBtn.addEventListener('click', openGridModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeGridModal);

  if (calcToggleBtn) {
    calcToggleBtn.addEventListener('click', () => {
      if (calcModal) calcModal.classList.add('open');
    });
  }

  if (closeCalcModalBtn) {
    closeCalcModalBtn.addEventListener('click', () => {
      if (calcModal) calcModal.classList.remove('open');
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
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  updateUI();
});
