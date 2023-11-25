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
    `https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27home%27%5D`
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
            <a class="btn" href="#">Tradesmen</a>
            <a class="btn btn-dark" href="#">Employers</a>
        </div>
        <a class="anim-load scroll-next" href="#socialproof">
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
                                    <img src="img/employers-1.jpg" alt="${card.title}" />
                                </figure>
                            </div>
                            <h3>${card.title}</h3>
                            <p>${card.text}</p>
                            <a href="#" class="btn btn-dark">
                                <span class="desk">Hire tradesmen</span>
                                <span class="mobi">Hire now</span>
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
                                <img src="img/employers-1.jpg" alt="${card.title}" />
                            </figure>
                        </div>
                        <h3>${card.title}</h3>
                        <p>${card.text}</p>
                        <a href="#" class="btn btn-dark">
                            <span class="desk">Hire tradesmen</span>
                            <span class="mobi">Hire now</span>
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
