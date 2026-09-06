/* ============================================
   HITECH ALUMINIUM TRADES — Main Script
   Vajra Digital Tech & ADS Consultation
   ============================================ */

// ─── GOOGLE ANALYTICS (Replace G-XXXXXXXXXX with your ID) ───
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');

// ─── SPLASH SCREEN ───
document.addEventListener('DOMContentLoaded', function() {
  const splash = document.getElementById('splash');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 2800);
  }
  document.body.style.overflow = 'hidden';

  // Init all modules
  initNavbar();
  initScrollAnimations();
  initPromoSlider();
  initChatbot();
  initVisitorCounter();
  initSmoothScroll();
  initLoginModal();
});

// ─── NAVBAR ───
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks && navLinks.querySelectorAll('a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
    });
  }, { passive: true });
}

// ─── SCROLL ANIMATIONS ───
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
          entry.target.classList.remove('pre-animate');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.pre-animate').forEach(el => observer.observe(el));
}

// ─── PROMO SLIDER ───
function initPromoSlider() {
  const messages = [
    '🎉 Special Discount on Bulk Aluminium Sections — Call Now!',
    '🏗️ Free Site Visit for Commercial Projects in Kollam District',
    '⭐ 500+ Projects Completed — Kerala\'s Most Trusted Aluminium Fabricators',
  ];
  const el = document.querySelector('.promo-text');
  if (!el) return;
  let idx = 0;
  el.textContent = messages[0];
  setInterval(() => {
    el.style.opacity = '0';
    setTimeout(() => {
      idx = (idx + 1) % messages.length;
      el.textContent = messages[idx];
      el.style.opacity = '1';
    }, 500);
  }, 3500);
}

// ─── VISITOR COUNTER ───
function initVisitorCounter() {
  const el = document.querySelector('.visitor-num');
  if (!el) return;
  let count = parseInt(localStorage.getItem('ht_visits') || '1183');
  count += Math.floor(Math.random() * 3) + 1;
  localStorage.setItem('ht_visits', count);
  el.textContent = count.toLocaleString('en-IN');
}

// ─── SMOOTH SCROLL ───
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.querySelector('.navbar')?.offsetHeight || 70;
        window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
      }
    });
  });
}

// ─── LOGIN MODAL ───
function initLoginModal() {
  const overlay = document.getElementById('login-overlay');
  const tabs = document.querySelectorAll('.login-tab');
  const forms = document.querySelectorAll('.login-panel');

  // Open modal
  document.querySelectorAll('[data-login]').forEach(btn => {
    btn.addEventListener('click', () => {
      overlay && overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  // Close modal
  document.querySelectorAll('[data-login-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      overlay && overlay.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  });
  // Close on backdrop click
  overlay && overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  });
  // Tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      forms.forEach(f => {
        f.style.display = f.id === target ? 'flex' : 'none';
      });
    });
  });
}

// ─── AI CHATBOT ───
const chatbotKnowledge = {
  'service': 'We offer Residential Aluminium Works, Commercial Building Facades, Textile Shop Racks, Hypermarket Setups, Custom Fabrication, and Aluminium Partitions & Glazing. Type "more" to see the full list!',
  'price': 'Our prices vary by material and project size. Aluminium sections start from ₹280/kg. For a custom quote, please WhatsApp us at +91-9400000000 or fill our contact form.',
  'contact': 'You can reach us at:\n📞 +91-9400000000\n📧 hitechaluminiumtrades@gmail.com\n📍 Kollam, Kerala, India\n💬 WhatsApp: wa.me/919400000000',
  'location': 'We are located in Kollam, Kerala, India. We serve all of Kollam district and nearby areas. For site visits, please call us at +91-9400000000.',
  'workshop': 'Our state-of-the-art workshop in Kollam handles all aluminium fabrication work — from cutting and welding to powder coating. We have modern CNC equipment for precision work.',
  'commercial': 'Yes! We specialize in large-scale commercial projects including office building facades, shopping mall interiors, hotel partitions, and more. We have completed 500+ projects across Kerala.',
  'owner': 'HITECH Aluminium Trades is led by Mr. Karthyaveson Pillai Hareesh, the Secretary of Aluminium Fabrication in Kollam. He brings 15+ years of expertise to every project.',
  'whatsapp': 'Click here to WhatsApp us directly: https://wa.me/919400000000',
  'indiamart': 'You can find us on IndiaMart: search "HITECH Aluminium Trades" or visit our profile.',
  'justdial': 'We are rated on JustDial! Search "HITECH Aluminium Trades Kollam" on JustDial to see our reviews.',
  'job': 'We are hiring! Current openings: Aluminium Fabricator, Site Supervisor, Sales Executive. Scroll to the Jobs section or WhatsApp your resume to +91-9400000000.',
  'textile': 'Yes! We specialize in custom display racks, wall-mounted systems, and full shop interior setups for textile stores. Contact us for a free design consultation.',
  'hypermarket': 'We have completed full rack and shelving setups for hypermarkets and supermarkets. Our systems are durable, attractive, and cost-effective.',
};

