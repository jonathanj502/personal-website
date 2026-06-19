# Jonathan Jiang — Personal Website

Static HTML/CSS/JS site built to `jonathan-jiang-design-system.md`. No build step,
no dependencies.

## Structure

```
.
├── index.html      home (hero)
├── work.html       experience + projects
├── about.html      bio + education
├── writing.html    placeholder list
├── css/style.css   tokens, layout, components, responsive
├── js/main.js      light/dark toggle (persists via localStorage)
└── fonts/          drop MonowebBook.woff2 here (see fonts/README.txt)
```

## Run locally

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Notes

- Pages use `.html` links so they work opened from disk or any static host.
  For clean URLs (`/work`), configure your host to drop the extension.
- Theme is applied pre-paint by a tiny inline script in each `<head>` to avoid a
  flash of the wrong mode; `js/main.js` wires up the toggle.
