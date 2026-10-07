/**
 * OMETTO SOLUÇÕES ELÉTRICAS E REFRIGERAÇÃO
 * Script de Interatividade, Filtros e Geração de Orçamento WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // 2. Sticky Header Effect on Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)';
      header.style.background = 'rgba(7, 13, 25, 0.98)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(7, 13, 25, 0.92)';
    }
  });

  // 3. Service Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  function filterServices(category) {
    // Update active button
    filterBtns.forEach(btn => {
      if (btn.dataset.target === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Filter cards
    serviceCards.forEach(card => {
      const cardCat = card.dataset.category;
      if (category === 'all' || cardCat === category) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCat = btn.dataset.target;
      filterServices(targetCat);
    });
  });

  // 4. Quick Category Links Click Handling
  const quickCatLinks = document.querySelectorAll('.cat-card');
  quickCatLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const filter = link.dataset.filter;
      if (filter) {
        filterServices(filter);
      }
    });
  });

  // 5. Interactive Budget Calculator Form
  const budgetForm = document.getElementById('budgetCalculator');
  if (budgetForm) {
    budgetForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const selectedService = document.querySelector('input[name="service_type"]:checked')?.value || 'Serviço Geral';
      const location = document.getElementById('calcLocation').value.trim();
      const urgency = document.getElementById('calcUrgency').value;
      const description = document.getElementById('calcDescription').value.trim();

      // Assemble WhatsApp message
      let message = `*SOLICITAÇÃO DE ORÇAMENTO - SITE OMETTO*\n\n`;
      message += `⚡ *Serviço Solicitado:* ${selectedService}\n`;
      message += `📍 *Localização:* ${location}\n`;
      message += `⏰ *Urgência:* ${urgency}\n`;
      
      if (description) {
        message += `📝 *Detalhes:* ${description}\n`;
      }

      message += `\n_Olá Igor, simulei este orçamento pelo site da Ometto e gostaria de atendimento!_`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5511966079624?text=${encodedMsg}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // 6. FAQ Accordion Interaction
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parentItem = question.parentElement;
      const isActive = parentItem.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        parentItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 7. Update Copyright Year dynamically
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
