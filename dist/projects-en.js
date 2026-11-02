/* English editorial copy. Asset paths, project names and technical evidence stay unchanged. */
(() => {
 'use strict';
 const projects = structuredClone(window.PORTFOLIO_PROJECTS);
 const copy = [
  {
   summary: 'Production management system for ProPrint in Cuenca. It connects inventory, orders and production through a Flask API and an Angular interface. Used daily, with ongoing support and maintenance under my responsibility.',
   caption: 'Production / Actual SGP Proprint screenshot',
   role: 'Systems engineering · development and technical support',
   status: 'In production · actively maintained',
   story: 'I contributed to the application and continue maintaining the system and the plant’s Ubuntu server. My work includes technical support, updates and troubleshooting, from the Angular frontend to the Flask API and the deployed service.',
   note: 'System screenshots and documentation published in the SGP Proprint development schedule. The link documents the delivered project; it does not provide access to the printing company’s system.',
   notes: [
    ['Architecture', 'Angular 21 and TypeScript · Flask REST API · SQLAlchemy and SQLite. Eight connected modules supporting the printing company’s operations.'],
    ['Infrastructure', 'On-site Ubuntu server, Gunicorn and a systemd service. The application is available on the company’s internal network.'],
    ['Ongoing maintenance', 'I continue providing technical support and maintaining the application and server: updates, diagnostics and troubleshooting.']
   ],
   technical: [
    ['Application architecture', ['Angular 21 frontend with TypeScript and Tailwind CSS.', 'Python REST API with Flask and SQLAlchemy.', 'SQLite, Flask-Login sessions and role-based permissions.']],
    ['Deployment and infrastructure', ['Ubuntu Server at ProPrint’s plant.', 'Gunicorn managed as a systemd service.', 'Frontend and API served by Flask on the internal network.']],
    ['Integrations and processes', ['USB scanner for incoming and outgoing materials.', 'Document extraction with Tesseract OCR and pdfplumber.', 'Kanban and TV monitor with periodic polling; PDF and Excel reports.']],
    ['My current responsibilities', ['Application and server maintenance.', 'Technical support, diagnostics and troubleshooting.', 'System updates and operational monitoring.']]
   ],
   shots: [
    ['Production', 'SGP Proprint: Kanban board with queued, processing and completed orders', 'Kanban board · per-order status, delivery indicators and countdowns.'],
    ['Inventory', 'SGP Proprint: materials inventory and stock statuses', 'Warehouse inventory · categories, stock statuses and alerts.'],
    ['Orders', 'SGP Proprint: new order form with document import', 'Orders · PDF and image uploads with OCR extraction and manual review.'],
    ['TV monitor', 'SGP Proprint: the plant’s order monitor', 'TV monitor · status counts and order tracking on the shop floor.'],
    ['Scanner', 'SGP Proprint: incoming and outgoing materials recorded with a scanner', 'Operations · barcode scanning and movement history.'],
    ['Reports', 'SGP Proprint: stock and order reports', 'Reports · date filters and Excel/PDF export.'],
    ['Schedule', 'Screenshot of the complete SGP Proprint development schedule', 'Delivery schedule · six phases and twenty-five documented weeks.']
   ]
  },
  {
   summary: 'Agricultural ERP and e-commerce platform. My contribution focuses on Farm Productivity, FIFO inventory and Payroll, connecting crop management, inventory and staff administration.',
   caption: 'Farm Productivity / Local environment screenshot',
   role: 'My modules · Farm, Inventory and Payroll',
   status: 'Collaborative project · demonstration environment',
   story: 'Modules for crop tracking, inventory traceability and payroll administration within the collaborative Horizonte Sostenible project. An Angular interface and Django REST Framework services backed by PostgreSQL.',
   note: 'Actual screenshots from the local system. The catalog and inventory ledger contain demonstration data; this installation has no registered crop batches or payroll records yet. Displayed values are not business results.',
   notes: [
    ['Farm Productivity', 'The planting-to-harvest cycle, projected units and weight, and water parameter records.'],
    ['FIFO inventory', 'Warehouse movements, item filters and batch traceability with quantities and costs.'],
    ['Payroll', 'Payroll records, settlements, provisions and day-worker administration within the ERP.']
   ],
   technical: [
    ['My contribution', ['Farm Productivity and crop monitoring.', 'Inventory ledger and FIFO traceability.', 'Payroll module and staff payment administration.']],
    ['Project architecture', ['Angular 21 interface with TypeScript and Tailwind CSS.', 'Python API with Django and Django REST Framework.', 'PostgreSQL persistence and department-based permissions.']],
    ['Operational integration', ['Tracking the crop cycle through to harvest.', 'Warehouse inventory records and FIFO batch queries.', 'Connecting agricultural management with the rest of the ERP.']],
    ['About the screenshots', ['Views from the local development environment.', 'Demonstration products and inventory movements.', 'Forms inspected without creating or changing records.']]
   ],
   shots: [
    ['Farm', 'Horizonte Sostenible: Farm Productivity dashboard', 'Farm Productivity · harvests, losses and projections. Local installation with no registered batches.'],
    ['Inventory ledger', 'Horizonte Sostenible: North Warehouse inventory ledger with demonstration movements', 'Warehouse inventory ledger · demonstration movements, items, dates, quantities and costs.'],
    ['FIFO batches', 'Horizonte Sostenible: FIFO inventory batch traceability', 'FIFO traceability · inspecting the physical batch associated with a demonstration inventory movement.'],
    ['Crop batches', 'Horizonte Sostenible: new crop batch form', 'Crop batches · planting, variety, projections and harvest destination. Form inspected without saving.'],
    ['Tanks', 'Horizonte Sostenible: water parameter monitoring for tanks', 'Tanks and parameters · pH, conductivity, water temperature and ambient temperature records.'],
    ['Payroll', 'Horizonte Sostenible: payroll module overview', 'Payroll · payroll records, settlements, statutory bonuses and day workers. Local environment with no registered payments.'],
    ['Salary data', 'Payroll form: complete employee, period, salary, deduction and provision fields', 'Salary data · complete fields from employee details to payment method. Inspected without saving.'],
    ['Overtime and IESS', 'Payroll form: complete overtime and IESS contribution sections', 'Payroll calculations · regular hours, additional days and IESS contribution breakdown. Demonstration values.'],
    ['Catalog', 'Horizonte Sostenible: e-commerce catalog with demonstration products', 'Collaborative project catalog · demonstration products, categories, stock and prices.']
   ]
  },
  {
   technology: 'Angular · TypeScript · Bilingual reading',
   summary: 'A bilingual reader I made to learn by building. Short stories, Spanish and English sentence by sentence, and words that show their translation when tapped. I kept it simple to understand each part as I went.',
   actionLabel: 'Explore the reader', caption: 'Entre líneas / Actual project screenshots', role: 'Personal learning project', status: 'Educational prototype · learning by doing',
   story: 'I wanted to practice English while learning how to build an application. I started with the essentials: choose a story, read it in two languages and look up words without leaving the text. I then added notes, preferences and navigation.',
   note: 'Actual screenshots of the local application shared by Alex. This is a personal learning project, with stories included in the app. Audio uses the browser’s available voices, not a proprietary AI service.',
   notes: [
    ['The idea', 'Learn English with short stories and a reader that keeps the reading flow intact.'],
    ['What I built', 'A level-based library, bilingual sentences, translations and notes.'],
    ['What I learned', 'Components, routes, state and preferences, one step at a time.']
   ],
   technical: [
    ['Application foundation', ['Angular 22 and TypeScript 6.', 'Reading components and navigation between library and stories.', 'State and preferences with Signals.']],
    ['Reading experience', ['Seven short stories across A1–B2 levels.', 'Spanish-English text sentence by sentence, with word glosses on tap.', 'Notes and options to show, dim or hide Spanish.']],
    ['Audio and preferences', ['Browser speech synthesis for a sentence or an entire story.', 'Speed and voice options based on device availability.', 'Preferences and notes stored locally.']],
    ['Purpose and scope', ['Personal project to learn through development.', 'A simple reading interface that adapts to mobile screens.', 'Screenshots of the local project; localhost is not linked as a public demo.']]
   ],
   shots: [
    ['Library', 'Entre líneas: library of short stories organized by level', 'Library · choosing stories by level and estimated reading time.'],
    ['Reader', 'Entre líneas: bilingual reader with tools and preferences', 'Reader · bilingual story, notes and reading controls.'],
    ['Translations', 'Entre líneas: the word quiet shows tranquilo within the text and is saved to notes', 'Contextual translation · tapping “quiet” displays “tranquilo” and adds the word to notes.'],
    ['Mobile view', 'Entre líneas: bilingual reading and controls adapted to a mobile screen', 'Mobile view · screenshot of the reader in a 390-pixel-wide viewport.'],
    ['All stories', 'Entre líneas: complete library of seven stories from A1 to B2', 'Complete library · the seven stories included in the prototype.']
   ]
  },
  {
   summary: 'Your music, your way. A personal iPhone app with a library, playback and downloads for offline listening. Designed in light and dark themes, with lock-screen controls.',
   sourceLabel: 'View code on GitHub', actionLabel: 'Explore the app', caption: 'Aleksound / Actual iPhone screenshots', role: 'Personal project · mobile development and iOS integration', status: 'App in development · installed on iPhone',
   story: 'I built the library, search and playback experience with Flutter, and integrated downloads and system controls with Swift. Downloaded music stays on the device alongside listening history, favorites and the library.',
   note: 'Actual screenshots provided by Alex from his iPhone. Source code is public; this is not presented as an app published on the App Store. Playing downloaded files is different from storing their metadata in the library.',
   notes: [
    ['Mobile experience', 'Library, search, albums, favorites and queue. Light, dark and system themes.'],
    ['Offline listening', 'Downloads with progress, cancellation and retry. Local file playback and a persistent library.'],
    ['iPhone integration', 'Background audio, playback controls, artwork and progress on iOS system surfaces.']
   ],
   technical: [
    ['Application and state', ['Flutter and Dart for interface, navigation and state.', 'Persistent library, history, favorites and metadata.', 'Light, dark or system theme selection.']],
    ['Playback engine', ['just_audio for audio playback and management.', 'Song queue with downloaded files prioritized.', 'Continuous listening in the background.']],
    ['Native Swift bridge', ['URLSession for transfers and downloads.', 'AVFoundation for preparing AAC/M4A files.', 'MediaPlayer for system information and commands.']],
    ['Project evidence', ['Screenshots of the app running on Alex’s iPhone.', 'Code and documentation available on GitHub.', 'Project in development; not published on the App Store.']]
   ],
   shots: [
    ['Dark home', 'Aleksound on iPhone: dark home screen with library and mini-player', 'Dark home screen · recently played tracks, categories and mini-player.'],
    ['Player', 'Aleksound: player with controls and a downloaded song available offline', 'Player · artwork, progress, favorites and “Downloaded · Offline” status.'],
    ['Light home', 'Aleksound on iPhone: home screen in light theme', 'The same library in light mode · navigation, filters and persistent playback.'],
    ['Appearance', 'Aleksound: appearance selection for system, light and dark themes', 'Appearance · switching between system, light and dark themes.'],
    ['Lock screen', 'iOS: Aleksound controls on the iPhone lock screen', 'iOS integration · title, artist, progress and lock-screen controls.'],
    ['iOS controls', 'iOS: expanded media controls with Aleksound playing', 'System controls · playback and volume in the iOS media interface.'],
    ['iOS artwork', 'iOS: expanded artwork and Aleksound controls', 'Lock screen · expanded artwork and media controls for the audio session.']
   ]
  },
  {
   summary: 'Telegram bot for temporary group memberships. It receives payment receipts, forwards them to an administrator and grants 30-day access after manual approval. I deployed it on Railway.',
   sourceLabel: 'View code on GitHub', actionLabel: 'Explore the bot', caption: 'Telegram / Screenshot with banking details redacted', role: 'Personal project · Python automation', status: 'Temporary memberships · deployed on Railway',
   story: 'I automated group admission: the user sends a photo of their receipt and an administrator reviews it. After approval, the bot creates an invitation and records the expiration date. A scheduled task checks when each membership ends.',
   note: 'Screenshot shared by Alex and edited only to redact personal and banking details. Payment approval is manual: the bot does not check or validate a transfer with the bank. Railway was the deployment environment; current service availability has not been verified.',
   notes: [
    ['Receipt and review', 'The receipt arrives in a private chat and is forwarded to the administrator.'],
    ['Temporary access', 'Manual approval, a single-use invitation and a 30-day membership.'],
    ['Automation', 'Scheduled expiration checks and simple JSON persistence.']
   ],
   technical: [
    ['Implementation', ['Python and python-telegram-bot 22.5 with job-queue.', '/start and /aprobar commands, plus photo handling.', 'Telegram updates retrieved through polling.']],
    ['Membership control', ['The approval command is restricted to the administrator.', 'An invitation limited to one member after manual review.', 'A 30-day expiration date for each user.']],
    ['Tasks and persistence', ['Expiration checks every 60 seconds.', 'Access removed on expiration and records updated.', 'User ID and expiration date stored in a JSON file.']],
    ['Deployment', ['Railway as the project’s deployment environment.', 'Bot token read from an environment variable.', 'No claim of automated bank verification or current availability.']]
   ],
   shots: [['Conversation', 'Telegram bot receiving a payment receipt with names, accounts and references covered by black bars', 'Bot conversation · receipts with personal and banking details redacted.']]
  }
 ];
 projects.forEach((project, index) => {
  const content = copy[index], detail = project[5];
  project[4] = content.summary;
  if (content.technology) project[1] = content.technology;
  for (const key of ['caption','role','status','story','note','notes','technical','sourceLabel','actionLabel']) {
   if (content[key] !== undefined) detail[key] = content[key];
  }
  detail.screenshots.forEach((shot, i) => {
   [shot.label, shot.alt, shot.caption] = content.shots[i];
  });
 });
 window.PORTFOLIO_PROJECTS_EN = projects;
})();
