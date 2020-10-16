import callAPI from '../callAPI'

const NewProject = async (uid, title, description, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS+`/project/new/${callAPI.encrypt(uid)}/`,
            {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                })
        }).then((response) => { return response.json(); })
        .then((data) => { return data; });
    } catch (error) {
        console.log(error)
    }
};

export {NewProject};
