const setCardBehavior = ($card) => {
    const $cardCarousel = $card.querySelector(".cardcarousel");
    const $picList = $cardCarousel.querySelectorAll(".cardcontent__image");
    const $likeIconBig = $card.querySelector(".like-icon--big");
    const $next = $card.querySelector(".slideswitcher--next");
    const $prev = $card.querySelector(".slideswitcher--prev");
    const $dots = $card.querySelectorAll(".dot");
    let curSlide = 1;
    let numPics = $picList.length;

    let initialX = 0;
    let distance = 0;
    let touchDuration = 0;

    if ($picList.length >= 2) {
        $cardCarousel.addEventListener("touchstart", function (event) {
            initialX = event.touches[0].clientX;
            let touchTimeStart = event.timeStamp;
            touchDuration = touchTimeStart;
        });


        $cardCarousel.addEventListener("touchmove", function (event) {
            let carouselWidth = parseInt(getComputedStyle($cardCarousel).width);
            let x = event.targetTouches[0].clientX;
            distance = x - initialX;
            let drag = (distance * 100) / carouselWidth;
            let currTrans = ((curSlide - 1) * -(100 / numPics));
            let translate = (currTrans + (drag * 2));
            let positiveDistance = distance < 0 ? -distance : distance;
            if ((curSlide > numPics) || translate > 0 && positiveDistance < 20) {
            } else {
                $cardCarousel.style.setProperty("transform", `translateX(${translate}%)`);
            }

        });


        $cardCarousel.addEventListener("touchend", function (event) {
            let positiveDistance = distance < 0 ? -distance : distance;
            let touchTimeEnd = event.timeStamp;
            touchDuration = touchTimeEnd - touchDuration;
            let imgWidth = parseInt(getComputedStyle($card.querySelector('.cardcontent__image')).width);
            const changeSlideValue = () => {
                if (distance < 0 && curSlide < numPics) {
                    curSlide++;
                } else if (distance > 0 && curSlide > 1) {
                    curSlide--;
                } else { }
                $dots.forEach(($dot) => $dot.classList.remove("dot--active"));
                $dots[curSlide - 1].classList.add("dot--active")
            }
            if ((touchDuration < 500) && positiveDistance > 20) {
                changeSlideValue();
            }
            else {
                if (positiveDistance >= (imgWidth / 2)) {
                    changeSlideValue();
                }
            }
            switchSlide($next, $prev, $cardCarousel, $dots, curSlide, numPics);

            distance = 0;
        });

    }


    $next.addEventListener("click", function () {
        curSlide++;
        switchSlide($next, $prev, $cardCarousel, $dots, curSlide, numPics);
    });

    $prev.addEventListener("click", function () {
        curSlide--;
        switchSlide($next, $prev, $cardCarousel, $dots, curSlide, numPics);
    });

    const $botoesLike = $card.querySelectorAll(".cardbutton--heart");
    const $botaoSave = $card.querySelector(".cardbutton--save");
    const $iconSave = $botaoSave.querySelector(".iconcontainer--savecontainer");
    let likedPost = false;
    let numLikesGlobal = parseInt(($card.querySelector(".otherlikes").text).split(" ")[1]);

    const toggleLike = (command, numLikes) => {
        numLikes = numLikesGlobal;
        if (command == "Curtir") {
            numLikes--;
            likedPost = false;
        } else {
            numLikes++;
            likedPost = true;
        }
        numLikesGlobal = numLikes;
        return numLikes;
    }

    $picList.forEach(($pic) => {
        $pic.addEventListener("dblclick", function () {
            $likeIconBig.classList.add("like-icon--big--visible");
            setTimeout(function () { $likeIconBig.classList.remove("like-icon--big--visible"); }, 1200);

            if (!likedPost) {
                const $botaoLike = $botoesLike[0];
                const $iconLike = $botaoLike.querySelector(".iconcontainer--likecontainer");

                toggleButton($botaoLike, $iconLike, "Curtir", "Descurtir");
                let numLikes = numLikesGlobal;
                numLikes++;
                $card.querySelector(".otherlikes").innerHTML = `outras ${toggleLike(($botaoLike.title), numLikes)} pessoas`;
                numLikesGlobal = numLikes;
                likedPost = true;
            }
        })
    });

    $botoesLike.forEach(($botaoLike, index) => {
        const $iconLike = $botaoLike.querySelector(".iconcontainer--likecontainer");
        $botaoLike.addEventListener("click", function () {
            toggleButton($botaoLike, $iconLike, "Curtir", "Descurtir");
            if (index == 0) {
                let numLikes = parseInt(($card.querySelector(".otherlikes").text).split(" ")[1]);
                $card.querySelector(".otherlikes").innerHTML = `outras ${toggleLike(($botaoLike.title), numLikes)} pessoas`;
            }
        });
    });

    $botaoSave.addEventListener("click", function () {
        toggleButton($botaoSave, $iconSave, "Salvar", "Remover dos Salvos");
    });

    const $commentArea = $card.querySelector(".formcomment__text");
    const $publishButton = $card.querySelector(".pubblishbutton");

    $commentArea.addEventListener("input", function () {
        if (isEmpty($commentArea.value) ||
            $commentArea.value === null ||
            $commentArea.value === undefined) {
            $publishButton.classList.remove("pubblishbutton--active");
        } else {
            $publishButton.classList.add("pubblishbutton--active");
        }
    });

    $publishButton.addEventListener("click", function () {
        let $commentInfo2 = $card.querySelectorAll(".otherusername")[2];
        $card.querySelectorAll(".otherusername")[1].innerHTML = $commentInfo2.innerHTML;
        $card.querySelectorAll(".commentbody")[0].innerHTML = ($card.querySelectorAll(".commentbody")[1]).innerHTML;
        $card.querySelectorAll(".otherusername")[2].innerHTML = "curious_cat"
        $card.querySelectorAll(".commentbody")[1].innerHTML = $commentArea.value;
        $commentArea.value = "";
        $publishButton.classList.remove("pubblishbutton--active");
    });

    $commentArea.addEventListener("keyup", function (event) {
        if (isEmpty($commentArea.value) ||
            $commentArea.value === null ||
            $commentArea.value === undefined) {
        } else if (event.keyCode === 13) {
            event.preventDefault();
            $publishButton.click();

        }
    });

}

function switchSlide($buttonNext, $buttonPrev, $carousel, $dots, curSlide, numPics) {
    $buttonNext.classList.remove("slideswitcher--hide");
    $buttonPrev.classList.remove("slideswitcher--hide");

    if (curSlide <= 1) {
        $buttonPrev.classList.add("slideswitcher--hide");
    }

    if (curSlide >= numPics) {
        $buttonNext.classList.add("slideswitcher--hide");
    }

    $carousel.style.setProperty("transform", `translateX(${(curSlide - 1) * -(100 / numPics)}%)`);
    try {
        $dots.forEach(($dot) => $dot.classList.remove("dot--active"));
        $dots[curSlide - 1].classList.add("dot--active")
    } catch (e) { }

}

function toggleButton($button, $icon, state1, state2) {
    $icon.classList.toggle("iconcontainer--active");
    $button.title == state1 ? $button.title = state2 : $button.title = state1;
}

function isEmpty(str) {
    return !str.trim().length;
}

export default setCardBehavior;
