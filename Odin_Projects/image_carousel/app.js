let slideInterval;
///////////start functions//////////////////////
let count = 0;
/////////////slides functions/////////////////////////
const hideSlides = (slides) => { //hide all slides
    slides.forEach((slide) => {
        slide.classList.add("hide");
        slide.classList.remove("active");
    })
}
const showSlide = (slide) => { //show specified slide
    slide.classList.add("active");
    slide.classList.remove("hide");
}

const hideActiveSlide = () => { //hide active slide
        const slides = document.querySelectorAll(".image");
        slides.forEach((slide) => {
            if (slide.classList.contains("active")) {
                slide.classList.remove("active");
                slide.classList.add("hide");
            }

        })
    }
    /////////end slides functions ////////////////////

////////start circles functions//////////////////////////

const showCircle = (slide) => {
    let slideId = parseInt(slide.id.split("").pop());
    const circles = document.querySelectorAll(".circle");
    circles.forEach((circle) => {
        let circleId = parseInt(circle.id.split("").pop());
        console.log("circleId,slideId", circleId, slideId, circleId === slideId)
        if (circleId === slideId) {

            circle.classList.add("circleActive");
            circle.classList.remove("circleHide")
        }
    })

}


const hideCircles = (circles) => { //hide all slides
    circles.forEach((circle) => {
        circle.classList.add("circleHide");
        circle.classList.remove("active");
    })
}
const hideActiveCircle = () => { //hide active slide
    const circles = document.querySelectorAll(".circle");
    circles.forEach((circle) => {
        if (circle.classList.contains("circleActive")) {
            circle.classList.remove("circleActive");
            circle.classList.add("circleHide");
        }

    })
}
const clickCircle = (circle) => {
        clearInterval(slideInterval);
        const slides = document.querySelectorAll(".image");

        let circleIndex = parseInt(circle.id.split("").pop());


        slides.forEach((slide) => {
            const slideIndex = parseInt(slide.id.split("").pop());
            if (slideIndex === circleIndex) {
                count = slideIndex;
                hideActiveCircle();
                showCircle(circle);
                hideActiveSlide();
                showSlide(slide);
            }
        })

        startInterval();

    }
    //////end circles functions/////////

function startInterval() { //slide mode
    // let count = 0;
    slideInterval = setInterval(function() {
        if (count >= 5) {
            count = 1;
        } else {
            count++;
        }
        let currSlide = document.querySelector("#img" + count);
        // styleCircle(count);
        hideActiveSlide();
        hideActiveCircle();
        showSlide(currSlide);
        showCircle(currSlide);

    }, 5000);

}

function next() {

    clearInterval(slideInterval);

    const slide = document.querySelector(".active");
    const slides = document.querySelectorAll(".image");
    if (slide) {

        let index = parseInt(slide.id.split("").pop());
        console.log("index", index)
        let nextIndex = index + 1;
        console.log("nextIndex", nextIndex)
        if (nextIndex > 5) {
            nextIndex = 1;
        }

        const nextSlide = document.querySelector("#img" + nextIndex);
        count = nextIndex;
        console.log("nextSlide ", nextSlide)
        if (nextSlide) {
            hideActiveSlide();
            hideActiveCircle();
            showSlide(nextSlide);
            showCircle(nextSlide)

        }

    }

    startInterval()

}

function prev() {

    clearInterval(slideInterval);

    const slide = document.querySelector(".active");
    const slides = document.querySelectorAll(".image");
    if (slide) {

        let index = parseInt(slide.id.split("").pop());
        console.log("index", index)
        let prevIndex = index - 1;
        console.log("prevIndex", prevIndex)
        if (prevIndex <= 0) {
            prevIndex = 5;
        }

        const prevSlide = document.querySelector("#img" + prevIndex);
        count = prevIndex;
        console.log("nextSlide ", prevSlide)
        if (prevSlide) {
            hideActiveSlide();
            hideActiveCircle();
            showSlide(prevSlide);
            showCircle(prevSlide);

        }

    }
    startInterval()

}


/////////////////////end  functions/////////////////////////







document.addEventListener("DOMContentLoaded", (event) => {
    const slides = document.querySelectorAll(".image");
    const circles = document.querySelectorAll(".circle");
    hideSlides(slides); //hide all slides
    hideCircles(circles)
    const slide1 = document.querySelector("#img1");
    showSlide(slide1); //show first slide
    showCircle(slide1);




    for (let i = 1; i < 6; i++) {

        const circle = document.querySelector("#circle" + i);
        circle.addEventListener("click", (event) => { clickCircle(circle); })
    }
    const nextBtn = document.querySelector("#next");
    nextBtn.addEventListener("click", function() { next() });

    const prevBtn = document.querySelector("#prev");
    prevBtn.addEventListener("click", function() { prev() });
    startInterval();
});