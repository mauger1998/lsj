//Progress Anim

var text1 = document.querySelectorAll('.how-it-works-item')[0]
var text2 = document.querySelectorAll('.how-it-works-item')[1]
var text3 = document.querySelectorAll('.how-it-works-item')[2]
var text4 = document.querySelectorAll('.how-it-works-item')[3]

var line = document.querySelectorAll(".how-it-work-progress div"),
    lineWrapper = document.querySelectorAll(".how-it-works-inner");


let tl4 = gsap.timeline();
tl4.to(line, {
    scrollTrigger: {
        trigger: lineWrapper,
        start: "-40%",
        end: "50%",
        scrub: true,
    },
    duration: 2,
    height: "100%",
    ease: "none",
    immediateRender: false
});

tl4.to(text1, {
    scrollTrigger: {
        trigger: ".how-it-works-inner",
        start: "-40%",
        end: "-30%",
        scrub: true,
    },
    duration: 2,
    className: ' how-it-works-item active',
    ease: "none",
    immediateRender: false
});

tl4.to(text2, {
    scrollTrigger: {
        trigger: ".how-it-works-inner",
        start: "-10%",
        end: "0%",
        scrub: true,
    },
    duration: 2,
    className: ' how-it-works-item active',
    ease: "none",
    immediateRender: false
});

tl4.to(text3, {
    scrollTrigger: {
        trigger: ".how-it-works-inner",
        start: "18%",
        end: "28%",
        scrub: true,
    },
    duration: 2,
    className: ' how-it-works-item active',
    ease: "none",
    immediateRender: false
});

tl4.to(text4, {
    scrollTrigger: {
        trigger: ".how-it-works-inner",
        start: "42%",
        end: "52%",
        scrub: true,
    },
    duration: 2,
    className: ' how-it-works-item active',
    ease: "none",
    immediateRender: false
});

if (document.querySelector('.word') === null) {

} else {

    //Changing Word Animation
    var words = document.getElementsByClassName('word');
    var wordArray = [];
    var currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (var i = 0; i < words.length; i++) {
        splitLetters(words[i]);
    }

    function changeWord() {
        var cw = wordArray[currentWord];
        var nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
        for (var i = 0; i < cw.length; i++) {
            animateLetterOut(cw, i);
        }

        for (var i = 0; i < nw.length; i++) {
            nw[i].className = 'letter behind';
            nw[0].parentElement.style.opacity = 1;
            animateLetterIn(nw, i);
        }

        currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
    }

    function animateLetterOut(cw, i) {
        setTimeout(function () {
            cw[i].className = 'letter out';
        }, i * 80);
    }

    function animateLetterIn(nw, i) {
        setTimeout(function () {
            nw[i].className = 'letter in';
        }, 340 + (i * 80));
    }

    function splitLetters(word) {
        var content = word.innerHTML;
        word.innerHTML = '';
        var letters = [];
        for (var i = 0; i < content.length; i++) {
            var letter = document.createElement('span');
            letter.className = 'letter';
            letter.innerHTML = content.charAt(i);
            word.appendChild(letter);
            letters.push(letter);
        }

        wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 3000);

}



// Accordian
const items2 = document.querySelectorAll(".tradesmen-accordion-item h3");
items2.forEach((item2) => item2.addEventListener("click", toggleAccordion2));
function toggleAccordion2() {
  const itemToggle2 = this.getAttribute("aria-expanded");
  for (let item2 of items2) {
    item2.setAttribute("aria-expanded", false);
  }
  if (itemToggle2 === "false") {
    this.setAttribute("aria-expanded", true);
  }
}











let URL = "https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27employersTestimonials%27%5D%7B%0A++review%2C%0A++%22logo%22%3A+logo.asset-%3Eurl%0A%7D&perspective=published"



// fetch the content
fetch(URL)
    .then((res) => res.json())
    .then(({
        result
    }) => {
        console.log(result)

        const companyWrap = document.querySelector(".construction-companies-item-wrap")
        if (result.length > 0) {
            companyWrap.innerHTML = ""
            result.forEach((result) => {
                let companyItem = document.createElement("div")
                companyItem.classList.add("construction-companies-item", "bg-early-dawn", "anim-el");
                companyWrap.appendChild(companyItem)
                
                let companyImage = document.createElement("figure")
                companyItem.appendChild(companyImage)
                
                let companyImageSrc = document.createElement("img")
                companyImageSrc.src = result.logo
                companyImage.appendChild(companyImageSrc)
                
                let companyDesc = document.createElement("p")
                companyDesc.textContent = result.review
                companyItem.appendChild(companyDesc)
                
            });

        }
    })
    .catch((err) => console.error(err));







let URLTWO = "https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=%0A*%5B_type+%3D%3D+%22employersFaq%22%5D+%7C+order%28order%29"



// fetch the content
fetch(URLTWO)
    .then((res) => res.json())
    .then(({
        result
    }) => {
        console.log(result)

        const accordionFaq = document.querySelector(".faq-item-wrap")
        if (result.length > 0) {
            accordionFaq.innerHTML = ""
            result.forEach((result) => {
                let accordionItem = document.createElement("div")
                accordionItem.classList.add("faq-item")
                accordionFaq.appendChild(accordionItem)

                let accordionQuestion = document.createElement("div")
                accordionQuestion.classList.add("faq-accordion-trigger")
                accordionQuestion.setAttribute("aria-expanded", "false")
                accordionItem.appendChild(accordionQuestion)

                let accordionTitle = document.createElement("h5")
                accordionTitle.textContent = result.question
                accordionQuestion.appendChild(accordionTitle)


                let content = document.createElement("div")
                content.classList.add("faq-hidden-content")

                accordionItem.appendChild(content)

                let contentP = document.createElement("p")
                contentP.textContent = result.answer
                content.appendChild(contentP)


            });

            // Accordian
            const items = document.querySelectorAll(".faq-accordion-trigger");

            items.forEach((item) => item.addEventListener("click", toggleAccordion));

            function toggleAccordion() {
                const itemToggle = this.getAttribute("aria-expanded");

                for (let item of items) {
                    item.setAttribute("aria-expanded", false);
                }

                if (itemToggle === "false") {
                    this.setAttribute("aria-expanded", true);
                }
            }

        }
    })
    .catch((err) => console.error(err));




let URLTHREE = "https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27projects%27%5D%7B%0A++text%2C%0A++%22image%22%3A+image.asset-%3Eurl%0A%7D&perspective=published"
// fetch the content
fetch(URLTHREE)
    .then((res) => res.json())
    .then(({
        result
    }) => {
        console.log(result)

        const constructionWrap = document.querySelector(".workers-contribute-item-wrap")
        if (result.length > 0) {
            constructionWrap.innerHTML = ""
            result.forEach((result) => {
                let constructionItem = document.createElement("div")
                constructionItem.classList.add("workers-contribute-item")
                constructionWrap.appendChild(constructionItem)

                let constructionImage = document.createElement("figure")
                constructionImage.classList.add("anim-el", "clip-anim")
                constructionItem.appendChild(constructionImage)

                let constructionImageSrc = document.createElement("img")
                constructionImageSrc.src = result.image
                constructionImage.appendChild(constructionImageSrc)
                
                let constructionDesc = document.createElement("p")
                constructionDesc.textContent = result.text
                constructionItem.appendChild(constructionDesc)

            });

        }
    })
    .catch((err) => console.error(err));












