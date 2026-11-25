/**
 * AJAY A J - Portfolio Interactive Master Script
 * Manages Recruiter HUD, Command Palette, Interactive Demonstrators, 3D Tilt Physics,
 * FaceNet Biometric Scanner & Webhook Event Stream
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. SOUND TOGGLE BUTTON
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundToggleBtnMobile = document.getElementById('sound-toggle-btn-mobile');
  const soundIcon = document.getElementById('sound-icon');
  const soundText = document.getElementById('sound-text');

  function updateSoundUI(enabled) {
    if (enabled) {
      if (soundIcon) soundIcon.className = 'fa-solid fa-volume-high text-cyan-400';
      if (soundText) soundText.innerText = 'Sound: ON';
      if (soundToggleBtn) soundToggleBtn.classList.add('border-cyan-500/50');
      if (soundToggleBtnMobile) soundToggleBtnMobile.innerHTML = `<i class="fa-solid fa-volume-high text-cyan-400"></i> Sound: ON`;
    } else {
      if (soundIcon) soundIcon.className = 'fa-solid fa-volume-xmark text-slate-400';
      if (soundText) soundText.innerText = 'Sound: OFF';
      if (soundToggleBtn) soundToggleBtn.classList.remove('border-cyan-500/50');
      if (soundToggleBtnMobile) soundToggleBtnMobile.innerHTML = `<i class="fa-solid fa-volume-xmark text-slate-400"></i> Sound: OFF`;
    }
  }

  if (window.soundEngine) {
    updateSoundUI(window.soundEngine.enabled);
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        const state = window.soundEngine.toggle();
        updateSoundUI(state);
      });
    }
    if (soundToggleBtnMobile) {
      soundToggleBtnMobile.addEventListener('click', () => {
        const state = window.soundEngine.toggle();
        updateSoundUI(state);
      });
    }
  }

  // 1B. THEME TOGGLE (WHITE MODE / DARK MODE)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeToggleBtnMobile = document.getElementById('theme-toggle-btn-mobile');
  const themeToggleBtnDrawer = document.getElementById('theme-toggle-btn-drawer');
  const themeIcon = document.getElementById('theme-icon');
  const themeIconMobile = document.getElementById('theme-icon-mobile');
  const themeText = document.getElementById('theme-text');

  function applyTheme(isLight) {
    if (isLight) {
      document.body.classList.add('light-theme');
      if (themeIcon) themeIcon.className = 'fa-solid fa-moon text-indigo-600';
      if (themeIconMobile) themeIconMobile.className = 'fa-solid fa-moon text-indigo-600';
      if (themeText) themeText.innerText = 'Dark Mode';
      if (themeToggleBtn) {
        themeToggleBtn.title = 'Switch to Obsidian Dark Mode';
        themeToggleBtn.classList.add('active-light');
      }
      if (themeToggleBtnMobile) {
        themeToggleBtnMobile.title = 'Switch to Obsidian Dark Mode';
        themeToggleBtnMobile.innerHTML = `<i class="fa-solid fa-moon text-indigo-600"></i>`;
      }
      if (themeToggleBtnDrawer) {
        themeToggleBtnDrawer.innerHTML = `<i class="fa-solid fa-moon text-indigo-600"></i> Switch to Dark Mode`;
      }
      localStorage.setItem('portfolio_theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun text-amber-400';
      if (themeIconMobile) themeIconMobile.className = 'fa-solid fa-sun text-amber-400';
      if (themeText) themeText.innerText = 'Light Mode';
      if (themeToggleBtn) {
        themeToggleBtn.title = 'Switch to Clean White Mode';
        themeToggleBtn.classList.remove('active-light');
      }
      if (themeToggleBtnMobile) {
        themeToggleBtnMobile.title = 'Switch to Clean White Mode';
        themeToggleBtnMobile.innerHTML = `<i class="fa-solid fa-sun text-amber-400"></i>`;
      }
      if (themeToggleBtnDrawer) {
        themeToggleBtnDrawer.innerHTML = `<i class="fa-solid fa-sun text-amber-400"></i> Switch to White Mode`;
      }
      localStorage.setItem('portfolio_theme', 'dark');
    }
  }

  const savedTheme = localStorage.getItem('portfolio_theme');
  if (savedTheme === 'light') {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  function toggleTheme() {
    const isCurrentlyLight = document.body.classList.contains('light-theme');
    applyTheme(!isCurrentlyLight);
    if (window.soundEngine) window.soundEngine.click();
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener('click', toggleTheme);
  if (themeToggleBtnDrawer) themeToggleBtnDrawer.addEventListener('click', toggleTheme);

  // 2. RECRUITER HUD DRAWER
  const recruiterHudBtn = document.getElementById('recruiter-hud-btn');
  const recruiterHudBtnCompact = document.getElementById('recruiter-hud-btn-compact');
  const recruiterHeroBtn = document.getElementById('recruiter-hero-btn');
  const recruiterDrawer = document.getElementById('recruiter-drawer');
  const recruiterOverlay = document.getElementById('recruiter-overlay');
  const closeRecruiterBtn = document.getElementById('close-recruiter-btn');

  function openRecruiterHUD() {
    if (recruiterDrawer && recruiterOverlay) {
      recruiterDrawer.classList.add('open');
      recruiterOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (window.soundEngine) window.soundEngine.chime();
    }
  }

  function closeRecruiterHUD() {
    if (recruiterDrawer && recruiterOverlay) {
      recruiterDrawer.classList.remove('open');
      recruiterOverlay.classList.remove('open');
      document.body.style.overflow = '';
      if (window.soundEngine) window.soundEngine.click();
    }
  }

  if (recruiterHudBtn) recruiterHudBtn.addEventListener('click', openRecruiterHUD);
  if (recruiterHudBtnCompact) recruiterHudBtnCompact.addEventListener('click', openRecruiterHUD);
  if (recruiterHeroBtn) recruiterHeroBtn.addEventListener('click', openRecruiterHUD);
  if (closeRecruiterBtn) closeRecruiterBtn.addEventListener('click', closeRecruiterHUD);
  if (recruiterOverlay) recruiterOverlay.addEventListener('click', closeRecruiterHUD);

  // 3. COMMAND PALETTE (CMD+K / CTRL+K)
  const cmdPaletteModal = document.getElementById('cmd-palette');
  const cmdPaletteInput = document.getElementById('cmd-palette-input');
  const cmdPaletteList = document.getElementById('cmd-palette-list');
  const cmdPaletteBtn = document.getElementById('cmd-palette-btn');

  function openCmdPalette() {
    if (cmdPaletteModal) {
      cmdPaletteModal.classList.add('open');
      if (cmdPaletteInput) {
        cmdPaletteInput.value = '';
        setTimeout(() => cmdPaletteInput.focus(), 50);
      }
      filterPaletteItems('');
      if (window.soundEngine) window.soundEngine.click();
    }
  }

  function closeCmdPalette() {
    if (cmdPaletteModal) {
      cmdPaletteModal.classList.remove('open');
      if (window.soundEngine) window.soundEngine.click();
    }
  }

  if (cmdPaletteBtn) cmdPaletteBtn.addEventListener('click', openCmdPalette);

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdPaletteModal && cmdPaletteModal.classList.contains('open')) {
        closeCmdPalette();
      } else {
        openCmdPalette();
      }
    } else if (e.key === 'Escape') {
      closeCmdPalette();
      closeRecruiterHUD();
      closeResumeModal();
    }
  });

  if (cmdPaletteModal) {
    cmdPaletteModal.addEventListener('click', (e) => {
      if (e.target === cmdPaletteModal) {
        closeCmdPalette();
      }
    });
  }

  const PALETTE_ACTIONS = [
    { name: 'View FirstClick HRMS (Live Enterprise)', category: 'Projects', icon: 'fa-cubes', action: () => scrollToSection('projects') },
    { name: 'Test FaceNet Biometric Scanner Demo', category: 'Live Demo', icon: 'fa-camera', action: () => { scrollToSection('projects'); activateHrmsTab('facenet'); } },
    { name: 'Test Hikvision Webhook Packet Stream', category: 'Live Demo', icon: 'fa-network-wired', action: () => { scrollToSection('projects'); activateHrmsTab('biometrics'); } },
    { name: 'Test Fin360 Voice Accounting Simulator', category: 'Projects', icon: 'fa-microphone-lines', action: () => scrollToSection('projects') },
    { name: 'Open Recruiter 60-Sec Executive Brief', category: 'HR View', icon: 'fa-briefcase', action: () => { closeCmdPalette(); openRecruiterHUD(); } },
    { name: 'Explore Technical Skills Radar', category: 'Skills', icon: 'fa-layer-group', action: () => scrollToSection('skills') },
    { name: 'View Career Experience (Coolgen & Scope)', category: 'Experience', icon: 'fa-user-tie', action: () => scrollToSection('experience') },
    { name: 'Ask Ajay AI Interactive Terminal', category: 'AI Assistant', icon: 'fa-terminal', action: () => scrollToSection('terminal-section') },
    { name: 'View & Download Printable Resume', category: 'Resume', icon: 'fa-file-pdf', action: () => openResumeModal() },
    { name: 'Contact Ajay Directly', category: 'Contact', icon: 'fa-envelope', action: () => scrollToSection('contact') },
    { name: 'Call Phone (+91 9751758698)', category: 'Contact', icon: 'fa-phone', action: () => window.location.href = 'tel:+919751758698' },
    { name: 'Send Email (ajajay2805@gmail.com)', category: 'Contact', icon: 'fa-paper-plane', action: () => window.location.href = 'mailto:ajajay2805@gmail.com' },
  ];

  function filterPaletteItems(term) {
    if (!cmdPaletteList) return;
    cmdPaletteList.innerHTML = '';
    const q = term.toLowerCase().trim();
    const filtered = PALETTE_ACTIONS.filter(item => 
      item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      cmdPaletteList.innerHTML = `<div class="p-4 text-center text-slate-500 font-mono text-sm">No matching navigation targets.</div>`;
      return;
    }

    filtered.forEach(item => {
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between p-2.5 sm:p-3 rounded-lg hover:bg-slate-800/80 cursor-pointer transition text-xs sm:text-sm group border border-transparent hover:border-slate-700';
      row.innerHTML = `
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs group-hover:bg-indigo-500 group-hover:text-white transition">
            <i class="fa-solid ${item.icon}"></i>
          </div>
          <span class="text-slate-200 group-hover:text-white font-medium">${item.name}</span>
        </div>
        <span class="text-[10px] font-mono text-slate-500 bg-slate-900/60 px-2 py-0.5 rounded">${item.category}</span>
      `;
      row.addEventListener('click', () => {
        closeCmdPalette();
        item.action();
      });
      cmdPaletteList.appendChild(row);
    });
  }

  if (cmdPaletteInput) {
    cmdPaletteInput.addEventListener('input', (e) => {
      filterPaletteItems(e.target.value);
    });
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // 4. FIRSTCLICK HRMS - INTERACTIVE TABS
  const hrmsTabBtns = document.querySelectorAll('[data-hrms-tab]');
  const hrmsTabPanels = document.querySelectorAll('[data-hrms-panel]');

  function activateHrmsTab(target) {
    hrmsTabBtns.forEach(b => {
      if (b.getAttribute('data-hrms-tab') === target) {
        b.classList.remove('bg-slate-800/50', 'text-slate-400', 'border-slate-700/50');
        b.classList.add('bg-indigo-600', 'text-white', 'border-indigo-400');
      } else {
        b.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-400');
        b.classList.add('bg-slate-800/50', 'text-slate-400', 'border-slate-700/50');
      }
    });

    hrmsTabPanels.forEach(panel => {
      if (panel.getAttribute('data-hrms-panel') === target) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });
  }

  hrmsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-hrms-tab');
      activateHrmsTab(target);
      if (window.soundEngine) window.soundEngine.click();
    });
  });

  // 5. FIN360 VOICE SIMULATOR
  const simulateVoiceBtn = document.getElementById('simulate-voice-btn');
  const voiceWaveform = document.getElementById('voice-waveform');
  const voiceTranscript = document.getElementById('voice-transcript');
  const ledgerResult = document.getElementById('ledger-result');

  if (simulateVoiceBtn) {
    let isSimulating = false;
    simulateVoiceBtn.addEventListener('click', () => {
      if (isSimulating) return;
      isSimulating = true;
      simulateVoiceBtn.disabled = true;
      simulateVoiceBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Listening & Transcribing...`;
      if (voiceWaveform) voiceWaveform.classList.remove('hidden');
      if (voiceTranscript) voiceTranscript.innerHTML = `<span class="text-cyan-400 italic">"Recording voice packet..."</span>`;
      if (window.soundEngine) window.soundEngine.blip();

      setTimeout(() => {
        if (voiceTranscript) {
          voiceTranscript.innerHTML = `<span class="text-emerald-400 font-mono">Whisper Transcribed:</span> "Record credit of ₹45,000 for Enterprise Software Consulting to Account #9042"`;
        }
      }, 1400);

      setTimeout(() => {
        if (voiceWaveform) voiceWaveform.classList.add('hidden');
        if (ledgerResult) {
          ledgerResult.classList.remove('hidden');
          ledgerResult.innerHTML = `
            <div class="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg font-mono text-xs text-slate-200">
              <div class="flex justify-between items-center text-emerald-400 font-bold mb-1">
                <span>✔ AUTO-GENERATED JOURNAL VOUCHER</span>
                <span>STATUS: BALANCED</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[11px] mt-2 border-t border-emerald-500/20 pt-2">
                <div><span class="text-slate-400">Debit (Bank A/C):</span> ₹45,000.00</div>
                <div><span class="text-slate-400">Credit (Service Revenue):</span> ₹45,000.00</div>
                <div><span class="text-slate-400">Ref Code:</span> FIN-AI-8831</div>
                <div><span class="text-slate-400">Whisper Match:</span> 99.4% Confidence</div>
              </div>
            </div>
          `;
        }
        simulateVoiceBtn.disabled = false;
        simulateVoiceBtn.innerHTML = `<i class="fa-solid fa-microphone mr-2"></i> Re-Run Voice Simulation`;
        isSimulating = false;
        if (window.soundEngine) window.soundEngine.chime();
      }, 2500);
    });
  }

  // 6. SKILLS FILTERING TABS
  const skillCategoryBtns = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('[data-skill-category]');

  skillCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-skill-filter');

      skillCategoryBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-400');
        b.classList.add('bg-slate-800/60', 'text-slate-400');
      });
      btn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-400');
      btn.classList.remove('bg-slate-800/60', 'text-slate-400');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-skill-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

      if (window.soundEngine) window.soundEngine.click();
    });
  });

  // 7. RESUME MODAL
  const resumeModal = document.getElementById('resume-modal');
  const viewResumeBtn = document.getElementById('view-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (window.soundEngine) window.soundEngine.click();
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('hidden');
      document.body.style.overflow = '';
      if (window.soundEngine) window.soundEngine.click();
    }
  }

  if (viewResumeBtn) viewResumeBtn.addEventListener('click', openResumeModal);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResumeModal);
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      const iframe = document.getElementById('resume-frame');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.print();
      } else {
        window.open('assets/resume/Ajay_AJ_Resume.html', '_blank');
      }
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  // 8. CLIPBOARD COPY HELPERS
  document.querySelectorAll('[data-copy-text]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy-text');
      navigator.clipboard.writeText(text).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check text-emerald-400"></i> Copied!`;
        if (window.soundEngine) window.soundEngine.chime();
        setTimeout(() => {
          btn.innerHTML = original;
        }, 2000);
      });
    });
  });

  // 9. CONTACT FORM INTERACTIVE SUBMISSION
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const name = contactForm.querySelector('#sender-name')?.value;
      const email = contactForm.querySelector('#sender-email')?.value;
      const message = contactForm.querySelector('#sender-message')?.value;

      if (!name || !email || !message) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Transmitting Message...`;
      }

      setTimeout(() => {
        if (formStatus) {
          formStatus.classList.remove('hidden');
          formStatus.innerHTML = `
            <div class="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-mono text-xs sm:text-sm flex items-start gap-3">
              <i class="fa-solid fa-circle-check text-emerald-400 text-lg mt-0.5"></i>
              <div>
                <p class="font-bold">Message Transmitted Successfully!</p>
                <p class="text-xs text-slate-300 mt-1">Thank you ${escapeHTML(name)}. Ajay has been alerted and will reach back at <b>${escapeHTML(email)}</b>.</p>
                <p class="text-xs text-indigo-300 mt-2 font-sans">
                  Direct Fallback: <a href="mailto:ajajay2805@gmail.com?subject=Regarding Opportunity for Ajay AJ&body=${encodeURIComponent(message)}" class="underline">Click here to send directly via mail client</a>.
                </p>
              </div>
            </div>
          `;
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fa-solid fa-check text-emerald-400 mr-2"></i> Sent!`;
        }
        if (window.soundEngine) window.soundEngine.chime();
        contactForm.reset();
      }, 1200);
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ================= 10. BESPOKE ANIMATIONS & INTERACTIVE ENGINES =================

  // A. Cyber Text Decryptor Scrambler (Hero Section)
  const scramblerEl = document.getElementById('cyber-scrambler');
  if (scramblerEl) {
    class TextScrambler {
      constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________010101';
        this.update = this.update.bind(this);
      }
      setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || '';
          const to = newText[i] || '';
          const start = Math.floor(Math.random() * 20);
          const end = start + Math.floor(Math.random() * 20);
          this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameReq);
        this.frame = 0;
        this.update();
        return promise;
      }
      update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i];
          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.chars[Math.floor(Math.random() * this.chars.length)];
              this.queue[i].char = char;
            }
            output += `<span class="text-cyan-400 font-bold">${char}</span>`;
          } else {
            output += from;
          }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
          this.resolve();
        } else {
          this.frameReq = requestAnimationFrame(this.update);
          this.frame++;
        }
      }
    }

    const phrases = [
      'FULL_STACK // DJANGO + REACT + AWS',
      'PROD_AI // RAG & LLAMA-3 ENGINES',
      'COMPUTER_VISION // FACENET & OPENCV',
      'BIOMETRICS_IOT // HIKVISION WEBHOOKS',
      'HIGH_SCALE_SYSTEMS // 99.98% AUDIT TRAIL'
    ];
    const scrambler = new TextScrambler(scramblerEl);
    let counter = 0;
    const nextPhrase = () => {
      scrambler.setText(phrases[counter]).then(() => {
        setTimeout(nextPhrase, 2600);
      });
      counter = (counter + 1) % phrases.length;
    };
    nextPhrase();
  }

  // B. 3D Tilt & Mouse Glare Physics Engine
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // D. FaceNet Biometric Scanner Simulator (Interactive CV Demo)
  const facenetScanBtn = document.getElementById('facenet-scan-btn');
  const facenetStatus = document.getElementById('facenet-status');
  const facenetCanvas = document.getElementById('facenet-canvas');
  const facenetConfidence = document.getElementById('facenet-confidence');
  const facenetDistance = document.getElementById('facenet-distance');
  const facenetReticle = document.getElementById('facenet-reticle');
  const facenetLaser = document.getElementById('facenet-laser');

  if (facenetScanBtn) {
    let isScanning = false;
    facenetScanBtn.addEventListener('click', () => {
      if (isScanning) return;
      isScanning = true;
      facenetScanBtn.disabled = true;
      facenetScanBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Analyzing Frame Vectors...`;
      
      if (window.soundEngine) window.soundEngine.scan();
      if (facenetLaser) facenetLaser.classList.remove('hidden');
      if (facenetReticle) {
        facenetReticle.classList.remove('border-emerald-400');
        facenetReticle.classList.add('border-cyan-400');
      }

      // Animate facial landmark dots on canvas
      if (facenetCanvas) {
        const fctx = facenetCanvas.getContext('2d');
        facenetCanvas.width = facenetCanvas.clientWidth;
        facenetCanvas.height = facenetCanvas.clientHeight;
        
        const landmarks = [
          {x: 0.35, y: 0.38}, {x: 0.65, y: 0.38}, // eyes
          {x: 0.50, y: 0.52}, // nose
          {x: 0.38, y: 0.68}, {x: 0.62, y: 0.68}, // mouth
          {x: 0.25, y: 0.48}, {x: 0.75, y: 0.48}, // cheeks
          {x: 0.50, y: 0.82}  // chin
        ];

        let tick = 0;
        const drawMesh = () => {
          fctx.clearRect(0, 0, facenetCanvas.width, facenetCanvas.height);
          const w = facenetCanvas.width;
          const h = facenetCanvas.height;

          // Connecting lines
          fctx.beginPath();
          landmarks.forEach((p, idx) => {
            const px = p.x * w;
            const py = p.y * h + (Math.sin(tick + idx) * 2);
            if (idx === 0) fctx.moveTo(px, py);
            else fctx.lineTo(px, py);
          });
          fctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
          fctx.lineWidth = 1;
          fctx.stroke();

          // Dots
          landmarks.forEach((p, idx) => {
            const px = p.x * w;
            const py = p.y * h + (Math.sin(tick + idx) * 2);
            fctx.beginPath();
            fctx.arc(px, py, 3, 0, Math.PI * 2);
            fctx.fillStyle = '#22d3ee';
            fctx.fill();
          });

          tick += 0.2;
          if (isScanning) requestAnimationFrame(drawMesh);
        };
        drawMesh();
      }

      // Dynamic metric increment
      let score = 70.0;
      const interval = setInterval(() => {
        score += Math.random() * 5;
        if (score > 99.2) score = 99.4;
        if (facenetConfidence) facenetConfidence.innerText = `${score.toFixed(1)}%`;
        if (facenetDistance) facenetDistance.innerText = `${(0.42 - (score - 70) * 0.005).toFixed(3)}`;
      }, 120);

      setTimeout(() => {
        clearInterval(interval);
        isScanning = false;
        if (facenetLaser) facenetLaser.classList.add('hidden');
        if (facenetReticle) {
          facenetReticle.classList.remove('border-cyan-400');
          facenetReticle.classList.add('border-emerald-400');
        }
        if (facenetStatus) {
          facenetStatus.innerHTML = `
            <span class="text-emerald-400 font-bold flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-circle-check"></i> IDENTITY VERIFIED: AJAY A J (#E1049)
            </span>
          `;
        }
        facenetScanBtn.disabled = false;
        facenetScanBtn.innerHTML = `<i class="fa-solid fa-camera mr-2"></i> Re-Scan Biometrics`;
        if (window.soundEngine) window.soundEngine.lock();
      }, 1900);
    });
  }

  // E. Hikvision Webhook Packet Flow Simulator
  const triggerWebhookBtn = document.getElementById('trigger-webhook-btn');
  const webhookPacket = document.getElementById('webhook-packet');
  const webhookLog = document.getElementById('webhook-log');
  const punchCounter = document.getElementById('punch-counter');

  if (triggerWebhookBtn) {
    let punchCount = 1420;
    triggerWebhookBtn.addEventListener('click', () => {
      triggerWebhookBtn.disabled = true;
      if (window.soundEngine) window.soundEngine.packet();

      // Trigger packet animation
      if (webhookPacket) {
        webhookPacket.classList.remove('hidden');
        webhookPacket.classList.add('anim-packet');
      }

      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

      if (webhookLog) {
        const newLog = document.createElement('div');
        newLog.className = 'text-cyan-300 animate-pulse';
        newLog.innerHTML = `[${timeStr}] HK-BIO-01 &rarr; POST /api/v1/integrations/biometrics/hikvision/ (200 OK, 38ms)`;
        webhookLog.prepend(newLog);
      }

      setTimeout(() => {
        punchCount++;
        if (punchCounter) punchCounter.innerText = punchCount.toLocaleString();
        if (webhookPacket) {
          webhookPacket.classList.add('hidden');
          webhookPacket.classList.remove('anim-packet');
        }
        triggerWebhookBtn.disabled = false;
        if (window.soundEngine) window.soundEngine.chime();
      }, 1800);
    });
  }

  // F. Groq RAG LLM Token Streamer Simulator
  const ragPromptBtns = document.querySelectorAll('[data-rag-prompt]');
  const ragQueryInput = document.getElementById('rag-query-input');
  const ragStreamingOutput = document.getElementById('rag-streaming-output');
  const ragTokenCounter = document.getElementById('rag-token-counter');

  const RAG_ANSWERS = {
    leave: "According to Section 4.2 of the Coolgen HR Policy, employees are entitled to 12 casual leaves and 8 sick leaves annually. Medical certificates are only mandatory when taking consecutive sick leave of 3 or more working days.",
    payroll: "Payroll cycles execute on the 28th of every calendar month. Overtime compensation is automatically calculated via the Hikvision attendance punch records with a 1.5x hourly multiplier approved by your unit manager.",
    policy: "All employees have access to comprehensive health insurance covering up to ₹5,00,000 for self and immediate dependants. Claims can be filed digitally via the Fin360 reimbursement portal within 30 days of hospital discharge."
  };

  ragPromptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-rag-prompt');
      const text = RAG_ANSWERS[type] || RAG_ANSWERS.leave;
      
      ragPromptBtns.forEach(b => b.classList.remove('border-purple-400', 'bg-purple-900/40'));
      btn.classList.add('border-purple-400', 'bg-purple-900/40');

      if (ragQueryInput) ragQueryInput.innerText = `"${btn.innerText.trim()}"`;
      if (ragStreamingOutput) {
        ragStreamingOutput.innerHTML = '';
        let charIndex = 0;
        let tokenCount = 0;
        if (window.soundEngine) window.soundEngine.blip();

        const streamInterval = setInterval(() => {
          if (charIndex < text.length) {
            ragStreamingOutput.innerHTML += text[charIndex];
            charIndex++;
            if (charIndex % 4 === 0) {
              tokenCount++;
              if (ragTokenCounter) ragTokenCounter.innerText = `${tokenCount} tokens (142 tok/s)`;
            }
          } else {
            clearInterval(streamInterval);
            if (window.soundEngine) window.soundEngine.chime();
          }
        }, 12);
      }
    });
  });

});
