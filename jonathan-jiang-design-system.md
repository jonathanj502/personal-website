# Jonathan Jiang — Personal Website Design System
> Claude Code handoff document. All decisions are final unless noted as TODO.

---

## 1. Site Structure

```
jonathanj.com/
├── / (home)
├── /work
├── /about
└── /writing
```

Single-page app or multi-page static site — either works. Recommended: **static HTML/CSS/JS**, no framework required. If using a framework, plain **React** or **Next.js** is fine.

---

## 2. Navigation

```
[Jonathan Jiang]          work  about  writing  [toggle]
 ↑ home link (/)          ↑ nav tabs              ↑ light/dark
```

- Name is a `<a href="/">` home link, not a tab
- Active tab has `border-bottom: 0.5px solid` in text color
- Toggle switches between light and dark mode, persists via `localStorage`
- Nav is fixed to top, full width, with bottom border divider

---

## 3. Typography

| Use | Font | Weight | Size |
|-----|------|--------|------|
| Everything | Monoweb Book | 400 | — |
| Bold labels / project titles | Monoweb Book | 700 | — |
| Nav name | 400 | 13px |
| Nav tabs | 400 | 11px |
| Hero headline | 400 | 24px |
| Body / meta text | 400 | 12px |
| Section labels | 400 | 10px, uppercase, letter-spacing: 0.8px |
| Tags | 400 | 10px |
| Footer | 400 italic | 11px |

**Font loading:** Monoweb Book is a commercial font by Lineto. Self-host via `@font-face` with the licensed `.woff2` file. Fallback stack: `'Courier New', Courier, monospace`.

```css
@font-face {
  font-family: 'Monoweb';
  src: url('/fonts/MonowebBook.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}
```

---

## 4. Color Tokens

### Light mode
```css
:root {
  --bg:         #ffffff;
  --text:       #111111;
  --muted:      #999999;
  --faint:      #bbbbbb;
  --border:     #e0e0e0;
  --row-border: #ebebeb;
  --tag-bg:     #f4f4f4;
  --img-bg:     #f0f0f0;
}
```

### Dark mode
```css
[data-theme="dark"] {
  --bg:         #111111;
  --text:       #f0f0f0;
  --muted:      #555555;
  --faint:      #3a3a3a;
  --border:     #2a2a2a;
  --row-border: #1e1e1e;
  --tag-bg:     #1a1a1a;
  --img-bg:     #1e1e1e;
}
```

Toggle via `document.documentElement.setAttribute('data-theme', 'dark')`. Persist with `localStorage.setItem('theme', 'dark')`.

---

## 5. Layout

```css
.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 2.5rem;
}
```

All sections separated by `border-bottom: 0.5px solid var(--border)`.

---

## 6. Component Specs

### Nav
```
height: auto
padding: 1.25rem 2.5rem
border-bottom: 0.5px solid var(--border)
display: flex, space-between, align-items: center
```

### Hero (home)
```
padding: 3rem 2.5rem 2.5rem
display: flex, gap: 1.5rem, align-items: flex-start

  h1:
    font-size: 24px
    font-weight: 400
    line-height: 1.6
    letter-spacing: -0.3px
    max-width: 500px
    margin-bottom: 1.25rem

  meta lines (→ ...):
    font-size: 12px
    color: var(--muted)
    line-height: 1.7
    prefix: "→ "

  avatar:
    width: 72px, height: 72px
    border-radius: 50%
    border: 0.5px solid var(--border)
    object-fit: cover
    TODO: replace with real photo
```

### Section label
```css
font-size: 10px;
color: var(--faint);
text-transform: uppercase;
letter-spacing: 0.8px;
margin-bottom: 0.75rem;
```

### Entry row (experience / recent work)
```
padding: 14px 0
border-bottom: 0.5px solid var(--row-border)

  .entry-head: flex, space-between, align-items: baseline
    .entry-title: 13px, font-weight 700, color var(--text)
    .entry-year:  11px, color var(--faint)

  .entry-sub:   11px, color var(--muted), margin-bottom 8px
  .entry-desc:  11px, color var(--muted), line-height 1.8
```

