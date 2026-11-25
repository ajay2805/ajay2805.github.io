/**
 * AJAY A J - "Ajay AI" Interactive Copilot & Terminal Engine
 * Showcases AI engineering, conversational capabilities, and enterprise knowledge
 */

(function () {
  const terminalBody = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  if (!terminalBody || !terminalInput) return;

  const COMMAND_REGISTRY = {
    help: `
<span class="text-cyan-400 font-semibold">Available Terminal Commands:</span>
  • <span class="text-indigo-400">about</span>        - My background and summary
  • <span class="text-indigo-400">skills</span>       - My full-stack & AI technical skill matrix
  • <span class="text-indigo-400">projects</span>     - Production projects I've built (HRMS, Accounting, CRM)
  • <span class="text-indigo-400">experience</span>   - My career history at Coolgen Solutions & Scope India
  • <span class="text-indigo-400">ai</span>           - How I build with GenAI, RAG, FaceNet, Whisper & Groq
  • <span class="text-indigo-400">architecture</span> - How I architected FirstClick HRMS
  • <span class="text-indigo-400">hire</span>         - Why you should hire me (60-second pitch)
  • <span class="text-indigo-400">contact</span>      - My email, phone, LinkedIn, and GitHub links
  • <span class="text-indigo-400">clear</span>        - Clear terminal screen

<span class="text-slate-400 text-xs">💡 Tip: You can also ask me natural questions like <i>"Why should we hire you?"</i>, <i>"Tell me about your RAG chatbot"</i>, or <i>"What AWS services do you use?"</i></span>
`,
    about: `
<span class="text-emerald-400 font-bold">Hi, I'm AJAY A J</span> — Software Engineer & AI Engineer
📍 Kanyakumari, Tamil Nadu, India | 2+ Years Experience

I have 2+ years of experience building and deploying production enterprise systems (HRMS, Accounting, CRM)
using <span class="text-indigo-400">Python, Django REST Framework, React.js, and AWS</span>.
I specialize in bridging enterprise backends with cutting-edge AI features — including RAG with Groq Llama 3,
speech-to-text with Whisper, and facial recognition with FaceNet & OpenCV.
`,
    skills: `
<span class="text-cyan-400 font-bold">MY TECHNICAL SKILLS RADAR:</span>
• <span class="text-indigo-400 font-semibold">Backend &amp; Languages:</span> Python, Django, DRF, Flask, JavaScript, REST APIs, Celery
• <span class="text-cyan-400 font-semibold">Frontend:</span> React.js, Tailwind CSS, Chakra UI, Responsive UI
• <span class="text-purple-400 font-semibold">AI / ML / CV:</span> RAG, Groq LLMs (Llama 3), Whisper STT, FaceNet, OpenCV, Embeddings
• <span class="text-emerald-400 font-semibold">Databases:</span> MySQL, PostgreSQL (basic), Database Modeling
• <span class="text-amber-400 font-semibold">Cloud &amp; DevOps:</span> AWS (EC2, S3, RDS, Lambda, Lex), Docker, Git, CI/CD
• <span class="text-pink-400 font-semibold">IoT &amp; Hardware:</span> Hikvision Biometric Device Webhook API Integrations
• <span class="text-blue-400 font-semibold">Security:</span> JWT Authentication, RBAC (Role-Based Access Control)
`,
    projects: `
<span class="text-cyan-400 font-bold">PRODUCTION ENTERPRISE PROJECTS I'VE BUILT:</span>

1. <span class="text-white font-bold">FirstClick HRMS</span> <span class="text-xs bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">Live Enterprise</span>
   • Built the full employee lifecycle: payroll, attendance, leave, RBAC & JWT security.
   • Integrated <span class="text-cyan-300">Hikvision Biometric Webhook APIs</span> for live attendance sync.
   • Engineered a <span class="text-purple-300">RAG AI Chatbot</span> using Groq-hosted Llama-3 for HR/policy natural language queries.
   • Implemented <span class="text-indigo-300">Facial Recognition</span> attendance check-in via FaceNet + OpenCV.
   • <i>Tech I used:</i> Django, DRF, React.js, MySQL, Docker, Groq, FaceNet, OpenCV.

2. <span class="text-white font-bold">Fin360 Accounting System</span> <span class="text-xs bg-cyan-900/60 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">Live Production</span>
   • Developed financial transaction pipelines, audit trails, and financial reporting.
   • Added voice-to-ledger entries using <span class="text-cyan-300">OpenAI Whisper STT</span>, cutting down manual typing.
   • <i>Tech I used:</i> Django, DRF, React.js, MySQL, Python, Whisper.

3. <span class="text-white font-bold">Sales CRM Platform</span> <span class="text-xs bg-indigo-900/60 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">Enterprise CRM</span>
   • Built lead status tracking, pipeline visualization, and customer interaction logs.
   • Enforced granular role-based security protecting sensitive enterprise lead data.
   • <i>Tech I used:</i> Django, DRF, React.js, MySQL, Tailwind CSS.
`,
    experience: `
<span class="text-cyan-400 font-bold">MY CAREER JOURNEY:</span>

💼 <span class="text-white font-bold">Associate Engineer – Full Stack Developer & AI Engineer</span>
   <span class="text-indigo-400">Coolgen Solutions</span> | Nov 2024 – Present
   • I design production HRMS & accounting engines with Django REST Framework & React.
   • I architected Hikvision biometric webhook listeners handling realtime attendance streams.
   • I integrated a high-speed Groq-hosted Llama 3 RAG AI query assistant for HR operations.
   • I implemented a FaceNet & OpenCV computer vision pipeline for automated face check-ins.

💼 <span class="text-white font-bold">Full Stack Developer Intern</span>
   <span class="text-indigo-400">Scope India</span> | Aug 2023 – Feb 2024
   • Built an end-to-end student management portal with registration, profile, and CRUD modules.
   • Crafted responsive React UI components and robust Django database ORM queries.

🎓 <span class="text-white font-bold">B.E. in Computer Science and Engineering</span>
   St. Xavier’s Catholic College of Engineering, Kanyakumari (2019 – 2023) | CGPA: 7.9
`,
    ai: `
<span class="text-purple-400 font-bold">MY AI & MACHINE LEARNING EXPERTISE:</span>
Unlike purely theoretical AI projects, I have <span class="text-emerald-400">shipped AI into live production enterprise systems</span>:

• <span class="text-cyan-300 font-semibold">RAG (Retrieval-Augmented Generation):</span>
  I built contextual query systems for HR policies and employee records with vector search
  and Groq-hosted Llama-3 LLMs for sub-second inference.
• <span class="text-purple-300 font-semibold">Speech-to-Text (Whisper):</span>
  I integrated Whisper into Fin360 accounting software so accountants can dictate journal
  entries directly via voice commands.
• <span class="text-indigo-300 font-semibold">Computer Vision & Biometrics (FaceNet + OpenCV):</span>
  I built face verification algorithms and bounding box recognition for touchless attendance.
• <span class="text-pink-300 font-semibold">Frameworks & Tools I Work With:</span>
  Groq API, Llama 3, Hugging Face, PyTorch, TensorFlow, OpenCV, Vector Embeddings.
`,
    architecture: `
<span class="text-cyan-400 font-bold">FIRSTCLICK HRMS — MY SYSTEM ARCHITECTURE:</span>
<span class="font-mono text-xs text-slate-300">
[ Client Layer ]  --> React.js SPA (Tailwind / Chakra UI)
                              │
                    (REST API / JWT / RBAC)
                              ▼
[ API Gateway ]   --> Django REST Framework (DRF) + Celery Task Queue
                              │
          ┌───────────────────┼─────────────────────────┐
          ▼                   ▼                         ▼
  [ Database Tier ]   [ Biometric / IoT ]      [ AI & Vision Microservices ]
  • MySQL Cluster      • Hikvision Devices      • Groq API (Llama 3 RAG)
  • Redis Cache        • Webhook Event Listener • Whisper Speech-to-Text
  • AWS S3 Storage     • Real-time Sync         • FaceNet + OpenCV Pipeline
</span>
`,
    hire: `
<span class="text-amber-400 font-bold">⭐ WHY HIRE ME? (60-SECOND EXECUTIVE PITCH)</span>

1. <span class="text-emerald-400 font-semibold">Rare Hybrid Ability:</span>
   I don't just write frontend or backend in isolation — I can take an entire product from
   React frontend to Django REST API, connect AWS infrastructure, and ship live GenAI & Vision models.
2. <span class="text-cyan-400 font-semibold">Enterprise Tested:</span>
   I have hands-on experience with mission-critical HRMS, accounting, and CRM platforms handling
   real-world payroll, security, and financial data.
3. <span class="text-indigo-400 font-semibold">Hardware & Webhook Experience:</span>
   I'm experienced in physical IoT device integration (Hikvision biometric cameras/terminals), which
   very few full-stack developers have tackled.
4. <span class="text-purple-400 font-semibold">Self-Starter & Production Mindset:</span>
   I handle Docker containerization, AWS deployments (EC2, S3, RDS, Lambda), and Git CI/CD.
5. <span class="text-green-400 font-semibold">Immediate Availability:</span>
   I'm ready to interview and add immediate momentum to your engineering team.
`,
    contact: `
<span class="text-cyan-400 font-bold">GET IN TOUCH WITH ME DIRECTLY:</span>
  📧 Email:    <a href="mailto:ajajay2805@gmail.com" class="text-indigo-300 underline">ajajay2805@gmail.com</a>
  📱 Phone:    <a href="tel:+919751758698" class="text-indigo-300 underline">+91 9751758698</a>
  💼 LinkedIn: <a href="https://linkedin.com/in/ajay-aj-engineer/" target="_blank" class="text-indigo-300 underline">linkedin.com/in/ajay-aj-engineer/</a>
  🐙 GitHub:   <a href="https://github.com/ajay2805" target="_blank" class="text-indigo-300 underline">github.com/ajay2805</a>
  📍 Location: Kanyakumari, Tamil Nadu, India (Open to Remote / Hybrid / Relocation)
`
  };

  function appendOutput(content, isCommand = false) {
    const div = document.createElement('div');
    div.className = isCommand ? 'text-indigo-300 font-mono text-sm mt-2' : 'text-slate-300 font-mono text-sm leading-relaxed mb-3';
    div.innerHTML = content;
    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleQuery(rawQuery) {
    const q = rawQuery.trim().toLowerCase();
    if (!q) return;

    if (window.soundEngine) {
      window.soundEngine.blip();
    }

    appendOutput(`<span class="text-emerald-400">ajay@cloud-env:~$</span> ${escapeHTML(rawQuery)}`, true);

    // Exact command match
    if (COMMAND_REGISTRY[q]) {
      if (q === 'clear') {
        terminalBody.innerHTML = '';
        appendOutput(`<span class="text-slate-500">// Terminal cleared. Type 'help' for commands.</span>`);
        return;
      }
      setTimeout(() => {
        appendOutput(COMMAND_REGISTRY[q]);
        if (window.soundEngine) window.soundEngine.chime();
      }, 100);
      return;
    }

    // Natural Language Query Matching
    setTimeout(() => {
      let matchedResponse = null;

      if (q.includes('why') || q.includes('hire') || q.includes('reason') || q.includes('hr') || q.includes('recruiter')) {
        matchedResponse = COMMAND_REGISTRY.hire;
      } else if (q.includes('rag') || q.includes('ai') || q.includes('llm') || q.includes('llama') || q.includes('groq') || q.includes('facenet') || q.includes('whisper')) {
        matchedResponse = COMMAND_REGISTRY.ai;
      } else if (q.includes('project') || q.includes('hrms') || q.includes('firstclick') || q.includes('fin360') || q.includes('crm')) {
        matchedResponse = COMMAND_REGISTRY.projects;
      } else if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('django') || q.includes('react') || q.includes('python')) {
        matchedResponse = COMMAND_REGISTRY.skills;
      } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('call') || q.includes('reach') || q.includes('linkedin')) {
        matchedResponse = COMMAND_REGISTRY.contact;
      } else if (q.includes('experience') || q.includes('coolgen') || q.includes('scope') || q.includes('work') || q.includes('company')) {
        matchedResponse = COMMAND_REGISTRY.experience;
      } else if (q.includes('arch') || q.includes('design') || q.includes('system') || q.includes('flow')) {
        matchedResponse = COMMAND_REGISTRY.architecture;
      } else if (q.includes('about') || q.includes('who are you') || q.includes('yourself') || q.includes('intro') || q.includes('background')) {
        matchedResponse = COMMAND_REGISTRY.about;
      } else if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('cgpa')) {
        matchedResponse = `
<span class="text-cyan-400 font-bold">MY EDUCATION & CERTIFICATIONS:</span>
🎓 <span class="text-white font-semibold">B.E. in Computer Science and Engineering</span>
   St. Xavier’s Catholic College of Engineering, Kanyakumari, Tamil Nadu (2019 – 2023)
   <span class="text-emerald-400">CGPA: 7.9</span>

📜 <span class="text-purple-300">Generative AI and Hugging Face Workshop Certificate</span> - Cuvette
📜 <span class="text-indigo-300">Python Full Stack Developer Internship Certificate</span> - Scope India
`;
      } else {
        matchedResponse = `
<span class="text-amber-400">Quick reply from my knowledge base:</span>
I'm Ajay A J, a Full-Stack & AI Engineer specializing in <span class="text-cyan-300">Django, React, AWS, RAG & Computer Vision</span>.
Try one of the primary commands: <span class="text-indigo-400">about, skills, projects, experience, ai, hire, contact</span> or ask me specific questions like <i>"Tell me about FirstClick HRMS"</i>.
`;
      }

      appendOutput(matchedResponse);
      if (window.soundEngine) window.soundEngine.chime();
    }, 150);
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

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleQuery(val);
    }
  });

  // Suggestion buttons
  document.querySelectorAll('[data-terminal-cmd]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-terminal-cmd');
      terminalInput.value = cmd;
      handleQuery(cmd);
      terminalInput.focus();
    });
  });

  // Expose global helper for clicking buttons elsewhere in page
  window.runTerminalCommand = function (cmd) {
    const el = document.getElementById('terminal-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    terminalInput.value = cmd;
    handleQuery(cmd);
  };
})();
