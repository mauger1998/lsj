// Sanity Fetch
async function fetchSanityData(url) {
    const response = await fetch(url)
    const sanityData = await response.json()
    return sanityData
}

fetchSanityData(
    'https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22jobSeekersFaq%22%5D+%7B%0A++jobSeekersFaqContent%5B%5D+%7B%0A++++question%2C%0A++++answer%2C%0A++++%0A++%7D%0A%7D%0A'
).then((faq) => {
    const { result } = faq
    const resolvedResult = result[0].jobSeekersFaqContent

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
        ScrollTrigger.refresh()

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
    'https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22jobSeekersTestimonials%22%5D+%7B%0A++jobSeekersTestimonialsContent%5B%5D+%7B%0A++++%22ppUrl%22%3A+profilePicture.asset-%3Eurl%2C%0A++++review%2C%0A++++name%0A++%7D%0A++++%0A%7D%0A'
).then((testimonial) => {
    const { result } = testimonial
    const resolvedResult = result[0].jobSeekersTestimonialsContent
    const jobTestimonial = document.querySelector('.found-labourers-card-wrap')
    if (resolvedResult.length > 0) {
        jobTestimonial.innerHTML = ''
        resolvedResult.forEach((result) => {
            let jobTestimonialItem = document.createElement('div')
            jobTestimonialItem.classList.add(
                'found-labourers-card',
                'bg-early-dawn',
                'anim-el'
            )
            jobTestimonial.appendChild(jobTestimonialItem)

            let jobTestimonialLayer = document.createElement('div')
            jobTestimonialLayer.classList.add('layerd-bg')
            jobTestimonialItem.appendChild(jobTestimonialLayer)

            let jobTestimonialAuthor = document.createElement('div')
            jobTestimonialAuthor.classList.add('found-labourers-author')
            jobTestimonialItem.appendChild(jobTestimonialAuthor)

            let jobTestimonialImage = document.createElement('figure')
            jobTestimonialAuthor.appendChild(jobTestimonialImage)
            let jobTestimonialImageSrc = document.createElement('img')
            jobTestimonialImageSrc.src = result.ppUrl
            jobTestimonialImage.appendChild(jobTestimonialImageSrc)

            let jobTestimonialName = document.createElement('h4')
            jobTestimonialName.textContent = result.name
            jobTestimonialAuthor.appendChild(jobTestimonialName)

            let jobTestimonialReview = document.createElement('p')
            jobTestimonialReview.textContent = result.review
            jobTestimonialItem.appendChild(jobTestimonialReview)

            let jobTestimonialButton = document.createElement('a')
            jobTestimonialButton.setAttribute('href', '../job-board')
            jobTestimonialButton.classList.add('btn')
            jobTestimonialItem.appendChild(jobTestimonialButton)
            let jobTestimonialButtonSpan = document.createElement('span')
            jobTestimonialButtonSpan.innerHTML = 'See job board'
            jobTestimonialButton.appendChild(jobTestimonialButtonSpan)
        })
        ScrollTrigger.refresh()
    }
})
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
    `https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27jobSeekers%27%5D+%7B%0A++title%2C%0A++%22content%22%3A+content%5B%5D%7B%0A++++...%2C%0A++++%22cards%22%3A+cards%5B%5D%7B%0A++++++...%2C%0A++++++%22image%22%3A+image.asset-%3Eurl%0A++++%7D%0A++%7D%0A%7D`
).then((data) => {
    const { result } = data
    const heroContainer = document.querySelector('.job-seekers-hero')
    const heroSection = result[0].content[0]
    heroContainer.innerHTML = ''

    const whyContainer = document.querySelector('.why-with-us-wrap .wrapper')
    const whySection = result[0].content[1]
    whyContainer.innerHTML = ''

    const howContainer = document.querySelector('.how-it-works-wrap .wrapper')
    const howSection = result[0].content[2]
    howContainer.innerHTML = ''
    //Progress Anim
    setTimeout(() => {
        ScrollTrigger.refresh()
    }, 1000) // waits for 1 second before refreshing

    const heroSectionHTML = /*html*/ `
    <div class="secondery-hero-back-bg position-bottom">
        <figure>
            <img src="svgs/simple.svg" alt="simple" />
        </figure>
    </div>
    <div class="wrapper">
        <div class="secondery-hero-inner">
            <h2 class="h2 anim-load">
                ${heroSection.title}
                <img src="../svgs/search.svg" alt="Search" />
            </h2>
            <p class="anim-load">
                ${heroSection.text}
            </p>
            <div class="lottie-wrapper">
                <lottie-player
                    class="anim-load"
                    src="../lottie/Animation-1694761764672.json"
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
                    (card) => /*html*/ `
                <div class="why-with-us-card">
                    <div class="card-thumb">
                        <div class="card-thumb-ico">
                            <img src="../svgs/group.svg" alt="${card.iconAlt}" />
                        </div>
                        <figure class="anim-el clip-anim">
                            <img src=${card.image} alt="${card.imageAlt}" />
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
                <a href="../job-board" class="btn"><span>See job board</span></a>
            </div>
            <div></div>
        </div>
    </div>
`

    whyContainer.innerHTML = whySectionHTML

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
