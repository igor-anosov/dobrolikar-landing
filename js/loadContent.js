// Google Sheets API Configuration
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // Замініть на ваш ID таблиці
const API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY'; // Замініть на ваш API ключ
const SHEET_NAME = 'Sheet1'; // Назва листа в таблиці

const CACHE_DURATION = 60 * 60 * 1000; // Кеш на 1 годину

/**
 * Завантажує контент з Google Sheets з кешуванням
 */
async function loadContentFromSheets() {
  try {
    // Перевірка кешу
    const cached = localStorage.getItem('dobrolikar_content');
    const cacheTime = localStorage.getItem('dobrolikar_cache_time');

    if (cached && cacheTime && Date.now() - parseInt(cacheTime) < CACHE_DURATION) {
      console.log('Завантаження з кешу');
      return JSON.parse(cached);
    }

    // Завантаження з Google Sheets
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Перетворення у об'єкт
    const content = {};
    const rows = data.values;

    if (!rows || rows.length < 2) {
      throw new Error('Таблиця пуста або має невірну структуру');
    }

    // Перший рядок - заголовки (field_id, uk_text, description)
    const headers = rows[0];
    const fieldIdIndex = headers.indexOf('field_id');
    const ukTextIndex = headers.indexOf('uk_text');

    if (fieldIdIndex === -1 || ukTextIndex === -1) {
      throw new Error('Таблиця повинна мати колонки: field_id, uk_text');
    }

    // Перетворення рядків у об'єкт
    for (let i = 1; i < rows.length; i++) {
      const fieldId = rows[i][fieldIdIndex];
      const text = rows[i][ukTextIndex];

      if (fieldId) {
        content[fieldId] = text;
      }
    }

    // Збереження в кеш
    localStorage.setItem('dobrolikar_content', JSON.stringify(content));
    localStorage.setItem('dobrolikar_cache_time', Date.now().toString());

    console.log('Контент завантажено з Google Sheets');
    return content;
  } catch (error) {
    console.error('Помилка завантаження контенту:', error);
    return {};
  }
}

/**
 * Застосовує контент до DOM
 */
function applyContent(content) {
  // Hero секція
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle && content.hero_title) {
    heroTitle.textContent = content.hero_title;
  }

  const heroDescription = document.getElementById('hero-description');
  if (heroDescription && content.hero_description) {
    heroDescription.textContent = content.hero_description;
  }

  // About секція
  const aboutTitle = document.getElementById('about-title');
  if (aboutTitle && content.about_title) {
    aboutTitle.textContent = content.about_title;
  }

  const aboutDescription = document.getElementById('about-description');
  if (aboutDescription && content.about_description) {
    aboutDescription.textContent = content.about_description;
  }

  const aboutHighlightText = document.getElementById('about-highlight-text');
  if (aboutHighlightText && content.about_highlight_text) {
    aboutHighlightText.textContent = content.about_highlight_text;
  }

  const aboutDoctorsTitle = document.getElementById('about-doctors-title');
  if (aboutDoctorsTitle && content.about_doctors_title) {
    aboutDoctorsTitle.textContent = content.about_doctors_title;
  }

  // Послуги
  const services = [
    'service_glass',
    'service_ophthalmology',
    'service_hearing',
    'service_surdology',
    'service_otolaryngology',
    'service_allergology'
  ];

  services.forEach(service => {
    const titleEl = document.getElementById(`${service}-title`);
    if (titleEl && content[`${service}_title`]) {
      titleEl.textContent = content[`${service}_title`];
    }

    const descEl = document.getElementById(`${service}-description`);
    if (descEl && content[`${service}_description`]) {
      descEl.textContent = content[`${service}_description`];
    }
  });

  // Команда
  for (let i = 1; i <= 4; i++) {
    const nameEl = document.querySelector(`.team-member:nth-child(${i}) .team-name`);
    const roleEl = document.querySelector(`.team-member:nth-child(${i}) .team-role`);

    if (nameEl && content[`team_${i}_name`]) {
      nameEl.textContent = content[`team_${i}_name`];
    }

    if (roleEl && content[`team_${i}_role`]) {
      roleEl.textContent = content[`team_${i}_role`];
    }
  }

  // Відгуки
  for (let i = 1; i <= 3; i++) {
    const textEl = document.querySelector(
      `.testimonial-card:nth-child(${i}) .testimonial-text`
    );
    const authorEl = document.querySelector(
      `.testimonial-card:nth-child(${i}) .author-info h4`
    );

    if (textEl && content[`testimonial_${i}_text`]) {
      textEl.textContent = content[`testimonial_${i}_text`];
    }

    if (authorEl && content[`testimonial_${i}_author`]) {
      authorEl.textContent = content[`testimonial_${i}_author`];
    }
  }

  // Контакти в footer
  const contactInfoSection = document.querySelector('.contact-info');
  if (contactInfoSection && content.contact_address) {
    const addressParagraph = contactInfoSection.querySelector('p:nth-of-type(1)');
    if (addressParagraph) {
      addressParagraph.innerHTML = `<strong>Адреса:</strong> ${content.contact_address}`;
    }
  }

  if (content.contact_phone) {
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink) {
      phoneLink.href = `tel:${content.contact_phone.replace(/\D/g, '')}`;
      phoneLink.textContent = content.contact_phone;
    }
  }

  if (content.contact_email) {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
      emailLink.href = `mailto:${content.contact_email}`;
      emailLink.textContent = content.contact_email;
    }
  }

  // Графік роботи
  const workHoursText = document.querySelectorAll('.contact-info p');
  workHoursText.forEach((p, index) => {
    if (p.textContent.includes('Пн-Пт') && content.contact_hours_weekday) {
      p.textContent = content.contact_hours_weekday;
    } else if (p.textContent.includes('Сб:') && content.contact_hours_saturday) {
      p.textContent = content.contact_hours_saturday;
    } else if (p.textContent.includes('Нд:') && content.contact_hours_sunday) {
      p.textContent = content.contact_hours_sunday;
    }
  });
}

/**
 * Ініціалізація - завантаження та застосування контенту
 */
async function initializeContent() {
  const content = await loadContentFromSheets();
  applyContent(content);
}

// Запуск при завантаженні сторінки
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeContent);
} else {
  initializeContent();
}
