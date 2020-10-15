const TransferOwnership = async (newOwnerId, oldOwnerId, projectId, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS+`/project/transfer`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    newOwnerId: newOwnerId,
                    oldOwnerId: oldOwnerId,
                    projectId: projectId,
                })
        })
        .then((response) => { return response.json(); })
        .then((data) => { return data; });
    } catch (error) {
        console.log(error)
    }
};

export {TransferOwnership};
