// Sanity Fetch
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
        'We have a wide range of trades, select one to enquire now'
    tradesContainer.appendChild(tradesSubtitle)

    tradesContainer.appendChild(tradesGrid)
    tradesContent.forEach((trade) => {
        const card = document.createElement('div')
        card.classList.add('card')

        const title = document.createElement('h3')
        title.textContent = trade

        card.appendChild(title)
        tradesGrid.appendChild(card)
    })

    tradesContainer.appendChild(tradesGrid)
})
