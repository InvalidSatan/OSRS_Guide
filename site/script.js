// Smooth scrolling for anchor links
const links = document.querySelectorAll('nav a');
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        const navList = document.querySelector('nav ul');
        if (navList.classList.contains('show')) {
            navList.classList.remove('show');
        }
    });
});

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

// Persist checklist state
document.querySelectorAll('[data-storage-key]').forEach(box => {
    const key = box.getAttribute('data-storage-key');
    box.checked = localStorage.getItem(key) === 'true';
    box.addEventListener('change', () => {
        localStorage.setItem(key, box.checked);
    });
});
