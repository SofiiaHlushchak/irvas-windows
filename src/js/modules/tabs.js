const tabs = (
    headerSelector,
    tabSelector,
    contentSelector,
    activeClass,
    display = "block"
) => {
    const header = document.querySelector(headerSelector),
        tabs = document.querySelectorAll(tabSelector),
        contents = document.querySelectorAll(contentSelector);

    const hideTabContent = () => {
        contents.forEach((content) => {
            content.style.display = "none";
        });

        tabs.forEach((tab) => {
            tab.classList.remove(activeClass);
        });
    };

    const showTabContent = (i = 0) => {
        contents[i].style.display = display;
        tabs[i].classList.add(activeClass);
    };

    hideTabContent();
    showTabContent();

    header.addEventListener("click", (e) => {
        const target = e.target;

        if (
            target &&
            (target.classList.contains(tabSelector.replace(/\./, "")) ||
                target.parentNode.classList.contains(
                    tabSelector.replace(/\./, "")
                ))
        ) {
            tabs.forEach((tab, i) => {
                if (target == tab || target.parentNode == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};

export default tabs;
