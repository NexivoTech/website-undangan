// wedding_script.js
function initWedding() {
    revealWeddingSectionGradually(() => {
        setupCountdown();
        setupLocation();
        setupCopyButton();
        setupObserver();
        setupRSVP();
        setupSaveCalendar();
        setupMusic();
    });
}

function revealWeddingSectionGradually(callback) {
    const wedding = document.getElementById("wedding-section");
    wedding.style.display = "block";
    wedding.style.opacity = 0;
    let opacity = 0;
    const fadeIn = setInterval(() => {
        opacity += 0.05;
        wedding.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(fadeIn);
            if (typeof callback === "function") callback();
        }
    }, 50);
}

function setupCountdown() {
    const targetDate = new Date("2025-07-26T09:00:00").getTime();
    let initialized = false;

    function animateCountUp(el, value, duration = 2000) {
        let current = 0;
        const step = value / (duration / 16);
        const update = () => {
            current += step;
            if (current >= value) current = value;
            el.textContent = Math.floor(current).toString().padStart(2, '0');
            if (current < value) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const dist = targetDate - now;
        const d = Math.max(0, Math.floor(dist / (1000 * 60 * 60 * 24)));
        const h = Math.max(0, Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const m = Math.max(0, Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)));
        const s = Math.max(0, Math.floor((dist % (1000 * 60)) / 1000));

        const el = id => document.getElementById(id);
        if (!initialized) {
            animateCountUp(el("days"), d);
            animateCountUp(el("hours"), h);
            animateCountUp(el("minutes"), m);
            animateCountUp(el("seconds"), s);
            initialized = true;
        } else {
            el("days").textContent = d.toString().padStart(2, '0');
            el("hours").textContent = h.toString().padStart(2, '0');
            el("minutes").textContent = m.toString().padStart(2, '0');
            el("seconds").textContent = s.toString().padStart(2, '0');
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function setupLocation() {
    /* Location Button */
    const locationButton = document.getElementById("btn-location");
    if (locationButton) {
        locationButton.addEventListener("click", () => {
            window.open("https://maps.google.com/?q=Gedung+Perpustakaan+Nasional+RI+Salemba", "_blank");
        });
    }
}

function setupCopyButton() {
    /* Copy to Clipboard */
    function copyToClipboard(elementId) {
        const text = document.getElementById(elementId).innerText;
        navigator.clipboard.writeText(text).then(() => {
            alert('Nomor rekening berhasil disalin!');
        }, () => {
            alert('Gagal menyalin.');
        });
    }
}

function setupMusic() {
    const audio = document.getElementById('wedding-audio');
    const toggleBtn = document.getElementById('music-toggle');
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');

    if (!audio) return;

    audio.volume = 0.5;
    audio.play().then(() => {
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
    }).catch(() => {
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
    });

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                iconPlay.style.display = 'none';
                iconPause.style.display = 'block';
            } else {
                audio.pause();
                iconPlay.style.display = 'block';
                iconPause.style.display = 'none';
            }
        });
    }
}

// function setupMusicAutoplay() {
//     // Autoplay unlock for some browsers
//     window.addEventListener("DOMContentLoaded", () => {
//         if (audio) {
//             audio.volume = 0.5;
//             audio.play().catch(() => {
//                 if (iconPlay && iconPause) {
//                     iconPlay.style.display = 'block';
//                     iconPause.style.display = 'none';
//                 }
//             });
//         }
//     });
// }

