const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('to');

if (guestName) {
    const nameElement = document.querySelector('.name');
    nameElement.textContent = decodeURIComponent(guestName);
}

document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.querySelector(".btn-open");
    const flipContainer = document.getElementById("page-flip");
    const flipFace = document.getElementById("flip-face");
    const indexSection = document.getElementById("index-section");
    const weddingSection = document.getElementById("wedding-section");

    if (openBtn) {
        openBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const clone = indexSection.cloneNode(true);
            clone.style.position = "absolute";
            clone.style.top = "0";
            clone.style.left = "0";
            clone.style.width = "100%";
            clone.style.height = "100%";
            clone.style.zIndex = "9999";

            flipContainer.style.visibility = "visible";
            flipContainer.style.opacity = "1";

            flipFace.innerHTML = "";
            flipFace.appendChild(clone);
            flipFace.classList.add("flip");

            setTimeout(() => {
                indexSection.style.display = "none";
                weddingSection.style.display = "block";
                flipContainer.style.display = "none";
                window.scrollTo({ top: 0 });
                if (typeof initWedding === "function") initWedding();
            }, 1000);
        });
    }
});
