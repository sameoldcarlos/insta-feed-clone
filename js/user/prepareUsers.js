import newUser from "../user/newUser.js"

const dividers = ["", "_", "."];

async function prepareUsers(numUsers) {
    const getUsersUrl = `https://randomuser.me/api/?page=1&results=${numUsers}&format=json&nat=br&inc=gender,name,picture`;
    const {results} = await fetch(getUsersUrl).then(res => res.json());

    return results.map(rawUser => newUser(rawUser, dividers))
}

 export default prepareUsers;
 