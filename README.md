# 🎂 Birthday Wishes

A beautiful, interactive birthday wishes web application with stunning animations, confetti effects, and an elegant gallery. Create personalized birthday wishes, save them to a gallery, and share the joy!

![Birthday Wishes Banner](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F%20%26%20%E2%9C%A8-ff6b9d)
![License](https://img.shields.io/badge/License-MIT-blue)
![GitHub Pages Compatible](https://img.shields.io/badge/GitHub%20Pages-Compatible-success)

## ✨ Features

- 🎨 **Customizable Themes** - Choose from beautiful colors for each wish
- ✨ **Magical Animations** - Confetti bursts and smooth transitions
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile devices
- 💾 **Local Storage** - Wishes are saved in your browser automatically
- 📤 **Easy Sharing** - Share wishes via native share or copy to clipboard
- 🎭 **Modern Design** - Beautiful gradients, typography, and layouts
- 🚀 **No Backend Required** - Runs entirely in the browser
- 📊 **Gallery System** - Browse, edit, and manage all your wishes

## 🚀 Quick Start

### Option 1: Use Directly from GitHub Pages

Simply visit the deployed version:
```
https://yourusername.github.io/birthday-wishes/
```

### Option 2: Run Locally

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/birthday-wishes.git
cd birthday-wishes
```

2. **Open in your browser:**
   - **Option A:** Double-click `index.html`
   - **Option B:** Use a local server (recommended for development)
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

3. **Access the application:**
   - Open http://localhost:8000 in your browser

## 📁 Project Structure

```
birthday-wishes/
│
├── index.html              # Main HTML file
├── README.md              # Documentation
├── LICENSE                # MIT License
├── .gitignore            # Git ignore rules
│
├── css/
│   └── style.css          # Complete styling with animations
│
├── js/
│   └── script.js          # All interactive functionality
│
└── images/               # (Optional) Add images here
    └── .gitkeep
```

## 🎯 How to Use

### Creating a Birthday Wish

1. **Fill in the form:**
   - Birthday Person's Name
   - Your Wish Message
   - Your Name
   - Select a theme color

2. **Preview your wish:**
   - See a live preview on the right side

3. **Generate the wish:**
   - Click "Generate Wish" to create it
   - Watch the confetti animation!

4. **Save to gallery:**
   - Click "Save to Gallery" to store your wish
   - It will be saved in browser's local storage

### Managing Your Wishes

- **View Gallery:** Scroll to the gallery section to see all saved wishes
- **Edit a Wish:** Click the "Edit" button on any wish card
- **Delete a Wish:** Click the "Delete" button on any wish card
- **Share a Wish:** Click the "Share" button to share via your device's share menu or copy to clipboard
- **Sort Wishes:** Toggle between sorting by latest or oldest
- **Clear All:** Remove all wishes at once (with confirmation)

## 🌐 Deploy to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon and select "New repository"
3. Name it `birthday-wishes`
4. Add description: "A beautiful birthday wishes application"
5. Choose "Public"
6. Click "Create repository"

### Step 2: Push Your Code to GitHub

```bash
# Clone this project (or your fork)
git clone https://github.com/yourusername/birthday-wishes.git
cd birthday-wishes

# Configure git if needed
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Birthday Wishes application"

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" (gear icon)
3. Scroll down to "GitHub Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "main" branch and "/(root)" folder
6. Click "Save"

### Step 4: Access Your Site

Wait a few minutes for GitHub Pages to build, then visit:
```
https://yourusername.github.io/birthday-wishes/
```

## 🎨 Customization

### Change Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #ff6b9d;      /* Main accent color */
    --secondary-color: #ffa502;    /* Secondary accent */
    --accent-color: #6c5ce7;       /* Tertiary accent */
    --success-color: #00b894;      /* Success/positive color */
}
```

### Change Fonts

The project uses Google Fonts. To change fonts, modify the import in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

Then update the `font-family` in CSS.

### Add Your Logo

Replace the emoji in the navigation with your own logo:

```html
<div class="logo">🎂 Birthday Wishes</div>
```

## 🛠️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 💾 Data Storage

All wishes are stored locally in your browser using **localStorage**. This means:
- ✅ No server required
- ✅ Completely private
- ✅ Data persists between sessions
- ⚠️ Data is cleared if browser cache is cleared
- ⚠️ Data is device-specific (not synced across devices)

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Local storage has a limit of ~5-10MB per domain
- Wishes will be lost if browser cache is cleared
- Mobile Share API support varies by device

## 🚀 Future Enhancements

- [ ] Export wishes as PDF
- [ ] Share wishes via QR code
- [ ] Birthday countdown timer
- [ ] Multiple theme templates
- [ ] Cloud sync (optional Firebase integration)
- [ ] Birthday calendar integration
- [ ] Wish templates with suggestions

## 📧 Support

For issues or questions, please:
1. Check the [GitHub Issues](https://github.com/yourusername/birthday-wishes/issues)
2. Create a new issue with detailed description
3. Include screenshots if applicable

## 🎉 Credits

Created with ❤️ and ✨

- Design: Modern and festive
- Technology: Vanilla HTML, CSS, and JavaScript
- Hosting: GitHub Pages
- Fonts: Google Fonts (Poppins, Playfair Display)

## 📊 Statistics

- **Lines of Code:** ~1000+
- **CSS Classes:** 50+
- **JavaScript Functions:** 20+
- **Animations:** 15+
- **Responsive Breakpoints:** 3
- **Zero Dependencies:** Pure vanilla web technologies

---

**Made with 💖 and ✨ | Deploy and celebrate with Birthday Wishes!**
