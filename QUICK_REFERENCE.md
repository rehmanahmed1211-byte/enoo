# 🚀 Birthday Wishes - Quick Reference

## ⚡ Git Commands Cheat Sheet

### Initial Setup (First Time Only)
```bash
# Initialize git
git init

# Set your information
git config user.name "Your Name"
git config user.email "your@email.com"

# Add GitHub as remote (replace USERNAME)
git remote add origin https://github.com/USERNAME/birthday-wishes.git

# Add all files and commit
git add .
git commit -m "Initial commit"

# Push to GitHub
git push -u origin main
```

### Regular Updates
```bash
# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "Your message here"

# Push to GitHub
git push origin main
```

### Check Remote
```bash
# View remote URL
git remote -v

# Change remote if needed
git remote set-url origin https://github.com/USERNAME/birthday-wishes.git
```

---

## 📁 Project Structure

```
birthday-wishes/
├── index.html                 ← MAIN FILE (Open this in browser)
├── README.md                  ← Project documentation
├── LICENSE                    ← MIT License
├── DEPLOYMENT_GUIDE.md        ← Step-by-step deployment
├── QUICK_REFERENCE.md         ← This file
├── .gitignore                 ← Git ignore rules
│
├── css/
│   └── style.css             ← All styling and animations
│
├── js/
│   └── script.js             ← All functionality
│
└── images/                    ← Optional: Add your images here
    └── .gitkeep
```

---

## 🎯 Quick Tasks

### Run Locally
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```
Then open: `http://localhost:8000`

### Deploy to GitHub Pages

**Step 1:** Create repository on GitHub named `birthday-wishes`

**Step 2:** Push code
```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

**Step 3:** Enable GitHub Pages
- Settings → GitHub Pages
- Source: "main" branch
- Folder: "/(root)"
- Save

**Step 4:** Visit your site
```
https://yourusername.github.io/birthday-wishes/
```

### Make Updates
```bash
# Edit files locally
# Then:
git add .
git commit -m "Update: describe what changed"
git push origin main
```

---

## 🔧 Common Customizations

### Change Colors
Edit `css/style.css`:
```css
:root {
    --primary-color: #ff6b9d;      /* Pink */
    --secondary-color: #ffa502;    /* Orange */
    --accent-color: #6c5ce7;       /* Purple */
}
```

### Change Title
Edit `index.html`:
```html
<title>🎉 Your New Title</title>
```

### Change Logo
Edit `index.html`:
```html
<div class="logo">🎂 Your Logo Text</div>
```

---

## 📱 Browser Testing

- **Chrome:** F12 → Toggle Device Toolbar
- **Firefox:** F12 → Responsive Design Mode
- **Safari:** Develop → Enter Responsive Design Mode
- **Mobile:** Visit on actual phone/tablet

Test breakpoints:
- Desktop: 1024px+
- Tablet: 768px-1023px
- Mobile: Below 768px

---

## 🐛 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Site not showing | Wait 2 min, hard refresh (Ctrl+Shift+R) |
| CSS broken | Check Settings → GitHub Pages is enabled |
| JS not working | Open Console (F12), look for errors |
| Images not showing | Check image paths in HTML |
| Git won't push | Run `git config --global user.name "Your Name"` |
| Remote error | Run `git remote -v` to check URL |

---

## 📝 File Modifications Guide

### To change the welcome message:
1. Open `index.html`
2. Find: `<h1 class="hero-title">Celebrate with Wishes</h1>`
3. Replace text, save, commit, push

### To add a new color theme:
1. Open `css/style.css`
2. Find `:root` section
3. Add new color variable
4. Use with `var(--new-color)` in CSS
5. Save, commit, push

### To add new section:
1. Open `index.html`
2. Add `<section>` with content
3. Add CSS in `css/style.css`
4. Save, commit, push

---

## 🚨 Emergency Recovery

### Undo last commit (before push)
```bash
git reset --soft HEAD~1
```

### Undo changes to a file
```bash
git checkout -- filename.html
```

### Check commit history
```bash
git log --oneline
```

### View what changed
```bash
git diff
```

---

## 💡 Pro Tips

1. **Always pull before push** (if working with others)
   ```bash
   git pull origin main
   git push origin main
   ```

2. **Create meaningful commit messages**
   - ❌ Bad: "fix"
   - ✅ Good: "Fix: prevent confetti on mobile"

3. **Test locally before pushing**
   - Make changes
   - Test in browser
   - Check different screen sizes
   - Then commit and push

4. **Back up important changes**
   - Save copies locally
   - GitHub keeps commit history

5. **Use descriptive branch names** (for multiple people)
   ```bash
   git checkout -b feature/new-animations
   ```

---

## 📞 Quick Help

- **Git help:** `git help <command>`
- **Check git version:** `git --version`
- **Check git config:** `git config --list`
- **View repository:** Go to `https://github.com/username/birthday-wishes`

---

## ✅ Deployment Checklist

- [ ] All files in correct folders
- [ ] `.gitignore` is present
- [ ] No sensitive data in files
- [ ] `index.html` is in root
- [ ] `css/` and `js/` folders exist
- [ ] Repository is public
- [ ] GitHub Pages is enabled
- [ ] Site is accessible at GitHub Pages URL
- [ ] All features work in browser
- [ ] Mobile responsive

---

## 📊 File Sizes

| File | Size | Purpose |
|------|------|---------|
| index.html | ~8 KB | Structure |
| css/style.css | ~12 KB | Design |
| js/script.js | ~10 KB | Functionality |
| **Total** | **~30 KB** | **Very fast!** |

---

## 🎓 Learning Resources

- **Git Basics:** https://git-scm.com/book/en/v2
- **GitHub Docs:** https://docs.github.com
- **HTML Guide:** https://developer.mozilla.org/en-US/docs/Web/HTML
- **CSS Guide:** https://developer.mozilla.org/en-US/docs/Web/CSS
- **JavaScript Guide:** https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

## 🎉 You're All Set!

Everything you need is in this folder. Happy creating!

**Questions?** Check README.md or DEPLOYMENT_GUIDE.md

Made with ❤️ and ✨
