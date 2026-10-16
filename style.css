/* =========================================================
   CONNECTEDU V3
   JavaScript - Interações e animações
========================================================= */


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton = document.querySelector(".menu-mobile");
const navMenu = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links a");


/* Abrir e fechar menu */

if (menuButton && navMenu) {

    menuButton.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}


/* Fechar menu ao clicar em um link */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

    });

});


/* =========================================================
   FECHAR MENU AO CLICAR FORA
========================================================= */

document.addEventListener("click", (event) => {

    if (
        navMenu &&
        menuButton &&
        !navMenu.contains(event.target) &&
        !menuButton.contains(event.target)
    ) {

        navMenu.classList.remove("active");

    }

});


/* =========================================================
   ANIMAÇÃO AO SCROLL
========================================================= */

const animatedElements = document.querySelectorAll(
    ".card, .about-image, .about-text, .section-title"
);


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    animatedElements.forEach((element, index) => {

        element.classList.add("hidden");

        element.style.transitionDelay =
            `${index * 0.02}s`;

        observer.observe(element);

    });

}


/* =========================================================
   ENTRADA DO HERO
========================================================= */

window.addEventListener("load", () => {

    const hero = document.querySelector(".hero-content");

    if (!hero) {
        return;
    }

    setTimeout(() => {

        hero.classList.add("hero-show");

    }, 200);

});


/* =========================================================
   PARALLAX DO HERO
========================================================= */

const heroSection = document.querySelector(".hero");


if (
    heroSection &&
    window.innerWidth > 900
) {

    window.addEventListener("mousemove", (event) => {

        const x =
            (event.clientX / window.innerWidth - 0.5) * 8;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 8;


        heroSection.style.backgroundPosition =
            `${50 + x}% ${50 + y}%`;

    });

}


/* =========================================================
   CONTADORES
========================================================= */

const counters = document.querySelectorAll(".counter");


counters.forEach((counter) => {

    const target = Number(
        counter.dataset.target
    );

    if (Number.isNaN(target)) {
        return;
    }


    let current = 0;

    const increment = target / 80;


    const updateCounter = () => {

        current += increment;


        if (current < target) {

            counter.innerText =
                Math.ceil(current);

            setTimeout(updateCounter, 25);

        } else {

            counter.innerText = target;

        }

    };


    updateCounter();

});


/* =========================================================
   ANO AUTOMÁTICO
========================================================= */

const year = document.querySelector(".year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}
