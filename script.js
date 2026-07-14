// ==================== GLOBAL STATE ====================
let currentChapter = 0;
let musicStarted = false;
let chapterInProgress = false;
const totalChapters = 9;

// Chapter timing configuration (milliseconds)
const chapterConfig = {
    1: { autoAdvance: false, tapToAdvance: 'heartStar' },
    2: { autoAdvance: true, duration: 10000 },
    3: { autoAdvance: true, duration: 12000 },
    4: { autoAdvance: false, tapToAdvance: 'constellation' },
    5: { autoAdvance: true, duration: 15000 },
    6: { autoAdvance: false, tapToAdvance: 'envelope' },
    7: { autoAdvance: true, duration: 12000 },
    8: { autoAdvance: true, duration: 15000 },
    9: { autoAdvance: true, duration: 20000 }
};

// Memory data for Chapter 4
const memories = [
    { text: "The first time your smile lit up the room, the stars took notice. ✨", x: 15, y: 20 },
    { text: "Every laugh you've shared became a melody the universe hums. 🎵", x: 70, y: 15 },
    { text: "Your kindness ripples through galaxies like golden sunlight. ☀️", x: 40, y: 70 },
    { text: "The way you care for others makes even the moon jealous. 🌙", x: 80, y: 60 },
    { text: "Your dreams are so big, they create new constellations. 🌟", x: 25, y: 45 },
    { text: "Every moment with you is written in stardust forever. 💫", x: 60, y: 35 },
    { text: "Your heart is more vast than any universe we've known. ❤️", x: 45, y: 85 },
    { text: "You are the most beautiful wonder the cosmos has ever seen. 🌌", x: 10, y: 75 }
];

// Wishes for Chapter 7
const wishes = [
    "May your 19th year be filled with stardust and dreams come true...",
    "Wishing you happiness that reaches beyond the galaxies...",
    "May every day shine as bright as your beautiful soul...",
    "Here's to another year of being absolutely amazing...",
    "May love surround you like a warm cosmic embrace...",
    "Wishing you adventures written in the stars...",
    "May your smile continue to light up entire universes...",
    "Happy Birthday to the most special star in the galaxy..."
];

// Letter content for Chapter 6
const letterLines = [
    "My Dearest Talat,",
    "",
    "If I could gather all the stars in the universe,",
    "I would arrange them to spell out how",
    "extraordinary you are.",
    "",
    "You are the rarest kind of magic —",
    "the sort that makes ordinary moments",
    "feel like cosmic miracles.",
    "",
    "Every constellation tells a story,",
    "but none as beautiful as yours.",
    "",
    "On this special day, I want you to know",
    "that you are loved beyond measure,",
    "beyond distance, beyond time itself.",
    "",
    "The universe celebrates you today,",
    "and so do I. Always.",
    "",
    "With all my love,",
    "Ashish ❤️"
];

// ==================== MUSIC SYSTEM ====================
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');

function initMusic() {
    bgMusic.volume = 0.5;
    musicControl.classList.add('visible');
}

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
        musicControl.classList.add('playing');
    } else {
        bgMusic.pause();
        musicControl.classList.remove('playing');
    }
}

musicControl.addEventListener('click', toggleMusic);

// ==================== START OVERLAY ====================
const startOverlay = document.getElementById('startOverlay');
const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', () => {
    startOverlay.classList.add('hidden');
    if (!musicStarted) {
        bgMusic.play().catch(() => {});
        musicControl.classList.add('playing');
        musicStarted = true;
    }
    setTimeout(() => {
        startOverlay.style.display = 'none';
        startChapter(1);
    }, 1500);
});

// ==================== CHAPTER MANAGEMENT ====================
function showChapter(num) {
    document.querySelectorAll('.chapter').forEach(ch => ch.classList.remove('active'));
    const chapter = document.getElementById(`chapter${num}`);
    if (chapter) {
        chapter.classList.add('active');
        document.getElementById('chapterIndicator').textContent = `${num} / ${totalChapters}`;
        updateProgress(num);
    }
}

