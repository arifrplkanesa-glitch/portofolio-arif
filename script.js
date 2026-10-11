/* =========================
   MENU DROPDOWN
========================= */

const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuBtn.innerHTML = `Close <span>✕</span>`;
    } else {
        menuBtn.innerHTML = `Menu <span>☰</span>`;
    }

});


/* =========================
   CLOSE MENU
========================= */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuBtn.innerHTML = `Menu <span>☰</span>`;

    });

});

/* =========================
   DARK / LIGHT MODE
========================= */

const themeBtn = document.getElementById("theme-btn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeBtn.textContent = "☀️";

}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem("theme", "light");

    }

});


/* =========================
   CURRENT YEAR
========================= */

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .skill-card, .project-card, .social-item, .contact-container"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.1
    }
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

    observer.observe(element);

});


/* =========================
   SMOOTH NAVBAR
========================= */

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 5px 30px rgba(0,0,0,0.05)";

    } else {

        navbar.style.boxShadow = "none";

    }

});


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", () => {

    const submitBtn =
        contactForm.querySelector(".submit-btn");

    submitBtn.textContent = "Mengirim...";

    submitBtn.disabled = true;

});

```javascript
// PROJECT FILTER

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        // Aktifkan tombol yang dipilih
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedCategory = button.dataset.filter;

        // Tampilkan project sesuai kategori
        projectCards.forEach(card => {
            const category = card.dataset.category;

            if (
                selectedCategory === "all" ||
                category === selectedCategory
            ) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        });

    });
});
```



const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );
        const buttonText = submitButton.querySelector(".btn-text");
        const originalText = buttonText
            ? buttonText.textContent
            : submitButton.textContent;

        // Tampilkan status sedang mengirim
        submitButton.disabled = true;

        if (buttonText) {
            buttonText.textContent = "Mengirim...";
        } else {
            submitButton.textContent = "Mengirim...";
        }

        formStatus.hidden = true;
        formStatus.className = "form-status";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Pesan gagal dikirim.");
            }

            // Tampilkan animasi sukses setelah server merespons
            formStatus.className = "form-status success";
            formStatus.textContent =
                "Pesan berhasil terkirim! Terima kasih sudah menghubungi saya.";
            formStatus.hidden = false;

            contactForm.reset();
        } catch (error) {
            formStatus.className = "form-status error";
            formStatus.textContent =
                "Pesan belum berhasil dikirim. Periksa koneksi dan coba lagi.";
            formStatus.hidden = false;
        } finally {
            submitButton.disabled = false;

            if (buttonText) {
                buttonText.textContent = originalText;
            } else {
                submitButton.textContent = originalText;
            }
        }
    });
}
