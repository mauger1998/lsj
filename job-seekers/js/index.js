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
