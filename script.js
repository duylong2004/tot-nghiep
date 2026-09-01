document.addEventListener('DOMContentLoaded', () => {
    initGuestName();
    initCountdownTimer();
    initTechnicalCanvas();
});

/* 1. ĐỌC TÊN KHÁCH MỜI TỪ ĐUÔI LINK (?to=Tên+Khách) */
function initGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestNameParam = urlParams.get('to') || urlParams.get('name') || urlParams.get('khach');
    
    const guestDisplayEl = document.getElementById('guest-name-display');
    if (guestDisplayEl) {
        if (guestNameParam) {
            const cleanedName = decodeURIComponent(guestNameParam.replace(/\+/g, ' ')).trim();
            if (cleanedName) {
                guestDisplayEl.textContent = cleanedName;
            } else {
                guestDisplayEl.textContent = 'Bạn/Em';
            }
        } else {
            guestDisplayEl.textContent = 'Bạn/Em';
        }
    }
}

/* 2. ĐẾM NGƯỢC THỜI GIAN */
function initCountdownTimer() {
    const targetDate = new Date('2026-09-15T08:30:00+07:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days < 10 ? '0' + days : days;
        hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* 3. NỀN NÉT VẼ VI MẠCH KỸ THUẬT & HẠT BỤI VÀNG KIM CHÌM */
function initTechnicalCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.5,
            speedY: -(Math.random() * 0.3 + 0.1),
            speedX: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.4 + 0.1,
            color: Math.random() > 0.4 ? '#D4AF37' : '#B91C1C'
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Subtle Technical Circuit Lines
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, height * 0.25);
        ctx.lineTo(width * 0.3, height * 0.25);
        ctx.lineTo(width * 0.4, height * 0.35);
        ctx.stroke();

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();

            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y < 0) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}