function updateProgress(num) {
    const fill = document.getElementById('progressFill');
    const bar = document.getElementById('progressBar');
    const indicator = document.getElementById('chapterIndicator');
    fill.style.width = `${(num / totalChapters) * 100}%`;
    bar.classList.add('visible');
    indicator.classList.add('visible');
}

function transitionToChapter(num) {
    if (chapterInProgress || num > totalChapters) return;
    chapterInProgress = true;

    const overlay = document.getElementById('transitionOverlay');
    overlay.classList.add('active');

    setTimeout(() => {
        showChapter(num);
        overlay.classList.remove('active');
        initChapter(num);
    }, 1000);
}

function startChapter(num) {
    showChapter(num);
    initChapter(num);
}

function initChapter(num) {
    chapterInProgress = true;
    currentChapter = num;

    switch(num) {
        case 1: initChapter1(); break;
        case 2: initChapter2(); break;
        case 3: initChapter3(); break;
        case 4: initChapter4(); break;
        case 5: initChapter5(); break;
        case 6: initChapter6(); break;
        case 7: initChapter7(); break;
        case 8: initChapter8(); break;
        case 9: initChapter9(); break;
    }
}

function advanceChapter() {
    chapterInProgress = false;
    if (currentChapter < totalChapters) {
        transitionToChapter(currentChapter + 1);
    }
}

// ==================== TYPING EFFECT ====================
function typeText(elementId, text, speed = 60, callback) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = '';
    el.classList.add('visible', 'typing');
    let i = 0;

    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            el.classList.remove('typing');
            if (callback) setTimeout(callback, 500);
        }
    }
    type();
}

function showText(elementId, text, delay = 0) {
    setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = text;
            el.classList.add('visible');
        }
    }, delay);
}

// ==================== CANVAS STARFIELD ====================
function createStarfield(canvasId, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const starCount = options.count || 150;
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005,
            twinkleSpeed: Math.random() * 0.02 + 0.01
        });
    }

    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.02;
            star.alpha = Math.max(0.1, Math.min(1, star.alpha));
            
            if (options.moving) {
                star.y += star.speed;
                if (star.y > canvas.height) star.y = 0;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 248, 231, ${star.alpha})`;
            ctx.fill();

            if (star.radius > 1.5) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 215, 0, ${star.alpha * 0.2})`;
                ctx.fill();
            }
        });

        animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => cancelAnimationFrame(animationId);
}

// ==================== PARTICLE SYSTEM ====================
function createParticles(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const count = options.count || 30;
    const colors = options.colors || ['#FFD700', '#FFB6C1', '#E6E6FA'];
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = options.className || 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            pointer-events: none;
            animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
}

// ==================== CHAPTER 1: BEFORE YOU EXISTED ====================
function initChapter1() {
    createStarfield('canvas1', { count: 80, moving: true });
    
    setTimeout(() => {
        typeText('ch1-text1', 'Once upon a time...', 80, () => {
            setTimeout(() => {
                typeText('ch1-text2', 'The universe was a little less beautiful.', 70, () => {
                    setTimeout(() => {
                        const heartStar = document.getElementById('heartStar');
                        heartStar.classList.add('visible');
                        document.getElementById('ch1-hint').style.opacity = '1';
                    }, 1000);
                });
            }, 1500);
        });
    }, 1000);

    document.getElementById('heartStar').onclick = () => {
        document.getElementById('ch1-hint').style.opacity = '0';
        advanceChapter();
    };
}

// ==================== CHAPTER 2: A STAR IS BORN ====================
function initChapter2() {
    createStarfield('canvas2', { count: 200, moving: true });

    // Cosmic explosion
    const explosion = document.getElementById('cosmicExplosion');
    explosion.style.animation = 'none';
    setTimeout(() => explosion.style.animation = '', 100);

    setTimeout(() => {
        typeText('ch2-text1', 'A very special star appeared...', 70, () => {
            setTimeout(() => {
                document.getElementById('starReveal').classList.add('visible');
                
                setTimeout(() => {
                    typeText('ch2-text2', 'And the cosmos whispered her name...', 60);
                }, 3000);

                setTimeout(() => {
                    advanceChapter();
                }, 8000);
            }, 1500);
        });
    }, 2000);
}

