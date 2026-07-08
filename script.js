/* ============================================
   TIME CONVERTER — JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Element References ----
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');

  const inputHour = document.getElementById('inputHour');
  const inputMinute = document.getElementById('inputMinute');
  const inputSecond = document.getElementById('inputSecond');
  const inputPeriod = document.getElementById('inputPeriod');
  const convertBtn = document.getElementById('convertBtn');
  const resetBtn = document.getElementById('resetBtn');
  const exampleBtn = document.getElementById('exampleBtn');
  const randomBtn = document.getElementById('randomBtn');
  const resultBox = document.getElementById('resultBox');
  const resultTime = document.getElementById('resultTime');
  const resultBreakdown = document.getElementById('resultBreakdown');
  const errorMsg = document.getElementById('errorMsg');

  const heroHourHand = document.getElementById('heroHourHand');
  const heroMinuteHand = document.getElementById('heroMinuteHand');
  const heroSecondHand = document.getElementById('heroSecondHand');

  const clock12 = document.getElementById('clock12');
  const clock24 = document.getElementById('clock24');

  // Practice
  const practiceScore = document.getElementById('practiceScore');
  const practiceStreak = document.getElementById('practiceStreak');
  const practiceStars = document.getElementById('practiceStars');
  const practiceBadges = document.getElementById('practiceBadges');
  const practiceQuestion = document.getElementById('practiceQuestion');
  const practiceAnswer = document.getElementById('practiceAnswer');
  const checkAnswerBtn = document.getElementById('checkAnswerBtn');
  const practiceFeedback = document.getElementById('practiceFeedback');
  const nextQuestionBtn = document.getElementById('nextQuestionBtn');

  // Quiz
  const quizProgressBar = document.getElementById('quizProgressBar');
  const quizCurrent = document.getElementById('quizCurrent');
  const quizTotal = document.getElementById('quizTotal');
  const quizScoreEl = document.getElementById('quizScore');
  const quizCard = document.getElementById('quizCard');
  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const quizFeedback = document.getElementById('quizFeedback');
  const quizNextBtn = document.getElementById('quizNextBtn');
  const quizResult = document.getElementById('quizResult');
  const quizResultEmoji = document.getElementById('quizResultEmoji');
  const quizResultTitle = document.getElementById('quizResultTitle');
  const quizResultText = document.getElementById('quizResultText');
  const quizResultScore = document.getElementById('quizResultScore');
  const quizRestartBtn = document.getElementById('quizRestartBtn');

  /* ============================================
     THEME TOGGLE
     ============================================ */
  const savedTheme = localStorage.getItem('timelearn-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('timelearn-theme', next);
  });

  /* ============================================
     HERO ANALOG CLOCK
     ============================================ */
  function updateHeroClock() {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();

    const hourDeg = (h * 30) + (m * 0.5);
    const minDeg = (m * 6) + (s * 0.1);
    const secDeg = s * 6;

    heroHourHand.style.transform = `rotate(${hourDeg}deg)`;
    heroMinuteHand.style.transform = `rotate(${minDeg}deg)`;
    heroSecondHand.style.transform = `rotate(${secDeg}deg)`;
  }

  updateHeroClock();
  setInterval(updateHeroClock, 1000);

  /* ============================================
     LIVE DIGITAL CLOCKS
     ============================================ */
  function updateLiveClocks() {
    const now = new Date();
    const h24 = now.getHours();
    const h12 = h24 % 12 || 12;
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const ampm = h24 >= 12 ? 'PM' : 'AM';

    clock12.textContent = `${String(h12).padStart(2, '0')}:${m}:${s} ${ampm}`;
    clock24.textContent = `${String(h24).padStart(2, '0')}:${m}:${s}`;
  }

  updateLiveClocks();
  setInterval(updateLiveClocks, 1000);

  /* ============================================
     TIME CONVERSION LOGIC
     ============================================ */
  function convert12to24(hour, minute, second, period) {
    let h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    const s = parseInt(second, 10);

    if (isNaN(h) || isNaN(m) || isNaN(s)) return null;
    if (h < 1 || h > 12) return null;
    if (m < 0 || m > 59) return null;
    if (s < 0 || s > 59) return null;

    const p = period.toUpperCase();

    if (p === 'AM') {
      if (h === 12) h = 0;
    } else {
      if (h !== 12) h += 12;
    }

    return {
      hour24: h,
      formatted: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    };
  }

  /* ============================================
     CONVERTER CARD
     ============================================ */
  function validateAndConvert() {
    errorMsg.textContent = '';
    const h = inputHour.value;
    const m = inputMinute.value;
    const s = inputSecond.value;
    const p = inputPeriod.value;

    if (h === '' || m === '' || s === '') {
      errorMsg.textContent = '⚠️ Please fill in all fields!';
      return;
    }

    const hNum = parseInt(h, 10);
    const mNum = parseInt(m, 10);
    const sNum = parseInt(s, 10);

    if (isNaN(hNum) || hNum < 1 || hNum > 12) {
      errorMsg.textContent = '⚠️ Please enter a valid hour between 1 and 12.';
      return;
    }
    if (isNaN(mNum) || mNum < 0 || mNum > 59) {
      errorMsg.textContent = '⚠️ Please enter valid minutes between 00 and 59.';
      return;
    }
    if (isNaN(sNum) || sNum < 0 || sNum > 59) {
      errorMsg.textContent = '⚠️ Please enter valid seconds between 00 and 59.';
      return;
    }

    const result = convert12to24(h, m, s, p);
    if (!result) {
      errorMsg.textContent = '⚠️ Something went wrong. Check your inputs!';
      return;
    }

    resultTime.textContent = result.formatted;
    resultBox.classList.add('active');

    // Build breakdown
    const originalTime = `${String(hNum).padStart(2, '0')}:${String(mNum).padStart(2, '0')}:${String(sNum).padStart(2, '0')} ${p}`;
    let explanation = '';
    if (p === 'AM') {
      if (hNum === 12) {
        explanation = `12 AM is midnight → hour becomes <strong>00</strong>`;
      } else {
        explanation = `AM and hour is not 12 → keep hour as <strong>${String(hNum).padStart(2, '0')}</strong>`;
      }
    } else {
      if (hNum === 12) {
        explanation = `12 PM is noon → hour stays <strong>12</strong>`;
      } else {
        explanation = `PM and hour ≠ 12 → ${hNum} + 12 = <strong>${hNum + 12}</strong>`;
      }
    }
    resultBreakdown.innerHTML = `${originalTime} → ${result.formatted}<br><small>${explanation}</small>`;

    // Trigger confetti
    launchConfetti();

    // Remove active class after animation
    setTimeout(() => resultBox.classList.remove('active'), 600);
  }

  convertBtn.addEventListener('click', validateAndConvert);

  // Enter key to convert
  [inputHour, inputMinute, inputSecond].forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') validateAndConvert();
    });
  });

  resetBtn.addEventListener('click', () => {
    inputHour.value = '';
    inputMinute.value = '';
    inputSecond.value = '';
    inputPeriod.value = 'AM';
    resultTime.textContent = '--:--:--';
    resultBreakdown.innerHTML = '';
    errorMsg.textContent = '';
    resultBox.classList.remove('active');
  });

  exampleBtn.addEventListener('click', () => {
    inputHour.value = 2;
    inputMinute.value = 30;
    inputSecond.value = 45;
    inputPeriod.value = 'PM';
    validateAndConvert();
  });

  randomBtn.addEventListener('click', () => {
    inputHour.value = Math.floor(Math.random() * 12) + 1;
    inputMinute.value = Math.floor(Math.random() * 60);
    inputSecond.value = Math.floor(Math.random() * 60);
    inputPeriod.value = Math.random() > 0.5 ? 'PM' : 'AM';
    validateAndConvert();
  });

  /* ============================================
     CONFETTI
     ============================================ */
  function launchConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#4F46E5', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899', '#8B5CF6'];
    const shapes = ['■', '●', '▲', '★', '♦'];

    for (let i = 0; i < 50; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      piece.style.left = Math.random() * 100 + '%';
      piece.style.top = '-10px';
      piece.style.color = colors[Math.floor(Math.random() * colors.length)];
      piece.style.fontSize = (Math.random() * 12 + 8) + 'px';
      piece.style.animationDelay = Math.random() * 0.5 + 's';
      piece.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
      container.appendChild(piece);

      setTimeout(() => piece.remove(), 3000);
    }
  }

  /* ============================================
     CODE EXPLANATION EXPANDABLES
     ============================================ */
  document.querySelectorAll('.code-line.expandable').forEach(line => {
    line.addEventListener('click', () => {
      const isExpanded = line.getAttribute('data-expanded') === 'true';
      line.setAttribute('data-expanded', !isExpanded);
    });
  });

  /* ============================================
     PRACTICE SECTION
     ============================================ */
  let pScore = 0;
  let pStreak = 0;
  let pStarCount = 0;
  let pBadgeList = [];
  let currentPracticeAnswer = '';

  function generatePracticeQuestion() {
    const h = Math.floor(Math.random() * 12) + 1;
    const m = Math.floor(Math.random() * 60);
    const s = Math.floor(Math.random() * 60);
    const p = Math.random() > 0.5 ? 'PM' : 'AM';

    const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} ${p}`;
    practiceQuestion.textContent = timeStr;

    const result = convert12to24(h, m, s, p);
    currentPracticeAnswer = result.formatted;

    practiceAnswer.value = '';
    practiceFeedback.textContent = '';
    practiceFeedback.className = 'practice-feedback';
    nextQuestionBtn.style.display = 'none';
    checkAnswerBtn.style.display = '';
    practiceAnswer.focus();
  }

  function checkPracticeAnswer() {
    const userAnswer = practiceAnswer.value.trim();
    if (!userAnswer) {
      practiceFeedback.textContent = '⚠️ Please enter your answer!';
      practiceFeedback.className = 'practice-feedback wrong';
      return;
    }

    if (userAnswer === currentPracticeAnswer) {
      pScore += 10;
      pStreak++;
      practiceFeedback.innerHTML = `✅ Correct! Great job! 🎉`;
      practiceFeedback.className = 'practice-feedback correct';
      launchConfetti();

      // Stars
      if (pStreak % 3 === 0) {
        pStarCount++;
        practiceStars.textContent = `⭐ ${pStarCount}`;
      }

      // Badges
      if (pStreak === 5 && !pBadgeList.includes('🥉')) {
        pBadgeList.push('🥉');
      }
      if (pStreak === 10 && !pBadgeList.includes('🥈')) {
        pBadgeList.push('🥈');
      }
      if (pStreak === 15 && !pBadgeList.includes('🥇')) {
        pBadgeList.push('🥇');
      }
      if (pScore >= 100 && !pBadgeList.includes('🏆')) {
        pBadgeList.push('🏆');
      }
    } else {
      pStreak = 0;
      practiceFeedback.innerHTML = `❌ Wrong! Correct answer: <strong>${currentPracticeAnswer}</strong>`;
      practiceFeedback.className = 'practice-feedback wrong';
    }

    practiceScore.textContent = pScore;
    practiceStreak.textContent = `${pStreak} 🔥`;
    practiceBadges.textContent = pBadgeList.join(' ') || '—';

    checkAnswerBtn.style.display = 'none';
    nextQuestionBtn.style.display = '';
  }

  checkAnswerBtn.addEventListener('click', checkPracticeAnswer);
  practiceAnswer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (nextQuestionBtn.style.display !== 'none') {
        generatePracticeQuestion();
      } else {
        checkPracticeAnswer();
      }
    }
  });
  nextQuestionBtn.addEventListener('click', generatePracticeQuestion);

  // Initialize first question
  generatePracticeQuestion();

  /* ============================================
     QUIZ
     ============================================ */
  const quizQuestions = [
    {
      q: 'What does 1:00 PM become in 24-hour time?',
      options: ['01:00', '13:00', '11:00', '12:00'],
      correct: 1
    },
    {
      q: 'What does 12:00 AM (midnight) become?',
      options: ['12:00', '24:00', '00:00', '01:00'],
      correct: 2
    },
    {
      q: 'What does 12:00 PM (noon) become?',
      options: ['00:00', '12:00', '24:00', '13:00'],
      correct: 1
    },
    {
      q: 'Convert 6:45 PM to 24-hour time:',
      options: ['06:45', '18:45', '16:45', '20:45'],
      correct: 1
    },
    {
      q: 'Which of these is NOT a valid 24-hour time?',
      options: ['23:59', '00:00', '25:00', '12:30'],
      correct: 2
    },
    {
      q: 'Convert 11:30 PM to 24-hour time:',
      options: ['11:30', '23:30', '21:30', '13:30'],
      correct: 1
    },
    {
      q: 'What does 9:15 AM become in 24-hour time?',
      options: ['21:15', '09:15', '19:15', '90:15'],
      correct: 1
    },
    {
      q: 'Which sector uses 24-hour time for safety?',
      options: ['Video Games', 'Cooking Shows', 'Hospitals', 'Shopping Malls'],
      correct: 2
    },
    {
      q: 'Convert 3:00 PM to 24-hour time:',
      options: ['03:00', '30:00', '15:00', '13:00'],
      correct: 2
    },
    {
      q: 'What is 00:00 in 12-hour format?',
      options: ['12:00 PM', '12:00 AM', '1:00 AM', '0:00 AM'],
      correct: 1
    }
  ];

  let quizIndex = 0;
  let quizScoreVal = 0;
  const letters = ['A', 'B', 'C', 'D'];

  function loadQuizQuestion() {
    if (quizIndex >= quizQuestions.length) {
      showQuizResult();
      return;
    }

    const q = quizQuestions[quizIndex];
    quizCurrent.textContent = quizIndex + 1;
    quizProgressBar.style.width = ((quizIndex) / quizQuestions.length * 100) + '%';
    quizQuestion.textContent = q.q;
    quizFeedback.textContent = '';
    quizNextBtn.style.display = 'none';
    quizOptions.innerHTML = '';

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.innerHTML = `<span class="option-letter">${letters[i]}</span> ${opt}`;
      btn.addEventListener('click', () => handleQuizAnswer(i, q.correct));
      quizOptions.appendChild(btn);
    });
  }

  function handleQuizAnswer(selected, correct) {
    const options = quizOptions.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
      opt.classList.add('disabled');
      if (i === correct) opt.classList.add('correct');
      if (i === selected && i !== correct) opt.classList.add('wrong');
    });

    if (selected === correct) {
      quizScoreVal++;
      quizFeedback.innerHTML = '✅ Correct! Well done!';
      quizFeedback.style.color = 'var(--secondary)';
      launchConfetti();
    } else {
      quizFeedback.innerHTML = `❌ Wrong! The correct answer is <strong>${quizQuestions[quizIndex].options[correct]}</strong>`;
      quizFeedback.style.color = 'var(--danger)';
    }

    quizScoreEl.textContent = quizScoreVal;
    quizNextBtn.style.display = '';
  }

  quizNextBtn.addEventListener('click', () => {
    quizIndex++;
    loadQuizQuestion();
  });

  function showQuizResult() {
    quizCard.style.display = 'none';
    quizResult.style.display = '';
    quizProgressBar.style.width = '100%';

    const pct = Math.round((quizScoreVal / quizQuestions.length) * 100);
    quizResultScore.textContent = `${quizScoreVal} / ${quizQuestions.length} (${pct}%)`;

    if (pct >= 90) {
      quizResultEmoji.textContent = '🏆';
      quizResultTitle.textContent = 'Amazing! You\'re a Time Master!';
      quizResultText.textContent = 'You clearly understand time conversion perfectly!';
      launchConfetti();
    } else if (pct >= 70) {
      quizResultEmoji.textContent = '🌟';
      quizResultTitle.textContent = 'Great Job!';
      quizResultText.textContent = 'You have a solid understanding. Keep practicing!';
    } else if (pct >= 50) {
      quizResultEmoji.textContent = '👍';
      quizResultTitle.textContent = 'Good Effort!';
      quizResultText.textContent = 'Review the concepts and try again to improve!';
    } else {
      quizResultEmoji.textContent = '📚';
      quizResultTitle.textContent = 'Keep Learning!';
      quizResultText.textContent = 'Go through the lessons above and try the quiz again!';
    }
  }

  quizRestartBtn.addEventListener('click', () => {
    quizIndex = 0;
    quizScoreVal = 0;
    quizScoreEl.textContent = 0;
    quizCard.style.display = '';
    quizResult.style.display = 'none';
    quizProgressBar.style.width = '0%';
    loadQuizQuestion();
  });

  loadQuizQuestion();

  /* ============================================
     SCROLL ANIMATIONS (Intersection Observer)
     ============================================ */
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeEls.forEach(el => observer.observe(el));

  /* ============================================
     SMOOTH SCROLL for anchor links
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ============================================
     KEYBOARD ACCESSIBILITY FOR PRACTICE
     ============================================ */
  // Prevent non-numeric input on number fields
  [inputHour, inputMinute, inputSecond].forEach(el => {
    el.addEventListener('input', () => {
      el.value = el.value.replace(/[^0-9]/g, '');
    });
  });
});