### Tag pill
```css
font-size: 10px;
color: var(--muted);
background: var(--tag-bg);
border-radius: 3px;
padding: 1px 6px;
margin: 3px 3px 0 0;
display: inline-block;
```

### Project card (work page)
```
border: 0.5px solid var(--row-border)
border-radius: 8px
overflow: hidden

  .card-img:
    width: 100%
    height: 120px
    object-fit: cover
    background: var(--img-bg)   ← placeholder bg
    TODO: replace with real screenshot

  .card-body:
    padding: 12px
```

Project cards displayed in a 2-column grid:
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 12px;
```

### GitHub link
```css
font-size: 10px;
color: var(--muted);
text-decoration: none;
border-bottom: 0.5px solid var(--row-border);
padding-bottom: 1px;
display: inline-flex;
align-items: center;
gap: 4px;
```

### About photo
```
width: 120px
height: 150px
border-radius: 6px
object-fit: cover
flex-shrink: 0
background: var(--img-bg)   ← placeholder
TODO: replace with real photo
```

### Light/dark toggle
```
display: flex, align-items: center, gap: 6px
margin-left: 1.5rem
padding-left: 1.5rem
border-left: 0.5px solid var(--border)

  track:  28×16px, border-radius 8px
  thumb:  10×10px, border-radius 50%, top 2.5px, left 3px
  label:  10px, color var(--muted)

  dark state: thumb translateX(12px)
```

### Footer
```
padding: 1.25rem 2.5rem
display: flex, space-between, align-items: center
border-top: 0.5px solid var(--border)

  email: 11px italic, color var(--faint)
  icons: font-size 15px, color var(--faint), gap 14px
```

---

## 7. Content & Copy

### Home hero headline (TODO — fill in your own)
> "Software engineer. I build things that are fast, secure, and get out of the way."

### Home meta lines
```
→ CS @ Columbia University, class of 2027
→ AI security researcher @ Columbia
→ Incoming SWE intern @ Capital One
```

### Work — Experience
| Company | Role | Date | Location |
|---------|------|------|----------|
| Capital One | Software Engineering Intern | June 2026 | Richmond, VA |
| Columbia University | AI Security Researcher | Apr 2026–Present | New York, NY |
| Onki | Software Engineering Intern | Jul 2025–Feb 2026 | New York, NY |
| Yao Research Group | Undergraduate Research Assistant | May–Aug 2024 | Stony Brook, NY |

### Work — Projects
| Project | Stack | Year | GitHub |
|---------|-------|------|--------|
| HTTP Web Server | C, HTTP/1.0, TCP Sockets | 2024 | TODO |

### About page copy
TODO — write 2–3 short paragraphs in your own voice.
```
GPA: 3.57
Columbia CS, class of 2027
Minor: Applied Math
Coursework: Systems, Algorithms, ML, Databases, Probability
```

---

## 8. Links & Assets

| Item | Value |
|------|-------|
| GitHub | https://github.com/jonathanj502 |
| LinkedIn | https://linkedin.com/in/jonathanj126 |
| Email | jonathanjiang502@gmail.com |
| Avatar photo | TODO — upload headshot, crop to square |
| About photo | TODO — upload photo, crop to 4:5 portrait |
| Project screenshots | TODO — one per project, 16:9 ratio recommended |
| Monoweb Book font file | TODO — purchase from Lineto, self-host as .woff2 |

---

## 9. Responsive (mobile)

- Nav: collapse tabs into a hamburger or stack below name
- Hero: stack avatar below headline
- Project grid: collapse to 1 column
- Container padding: reduce to 1.25rem on mobile

---

## 10. Writing page

Placeholder state: "Writing lives here. Check back soon."

When live: reverse-chronological list of posts.
```
[Post title]                [Month Year]
[Post title]                [Month Year]
```
Each row links to `/writing/[slug]`.

---

## 11. TODOs before launch

- [ ] Write hero headline in your own voice
- [ ] Write about page copy (2–3 paragraphs)
- [ ] Upload headshot (avatar, square crop)
- [ ] Upload about photo (portrait, 4:5)
- [ ] Purchase and self-host Monoweb Book font
- [ ] Add real GitHub repo URLs per project
- [ ] Add project screenshots
- [ ] Set up domain
- [ ] Publish first writing post
