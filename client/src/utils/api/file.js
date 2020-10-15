
const GetFile = async (projectId, stageId, stageVersion, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS + `/media/${projectId}/${stageId}/${stageVersion}`,
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

export {GetFile};
