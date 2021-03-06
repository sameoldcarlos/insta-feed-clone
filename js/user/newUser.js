import getRandomIntInclusive from "../utils/getRandomIntInclusive.js";

const newUser = (rawUser, dividers) => {
    const sufixes = ["", `${getRandomIntInclusive(0, 9)}${getRandomIntInclusive(0, 9)}`];

    const middle = dividers[getRandomIntInclusive(0, dividers.length - 1)];
    const prefix = dividers[getRandomIntInclusive(0, dividers.length - 1)];
    const sufix = sufixes[getRandomIntInclusive(0, sufixes.length - 1)];
    
    const rawUserName = rawUser.email.split("@")[0];
    const firstName = rawUserName.split(".")[0];
    const lastName = rawUserName.split(".")[1];
    const username = `${prefix}${firstName}${middle}${lastName}${sufix}`;

    const user = {
        username: username,
        profile_pic: `https://fakeface.rest/thumb/view/${firstName}${lastName}?gender=${rawUser.gender}&minimum_age=18`,
        gender: rawUser.gender,
        has_story: Math.random() < 0.5
    };

    return user;
        
}

export default newUser;