function setupObserver() {
    /* Scroll Animation */
    const sections = [
        'bride-groom',
        'events',
        'location',
        'quote',
        'gallery',
        'rsvp',
        'send-gift',
        'footer'
    ];

    const observerOptions = {
        root: null,
        threshold: 0.15 // Trigger when 40% of section is visible
    };

    let countdownInitialized = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const elements = section.querySelectorAll('h3, p, img, iframe, button, .vertical-text, input, select, textarea, .countdown-item span, .countdown-item small');
                console.log("Observer intersected:", section.id);

                elements.forEach((el, index) => {
                    if (!el.classList.contains('animated')) {
                        el.classList.add('animated');
                        let delay = `${0.1 + index * 0.1}s`;

                        // === Gallery
                        if (section.id === 'gallery') {
                            if (el.tagName === 'IMG') {
                                el.style.animation = `zoomIn 1s ease-out forwards`;
                                el.style.animationDelay = delay;
                            } else if (el.tagName === 'H3') {
                                el.style.animation = `slideInLeft 1s ease-out forwards`;
                                el.style.animationDelay = delay;
                            }
                            return;
                        }

                        // === Location map iframe
                        if (el.tagName === 'IFRAME') {
                            el.style.animation = `slideInLeft 1s ease-out forwards`;
                            el.style.animationDelay = delay;
                            return;
                        }

                        // === Quote
                        if (section.id === 'quote' && el.tagName === 'P' && el.parentElement.classList.contains('quote-text')) {
                            el.style.animation = `typewriter 1s ease-out forwards`;
                            el.style.animationDelay = delay;
                            return;
                        }

                        // === Tombol, gambar, dll
                        if (
                            el.tagName === 'IMG' ||
                            el.tagName === 'BUTTON' ||
                            el.classList.contains('save-calendar') ||
                            el.classList.contains('copy-btn')
                        ) {
                            el.style.animation = `zoomIn 1s ease-out forwards`;
                            el.style.animationDelay = delay;
                            return;
                        }

                        // === Default animasi
                        el.style.animation = (section.id === 'bride-groom' || section.id === 'send-gift')
                            ? `slideInRight 1s ease-out forwards`
                            : `slideInLeft 1s ease-out forwards`;
                        el.style.animationDelay = delay;
                    }
                });

                // === Trigger countdown hanya sekali
                if (section.id === 'events' && !countdownInitialized) {
                    updateCountdown();
                    setInterval(updateCountdown, 1000);
                    countdownInitialized = true;
                }
            }
        });
    }, observerOptions);



    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            observer.observe(section);
        } else {
            console.warn(`Section with ID '${id}' not found in the DOM.`);
        }
    });
}

function setupRSVP() {
    /* RSVP Form */
    const API_TOKEN = "pat7p2hYhzCjjx1c0.174b49a27f2f4016c2027cbbd5b0a9cc67660fbef4f62c9a7421bd924e7d2dac";
    const BASE_ID = "appGZs1bgeXVt1PWB";
    const TABLE_NAME = "Table 1";

    const form = document.getElementById("rsvp-form");
    const status = document.getElementById("rsvp-status");
    const rsvpList = document.getElementById('rsvp-list');

    function renderRSVP(name, message) {
        const entry = document.createElement("div");
        entry.className = "rsvp-entry";
        entry.innerHTML = `
    <p><strong>${name}</strong></p>
    <p>${message || "(Tidak ada pesan)"}</p>
  `;
        rsvpList.prepend(entry);
    }

    async function loadRSVPs() {
        try {
            const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`, {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`
                }
            });
            const result = await res.json();

            rsvpList.innerHTML = "";

            result.records
                .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))
                .forEach(record => {
                    const name = record.fields["Name"];
                    const message = record.fields["Message"];
                    renderRSVP(name, message);
                });
        } catch (err) {
            console.error("Gagal memuat RSVP:", err);
            3
            rsvpList.innerHTML = "<p>Gagal memuat RSVP.</p>";
        }
    }

    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {
                fields: {
                    Name: formData.get("name"),
                    "Phone Number": formData.get("phone").replace(/\D/g, ""),
                    Message: formData.get("message"),
                    Event: formData.get("event")
                }
            };

            try {
                const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (res.ok) {
                    status.textContent = "✅ RSVP kamu berhasil dikirim!";
                    form.reset();

                    const name = data.fields["Name"];
                    const message = data.fields["Message"];

                    renderRSVP(name, message);
                    await loadRSVPs();
                } else {
                    const error = await res.json();
                    console.error(error);
                    status.textContent = "❌ Gagal mengirim RSVP. Coba lagi.";
                }
            } catch (err) {
                console.error(err);
                status.textContent = "❌ Terjadi kesalahan. Coba beberapa saat lagi.";
            }
        });
    }
    window.addEventListener("DOMContentLoaded", loadRSVPs);
}

function setupSaveCalendar() {
    /* Save to Calendar */
    const saveCalendarBtn = document.querySelector('.save-calendar');
    if (saveCalendarBtn) {
        saveCalendarBtn.addEventListener('click', function () {
            const title = encodeURIComponent("Pernikahan Nadya & Iwan");
            const details = encodeURIComponent("Akad: 09.00 WIB\nResepsi: 11.00 WIB\nGedung Perpustakaan Nasional RI Salemba");
            const location = encodeURIComponent("Gedung Perpustakaan Nasional RI Salemba, Jl. Salemba Raya No. 28, Jakarta Pusat");

            const startDate = "20250726T020000Z";
            const endDate = "20250726T060000Z";

            const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;

            window.open(url, '_blank');
        });
    }
}