const scrollAnimations = (selector) => {
    const sections = document.querySelectorAll(selector);

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Затримка анімації залежить від порядкового номера елемента
                entry.target.style.transitionDelay = `${index * 0.2}s`;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach((section) => {
        observer.observe(section);
    });
};

export default scrollAnimations;
