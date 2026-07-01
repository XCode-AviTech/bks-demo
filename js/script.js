
/* =====================================================
   BKS ENGINEERING - MAIN JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       MOBILE NAVBAR (AUTO CLOSE)
    ========================================== */

    const navbarCollapse = document.querySelector(".navbar-collapse");

    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {

        link.addEventListener("click", () => {

            if (!navbarCollapse) return;

            if (navbarCollapse.classList.contains("show")) {

                const bsCollapse =
                    bootstrap.Collapse.getInstance(navbarCollapse) ||
                    new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });

                bsCollapse.hide();
            }

        });

    });



    /* ==========================================
       PARTNERS AUTO SCROLL
    ========================================== */

    const wrapper = document.querySelector(".partners-wrapper");
    const track = document.querySelector(".partners-track");

    function initPartners() {

        if (!wrapper || !track) return;

        track.classList.remove("scrolling");

        track.querySelectorAll(".clone").forEach(el => el.remove());

        const items = [...track.children];

        if (track.scrollWidth <= wrapper.clientWidth) return;

        items.forEach(item => {

            const clone = item.cloneNode(true);

            clone.classList.add("clone");

            track.appendChild(clone);

        });

        const duration = Math.max(track.scrollWidth / 80, 12);

        track.style.setProperty("--duration", `${duration}s`);

        track.classList.add("scrolling");

    }

    initPartners();



    /* Debounced resize */
    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(initPartners, 200);

    });



    /* ==========================================
       COUNTER ANIMATION (GUARANTEED WORKING)
    ========================================== */

    const counters = document.querySelectorAll(".counter");

    if (!counters.length) return;

    const animateCounter = (counter) => {

        const target = parseInt(counter.dataset.target, 10);

        const suffix = counter.dataset.suffix || "+";

        let current = 0;

        const step = Math.max(1, Math.ceil(target / 80));

        const update = () => {

            current += step;

            if (current < target) {

                counter.textContent = current + suffix;

                requestAnimationFrame(update);

            } else {

                counter.textContent = target + suffix;

            }

        };

        update();
    };

    const aboutSection = document.querySelector("#about");

    if (aboutSection) {

        const observer = new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    counters.forEach(counter => animateCounter(counter));

                    obs.disconnect(); // run only once

                }

            });

        }, {
            threshold: 0.3
        });

        observer.observe(aboutSection);

    } else {

        // fallback (if observer fails)
        counters.forEach(counter => animateCounter(counter));

    }

});
