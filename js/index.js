import mountCard from "./card/mountCard.js";
import prepareCards from "./card/prepareCards.js";
import setCardBehavior from "./card/setCardBehavior.js";
import prepareUsers from "./user/prepareUsers.js";
import requestPictures from "./utils/requestPictures.js";

window.onload = async () => {
    const $moreOptionsContainer = document.querySelector("#moreoptionscontainer");
    const $moreOptionsPanel = document.querySelector("#moreoptionspanel");
    const $content = document.querySelector(".content");
    const $cancelOption = document.querySelectorAll(".followingoption")[document.querySelectorAll(".followingoption").length - 1];

    const cardContainer = document.querySelector(".card-container");
    const picturesGlobalList = [];
    const listPics = await requestPictures();
    listPics.forEach((picture) => picturesGlobalList.push(picture));
    const users = await prepareUsers(80);

    const feed = (numCards) => {
        const cardsList = prepareCards(numCards, users, picturesGlobalList);
        cardsList.forEach((card) => {
            const $card = document.createElement("article");
            $card.classList.add("card");
            $card.insertAdjacentHTML("beforeend", mountCard(card));
            setCardBehavior($card);
            const $botaoMoreOptions = $card.querySelector(".moreoptions");

            $botaoMoreOptions.addEventListener("click", showMoreOptionsPanel);
            cardContainer.appendChild($card);
        });
    }

    feed(10);

    window.addEventListener('scroll', async () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            if (picturesGlobalList.length <= 20) {
                let listPics = await requestPictures();
                listPics.forEach((picture) => picturesGlobalList.push(picture));
            }
            feed(5);
        }
    });

    $cancelOption.addEventListener("click", function () {
        hideMoreOptionsPanel();
    });

    $moreOptionsPanel.addEventListener('click', function (event) {
        let isClickInsideElement = $moreOptionsContainer.contains(event.target);
        if (!isClickInsideElement) {
            hideMoreOptionsPanel();
        }
    });

    function showMoreOptionsPanel() {
        $moreOptionsPanel.classList.add("moreoptionspanel--visible");
        $content.classList.add("content--inactive");

        const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        const $body = document.body;
        $body.style.position = 'fixed';
        $body.style.top = `-${scrollY}`;

    }

    function hideMoreOptionsPanel() {
        const $body = document.body;
        const scrollY = $body.style.top;
        $body.style.position = '';
        $body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);

        $body.style.position = '';
        $moreOptionsPanel.classList.remove("moreoptionspanel--visible");
        $content.classList.remove("content--inactive");
    }
    window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    });
}