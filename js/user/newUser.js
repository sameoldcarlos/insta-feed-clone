import getRandomIntInclusive from "../utils/getRandomIntInclusive.js";

const newUser = (rawUser, dividers) => {
    const sufixes = ["", `${getRandomIntInclusive(0, 9)}${getRandomIntInclusive(0, 9)}`];

    const middle = dividers[getRandomIntInclusive(0, dividers.length - 2)];
    const prefix = dividers[getRandomIntInclusive(0, dividers.length - 1)];
    const sufix = sufixes[getRandomIntInclusive(0, sufixes.length - 1)];
    
    const {name: {first, last}, picture: {thumbnail}, gender} = rawUser;
    const username = `${prefix}${first}${middle}${last}${sufix}`;

    const user = {
        username,
        gender,
        profile_pic: thumbnail,
        has_story: Math.random() < 0.5
    };

    return user;
        
}

export default newUser;