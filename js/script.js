/* =====================================================
   BKS ENGINEERING - MAIN JS
===================================================== */

function initNavbarBehavior() {
    const navbarCollapse = document.querySelector(".navbar-collapse");

    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            if (!navbarCollapse || !navbarCollapse.classList.contains("show")) return;

            const bsCollapse =
                window.bootstrap?.Collapse?.getInstance(navbarCollapse) ||
                new window.bootstrap.Collapse(navbarCollapse, { toggle: false });

            bsCollapse.hide();
        });
    });
}

function initPartnersScroll() {
    const wrapper = document.querySelector(".partners-wrapper");
    const track = document.querySelector(".partners-track");

    if (!wrapper || !track) return;

    function run() {
        track.classList.remove("scrolling");
        track.querySelectorAll(".clone").forEach((el) => el.remove());

        const items = [...track.children];

        if (track.scrollWidth <= wrapper.clientWidth) return;

        items.forEach((item) => {
            const clone = item.cloneNode(true);
            clone.classList.add("clone");
            track.appendChild(clone);
        });

        const duration = Math.max(track.scrollWidth / 80, 12);
        track.style.setProperty("--duration", `${duration}s`);
        track.classList.add("scrolling");
    }

    run();

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(run, 200);
    });
}

function initCounters() {
    const counters = document.querySelectorAll(".counter, .counter-stat");

    if (!counters.length) return;

    counters.forEach((counter, index) => {
        const target = Number(counter.dataset.target || 0);
        const suffix = counter.dataset.suffix || "";
        const startTime = performance.now();
        const duration = 1200 + index * 120;

        const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            counter.textContent = value + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target + suffix;
            }
        };

        requestAnimationFrame(animate);
    });
}

function initCarousels() {
    if (!window.bootstrap?.Carousel) return;

    document.querySelectorAll(".carousel").forEach((carousel) => {
        if (!carousel.dataset.initialized) {
            new window.bootstrap.Carousel(carousel, {
                interval: 2500,
                ride: "carousel",
                pause: false,
                wrap: true
            });
            carousel.dataset.initialized = "true";
        }
    });
}

function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    const navEntry = performance.getEntriesByType("navigation")[0];
    const navType = navEntry ? navEntry.type : "navigate";

    if (navType === "reload") {
        loader.style.display = "flex";
        setTimeout(() => {
            loader.style.display = "none";
        }, 1500);
    } else {
        loader.style.display = "none";
    }
}

function initNavbarScrollState() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const update = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    };

    update();
    window.addEventListener("scroll", update);
}

function initYear() {
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function initAos() {
    if (window.AOS) {
        window.AOS.init({ duration: 1000 });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initNavbarBehavior();
    initPartnersScroll();
    initCounters();
    initCarousels();
    initNavbarScrollState();
    initYear();
    initAos();
});

window.addEventListener("load", initLoader);