# Ramraj Chandradevan — Personal Portfolio

A clean, academic-themed personal portfolio website showcasing research, publications, experience, and projects.

🌐 **Live Site:** [https://cramraj.github.io](https://cramraj.github.io) *(update after deployment)*

## Features

- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- **Academic Theme** — Clean, professional design suited for researchers and scientists
- **Publication Filters** — Filter publications by year with smooth animations
- **Interactive Timeline** — Visual experience timeline with hover effects
- **Scroll Animations** — Fade-in animations triggered on scroll
- **Smooth Navigation** — Fixed navbar with active section highlighting
- **Mobile-Friendly** — Hamburger menu for mobile devices

## Tech Stack

- Pure HTML5, CSS3, JavaScript (no frameworks)
- [Inter](https://fonts.google.com/specimen/Inter) + [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) fonts
- [Font Awesome 6](https://fontawesome.com/) icons
- GitHub Pages hosting

## Deployment to GitHub Pages

### Option 1: User/Organization Site (`username.github.io`)

1. Create a new repository named `cramraj.github.io` on GitHub
2. Push the contents of this `portfolio/` folder to the `main` branch:

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/cramraj/cramraj.github.io.git
git push -u origin main
```

3. Your site will be live at `https://cramraj.github.io`

### Option 2: Project Site

1. Create a new repository (e.g., `portfolio`) on GitHub
2. Push the code and enable GitHub Pages in Settings → Pages → Source: `main` branch

## Customization

- **Profile Photo:** Replace the avatar placeholder in `index.html` with an `<img>` tag pointing to your photo
- **Colors:** Edit CSS variables in `:root` at the top of `style.css`
- **Content:** Update sections directly in `index.html`
- **Social Links:** Update URLs in the hero section and contact section

## Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

## License

MIT License — Feel free to use and modify.
