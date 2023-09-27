// window.addEventListener('message', (event) => {
//     if (
//         event.data.type === 'hsFormCallback' &&
//         event.data.eventName === 'onFormReady'
//     ) {
//         let formField1 = document.querySelector('.pop-up input')
//         let valueToInsert = 'Hey'
//         formField1.value = valueToInsert
//     }
// })

let URLTHREE =
    'https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27vacancies%27%5D%7B%0AjobTitle%2C%0AstartDate%2C%0Aduration%2C%0AcompanyName%2C%0Askills%2C%0Adescription%0A%7D&perspective=published'
// fetch the content
let data = fetch(URLTHREE)
    .then((res) => res.json())
    .then(({ result }) => {
        const vacanciesWrap = document.querySelector(
            '.vacancies-accordion-wrap'
        )
        const vacanciesSectionWrapper = document.querySelector(
            '.vacancies-wrap .wrapper'
        )
        if (result.length > 0) {
            vacanciesWrap.innerHTML = ''

            // Testing select

            result.forEach((result) => {
                let vacanciesItem = document.createElement('div')
                vacanciesItem.classList.add(
                    'vacancies-accordion',
                    'bg-sun',
                    'hidden'
                )
                vacanciesWrap.appendChild(vacanciesItem)

                let vacanciesItemTitleBar = document.createElement('div')
                vacanciesItemTitleBar.classList.add(
                    'vacancies-accordion-title-bar'
                )
                vacanciesItemTitleBar.setAttribute('aria-expanded', 'false')
                vacanciesItem.appendChild(vacanciesItemTitleBar)

                let vacanciesItemtitle = document.createElement('div')
                vacanciesItemtitle.classList.add('vacancies-accordion-title')
                vacanciesItemTitleBar.appendChild(vacanciesItemtitle)

                let vacanciesItemJobTitle = document.createElement('h6')
                vacanciesItemJobTitle.textContent = result.jobTitle
                vacanciesItemtitle.appendChild(vacanciesItemJobTitle)

                let vacanciesItemStartDate = document.createElement('h6')
                vacanciesItemStartDate.textContent = result.startDate
                vacanciesItemtitle.appendChild(vacanciesItemStartDate)

                let vacanciesItemDuration = document.createElement('h6')
                vacanciesItemDuration.textContent = result.duration
                vacanciesItemtitle.appendChild(vacanciesItemDuration)

                let vacanciesItemIcon = document.createElement('div')
                vacanciesItemIcon.classList.add(
                    'vacancies-accordion-title-icon'
                )
                vacanciesItemTitleBar.appendChild(vacanciesItemIcon)

                let vacanciesAccordionContent = document.createElement('div')
                vacanciesAccordionContent.classList.add(
                    'vacancies-accordion-content'
                )
                vacanciesItem.appendChild(vacanciesAccordionContent)

                let vacanciesAccordionContentItem1 =
                    document.createElement('div')
                vacanciesAccordionContentItem1.classList.add(
                    'vacancies-accordion-content-item'
                )
                vacanciesAccordionContent.appendChild(
                    vacanciesAccordionContentItem1
                )

                let vacanciesAccordionContentTitle =
                    document.createElement('h6')
                vacanciesAccordionContentTitle.textContent = 'Company:'
                vacanciesAccordionContentItem1.appendChild(
                    vacanciesAccordionContentTitle
                )

                let vacanciesAccordionCompanyName = document.createElement('p')
                vacanciesAccordionCompanyName.textContent = result.companyName
                vacanciesAccordionContentItem1.appendChild(
                    vacanciesAccordionCompanyName
                )

                let vacanciesAccordionContentItem2 =
                    document.createElement('div')
                vacanciesAccordionContentItem2.classList.add(
                    'vacancies-accordion-content-item'
                )
                vacanciesAccordionContent.appendChild(
                    vacanciesAccordionContentItem2
                )

                let vacanciesAccordionContentTitle2 =
                    document.createElement('h6')
                vacanciesAccordionContentTitle2.textContent = 'Skills:'
                vacanciesAccordionContentItem2.appendChild(
                    vacanciesAccordionContentTitle2
                )

                let vacanciesAccordionContentSkills =
                    document.createElement('ul')
                vacanciesAccordionContentItem2.appendChild(
                    vacanciesAccordionContentSkills
                )
                let jobSkills = result.skills
                for (let i = 0; i < jobSkills.length; i++) {
                    let li = document.createElement('li')
                    li.innerText = jobSkills[i]
                    vacanciesAccordionContentSkills.appendChild(li)
                }

                let vacanciesAccordionContentItem3 =
                    document.createElement('div')
                vacanciesAccordionContentItem3.classList.add(
                    'vacancies-accordion-content-item'
                )
                vacanciesAccordionContent.appendChild(
                    vacanciesAccordionContentItem3
                )

                let vacanciesAccordionContentTitle3 =
                    document.createElement('h6')
                vacanciesAccordionContentTitle3.textContent = 'Description:'
                vacanciesAccordionContentItem3.appendChild(
                    vacanciesAccordionContentTitle3
                )

                let vacanciesAccordionDesc = document.createElement('p')
                vacanciesAccordionDesc.textContent = result.description
                vacanciesAccordionContentItem3.appendChild(
                    vacanciesAccordionDesc
                )

                let anchorButton = document.createElement('a')
                // anchorButton.setAttribute('href', '')
                anchorButton.classList.add('btn', 'btn-dark')
                anchorButton.classList.add('anchor-button')
                vacanciesAccordionContentItem3.appendChild(anchorButton)
                let anchorButtonSpan = document.createElement('span')
                anchorButtonSpan.innerHTML = 'Apply now'
                anchorButton.appendChild(anchorButtonSpan)

                const popUp = document.querySelector('.pop-up')
                anchorButton.addEventListener('click', () => {
                    popUp.classList.add('active')
                })
                const xButton = document.querySelector('.x-button')
                xButton.addEventListener('click', () => {
                    popUp.classList.remove('active')
                })
            })

            // Accordian
            const items = document.querySelectorAll(
                '.vacancies-accordion-title-bar'
            )

            items.forEach((item) =>
                item.addEventListener('click', toggleAccordion)
            )

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
            const hideShape = document.querySelectorAll('.vacancies-accordion-wrap')
            const hid = [
                ...document.querySelectorAll('.vacancies-accordion.hidden'),
            ]

            hid.splice(0, 6).forEach((elem) => elem.classList.remove('hidden'))

            loadmore.addEventListener('click', function (e) {
                e.preventDefault()

                hid.splice(0, 6).forEach((elem) =>
                    elem.classList.remove('hidden')
                )

                if (hid.length == 0) {
                    loadmore.classList.add('hidden')
                    hideShape.classList.add('shape-hidden')
                }
            })
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
    .then((result) => {
        // console.log(result)
    })
    .catch((err) => console.error(err))

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
