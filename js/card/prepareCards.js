import getRandomIntInclusive from "../utils/getRandomIntInclusive.js";
import newCard from "./newCard.js";

const prepareCards = (cardsNumber, usersList, photos) => {
    const generatedCards = [];

    const timeStamp = "";
    for (let i = 0; i < cardsNumber; i++) {
        const author = usersList[getRandomIntInclusive(0, usersList.length - 1)];
        const usersListExceptAuthor = usersList.filter((user) => user != author);
        const firstLiker = usersListExceptAuthor[(getRandomIntInclusive(0, usersListExceptAuthor.length - 1))];
        const totalLikes = getRandomIntInclusive(2, 199);
        const comment1 = {
            cmm_author: (usersListExceptAuthor[getRandomIntInclusive(0, usersListExceptAuthor.length - 1)]).username,
            cmm_content: generateComment(5)
        };
        const comment2 = {
            cmm_author: (usersListExceptAuthor[getRandomIntInclusive(0, usersListExceptAuthor.length - 1)]).username,
            cmm_content: generateComment(5)
        }

        const numPicturesOnPost = getRandomIntInclusive(1, 4);
        const postPhotos = [];
        for (let j = 0; j < numPicturesOnPost; j++) {
            postPhotos.push(photos[photos.length - 1]);
            photos.pop();
        }
        const width = getRandomIntInclusive(614, 1080);
        const height = getRandomIntInclusive(411, 1080);
        const postPics = postPhotos.map((photo) => photo = `${photo}&fit=crop&w=${width}&h=${height}`);
        const description = generateComment(6);
        const card = newCard(author, firstLiker, totalLikes, comment1, comment2, postPics, description, timeStamp);
        generatedCards.push(card);
    }

    return generatedCards;
}

const generateComment = (wordsNumber) => {
    const lorem = "lorem ipsum dolor sit amet consectetur adipiscing elit nam eu interdum arcu ut sollicitudin leo aenean vel nisi felis etiam non felis dui integer tempor venenatis auctor praesent justo elit vulputate ut metus quis blandit fermentum velit vestibulum consectetur turpis eget lectus accumsan a gravida purus eleifend suspendisse vel tincidunt justo nam lacinia dictum lorem ut lobortis mi faucibus condimentum Morbi rutrum suscipit erat ac porttitor nunc dictum et curabitur gravida nisi id augue sagittis 😂 😮 😍 😢 👏 🔥 🎉 ❤️ 🤣 🥰 😘 😭 😊 🤠 😎 🥵 💩 👀 🌻 🌼 🌷 🌱 🍀 🍇 🥭"
    const wordsList = lorem.split(" ");
    let comment = "";
    for (let i = 0; i < wordsNumber; i++) {
        comment = comment + " " + wordsList[getRandomIntInclusive(0, wordsList.length - 1)];
    }

    return comment.toLocaleLowerCase();
}

export default prepareCards;
