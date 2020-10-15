
const NewProjectCollab = async (projectId, uid, collabId, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS+`/project/${projectId}/add-user/${uid}`,{
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                collabId: collabId
            })
        }).then((response) => { return response.json(); })
        .then((data) => { return data; });
    } catch (error) {
        console.log(error)
    }
};

export {NewProjectCollab};
