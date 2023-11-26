// Sanity Fetch
let selectedJobTitle

async function fetchSanityData(url) {
    const response = await fetch(url)
    const sanityData = await response.json()
    return sanityData
}

fetchSanityData(
    'https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27trades%27%5D'
).then((tradesData) => {
    const { result } = tradesData
    const tradesContent = result[0].tradesContent

    const tradesContainer = document.querySelector('.hero-main .wrapper')

    const tradesGrid = document.createElement('div')
    tradesGrid.classList.add('trades-grid')
    const tradesTitle = document.createElement('h1')
    tradesTitle.textContent = 'Our Available Trades'
    tradesContainer.appendChild(tradesTitle)

    const tradesSubtitle = document.createElement('p')
    tradesSubtitle.textContent =
        'We offer labourers along with many other trades, if you don`t see the trade you are looking to hire just contact us and we will be able to help you.'
    tradesContainer.appendChild(tradesSubtitle)

    tradesContainer.appendChild(tradesGrid)
    tradesContent.forEach((trade) => {
        const card = document.createElement('div')
        card.classList.add('card')
        const cardLink = document.createElement('a')
        // cardLink.href = `/#contact`
        cardLink.appendChild(card)

        const title = document.createElement('h3')
        title.textContent = trade

        card.appendChild(title)
        tradesGrid.appendChild(cardLink)

        cardLink.addEventListener('click', () => {
            // Open the pop-up
            let popUp = document.querySelector('.pop-up')
            console.log(popUp)
            popUp.classList.add('active')

            // Store the job title in the global variable
            selectedJobTitle = trade

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
                    gtag('event', 'available_trades_form_submit', {
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

    tradesContainer.appendChild(tradesGrid)
})

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
