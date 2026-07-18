// ==================== CONFETTI ANIMATION ====================
class ConfettiAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle(x, y) {
        const colors = ['#ff6b9d', '#ffa502', '#6c5ce7', '#00b894', '#fd79a8', '#fdcb6e'];
        return {
            x: x || Math.random() * this.canvas.width,
            y: y || -10,
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * 5 + 3,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1,
            life: 1,
        };
    }

    burst(x, y, count = 50) {
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle(x, y));
        }
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles = this.particles.filter(p => p.life > 0);

        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2; // gravity
            p.rotation += p.rotationSpeed;
            p.life -= 0.01;

            this.ctx.save();
            this.ctx.globalAlpha = p.life;
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            this.ctx.restore();
        });

        if (this.particles.length > 0) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }
}

// ==================== WISH MANAGER ====================
class WishManager {
    constructor() {
        this.wishes = this.loadWishes();
        this.currentWish = null;
        this.confetti = new ConfettiAnimation('confettiCanvas');
    }

    loadWishes() {
        const saved = localStorage.getItem('wishes');
        return saved ? JSON.parse(saved) : [];
    }

    saveWishes() {
        localStorage.setItem('wishes', JSON.stringify(this.wishes));
    }

    addWish(wish) {
        wish.id = Date.now();
        wish.timestamp = new Date().toISOString();
        this.wishes.unshift(wish);
        this.saveWishes();
        return wish;
    }

    deleteWish(id) {
        this.wishes = this.wishes.filter(w => w.id !== id);
        this.saveWishes();
    }

    clearAll() {
        if (confirm('Are you sure you want to clear all wishes? This cannot be undone.')) {
            this.wishes = [];
            this.saveWishes();
            return true;
        }
        return false;
    }

    getWishes(sortBy = 'latest') {
        let sorted = [...this.wishes];
        if (sortBy === 'latest') {
            sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } else if (sortBy === 'oldest') {
            sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        }
        return sorted;
    }

    createWishObject(name, message, sender, color) {
        return {
            name,
            message,
            sender,
            color
        };
    }
}

// ==================== UI MANAGER ====================
class UIManager {
    constructor(wishManager) {
        this.wishManager = wishManager;
        this.elements = this.cacheElements();
        this.setupEventListeners();
        this.renderGallery();
    }

    cacheElements() {
        return {
            // Form elements
            birthdayName: document.getElementById('birthdayName'),
            wishMessage: document.getElementById('wishMessage'),
            senderName: document.getElementById('senderName'),
            themeColor: document.getElementById('themeColor'),
            colorDisplay: document.getElementById('colorDisplay'),
            
            // Buttons
            generateBtn: document.getElementById('generateBtn'),
            clearBtn: document.getElementById('clearBtn'),
            addToGalleryBtn: document.getElementById('addToGalleryBtn'),
            sortBtn: document.getElementById('sortBtn'),
            clearGalleryBtn: document.getElementById('clearGalleryBtn'),
            
            // Preview
            wishPreview: document.getElementById('wishPreview'),
            
            // Gallery
            wishsGallery: document.getElementById('wishsGallery'),
            
            // Modal
            wishModal: document.getElementById('wishModal'),
            modalBody: document.getElementById('modalBody')
        };
    }

