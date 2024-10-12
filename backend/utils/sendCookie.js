//Create token and save in cookie
export default (user, statusCode, res) => {

    //Create JWT Token
    const token = user.getJwtToken();

    //Options for cookie
    const options = {
        expires: {

        },

    }
}