// ==================== CHAPTER 3: THE UNIVERSE CHANGES ====================
function initChapter3() {
    createStarfield('canvas3', { count: 100 });
    createFlowers();
    createButterflies();
    createPetals();

    setTimeout(() => {
        typeText('ch3-text1', 'And everything became brighter.', 70);
    }, 2000);

    setTimeout(() => {
        advanceChapter();
    }, chapterConfig[3].duration);
}

function createFlowers() {
    const container = document.getElementById('flowersContainer');
    if (!container) return;
    container.innerHTML = '';
    const flowerEmojis = ['🌸', '🌺', '🌷', '💐', '🌹', '✿', '❀'];
    
    for (let i = 0; i < 12; i++) {
        const flower = document.createElement('div');
        flower.className = 'cosmic-flower';
        flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        flower.style.left = `${Math.random() * 90 + 5}%`;
        flower.style.top = `${Math.random() * 80 + 10}%`;
        flower.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(flower);
    }
}

function createButterflies() {
    const container = document.getElementById('butterfliesContainer');
    if (!container) return;
    container.innerHTML = '';
    const butterflyEmojis = ['🦋', '✨'];
    
    for (let i = 0; i < 8; i++) {
        const butterfly = document.createElement('div');
        butterfly.className = 'butterfly';
        butterfly.textContent = butterflyEmojis[Math.floor(Math.random() * butterflyEmojis.length)];
        butterfly.style.left = `${Math.random() * 100}%`;
        butterfly.style.top = `${Math.random() * 50 + 50}%`;
        butterfly.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(butterfly);
    }
}

function createPetals() {
    const container = document.getElementById('petalsContainer');
    if (!container) return;
    container.innerHTML = '';
    
    for (let i = 0; i < 25; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${Math.random() * 6 + 6}s`;
        petal.style.animationDelay = `${Math.random() * 8}s`;
        petal.style.background = `linear-gradient(135deg, ${['#FFB6C1', '#F4C2C2', '#FFD1DC', '#FF69B4'][Math.floor(Math.random() * 4)]}, transparent)`;
        container.appendChild(petal);
    }
}

// ==================== CHAPTER 4: CONSTELLATION OF MEMORIES ====================
function initChapter4() {
    createStarfield('canvas4', { count: 250 });
    createConstellation();

    setTimeout(() => {
        typeText('ch4-title', 'The Constellation of Memories', 70, () => {
            setTimeout(() => {
                showText('ch4-subtitle', 'Click on the glowing stars to reveal precious memories...', 500);
            }, 1500);
        });
    }, 1000);
}

function createConstellation() {
    const container = document.getElementById('constellationContainer');
    if (!container) return;
    container.innerHTML = '';

    memories.forEach((memory, index) => {
        const star = document.createElement('div');
        star.className = 'constellation-star';
        star.style.left = `${memory.x}%`;
        star.style.top = `${memory.y}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.dataset.memory = memory.text;
        star.dataset.index = index;
        
        star.addEventListener('click', () => showMemory(memory.text));
        container.appendChild(star);

        // Add constellation lines between nearby stars
        if (index > 0) {
            const prevMemory = memories[index - 1];
            const line = document.createElement('div');
            line.className = 'constellation-line';
            
            const dx = memory.x - prevMemory.x;
            const dy = memory.y - prevMemory.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            line.style.left = `${prevMemory.x}%`;
            line.style.top = `${prevMemory.y}%`;
            line.style.width = `${length}%`;
            line.style.transform = `rotate(${angle}deg)`;
            container.appendChild(line);
        }
    });

    // Close memory modal
    document.getElementById('memoryClose').onclick = () => {
        document.getElementById('memoryModal').classList.remove('active');
    };

    // Tap anywhere on background to advance
    setTimeout(() => {
        let starsClicked = 0;
        const stars = container.querySelectorAll('.constellation-star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                starsClicked++;
                if (starsClicked >= 3) {
                    setTimeout(() => {
                        document.getElementById('memoryModal').classList.remove('active');
                        advanceChapter();
                    }, 2000);
                }
            });
        });
    }, 5000);
}