    setupEventListeners() {
        // Color picker
        this.elements.themeColor.addEventListener('change', (e) => {
            this.elements.colorDisplay.textContent = e.target.value.toUpperCase();
            this.updatePreview();
        });

        // Form inputs
        this.elements.birthdayName.addEventListener('input', () => this.updatePreview());
        this.elements.wishMessage.addEventListener('input', () => this.updatePreview());
        this.elements.senderName.addEventListener('input', () => this.updatePreview());

        // Buttons
        this.elements.generateBtn.addEventListener('click', () => this.generateWish());
        this.elements.clearBtn.addEventListener('click', () => this.clearForm());
        this.elements.addToGalleryBtn.addEventListener('click', () => this.addToGallery());
        this.elements.sortBtn.addEventListener('click', () => this.toggleSort());
        this.elements.clearGalleryBtn.addEventListener('click', () => this.clearGallery());

        // Modal close
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.elements.wishModal) {
                this.closeModal();
            }
        });
    }

    updatePreview() {
        const name = this.elements.birthdayName.value || 'Birthday Person';
        const message = this.elements.wishMessage.value || 'Your wish will appear here...';
        const sender = this.elements.senderName.value || 'A Friend';
        const color = this.elements.themeColor.value;

        this.renderWishCard(
            name,
            message,
            sender,
            color,
            this.elements.wishPreview,
            true
        );
    }

    renderWishCard(name, message, sender, color, container, isPreview = false) {
        const card = document.createElement('div');
        card.className = `wish-card ${isPreview ? 'preview' : ''}`;
        card.style.borderTopColor = color;

        const gradientStyle = `linear-gradient(135deg, ${color}, ${this.adjustColor(color, 30)})`;

        card.innerHTML = `
            <div>
                <div class="wish-name" style="background: ${gradientStyle}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Happy Birthday, ${this.escapeHtml(name)}!
                </div>
                <div class="wish-message">
                    "${this.escapeHtml(message)}"
                </div>
            </div>
            <div class="wish-from">
                — ${this.escapeHtml(sender)}
            </div>
            ${!isPreview ? `
                <div class="wish-actions">
                    <button onclick="uiManager.editWish(this)">✏️ Edit</button>
                    <button onclick="uiManager.deleteWishFromGallery(this)">🗑️ Delete</button>
                    <button onclick="uiManager.shareWish(this)">📤 Share</button>
                </div>
            ` : ''}
        `;

        container.innerHTML = '';
        container.appendChild(card);
    }

    adjustColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, Math.min(255, (num >> 16) + amt));
        const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
        const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
        return '#' + (0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1);
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    generateWish() {
        const name = this.elements.birthdayName.value.trim();
        const message = this.elements.wishMessage.value.trim();
        const sender = this.elements.senderName.value.trim();
        const color = this.elements.themeColor.value;

        if (!name || !message || !sender) {
            alert('Please fill in all fields!');
            return;
        }

        this.wishManager.currentWish = this.wishManager.createWishObject(name, message, sender, color);
        this.elements.addToGalleryBtn.style.display = 'block';

        // Trigger confetti
        this.wishManager.confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 100);
        
        // Show success message
        this.showNotification('Wish generated! 🎉');
    }

    addToGallery() {
        if (!this.wishManager.currentWish) return;

        this.wishManager.addWish(this.wishManager.currentWish);
        this.renderGallery();
        this.showNotification('Wish saved to gallery! 💾');
        
        // Reset form
        this.clearForm();
    }

    clearForm() {
        this.elements.birthdayName.value = '';
        this.elements.wishMessage.value = '';
        this.elements.senderName.value = '';
        this.elements.themeColor.value = '#ff6b9d';
        this.elements.colorDisplay.textContent = '#FF6B9D';
        this.elements.addToGalleryBtn.style.display = 'none';
        this.wishManager.currentWish = null;
        this.updatePreview();
    }

    renderGallery() {
        const wishes = this.wishManager.getWishes();
        
        if (wishes.length === 0) {
            this.elements.wishsGallery.innerHTML = `
                <div class="gallery-empty">
                    <p>No wishes yet. Create one to get started! 🎉</p>
                </div>
            `;
            return;
        }

        this.elements.wishsGallery.innerHTML = '';
        wishes.forEach(wish => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<div id="wish-${wish.id}"></div>`;
            
            this.elements.wishsGallery.appendChild(item);
            
            const container = document.getElementById(`wish-${wish.id}`);
            this.renderWishCard(wish.name, wish.message, wish.sender, wish.color, container);
        });
    }

    deleteWishFromGallery(button) {
        const card = button.closest('.wish-card');
        const parent = card.closest('.gallery-item');
        const id = parseInt(parent.querySelector('div').id.replace('wish-', ''));

        if (confirm('Delete this wish?')) {
            this.wishManager.deleteWish(id);
            this.renderGallery();
            this.showNotification('Wish deleted! 🗑️');
        }
    }

    toggleSort() {
        const sortBtn = this.elements.sortBtn;
        const currentSort = sortBtn.dataset.sort || 'latest';
        const newSort = currentSort === 'latest' ? 'oldest' : 'latest';
        
        sortBtn.dataset.sort = newSort;
        sortBtn.textContent = newSort === 'latest' ? 'Sort by Oldest' : 'Sort by Latest';
        
        this.wishManager.wishes = this.wishManager.getWishes(newSort);
        this.renderGallery();
    }

    clearGallery() {
        if (this.wishManager.clearAll()) {
            this.renderGallery();
            this.showNotification('Gallery cleared! 🧹');
        }
    }

    shareWish(button) {
        const card = button.closest('.wish-card');
        const name = card.querySelector('.wish-name').textContent;
        const message = card.querySelector('.wish-message').textContent;
        const sender = card.querySelector('.wish-from').textContent;

        const text = `${name}\n${message}\n${sender}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Birthday Wish',
                text: text
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Wish copied to clipboard! 📋');
            });
        }
    }

    editWish(button) {
        const card = button.closest('.wish-card');
        const name = card.querySelector('.wish-name').textContent.replace('Happy Birthday, ', '').replace('!', '');
        const message = card.querySelector('.wish-message').textContent.replace(/"/g, '').trim();
        const sender = card.querySelector('.wish-from').textContent.replace('— ', '').trim();

        this.elements.birthdayName.value = name;
        this.elements.wishMessage.value = message;
        this.elements.senderName.value = sender;

        document.getElementById('create').scrollIntoView({ behavior: 'smooth' });
        this.updatePreview();
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ff6b9d, #ffa502);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
            font-weight: 600;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    closeModal() {
        this.elements.wishModal.style.display = 'none';
    }
}

// ==================== STAR ANIMATION ====================
function createStars() {
    const container = document.getElementById('starContainer');
    const starCount = Math.min(50, Math.floor(window.innerHeight / 10));

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(star);
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    
    const wishManager = new WishManager();
    window.uiManager = new UIManager(wishManager);

    // Trigger confetti on hero action
    document.querySelector('.cta-button').addEventListener('click', () => {
        wishManager.confetti.burst(window.innerWidth / 2, 100, 50);
    });
});

// ==================== PAGE VISIBILITY ====================
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page became visible, reload gallery in case it was changed elsewhere
        if (window.uiManager) {
            window.uiManager.renderGallery();
        }
    }
});

// Add slideInRight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
