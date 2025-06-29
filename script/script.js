// Countdown Timer
const targetDate = new Date("2025-07-26T09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);


const locationButton = document.getElementById("btn-location");
if (locationButton) {
    locationButton.addEventListener("click", () => {
        window.open("https://maps.google.com/?q=Gedung+Perpustakaan+Nasional+RI+Salemba", "_blank");
    });
}

const select = document.getElementById('gift-option');
const ikhwanInfo = document.getElementById('ikhwan-info');
const nadyaInfo = document.getElementById('nadya-info');

select.addEventListener('change', function () {
    ikhwanInfo.style.display = 'none';
    nadyaInfo.style.display = 'none';

    if (this.value === 'ikhwan') {
        ikhwanInfo.style.display = 'block';
    } else if (this.value === 'nadya') {
        nadyaInfo.style.display = 'block';
    }
});

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Nomor rekening berhasil disalin!');
    }, () => {
        alert('Gagal menyalin.');
    });
}

window.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('wedding-audio');
    audio.volume = 0.5;
    audio.play().catch(() => { });
});

const audio = document.getElementById('wedding-audio');
const toggleBtn = document.getElementById('music-toggle');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');

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

// Autoplay unlock for some browsers
window.addEventListener("DOMContentLoaded", () => {
    audio.volume = 0.5;
    audio.play().catch(() => {
        // autoplay blocked, show play icon
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
    });
});

const API_TOKEN = "pat7p2hYhzCjjx1c0.174b49a27f2f4016c2027cbbd5b0a9cc67660fbef4f62c9a7421bd924e7d2dac";
const BASE_ID = "appGZs1bgeXVt1PWB";
const TABLE_NAME = "Table 1"; // default jika tidak diganti

const form = document.getElementById("rsvp-form");
const status = document.getElementById("rsvp-status");

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


//pat7p2hYhzCjjx1c0.174b49a27f2f4016c2027cbbd5b0a9cc67660fbef4f62c9a7421bd924e7d2dac