// Sanity Fetch
async function fetchSanityData(url) {
    const response = await fetch(url)
    const sanityData = await response.json()
    return sanityData
}
fetchSanityData(
    'https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22vacancies%22%5D+%7B%0A++vacanciesContent%5B%5D+%7B%0A++++jobTitle%2C%0A++++description%0A++%7D%0A%7D'
).then((vacancy) => {
    const { result } = vacancy
    const resolvedResult = result[0].vacanciesContent

    const vacanciesWrap = document.querySelector('.vacancies-accordion-wrap')

    if (resolvedResult.length > 0) {
        vacanciesWrap.innerHTML = ''

        resolvedResult.forEach((result) => {
            let vacanciesItem = document.createElement('div')
            vacanciesItem.classList.add(
                'vacancies-accordion',
                'bg-sun',
                'hidden'
            )
            vacanciesWrap.appendChild(vacanciesItem)

            let vacanciesItemTitleBar = document.createElement('div')
            vacanciesItemTitleBar.classList.add('vacancies-accordion-title-bar')
            vacanciesItemTitleBar.setAttribute('aria-expanded', 'false')
            vacanciesItem.appendChild(vacanciesItemTitleBar)

            let vacanciesItemtitle = document.createElement('div')
            vacanciesItemtitle.classList.add('vacancies-accordion-title')
            vacanciesItemTitleBar.appendChild(vacanciesItemtitle)

            let vacanciesItemJobTitle = document.createElement('h3')
            vacanciesItemJobTitle.textContent = result.jobTitle
            vacanciesItemtitle.appendChild(vacanciesItemJobTitle)

            let vacanciesAccordionContent = document.createElement('div')
            vacanciesAccordionContent.classList.add(
                'vacancies-accordion-content'
            )
            vacanciesItem.appendChild(vacanciesAccordionContent)

            let vacanciesAccordionContentItem = document.createElement('div')
            vacanciesAccordionContentItem.classList.add(
                'vacancies-accordion-content-item'
            )
            vacanciesAccordionContent.appendChild(vacanciesAccordionContentItem)

            let vacanciesAccordionContentTitle = document.createElement('h4')
            vacanciesAccordionContentTitle.textContent = 'Description:'
            vacanciesAccordionContentItem.appendChild(
                vacanciesAccordionContentTitle
            )

            let vacanciesAccordionDesc = document.createElement('p')
            vacanciesAccordionDesc.textContent = result.description
            vacanciesAccordionContentItem.appendChild(vacanciesAccordionDesc)
        })

        // Rest of your code...

        // Accordian
        const items = document.querySelectorAll(
            '.vacancies-accordion-title-bar'
        )

        items.forEach((item) => item.addEventListener('click', toggleAccordion))

        function toggleAccordion() {
            const itemToggle = this.getAttribute('aria-expanded')

            for (let item of items) {
                item.setAttribute('aria-expanded', false)
            }

            if (itemToggle === 'false') {
                this.setAttribute('aria-expanded', true)
            }
        }

        //Load More
        const loadMore = document.querySelectorAll('#loadmore a')
        var hideShape = document.getElementById('vacancies-accordion-wrap')
        const hid = [
            ...document.querySelectorAll('.vacancies-accordion.hidden'),
        ]

        hid.splice(0, 6).forEach((elem) => elem.classList.remove('hidden'))

        loadmore.addEventListener('click', function (e) {
            e.preventDefault()

            hid.splice(0, 6).forEach((elem) => elem.classList.remove('hidden'))

            if (hid.length == 0) {
                loadmore.classList.add('hidden')
            }
            if (hid.length == 0) {
                setTimeout(function () {
                    hideShape.classList.add('shape-none')
                }, 400)
            }
            if (result.length < 1) {
                document
                    .querySelector('.vacancies-inner')
                    .classList.add('show-empty-vacancies')
            }

            if (result.length < 7) {
                document
                    .querySelector('.vacancies-container')
                    .classList.add('hide-loadmore')
            }
            return result
        })
    }
})

// Pop up

//Submit Button

const submitButton = document.querySelector('.texts-btn-inner .btn')
const submitPopUp = document.querySelector('.texts-btn-wrap .pop-up')
submitButton.addEventListener('click', () => {
    submitPopUp.classList.add('active')
})
const xButton = document.querySelector('.texts-btn-wrap .x-button')
xButton.addEventListener('click', () => {
    submitPopUp.classList.remove('active')
})
