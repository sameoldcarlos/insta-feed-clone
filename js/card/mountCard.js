const mountCard = (cardObj) => {
    const story = cardObj.story ? " circlestory--active" : "";
    let images = ``;
    const imagesWidth = 100/cardObj.photos.length;
    (cardObj.photos).forEach((photo) => {
        images = `${images}
        <img class="cardcontent__image" src=${photo} alt="" style="width: ${imagesWidth}%;">
        `
    });
    let dots = ``;
    let buttonNext = `<button class="slideswitcher slideswitcher--next slideswitcher--hide" id="plus"></button>`
    if((cardObj.photos).length>1){
        buttonNext = `<button class="slideswitcher slideswitcher--next" id="plus"></button>`
        dots = `<div class="dot dot--active"></div>`
        for(let i=0; i<((cardObj.photos).length-1); i++){
        dots = `${dots}        
        <div class="dot"></div>
        `}
    }
    const $card = (`
        <div class="cardheader">
            <div class="userinfo">
                <div class="circlestory${story}">
                    <div class="userpic" style="background-image: url(${cardObj.author_pic})"></div>
                </div>
                <span class="username">
                    <a class="username__link">${cardObj.author}</a>
                </span>
            </div>
            <div class="moreoptions" title="Mais opções">
                <img class="moreoptions__icon"src="/assets/images/more-options.svg" alt="Mais opções">
            </div>
        </div>
        <div class="cardmain">
            <div class="carousel-wrapper">
                <button class="slideswitcher slideswitcher--prev slideswitcher--hide" id="minus"></button>
                ${buttonNext}
                <div class="like-container"><span class="like-icon like-icon--big"></span></div>
                <div class="cardcontent">
                    <div class="cardcarousel" style="width: ${100*cardObj.photos.length}%;">
                        ${images}
                    </div>
                </div>
            </div>
            
            <div class="cardoptions">
                <button class="cardbutton cardbutton--heart" title="Curtir">
                    <span class="iconcontainer iconcontainer--likecontainer"></span>
                </button>
                <button class="cardbutton cardbutton--comment">
                    <span class="iconcontainer"></span>
                </button>
                <button class="cardbutton cardbutton--share">
                    <span class="iconcontainer"></span>
                </button>
                <div class="dotscontainer dotscontainer--visible">
                    ${dots} 
                </div>
                <button class="cardbutton cardbutton--save" title="Salvar">
                    <span class="iconcontainer iconcontainer--savecontainer"></span>
                </button>
            </div>
        </div>
        <div class="cardfooter">
            <div class="likes">
                <div class="otheruserpic" style="background-image: url(${cardObj.first_like_pic});"></div>
                <span class="likesinfo">Curtido por 
                    <a class="otherusername">${cardObj.first_like_name}</a> 
                    e 
                    <a class="otherlikes">outras ${cardObj.total_likes} pessoas</a>
                </span>
            </div>
            <span class="description">
                <span class="username"><a class="username__link">${cardObj.author}</a></span>
                ${cardObj.description}
            </span>
            <div class="comments">
                <div class="seeall"><a class="seeall__link">Ver todos os 6 comentários</a></div>
                <div class="comment">
                    <span class=commentinfo><a class="otherusername">${(cardObj.comments[0]).cmm_author}</a>
                    <span class=commentbody>${(cardObj.comments[0]).cmm_content}</span></span>
                    <button class="cardbutton cardbutton--heart cardbutton--likecomment" title="Curtir">
                        <span class="iconcontainer iconcontainer--likecomment iconcontainer--likecontainer"></span>
                    </button>
                </div>
                <div class="comment">
                    <span class=commentinfo><a class="otherusername">${(cardObj.comments[1]).cmm_author}</a>
                    <span class=commentbody>${(cardObj.comments[1]).cmm_content}</span></span>
                    <button class="cardbutton cardbutton--heart cardbutton--likecomment" title="Curtir">
                        <span class="iconcontainer iconcontainer--likecomment iconcontainer--likecontainer"></span>
                    </button>
                </div>
            </div>
            <div class="time">
                <a class="time__info">Há 3 horas</a>
            </div>
            <div class="leaveacomment">
                <form class="formcomment">
                    <button class="emojibutton" type="button">
                        <span class="iconcontainer""></span>
                    </button>
                    <textarea 
                        class="formcomment__text"
                        name="Área de comentário"
                        placeholder="Adicione um comentário..."></textarea>
                    <button class="pubblishbutton" type="button">Publicar</button>
                </form>
            </div>
        </div>
    `);
    return $card;
}

export default mountCard;