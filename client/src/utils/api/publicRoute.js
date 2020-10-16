import callAPI from '../callAPI'

const NewUser = async (email, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS+`/admin/users/new`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: callAPI.encrypt(email),
            })
        }).then((response) => { return response.json(); })
        .then((data) => { return data; });
    } catch (error) {
        console.log(error)
    }
};

export {NewUser};
