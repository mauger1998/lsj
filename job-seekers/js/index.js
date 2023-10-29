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

// let URLTWO =
//     'https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27projects%27%5D%7B%0A++text%2C%0A++%22image%22%3A+image.asset-%3Eurl%0A%7D&perspective=published'
// // fetch the content
// fetch(URLTWO)
//     .then((res) => res.json())
//     .then(({ result }) => {
//         console.log(result)

//         const constructionWrap = document.querySelector(
//             '.workers-contribute-item-wrap'
//         )
//         if (result.length > 0) {
//             constructionWrap.innerHTML = ''
//             result.forEach((result) => {
//                 let constructionItem = document.createElement('div')
//                 constructionItem.classList.add('workers-contribute-item')
//                 constructionWrap.appendChild(constructionItem)

//                 let constructionImage = document.createElement('figure')
//                 constructionImage.classList.add('anim-el', 'clip-anim')
//                 constructionItem.appendChild(constructionImage)

//                 let constructionImageSrc = document.createElement('img')
//                 constructionImageSrc.src = result.image
//                 constructionImage.appendChild(constructionImageSrc)

//                 let constructionDesc = document.createElement('p')
//                 constructionDesc.textContent = result.text
//                 constructionItem.appendChild(constructionDesc)
//             })
//             ScrollTrigger.refresh()
//         }
//     })
//     .catch((err) => console.error(err))

// let URLTHREE =
//     'https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27jobSeekersTestimonials%27%5D%7B%0A%22image%22%3A+image.asset-%3Eurl%2C%0Aname%2C%0Areview%0A%7D&perspective=published'
// // fetch the content
// fetch(URLTHREE)
//     .then((res) => res.json())
//     .then(({ result }) => {
//         console.log(result)

//         const jobTestimonial = document.querySelector(
//             '.found-labourers-card-wrap'
//         )
//         if (result.length > 0) {
//             jobTestimonial.innerHTML = ''
//             result.forEach((result) => {
//                 let jobTestimonialItem = document.createElement('div')
//                 jobTestimonialItem.classList.add(
//                     'found-labourers-card',
//                     'bg-early-dawn',
//                     'anim-el'
//                 )
//                 jobTestimonial.appendChild(jobTestimonialItem)

//                 let jobTestimonialLayer = document.createElement('div')
//                 jobTestimonialLayer.classList.add('layerd-bg')
//                 jobTestimonialItem.appendChild(jobTestimonialLayer)

//                 let jobTestimonialAuthor = document.createElement('div')
//                 jobTestimonialAuthor.classList.add('found-labourers-author')
//                 jobTestimonialItem.appendChild(jobTestimonialAuthor)

//                 let jobTestimonialImage = document.createElement('figure')
//                 jobTestimonialAuthor.appendChild(jobTestimonialImage)
//                 let jobTestimonialImageSrc = document.createElement('img')
//                 jobTestimonialImageSrc.src = result.image
//                 jobTestimonialImage.appendChild(jobTestimonialImageSrc)

//                 let jobTestimonialName = document.createElement('h4')
//                 jobTestimonialName.textContent = result.name
//                 jobTestimonialAuthor.appendChild(jobTestimonialName)

//                 let jobTestimonialReview = document.createElement('p')
//                 jobTestimonialReview.textContent = result.review
//                 jobTestimonialItem.appendChild(jobTestimonialReview)

//                 let jobTestimonialButton = document.createElement('a')
//                 jobTestimonialButton.setAttribute('href', '../job-board')
//                 jobTestimonialButton.classList.add('btn')
//                 jobTestimonialItem.appendChild(jobTestimonialButton)
//                 let jobTestimonialButtonSpan = document.createElement('span')
//                 jobTestimonialButtonSpan.innerHTML = 'See job board'
//                 jobTestimonialButton.appendChild(jobTestimonialButtonSpan)
//             })
//             ScrollTrigger.refresh()
//         }
//     })
//     .catch((err) => console.error(err))
