/*Scroll Next Section*/

const links = document.querySelectorAll('.scroll-next')
links.forEach(function (elem) {
    elem.addEventListener('click', smoothScroll)
})

function smoothScroll(e) {
    e.preventDefault()
    const link = this.getAttribute('href')
    const offsetTop = document.querySelector(link).offsetTop
    scroll({
        top: offsetTop + 100,
        behavior: 'smooth',
    })
}

if (document.querySelector('.word') === null) {
} else {
    //Changing Word Animation
    var words = document.getElementsByClassName('word')
    var wordArray = []
    var currentWord = 0

    words[currentWord].style.opacity = 1
    for (var i = 0; i < words.length; i++) {
        splitLetters(words[i])
    }

    function changeWord() {
        var cw = wordArray[currentWord]
        var nw =
            currentWord == words.length - 1
                ? wordArray[0]
                : wordArray[currentWord + 1]
        for (var i = 0; i < cw.length; i++) {
            animateLetterOut(cw, i)
        }

        for (var i = 0; i < nw.length; i++) {
            nw[i].className = 'letter behind'
            nw[0].parentElement.style.opacity = 1
            animateLetterIn(nw, i)
        }

        currentWord = currentWord == wordArray.length - 1 ? 0 : currentWord + 1
    }

    function animateLetterOut(cw, i) {
        setTimeout(function () {
            cw[i].className = 'letter out'
        }, i * 80)
    }

    function animateLetterIn(nw, i) {
        setTimeout(function () {
            nw[i].className = 'letter in'
        }, 340 + i * 80)
    }

    function splitLetters(word) {
        var content = word.innerHTML
        word.innerHTML = ''
        var letters = []
        for (var i = 0; i < content.length; i++) {
            var letter = document.createElement('span')
            letter.className = 'letter'
            letter.innerHTML = content.charAt(i)
            word.appendChild(letter)
            letters.push(letter)
        }

        wordArray.push(letters)
    }

    changeWord()
    setInterval(changeWord, 3000)
}

// Accordian
const items = document.querySelectorAll('.tradesmen-accordion-item h3')
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
// Sanity Fetch
async function fetchSanityData(url) {
    const response = await fetch(url)
    const sanityData = await response.json()
    return sanityData
}
function createElement(tag, classes = [], text = '') {
    const element = document.createElement(tag)
    classes.forEach((className) => element.classList.add(className))
    if (text) element.textContent = text
    return element
}

function appendElement(parent, child) {
    parent.appendChild(child)
}

fetchSanityData(
    `https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27home%27%5D+%7B%0A++title%2C%0A++%22content%22%3A+content%5B%5D%7B%0A++++...%2C%0A++++%22cards%22%3A+cards%5B%5D%7B%0A++++++...%2C%0A++++++%22image%22%3A+image.asset-%3Eurl%0A++++%7D%0A++%7D%0A%7D`
).then((data) => {
    const { result } = data
    const heroSectionContainerWrapper = document.querySelector('.hero-wrap')
    const heroContainer = document.querySelector('.hero-wrap .wrapper')
    document.querySelector('.hero-bottom').innerHTML = ''

    heroContainer.innerHTML = ''
    const whyContainer = document.querySelector(
        '.employers-tradesmen-wrap .wrapper'
    )
    whyContainer.innerHTML = ''

    const heroSection = result[0].content[0]
    const whySection = result[0].content[1]
    const whySectionTwo = result[0].content[2]

    const heroSectionHTML = /*html*/ `
    <div class="hero-inner">
        <h1 class="anim-load">${heroSection.title}</h1>
        <p class="anim-load">${heroSection.text}</p>
        <div class="anim-load hero-btn">
            <a class="btn" href="/tradesmen/">Tradesmen</a>
            <a class="btn btn-dark" href="/employers/">Employers</a>
        </div>
        <a class="anim-load scroll-next" href="#social-proof">
            <svg width="30" height="45" viewBox="0 0 30 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.928406" y="0.962891" width="28.1432" height="42.792" rx="14.0716" stroke="black" />
                <circle id="circle" cx="15" cy="32.4067" r="7.91455" fill="black" />
            </svg>
        </a>
    </div>
`

    const heroBottomHTML = /*html*/ `
    <div class="hero-bottom">
        <figure>
            <img src="svgs/labour-suppliers.svg" alt="Labour Suppliers" />
        </figure>
    </div>
`

    heroContainer.innerHTML = heroSectionHTML
    heroSectionContainerWrapper.insertAdjacentHTML('beforeend', heroBottomHTML)

    // Why Section
    let whySectionHTML = /*html*/ `
    <div class="employers-tradesmen-item-wrap">
        <div class="employers-tradesmen-item" id="why-choose-us">
            <h2 class="anim-el clip-anim">${whySection.title}</h2>
            <div class="employers-tradesmen-card-wrap">
                ${whySection.cards
                    .map((card) => {
                        return /*html*/ `
                        <div class="employers-tradesmen-card">
                            <div class="card-thumb">
                                <div class="card-thumb-ico">
                                    <img src="svgs/commitments.svg" alt="${card.title}" />
                                </div>
                                <figure class="anim-el clip-anim">
                                    <img src=${card.image} alt="${card.title}" />
                                </figure>
                            </div>
                            <h3>${card.title}</h3>
                            <p>${card.text}</p>
                            <a href="/available-trades/" class="btn btn-dark see-trades-button">
                                <span>See trades now</span>
                            </a>
                        </div>
                    `
                    })
                    .join('')}
            </div>
        </div>
    </div>
`
    whyContainer.innerHTML = whySectionHTML

    let whySectionTwoHTML = /*html*/ `
    <div class="employers-tradesmen-item" id="why-choose-us">
        <h2 class="anim-el clip-anim">${whySectionTwo.title}</h2>
        <div class="employers-tradesmen-card-wrap">
            ${whySectionTwo.cards
                .map((card) => {
                    return /*html*/ `
                    <div class="employers-tradesmen-card">
                        <div class="card-thumb">
                            <div class="card-thumb-ico">
                                <img src="svgs/commitments.svg" alt="${card.title}" />
                            </div>
                            <figure class="anim-el clip-anim">
                                <img src=${card.image} alt="${card.title}" />
                            </figure>
                        </div>
                        <h3>${card.title}</h3>
                        <p>${card.text}</p>
                        <a  href="/job-board/" class="btn btn-dark job-board-button">
                            <span >See jobs now</span>
                            
                        </a>
                    </div>
                `
                })
                .join('')}
        </div>
    </div>
`
    let itemWrap = document.querySelector('.employers-tradesmen-item-wrap')
    itemWrap.innerHTML += whySectionTwoHTML
})