function showMemory(text) {
    const modal = document.getElementById('memoryModal');
    const memoryText = document.getElementById('memoryText');
    memoryText.textContent = text;
    modal.classList.add('active');
}

// ==================== CHAPTER 5: THE BIRTHDAY ORBIT ====================
let fireworksInterval;

function initChapter5() {
    createStarfield('canvas5', { count: 150 });
    
    // Show orbit system
    setTimeout(() => {
        typeText('ch2-text1', 'The planets aligned to celebrate...', 70, () => {
            setTimeout(() => {
                // Reveal giant planet with 19
                document.getElementById('giantPlanet').classList.add('visible');
                
                setTimeout(() => {
                    startFireworks();
                    startCelebration();
                    
                    setTimeout(() => {
                        showBirthdayReveal();
                    }, 4000);
                }, 2000);
            }, 1500);
        });
    }, 1000);
}

function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#FF6347', '#7B68EE', '#FF1493', '#00FF7F'];

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const particleCount = Math.random() * 30 + 20;

        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = Math.random() * 4 + 2;
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color,
                alpha: 1,
                size: Math.random() * 3 + 1,
                decay: Math.random() * 0.02 + 0.01
            });
        }
    }

    let frameCount = 0;
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (frameCount % 20 === 0) createFirework();

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // gravity
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        frameCount++;
        fireworksInterval = requestAnimationFrame(animate);
    }
    animate();
}

function startCelebration() {
    // Create confetti
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createConfetti(), i * 100);
    }

    // Create meteor shower
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createMeteor(), i * 300);
    }

    // Golden particles
    createParticles('celebrationContainer', {
        count: 60,
        colors: ['#FFD700', '#FFA500', '#FF69B4'],
        className: 'sparkle'
    });
}

function createConfetti() {
    const container = document.getElementById('celebrationContainer');
    if (!container) return;
    
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = '-10px';
    confetti.style.background = ['#FFD700', '#FF69B4', '#00FFFF', '#FF6347', '#7B68EE'][Math.floor(Math.random() * 5)];
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = `${Math.random() * 6 + 4}px`;
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    confetti.style.animationDuration = `${Math.random() * 3 + 3}s`;
    container.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 6000);
}

function createMeteor() {
    const container = document.getElementById('celebrationContainer');
    if (!container) return;
    
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    meteor.style.left = `${Math.random() * 50 + 50}%`;
    meteor.style.top = `${Math.random() * 30}%`;
    meteor.style.animationDuration = `${Math.random() * 1 + 0.8}s`;
    container.appendChild(meteor);
    
    setTimeout(() => meteor.remove(), 2000);
}

function showBirthdayReveal() {
    const reveal = document.getElementById('birthdayReveal');
    const text1 = document.getElementById('birthdayText1');
    const text2 = document.getElementById('birthdayText2');

    typeText('birthdayText1', 'Happy Birthday Talat ❤️', 80, () => {
        setTimeout(() => {
            typeText('birthdayText2', 'May 19 be your most magical year yet...', 60);
        }, 1000);
    });

    text1.classList.add('visible');
    text2.classList.add('visible');

    setTimeout(() => {
        if (fireworksInterval) cancelAnimationFrame(fireworksInterval);
        advanceChapter();
    }, 6000);
}

// ==================== CHAPTER 6: MESSAGE FROM THE STARS ====================
function initChapter6() {
    createStarfield('canvas6', { count: 180, moving: true });

    setTimeout(() => {
        typeText('ch6-text1', 'A message from the stars...', 70, () => {
            setTimeout(() => {
                const envelope = document.getElementById('envelopeContainer');
                envelope.style.opacity = '1';
                envelope.style.transform = 'scale(1)';
                document.getElementById('envelopeHint').style.opacity = '1';
            }, 1500);
        });
    }, 1000);

    document.getElementById('envelope').onclick = openEnvelope;
}

