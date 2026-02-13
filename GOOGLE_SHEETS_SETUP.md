# Налаштування Google Sheets для контенту сайту

## Крок 1: Створити таблицю в Google Drive

1. Перейдіть на [Google Drive](https://drive.google.com)
2. Натисніть **"+ Створити"** → **"Google Таблиці"**
3. Дайте їй назву: `Dobrolikar Content` (або будь-яку іншу)

## Крок 2: Налаштувати структуру таблиці

Перший рядок повинен мати такі заголовки (А1, B1, C1):

- **A1**: `field_id`
- **B1**: `uk_text`
- **C1**: `description`

## Крок 3: Додати контент

Заповніть таблицю за зразком нижче:

| field_id                           | uk_text                                                                                           | description         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------- |
| hero_title                         | Ваше здоров'я - наш пріоритет!                                                                    | Заголовок героя     |
| hero_description                   | Приватний медичний центр "Добролікар"...                                                          | Опис героя          |
| about_title                        | Медицина преміум-класу                                                                            | Заголовок "Про нас" |
| about_description                  | Медичний центр «Добролікар» — простір добролікарів...                                             | Опис клініки        |
| about_highlight_text               | Місце, де починають краще бачити, чути та дихати!                                                 | Девіз               |
| about_doctors_title                | Наші дорослі та дитячі лікарі                                                                     | Заголовок лікарів   |
| contact_address                    | м. Львів, вул. Янева, 25                                                                          | Адреса              |
| contact_phone                      | +38 (093) 930-73-74                                                                               | Телефон             |
| contact_email                      | info@dobrolikar.ua                                                                                | Email               |
| contact_hours_weekday              | Пн-Пт: 8:00 - 20:00                                                                               | Робочі дні          |
| contact_hours_saturday             | Сб: 9:00 - 18:00                                                                                  | Субота              |
| contact_hours_sunday               | Нд: 10:00 - 16:00                                                                                 | Неділя              |
| service_glass_title                | Оптика                                                                                            |                     |
| service_glass_description          | Підбір окулярів для корекції зору, сонцезахисних окулярів, лінзи, окуляри з комп'ютерним захистом |                     |
| service_ophthalmology_title        | Консультація офтальмолога                                                                         |                     |
| service_ophthalmology_description  | Комплексна діагностика зору, лікування захворювань очей, підбір окулярів та контактних лінз       |                     |
| service_hearing_title              | Слухові апарати                                                                                   |                     |
| service_hearing_description        | Діагностика слуху, слухопротезування, підбір слухових апаратів                                    |                     |
| service_surdology_title            | Консультація сурдолога                                                                            |                     |
| service_surdology_description      | Широкий спектр діагностичних та лікувальних процедур                                              |                     |
| service_otolaryngology_title       | Консультація отоларинголога                                                                       |                     |
| service_otolaryngology_description | Діагностика та лікування захворювань вуха, горла та носа                                          |                     |
| service_allergology_title          | Консультація алерголога                                                                           |                     |
| service_allergology_description    | Діагностика алергічних захворювань, проведення алергопроб                                         |                     |
| team_1_name                        | Олена Петренко                                                                                    |                     |
| team_1_role                        | Головний лікар, терапевт                                                                          |                     |
| team_2_name                        | Михайло Коваленко                                                                                 |                     |
| team_2_role                        | Отоларинголог                                                                                     |                     |
| team_3_name                        | Анна Шевченко                                                                                     |                     |
| team_3_role                        | Офтальмолог                                                                                       |                     |
| team_4_name                        | Ігор Мельник                                                                                      |                     |
| team_4_role                        | Сурдолог                                                                                          |                     |
| testimonial_1_text                 | Дуже задоволена обслуговуванням у клініці! Лікарі професійні...                                   |                     |
| testimonial_1_author               | Марія Іваненко                                                                                    |                     |
| testimonial_2_text                 | Звернувся до офтальмолога з проблемою зору...                                                     |                     |
| testimonial_2_author               | Андрій Петров                                                                                     |                     |
| testimonial_3_text                 | Вперше відвідала клініку з дитиною...                                                             |                     |
| testimonial_3_author               | Оксана Ткаченко                                                                                   |                     |

## Крок 4: Отримати ID таблиці

1. Коли таблиця створена, скопіюйте ID з URL:

   ```
   https://docs.google.com/spreadsheets/d/[ID]/edit#gid=0
   ```

   Частина `[ID]` - це ваш SHEET_ID

2. Приклад: якщо URL такий:
   ```
   https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit
   ```
   То ID: `1a2b3c4d5e6f7g8h9i0j`

## Крок 5: Включити Google Sheets API

1. Перейдіть на [Google Cloud Console](https://console.cloud.google.com)
2. Створіть новий проект (або виберіть існуючий)
3. Натисніть **"Включити API та сервіси"**
4. Знайдіть **"Google Sheets API"** і натисніть **"Включити"**

## Крок 6: Створити API ключ

1. На боковій панелі натисніть **"Credentials"**
2. Натисніть **"Create Credentials"** → **"API Key"**
3. Скопіюйте ключ (це ваш API_KEY)

## Крок 7: Зробити таблицю публічною

1. У таблиці натисніть **"Поділитись"** (верхній правий кут)
2. Змініть доступ на **"Кожен у Інтернеті має доступ для перегляду"**
3. Натисніть **"Поділитись"**

## Крок 8: Оновити конфіг в коді

Відкрийте файл `js/loadContent.js` і замініть:

```javascript
const SHEET_ID = "YOUR_GOOGLE_SHEET_ID"; // Вставте свій ID
const API_KEY = "YOUR_GOOGLE_SHEETS_API_KEY"; // Вставте свій API ключ
```

На ваші дійсні значення.

## Крок 9: Протестувати

1. Зберегти файл
2. Завантажити сайт в браузері
3. Перевірити, що текст завантажився з таблиці
4. Відкрити DevTools (F12) і перевірити консоль на помилки

## Кеширування

Контент кешується на **1 годину** в localStorage браузера.
Щоб очистити кеш: відкрийте DevTools → Console і виконайте:

```javascript
localStorage.removeItem("dobrolikar_content");
localStorage.removeItem("dobrolikar_cache_time");
```

Потім перезавантажте сторінку.

## Порядок розгортання на Vercel

1. Оновите `js/loadContent.js` з вашими ID та API ключем
2. Закомітьте в Git:
   ```bash
   git add .
   git commit -m "Add Google Sheets integration"
   git push
   ```
3. Vercel автоматично розгорне оновлену версію

## Безпека

⚠️ **Увага**: API ключ видимий в JavaScript коді. Це нормально для публічних даних (як на сайту).
Якщо робитимете адмін-форму з приватними даними, потребуватиме серверу для прихування ключа.
