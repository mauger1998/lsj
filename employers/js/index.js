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
    `https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27employers%27%5D+%7B%0A++title%2C%0A++%22content%22%3A+content%5B%5D%7B%0A++++...%2C%0A++++%22cards%22%3A+cards%5B%5D%7B%0A++++++...%2C%0A++++++%22image%22%3A+image.asset-%3Eurl%0A++++%7D%0A++%7D%0A%7D`
).then((data) => {
    const { result } = data

    const heroContainer = document.querySelector('.secondery-hero-wrap')
    const heroSection = result[0].content[0]
    heroContainer.innerHTML = ''

    const whyCardsContainer = document.querySelector(
        '.why-with-us-wrap .wrapper'
    )
    const whySection = result[0].content[1]
    whyCardsContainer.innerHTML = ''

    const howSection = result[0].content[2]
    const howContainer = document.querySelector('.how-it-works-wrap .wrapper')

    howContainer.innerHTML = ''

    const heroSectionHTML = /*html*/ `
    <div class="secondery-hero-back-bg position-top">
        <figure>
            <img src="svgs/employers.svg" alt="employers" />
        </figure>
    </div>
    <div class="wrapper">
        <div class="secondery-hero-inner">
            <h2 class="h2 anim-load">
                ${heroSection.title}
            </h2>
            <p class="anim-load">
                ${heroSection.text}
            </p>
            <div class="lottie-wrapper">
                <lottie-player
                    class="anim-load"
                    src="../lottie/Animation-1694761904905.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay></lottie-player>
            </div>
        </div>
    </div>
`

    heroContainer.innerHTML = heroSectionHTML

    const whySectionHTML = /*html*/ `
    <div class="why-with-us-inner">
        <h2 class="anim-el clip-anim">${whySection.title}</h2>
        <div class="why-with-us-card-wrap">
            ${whySection.cards
                .map(
                    (card, index) => /*html*/ `
                <div class="why-with-us-card">
                    <div class="card-thumb">
                        <div class="card-thumb-ico">
                            <img src="../svgs/commitments.svg" alt="card-thumb-ico" />
                        </div>
                        <figure class="anim-el clip-anim">
                            <img src=${card.image} alt="card-thumb" />
                        </figure>
                    </div>
                    <h5>${card.title}</h5>
                    <p>${card.text}</p>
                </div>
            `
                )
                .join('')}
        </div>
        <div class="hire-tradesmen-btn align-left">
            <div></div>
            <div>
                <a href="../available-trades" class="btn btn-dark"><span>See trades now</span></a>
            </div>
            <div></div>
        </div>
    </div>
`

    whyCardsContainer.innerHTML = whySectionHTML
    ScrollTrigger.refresh()

    const howSectionHTML = /*html*/ `
    <h2 class="anim-el clip-anim">${howSection.title}</h2>
    <div class="how-it-works-inner">
        <div class="how-it-work-progress">
            <div></div>
        </div>
        <div class="how-it-works-item-wrap">
            ${howSection.content
                .map(
                    (item) => /*html*/ `
                <div class="how-it-works-item">
                    <p>${item}</p>
                </div>
            `
                )
                .join('')}
        </div>
    </div>
`

    howContainer.innerHTML = howSectionHTML

    //Progress Anim
    setTimeout(() => {
        ScrollTrigger.refresh()
    }, 1000) // waits for 1 second before refreshing
    var text1 = document.querySelectorAll('.how-it-works-item')[0]
    var text2 = document.querySelectorAll('.how-it-works-item')[1]
    var text3 = document.querySelectorAll('.how-it-works-item')[2]
    var text4 = document.querySelectorAll('.how-it-works-item')[3]

    var line = document.querySelectorAll('.how-it-work-progress div'),
        lineWrapper = document.querySelectorAll('.how-it-works-inner')

    let tl4 = gsap.timeline()
    tl4.to(line, {
        scrollTrigger: {
            trigger: lineWrapper,
            start: '-40%',
            end: '50%',
            scrub: true,
        },
        duration: 2,
        height: '100%',
        ease: 'none',
        immediateRender: false,
    })

    tl4.to(text1, {
        scrollTrigger: {
            trigger: '.how-it-works-inner',
            start: '-40%',
            end: '-30%',
            scrub: true,
        },
        duration: 2,
        className: ' how-it-works-item active',
        ease: 'none',
        immediateRender: false,
    })

    tl4.to(text2, {
        scrollTrigger: {
            trigger: '.how-it-works-inner',
            start: '-10%',
            end: '0%',
            scrub: true,
        },
        duration: 2,
        className: ' how-it-works-item active',
        ease: 'none',
        immediateRender: false,
    })

    tl4.to(text3, {
        scrollTrigger: {
            trigger: '.how-it-works-inner',
            start: '18%',
            end: '28%',
            scrub: true,
        },
        duration: 2,
        className: ' how-it-works-item active',
        ease: 'none',
        immediateRender: false,
    })

    tl4.to(text4, {
        scrollTrigger: {
            trigger: '.how-it-works-inner',
            start: '42%',
            end: '52%',
            scrub: true,
        },
        duration: 2,
        className: ' how-it-works-item active',
        ease: 'none',
        immediateRender: false,
    })
})

