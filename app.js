/* ==========================================================================
   CAFÉ DEN — 18-SLIDE MASTER INVESTOR PRESENTATION ENGINE
   ========================================================================== */

function calculatePayback() {
  const inputOrders = document.getElementById('input-orders');
  const inputAov = document.getElementById('input-aov');
  const inputMargin = document.getElementById('input-margin');
  const inputOpex = document.getElementById('input-opex');

  if (!inputOrders || !inputAov || !inputMargin || !inputOpex) return;

  const orders = parseFloat(inputOrders.value) || 220;
  const aov = parseFloat(inputAov.value) || 195;
  const margin = (parseFloat(inputMargin.value) || 65) / 100;
  const opex = (parseFloat(inputOpex.value) || 3.5) * 100000;

  const labelOrders = document.getElementById('label-orders');
  const labelAov = document.getElementById('label-aov');
  const labelMargin = document.getElementById('label-margin');
  const labelOpex = document.getElementById('label-opex');

  if (labelOrders) labelOrders.textContent = `${orders} / day`;
  if (labelAov) labelAov.textContent = `₹${aov}`;
  if (labelMargin) labelMargin.textContent = `${Math.round(margin * 100)}%`;
  if (labelOpex) labelOpex.textContent = `₹${(opex / 100000).toFixed(2)} L`;

  const monthlyRev = orders * aov * 30;
  const monthlyGrossProfit = monthlyRev * margin;
  const monthlyNet = monthlyGrossProfit - opex;

  const displayRevenue = document.getElementById('display-revenue');
  const displayGrossProfit = document.getElementById('display-grossprofit');
  const displayNetProfit = document.getElementById('display-netprofit');

  if (displayRevenue) displayRevenue.innerText = `₹${(monthlyRev / 100000).toFixed(2)}L`;
  if (displayGrossProfit) displayGrossProfit.innerText = `₹${(monthlyGrossProfit / 100000).toFixed(2)}L`;
  if (displayNetProfit) {
    displayNetProfit.innerText = `₹${(monthlyNet / 100000).toFixed(2)}L`;
    displayNetProfit.style.color = monthlyNet <= 0 ? '#DC2626' : '#059669';
  }
}

function calculateModalPayback() {
  const inputOrders = document.getElementById('modal-input-orders');
  const inputAov = document.getElementById('modal-input-aov');
  const inputMargin = document.getElementById('modal-input-margin');
  const inputOpex = document.getElementById('modal-input-opex');

  if (!inputOrders || !inputAov || !inputMargin || !inputOpex) return;

  const orders = parseFloat(inputOrders.value) || 220;
  const aov = parseFloat(inputAov.value) || 195;
  const margin = (parseFloat(inputMargin.value) || 65) / 100;
  const opex = (parseFloat(inputOpex.value) || 3.5) * 100000;

  const labelOrders = document.getElementById('modal-label-orders');
  const labelAov = document.getElementById('modal-label-aov');
  const labelMargin = document.getElementById('modal-label-margin');
  const labelOpex = document.getElementById('modal-label-opex');

  if (labelOrders) labelOrders.textContent = `${orders} / day`;
  if (labelAov) labelAov.textContent = `₹${aov}`;
  if (labelMargin) labelMargin.textContent = `${Math.round(margin * 100)}%`;
  if (labelOpex) labelOpex.textContent = `₹${(opex / 100000).toFixed(2)} L`;

  const monthlyRev = orders * aov * 30;
  const monthlyGrossProfit = monthlyRev * margin;
  const monthlyNet = monthlyGrossProfit - opex;

  const displayRevenue = document.getElementById('modal-display-revenue');
  const displayGrossProfit = document.getElementById('modal-display-grossprofit');
  const displayNetProfit = document.getElementById('modal-display-netprofit');

  if (displayRevenue) displayRevenue.innerText = `₹${(monthlyRev / 100000).toFixed(2)}L`;
  if (displayGrossProfit) displayGrossProfit.innerText = `₹${(monthlyGrossProfit / 100000).toFixed(2)}L`;
  if (displayNetProfit) {
    displayNetProfit.innerText = `₹${(monthlyNet / 100000).toFixed(2)}L`;
    displayNetProfit.style.color = monthlyNet <= 0 ? '#DC2626' : '#059669';
  }
}

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
    "HERO COVER (FULL-BLEED SCRIM)",
    "THE DAILY F&B OPPORTUNITY",
    "THE COMPLETE DAY-PART FLYWHEEL",
    "AOV BARBELL ENGINE",
    "PRODUCT STRATEGY & PRICING ADVANTAGE",
    "A FOCUSED 750 SQ. FT. FORMAT",
    "STORE FOOTPRINT & BLUEPRINT",
    "EARLY GROUNDWORK SIGNALS",
    "STORE #1 ECONOMICS",
    "REAL-TIME P&L SIMULATOR",
    "FROM LAUNCH TO PAYBACK (~12M)",
    "WHY NOW, WHY CAFÉ DEN & RISKS",
    "THE INVESTMENT OPPORTUNITY",
    "WHAT THE CAPITAL PROVES",
    "FOUNDING INVESTOR PARTICIPATION",
    "USE OF FUNDS (₹30 LAKHS)",
    "FOUNDER PROFILE & VISION",
    "FINAL SEED ROUND TERM SHEET"
  ];

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => navigateSlideTo(i));
      dotsContainer.appendChild(dot);
    });
  }

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
        navigateSlideTo(index);
        closeGridModal();
      });
      gridJumper.appendChild(item);
    });
  }

  function updateDeckUI() {
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

  function navigateSlideTo(index) {
    if (index >= 0 && index < totalSlides) {
      currentIndex = index;
      updateDeckUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function navigateSlide(direction) {
    const nextIdx = currentIndex + direction;
    if (nextIdx >= 0 && nextIdx < totalSlides) {
      currentIndex = nextIdx;
      updateDeckUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => navigateSlide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateSlide(1));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      navigateSlide(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      navigateSlide(-1);
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
        if (diffX < 0) navigateSlide(1);
        else navigateSlide(-1);
      }
    }, { passive: true });
  }

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

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  calculatePayback();
  calculateModalPayback();
  updateDeckUI();
});