function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const hint = document.getElementById('envelopeHint');
    
    if (envelope.classList.contains('open')) return;
    
    envelope.classList.add('open');
    hint.style.opacity = '0';

    setTimeout(() => {
        typeLetter();
    }, 800);

    setTimeout(() => {
        advanceChapter();
    }, 25000);
}

function typeLetter() {
    const content = document.getElementById('letterContent');
    content.innerHTML = '';
    
    letterLines.forEach((line, index) => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'letter-line';
        lineDiv.style.animationDelay = `${index * 0.8}s`;
        
        if (line === '') {
            lineDiv.style.height = '10px';
        } else {
            typeLine(lineDiv, line, index * 0.8);
        }
        
        content.appendChild(lineDiv);
    });
}

function typeLine(element, text, delay) {
    setTimeout(() => {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        type();
    }, delay * 1000);
}

// ==================== CHAPTER 7: WISHES ACROSS THE GALAXY ====================
function initChapter7() {
    createStarfield('canvas7', { count: 150, moving: true });
    createShootingWishes();

    setTimeout(() => {
        typeText('ch7-text1', 'Wishes traveling across the galaxy...', 70, () => {
            setTimeout(() => {
                typeText('ch7-text2', 'Every shooting star carries a wish for you...', 60);
            }, 4000);
        });
    }, 1000);

    setTimeout(() => {
        advanceChapter();
    }, chapterConfig[7].duration);
}

function createShootingWishes() {
    const container = document.getElementById('wishesContainer');
    if (!container) return;

    wishes.forEach((wish, index) => {
        setTimeout(() => {
            const wishEl = document.createElement('div');
            wishEl.className = 'shooting-wish';
            wishEl.textContent = wish;
            wishEl.style.top = `${Math.random() * 60 + 20}%`;
            wishEl.style.animationDuration = `${Math.random() * 4 + 6}s`;
            container.appendChild(wishEl);
            
            setTimeout(() => wishEl.remove(), 12000);
        }, index * 1500);
    });

    // Add shooting stars (visual)
    const canvas = document.getElementById('canvas7');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const shootingStars = [];
        
        function createShootingStar() {
            shootingStars.push({
                x: Math.random() * canvas.width + 200,
                y: Math.random() * canvas.height * 0.3,
                length: Math.random() * 80 + 50,
                speed: Math.random() * 8 + 5,
                alpha: 1
            });
        }

        setInterval(createShootingStar, 800);

        function animate() {
            if (!document.getElementById('chapter7').classList.contains('active')) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const star = shootingStars[i];
                star.x -= star.speed;
                star.y += star.speed * 0.5;
                star.alpha -= 0.015;

                if (star.alpha <= 0) {
                    shootingStars.splice(i, 1);
                    continue;
                }

                const gradient = ctx.createLinearGradient(star.x, star.y, star.x + star.length, star.y - star.length * 0.5);
                gradient.addColorStop(0, `rgba(255, 215, 0, ${star.alpha})`);
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(star.x + star.length, star.y - star.length * 0.5);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            requestAnimationFrame(animate);
        }
        animate();
    }
}

// ==================== CHAPTER 8: THE GALAXY OF LOVE ====================
function initChapter8() {
    createStarfield('canvas8', { count: 200 });

    setTimeout(() => {
        typeText('ch8-text1', 'If I could give you one thing...', 70, () => {
            setTimeout(() => {
                typeText('ch8-text2', 'It would be the ability to see yourself through the eyes of those who care about you.', 50, () => {
                    setTimeout(() => {
                        typeText('ch8-text3', 'Then you would know how truly special you are.', 60);
                    }, 3000);
                });
            }, 3000);
        });
    }, 1000);

    setTimeout(() => {
        advanceChapter();
    }, chapterConfig[8].duration);
}