// Sanity Fetch
async function fetchSanityData(url) {
    const response = await fetch(url)
    const sanityData = await response.json()
    return sanityData
}

fetchSanityData(
    'https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22projects%22%5D+%7B%0A++projectsContent%5B%5D+%7B%0A++++%22imageUrl%22%3A+image.asset-%3Eurl%2C%0A++++text%2C%0A++%7D%0A%7D%0A%0A'
).then((project) => {
    const { result } = project
    const resolvedResult = result[0].projectsContent

    const constructionWrap = document.querySelector(
        '.workers-contribute-item-wrap'
    )
    if (resolvedResult.length > 0) {
        constructionWrap.innerHTML = ''
        resolvedResult.forEach((result) => {
            let constructionItem = document.createElement('div')
            constructionItem.classList.add('workers-contribute-item')
            constructionWrap.appendChild(constructionItem)

            let constructionImage = document.createElement('figure')
            constructionImage.classList.add('anim-el', 'clip-anim')
            constructionItem.appendChild(constructionImage)

            let constructionImageSrc = document.createElement('img')
            constructionImageSrc.src = result.imageUrl
            constructionImage.appendChild(constructionImageSrc)

            let constructionDesc = document.createElement('p')
            constructionDesc.textContent = result.text
            constructionItem.appendChild(constructionDesc)
        })
        ScrollTrigger.refresh()
    }
})

fetchSanityData(
    'https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22employersTestimonials%22%5D+%7B%0A++employersTestimonialsContent%5B%5D+%7B%0A++++%22logoUrl%22%3A+logo.asset-%3Eurl%2C%0A++++review%0A++%7D%0A%7D%0A'
).then((testimonial) => {
    const { result } = testimonial
    const resolvedResult = result[0].employersTestimonialsContent

    const companyWrap = document.querySelector(
        '.construction-companies-item-wrap'
    )
    if (resolvedResult.length > 0) {
        companyWrap.innerHTML = ''
        resolvedResult.forEach((result) => {
            let companyItem = document.createElement('div')
            companyItem.classList.add(
                'construction-companies-item',
                'bg-early-dawn',
                'anim-el'
            )
            companyWrap.appendChild(companyItem)

            let companyImage = document.createElement('figure')
            companyItem.appendChild(companyImage)

            let companyImageSrc = document.createElement('img')
            companyImageSrc.src = result.logoUrl
            companyImage.appendChild(companyImageSrc)

            let companyDesc = document.createElement('p')
            companyDesc.textContent = result.review
            companyItem.appendChild(companyDesc)
        })
    }
})

fetchSanityData(
    'https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22employersFaq%22%5D+%7B%0A++employersFaqContent%5B%5D+%7B%0A++++question%2C%0A++++answer%2C%0A++++%0A++%7D%0A%7D%0A'
).then((faq) => {
    const { result } = faq
    console.log(result)
    const resolvedResult = result[0].employersFaqContent

    const accordionFaq = document.querySelector('.faq-item-wrap')
    if (resolvedResult.length > 0) {
        accordionFaq.innerHTML = ''
        resolvedResult.forEach((result) => {
            let accordionItem = document.createElement('div')
            accordionItem.classList.add('faq-item')
            accordionFaq.appendChild(accordionItem)

            let accordionQuestion = document.createElement('div')
            accordionQuestion.classList.add('faq-accordion-trigger')
            accordionQuestion.setAttribute('aria-expanded', 'false')
            accordionItem.appendChild(accordionQuestion)

            let accordionTitle = document.createElement('h5')
            accordionTitle.textContent = result.question
            accordionQuestion.appendChild(accordionTitle)

            let content = document.createElement('div')
            content.classList.add('faq-hidden-content')

            accordionItem.appendChild(content)

            let contentP = document.createElement('p')
            contentP.textContent = result.answer
            content.appendChild(contentP)
        })

        // Accordian
        const items = document.querySelectorAll('.faq-accordion-trigger')

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
    }
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
                if (nw[0] && nw[0].parentElement) {
                    nw[0].parentElement.style.opacity = 1
                }
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
