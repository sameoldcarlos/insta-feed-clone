import newUser from "../user/newUser.js"
let usersList = [];

const prepareUsers = async (numUsers) => {
    const urlGetRawUsers = `https://randomuser.me/api/?page=1&results=${numUsers}&format=json&nat=br&inc=gender,email`;
    const requestRawUsers = async () => {
        const response = await fetch(urlGetRawUsers).then( res => res.json() )
        .then( values => fillUsersList(values.results) );
        return response;        
    }

    await requestRawUsers();
    return usersList;
}

const fillUsersList = (arrayRawUsers) => {
    const dividers = ["", "_", "."];
    arrayRawUsers.forEach(rawUser => {
        const user = newUser(rawUser, dividers);        
        usersList.push(user);
    });
}

 export default prepareUsers;