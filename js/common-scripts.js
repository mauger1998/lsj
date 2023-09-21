
const $body = document.querySelector("body")
$body.classList.add("stop-scrolling");
window.onload = function () {
    setTimeout(function(){
        $body.classList.remove("stop-scrolling");
    }, 800)
}
/*Mobile Nav*/
const mobiNav = document.querySelector(".hamburger");
mobiNav.addEventListener("click", function (event) {
    event.preventDefault();
    //add a class
    $body.classList.toggle("navShown");
});



//Inview


window.addEventListener('load', function () {
    setTimeout(function () {
        let elementsArray = document.querySelectorAll(".anim-el");
        console.log(elementsArray);
        window.addEventListener('scroll', fadeIn);

        function fadeIn() {
            for (var i = 0; i < elementsArray.length; i++) {
                var elem = elementsArray[i]
                var distInView = elem.getBoundingClientRect().top - window.innerHeight + 100;
                if (distInView < 0) {
                    elem.classList.add("inView");
                } else {
                    elem.classList.remove("inView");
                }
            }
        }
        fadeIn();
    }, 800)
})
//Preloader
var $preloader = document.querySelector(".preloader-wrap");
window.addEventListener('load', function () {
    setTimeout(function () {
        $preloader.classList.add('preloader-load');
    }, 100)
    setTimeout(function () {
        $preloader.classList.add('preloader-loading');
        setTimeout(function () {
            $preloader.classList.add('preloader-loaded');
            setTimeout(function () {
                var divs = document.querySelectorAll('.anim-load');
                for (var i = 0; i < divs.length; i++) {
                    divs[i].classList.add('anim-loaded');
                }
            }, 1300)
        }, 1500)
    }, 700)
})



