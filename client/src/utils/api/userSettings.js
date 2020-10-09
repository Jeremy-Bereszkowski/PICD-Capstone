import callAPI from '../callAPI'

const GetUser = async (uid, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS+`/admin/users/${callAPI.encrypt(uid)}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => { return response.json(); })
        .then((data) => {
            const user = {
                user_id: data.user.user_id,
                email: callAPI.decrypt(data.user.email)
            }

            return user;
        });
    } catch (error) {
        console.log(error)
    }
};

export {GetUser};
