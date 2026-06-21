// Close mobile navbar when a nav link is clicked
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {

    link.addEventListener('click', () => {

        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarCollapse.classList.contains('show')) {

            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse)
                || new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });

            bsCollapse.hide();
        }

    });

});