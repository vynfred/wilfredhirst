---
type: "always_apply"
---

## CSS Module System
- **base.css**: CSS reset, typography, CSS variables
- **components.css**: Modal, cards, buttons, forms
- **layout.css**: Navigation, grid systems, responsive layouts
- **pages.css**: Page-specific overrides only



## Startup Detail Page Template
All startup detail pages must use identical structure:
1. Header with project name, dates, type, role
2. Summary section (3 paragraphs max)
3. Media grid (2x2 placeholder images)
4. Partners list
5. Navigation buttons (back/next)

## Component Requirements
- **Startup Cards**: Clickable with modal expansion, gradient placeholders
- **Modal System**: Backdrop blur, slide-in animation, multiple close methods
- **Navigation**: Fixed header with smooth scroll, active section highlighting
- **Responsive**: Mobile-first grid layouts

## Content Sections
1. Hero with name and summary
2. Startups with detailed modal data
3. Contract & Advisory work
4. Artwork (link to vynfred.com)
5. Work History timeline

## Technical Standards
- Vanilla HTML/CSS/JS only
- No build tools required
- Local server via `python3 -m http.server 8000`
- Smooth animations and transitions
- CSS modules imported in order: base → components → layout → pages

## New Project Addition Process
1. Copy `templates/startup-detail.html`
2. Update content in designated sections only
3. Add entry to main page startup grid
4. Update navigation data in `main.js`
5. Test responsive design and modal functionality