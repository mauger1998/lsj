// Accordian
const items = document.querySelectorAll(".vacancies-accordion-title-bar");
items.forEach((item) => item.addEventListener("click", toggleAccordion));

function toggleAccordion() {
    const itemToggle = this.getAttribute("aria-expanded");
    for (let item of items) {
        item.setAttribute("aria-expanded", false);
    }
    if (itemToggle === "false") {
        this.setAttribute("aria-expanded", true);
    }
}

const loadMore = document.querySelectorAll('#loadmore a');
const hid = [...document.querySelectorAll('.vacancies-accordion.hidden')];

hid.splice(0, 6).forEach(
    elem => elem.classList.remove('hidden')
);

loadmore.addEventListener('click', function (e) {
    e.preventDefault();

    hid.splice(0, 6).forEach(
        elem => elem.classList.remove('hidden')
    )

    if (hid.length == 0) {
        loadMore.classList.add('hidden');
    }
});