function initChatbot() {
  const trigger = document.getElementById('chatbot-trigger');
  const panel = document.getElementById('chatbot-panel');
  const closeBtn = document.getElementById('chatbot-close');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const messages = document.getElementById('chatbot-messages');

  if (!trigger || !panel) return;

  trigger.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open') && messages.children.length === 0) {
      addBotMsg("👋 Hello! I'm the HITECH AI Assistant. How can I help you today? You can ask me about our services, prices, location, or contact details.");
      showSuggestions(['Services', 'Price', 'Location', 'Contact', 'Workshop', 'Jobs']);
    }
  });

  closeBtn && closeBtn.addEventListener('click', () => panel.classList.remove('open'));

  sendBtn && sendBtn.addEventListener('click', sendMessage);
  input && input.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addUserMsg(text);
    input.value = '';
    setTimeout(() => {
      const reply = getReply(text.toLowerCase());
      addBotMsg(reply);
    }, 600);
  }

  function getReply(text) {
    for (const [key, val] of Object.entries(chatbotKnowledge)) {
      if (text.includes(key)) return val;
    }
    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return "Hello! 😊 Welcome to HITECH Aluminium Trades. How can I help you today?";
    }
    if (text.includes('thank')) return "You're welcome! 🙏 Feel free to ask anything else.";
    return "Thank you for your question! For detailed information, please call us at 📞 +91-9400000000 or WhatsApp us. Our team will be happy to help you!";
  }

  function addBotMsg(text) {
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    removeSuggestions();
  }

  function addUserMsg(text) {
    const div = document.createElement('div');
    div.className = 'chat-msg user';
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    removeSuggestions();
  }

  function showSuggestions(items) {
    const existing = document.querySelector('.chat-suggestions');
    if (existing) existing.remove();
    const row = document.createElement('div');
    row.className = 'chat-suggestions';
    items.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'chat-suggestion';
      btn.textContent = item;
      btn.addEventListener('click', () => {
        addUserMsg(item);
        setTimeout(() => {
          const reply = getReply(item.toLowerCase());
          addBotMsg(reply);
        }, 400);
      });
      row.appendChild(btn);
    });
    panel.insertBefore(row, document.querySelector('.chatbot-input-row'));
  }

  function removeSuggestions() {
    document.querySelector('.chat-suggestions')?.remove();
  }
}

// ─── GALLERY LIGHTBOX ───
function openLightbox(src, title) {
  const lb = document.createElement('div');
  lb.style.cssText = `position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.93);
    display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;cursor:pointer;`;
  lb.innerHTML = `
    <img src="${src}" style="max-width:90vw;max-height:80vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
    <p style="color:rgba(255,255,255,0.8);font-family:Poppins,sans-serif;">${title}</p>
    <button style="position:absolute;top:20px;right:28px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;">✕</button>
  `;
  lb.addEventListener('click', () => lb.remove());
  document.body.appendChild(lb);
}