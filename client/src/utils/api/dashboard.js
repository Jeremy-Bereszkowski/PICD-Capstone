import callAPI from '../callAPI'

const GetDashboard = async (uid, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS+`/dashboard/${callAPI.encrypt(uid)}/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
        }).then((response) => { return response.json(); })
        .then((data) => { return data; });
    } catch (error) {
        console.log(error)
    }
};

export {GetDashboard};
