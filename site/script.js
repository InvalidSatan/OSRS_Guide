// Smooth scrolling for anchor links and responsive menu
const links = document.querySelectorAll('nav a');
const navList = document.querySelector('nav ul');
const navToggle = document.querySelector('.nav-toggle');
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        if (navList.classList.contains('show')) {
            navList.classList.remove('show');
        }
    });
});

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('show');
    });
}

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
        document.body.classList.add('light');
        themeToggle.textContent = 'Dark Mode';
    }
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        const light = document.body.classList.contains('light');
        localStorage.setItem('theme', light ? 'light' : 'dark');
        themeToggle.textContent = light ? 'Dark Mode' : 'Light Mode';
    });
}

// Experience calculator
function xpForLevel(level) {
    let points = 0;
    for (let lvl = 1; lvl < level; lvl++) {
        points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7));
    }
    return Math.floor(points / 4);
}

const calcBtn = document.getElementById('calc-xp');
if (calcBtn) {
    calcBtn.addEventListener('click', () => {
        const current = parseInt(document.getElementById('current-xp').value, 10) || 0;
        const target = parseInt(document.getElementById('target-level').value, 10);
        const output = document.getElementById('xp-result');
        if (!target || target < 1 || target > 99) {
            output.textContent = 'Enter a target level between 1 and 99.';
            return;
        }
        const targetXp = xpForLevel(target);
        const needed = targetXp - current;
        output.textContent = needed > 0 ? `XP needed: ${needed.toLocaleString()}` : 'Target level already achieved!';
    });
}

// Prayer cost calculator
const prayerBtn = document.getElementById('calc-prayer');
if (prayerBtn) {
    prayerBtn.addEventListener('click', () => {
        const current = parseInt(document.getElementById('prayer-current').value, 10) || 0;
        const target = parseInt(document.getElementById('prayer-target').value, 10);
        const xpPerBone = parseInt(document.getElementById('xp-per-bone').value, 10) || 0;
        const costPerBone = parseInt(document.getElementById('cost-per-bone').value, 10) || 0;
        const output = document.getElementById('prayer-result');
        if (!target || target < 1 || target > 99 || xpPerBone <= 0 || costPerBone <= 0) {
            output.textContent = 'Enter valid values for levels and bone data.';
            return;
        }
        const targetXp = xpForLevel(target);
        const neededXp = Math.max(targetXp - current, 0);
        const bones = Math.ceil(neededXp / xpPerBone);
        const cost = bones * costPerBone;
        output.textContent = neededXp > 0 ?
            `Bones: ${bones.toLocaleString()}, Cost: ${cost.toLocaleString()} gp` :
            'Target level already achieved!';
    });
}

// Boss profit calculator
const profitBtn = document.getElementById('calc-profit');
if (profitBtn) {
    profitBtn.addEventListener('click', () => {
        const value = parseInt(document.getElementById('drop-value').value, 10) || 0;
        const rate = parseInt(document.getElementById('drop-rate').value, 10) || 0;
        const kills = parseInt(document.getElementById('kills-per-hour').value, 10) || 0;
        const output = document.getElementById('profit-result');
        if (value <= 0 || rate <= 0 || kills <= 0) {
            output.textContent = 'Enter valid numbers for drop value, rate, and kills.';
            return;
        }
        const profit = (value / rate) * kills;
        output.textContent = `Expected profit: ${profit.toLocaleString()} gp/hr`;
    });
}

// Persist checklist state
document.querySelectorAll('[data-storage-key]').forEach(box => {
    const key = box.getAttribute('data-storage-key');
    box.checked = localStorage.getItem(key) === 'true';
    box.addEventListener('change', () => {
        localStorage.setItem(key, box.checked);
    });
});