// ==================== CHAPTER 9: THE COSMIC FINALE ====================
function initChapter9() {
    createStarfield('canvas9', { count: 300, moving: true });
    createFloatingHearts();

    setTimeout(() => {
        // Show TALAT constellation
        document.getElementById('constellationTalat').classList.add('visible');
        
        setTimeout(() => {
            document.getElementById('constellationTalat').style.opacity = '0';
            document.getElementById('constellationTalat').style.transition = 'opacity 2s ease';
            
            setTimeout(() => {
                // Show finale messages
                showFinaleMessages();
            }, 2000);
        }, 6000);
    }, 3000);

    // Create grand finale effects
    createGrandFinaleEffects();
}

function showFinaleMessages() {
    typeText('finaleText1', 'Happy 19th Birthday', 80, () => {
        setTimeout(() => {
            typeText('finaleText2', 'Thank You For Existing', 70, () => {
                setTimeout(() => {
                    typeText('finaleText3', 'Love, Ashish ❤️', 80);
                }, 3000);
            });
        }, 3000);
    });

    document.getElementById('finaleText1').classList.add('visible');
    document.getElementById('finaleText2').classList.add('visible');
    document.getElementById('finaleText3').classList.add('visible');

    // Fade to black after all messages
    setTimeout(() => {
        document.body.style.transition = 'background 5s ease';
        document.body.style.background = '#000';
        
        setTimeout(() => {
            // Show restart option
            showRestartOption();
        }, 5000);
    }, 15000);
}

function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 8 + 8}s`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        heart.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
        container.appendChild(heart);
    }
}

function createGrandFinaleEffects() {
    // Light rays
    for (let i = 0; i < 5; i++) {
        const ray = document.createElement('div');
        ray.className = 'light-ray';
        ray.style.left = `${20 + i * 15}%`;
        ray.style.animationDelay = `${i * 1.5}s`;
        document.getElementById('chapter9').appendChild(ray);
    }

    // Golden particles burst
    const canvas = document.getElementById('canvas9');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 500;

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 0.5;
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                size: Math.random() * 3 + 1,
                color: ['#FFD700', '#FF69B4', '#E6E6FA', '#FFF'][Math.floor(Math.random() * 4)]
            });
        }

        let frameCount = 0;
        function animate() {
            if (!document.getElementById('chapter9').classList.contains('active')) return;
            if (frameCount > 300) return; // Stop after ~5 seconds

            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.003;

                if (p.alpha > 0) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.alpha;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            });

            frameCount++;
            requestAnimationFrame(animate);
        }
        animate();
    }
}

function showRestartOption() {
    const finale = document.getElementById('finaleMessages');
    const restartBtn = document.createElement('button');
    restartBtn.className = 'start-btn';
    restartBtn.style.marginTop = '30px';
    restartBtn.innerHTML = '<span class="btn-text">Experience Again</span>';
    restartBtn.onclick = () => location.reload();
    finale.appendChild(restartBtn);
}

// ==================== GLOBAL PARTICLE EFFECTS ====================
function createGlobalSparkles() {
    setInterval(() => {
        if (!currentChapter) return;
        const chapter = document.getElementById(`chapter${currentChapter}`);
        if (!chapter) return;

        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDuration = `${Math.random() * 2 + 1}s`;
        chapter.querySelector('.chapter-content').appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 3000);
    }, 2000);
}

// ==================== INITIALIZATION ====================
window.addEventListener('DOMContentLoaded', () => {
    initMusic();
    createGlobalSparkles();

    // Add heart gradient SVG for Chapter 1
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.innerHTML = `
        <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FF69B4;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FF1493;stop-opacity:1" />
            </linearGradient>
        </defs>
    `;
    document.body.appendChild(svg);
});

// ==================== RESIZE HANDLER ====================
window.addEventListener('resize', () => {
    document.querySelectorAll('.chapter-canvas').forEach(canvas => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (!chapterInProgress && currentChapter > 0 && currentChapter < totalChapters) {
            // Manual advance for non-interactive chapters
            const config = chapterConfig[currentChapter];
            if (config && config.autoAdvance) {
                // Don't manually skip auto chapters
            }
        }
    }
});
