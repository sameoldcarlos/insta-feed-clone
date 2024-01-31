import getUserName from "../utils/getUserName.js";

const newUser = (rawUser) => {
    const {name: {first, last}, picture: {thumbnail}, gender} = rawUser;
    
    const username = getUserName(first, last);

    const user = {
        username,
        gender,
        profile_pic: thumbnail,
        has_story: Math.random() < 0.5
    };

    return user;
}

export default newUser;