// Gtag Events
let allJobBoardButtons = document.querySelectorAll('.job-board-button')
let allTradesButtons = document.querySelectorAll('.see-trades-button')

allJobBoardButtons.forEach((button) => {
    button.addEventListener('click', () => {
        gtag('event', 'job_board_button_clicked', {
            event_name: 'Job Board Button Clicked',
        })
    })
})

allTradesButtons.forEach((button) => {
    button.addEventListener('click', () => {
        gtag('event', 'see_trades_button_clicked', {
            event_name: 'See Trades Button Clicked',
        })
    })
})

fetchSanityData(
    `https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27trades%27%5D+`
).then((data) => {
    const trades = data.result[0].tradesContent

    // Get the accordion wrap and the h2 element
    const accordionWrap = document.querySelector(
        '.tradesmen-accordion-item-wrap'
    )
    const h2 = document.querySelector('.provide-tradesmen-content h2')

    // Get the first em element
    const firstEm = h2.querySelector('em')

    // Remove existing spans from first em
    const spans = firstEm.querySelectorAll('span')
    spans.forEach((span) => span.remove())

    // Remove existing accordion items
    accordionWrap.innerHTML = ''

    // Iterate over the trades
    trades.forEach((trade) => {
        // Create accordion item
        const accordionItem = document.createElement('div')
        accordionItem.className = 'tradesmen-accordion-item anim-el clip-anim'
        accordionItem.innerHTML = /*html*/ `
            <h3 aria-expanded="false">${trade}</h3>
            <div class="tradesmen-accordion-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        `

        // Append accordion item to accordion wrap
        accordionWrap.appendChild(accordionItem)

        // Create span for animation
        const span = document.createElement('span')
        span.className = 'word'
        span.textContent = trade

        // Append span to first em
        firstEm.appendChild(span)
    })
    // Accordian
    const items2 = document.querySelectorAll('.tradesmen-accordion-item h3')
    items2.forEach((item2) => item2.addEventListener('click', toggleAccordion2))
    function toggleAccordion2() {
        const itemToggle2 = this.getAttribute('aria-expanded')
        for (let item2 of items2) {
            item2.setAttribute('aria-expanded', false)
        }
        if (itemToggle2 === 'false') {
            this.setAttribute('aria-expanded', true)
        }
    }
    if (document.querySelector('.word') === null) {
    } else {
        //Changing Word Animation
        var words = document.getElementsByClassName('word')
        var wordArray = []
        var currentWord = 0

        words[currentWord].style.opacity = 1
        for (var i = 0; i < words.length; i++) {
            splitLetters(words[i])
        }

        function changeWord() {
            var cw = wordArray[currentWord]
            var nw =
                currentWord == words.length - 1
                    ? wordArray[0]
                    : wordArray[currentWord + 1]
            for (var i = 0; i < cw.length; i++) {
                animateLetterOut(cw, i)
            }

            for (var i = 0; i < nw.length; i++) {
                nw[i].className = 'letter behind'
                nw[0].parentElement.style.opacity = 1
                animateLetterIn(nw, i)
            }

            currentWord =
                currentWord == wordArray.length - 1 ? 0 : currentWord + 1
        }

        function animateLetterOut(cw, i) {
            setTimeout(function () {
                cw[i].className = 'letter out'
            }, i * 80)
        }

        function animateLetterIn(nw, i) {
            setTimeout(function () {
                nw[i].className = 'letter in'
            }, 340 + i * 80)
        }

        function splitLetters(word) {
            var content = word.innerHTML
            word.innerHTML = ''
            var letters = []
            for (var i = 0; i < content.length; i++) {
                var letter = document.createElement('span')
                letter.className = 'letter'
                letter.innerHTML = content.charAt(i)
                word.appendChild(letter)
                letters.push(letter)
            }

            wordArray.push(letters)
        }

        changeWord()
        setInterval(changeWord, 3000)
    }
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
