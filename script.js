document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMenu = document.getElementById("closeMenu");

    if (menuBtn) menuBtn.addEventListener("click", () => mobileMenu.classList.add("open"));
    if (closeMenu) closeMenu.addEventListener("click", () => mobileMenu.classList.remove("open"));

    document.querySelectorAll(".mobile-menu a").forEach(link => {
        link.addEventListener("click", () => mobileMenu.classList.remove("open"));
    });

    // Close top offer bar
    const offerClose = document.getElementById("offerClose");
    if (offerClose) {
        offerClose.addEventListener("click", () => {
            document.querySelector(".offer-bar").style.display = "none";
        });
    }

    // Hero slider - three images + large arrow buttons
    const heroTrack = document.getElementById("heroTrack");
    const heroSlides = document.querySelectorAll(".hero-slide");
    const prev = document.getElementById("heroPrev");
    const next = document.getElementById("heroNext");
    const dots = document.getElementById("heroDots");
    let currentSlide = 0;

    if (heroTrack && heroSlides.length) {
        heroSlides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.className = "hero-dot" + (index === 0 ? " active" : "");
            dot.addEventListener("click", () => showSlide(index));
            dots.appendChild(dot);
        });

        function showSlide(index) {
            currentSlide = (index + heroSlides.length) % heroSlides.length;
            heroTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            document.querySelectorAll(".hero-dot").forEach((dot, i) => {
                dot.classList.toggle("active", i === currentSlide);
            });
        }

        if (prev) prev.addEventListener("click", () => showSlide(currentSlide - 1));
        if (next) next.addEventListener("click", () => showSlide(currentSlide + 1));

        setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    // Collections page: search + filter using JavaScript
    const searchInput = document.getElementById("searchInput");
    const productCards = document.querySelectorAll(".product-card");
    const filterChecks = document.querySelectorAll(".filter-check");
    const resultCount = document.getElementById("resultCount");
    const noResults = document.getElementById("noResults");
    const clearFilters = document.getElementById("clearFilters");

    function filterProducts() {
        if (!productCards.length) return;

        const searchText = searchInput.value.toLowerCase().trim();
        const selectedFilters = Array.from(filterChecks)
            .filter(check => check.checked)
            .map(check => check.value);

        let visible = 0;

        productCards.forEach(card => {
            const name = card.dataset.name.toLowerCase();
            const categories = card.dataset.category.split(" ");

            const matchesSearch = name.includes(searchText);
            const matchesFilter = selectedFilters.length === 0 ||
                selectedFilters.some(filter => categories.includes(filter));

            const shouldShow = matchesSearch && matchesFilter;
            card.style.display = shouldShow ? "" : "none";

            if (shouldShow) visible++;
        });

        resultCount.textContent = `${visible} product${visible !== 1 ? "s" : ""} found`;
        noResults.style.display = visible === 0 ? "block" : "none";
    }

    if (searchInput) searchInput.addEventListener("input", filterProducts);
    filterChecks.forEach(check => check.addEventListener("change", filterProducts));

    if (clearFilters) {
        clearFilters.addEventListener("click", () => {
            filterChecks.forEach(check => check.checked = false);
            searchInput.value = "";
            filterProducts();
        });
    }

    filterProducts();

    // Newsletter form
    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterMessage = document.getElementById("newsletterMessage");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();
            newsletterMessage.textContent = "Thank you for subscribing!";
            newsletterForm.reset();
        });
    }

    // Contact form
    const contactForm = document.getElementById("contactForm");
    const contactStatus = document.getElementById("contactMessageStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            contactStatus.textContent = "Your message has been submitted successfully!";
            contactForm.reset();
        });
    }
});
