let selectedJobTitle

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

            // Create a button
            let applyButton = document.createElement('button')
            applyButton.textContent = 'Apply'
            applyButton.classList.add('apply-button')
            vacanciesAccordionContentItem.appendChild(applyButton)
            applyButton.classList.add('btn')
            applyButton.classList.add('btn-dark')

            // Add event listener to the button
            applyButton.addEventListener('click', () => {
                // Open the pop-up
                let popUp = document.querySelector('.pop-up')
                console.log(popUp)
                popUp.classList.add('active')

                // Store the job title in the global variable
                selectedJobTitle = result.jobTitle

                // Create the HubSpot form
                hbspt.forms.create({
                    region: 'eu1',
                    portalId: '143358931',
                    formId: '2acb2244-9853-401a-a279-069dac5ac773',
                    target: '#form-container',
                    onFormReady: function ($form, ctx) {
                        let hiddenInput = $form.find(
                            'input[name="vacancy_applied_for"]'
                        )
                        if (hiddenInput.length) {
                            hiddenInput.val(selectedJobTitle)
                            console.log(hiddenInput.val())
                        } else {
                            console.log('Hidden input field not found')
                        }
                    },
                    onFormSubmit: function ($form) {
                        gtag('event', 'job_board_form_submit', {
                            event_category: 'form',
                            event_label: 'HubSpot form',
                        })
                    },
                })
                // Get the close button
                let closeButton = document.querySelector('.close-button')

                // Add event listener to the close button
                closeButton.addEventListener('click', () => {
                    // Hide the pop-up
                    document.querySelector('.pop-up').classList.remove('active')
                })
            })
        })

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

// const submitButton = document.querySelector('.texts-btn-inner .btn')
// const submitPopUp = document.querySelector('.texts-btn-wrap .pop-up')
// submitButton.addEventListener('click', () => {
//     submitPopUp.classList.add('active')
// })
// const xButton = document.querySelector('.texts-btn-wrap .x-button')
// xButton.addEventListener('click', () => {
//     submitPopUp.classList.remove('active')
// })

window.onload = function () {
    let hash = window.location.hash
    if (hash) {
        // Remove the # character from the beginning of the hash
        let id = hash.substring(1)
        let element = document.getElementById(id)
        if (element) {
            element.scrollIntoView()
            console.log('scrolled into view')
        }
    }
}

const facebookButtons = document.querySelectorAll('.facebook-button')
const instagramButtons = document.querySelectorAll('.instagram-button')

facebookButtons.forEach((button) => {
    button.addEventListener('click', () => {
        gtag('event', 'facebook_button_clicked', {
            event_name: 'Facebook Button Clicked',
        })
    })
})

instagramButtons.forEach((button) => {
    button.addEventListener('click', () => {
        gtag('event', 'instagram_button_clicked', {
            event_name: 'Instagram Button Clicked',
        })
    })
})
