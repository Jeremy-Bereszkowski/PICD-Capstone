import callAPI from '../callAPI'

const GetProjectSettings = async (projectId, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS + `/project/${projectId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => { return response.json(); })
            .then((data) => {
                data.project.email = callAPI.decrypt(data.project.email)

                return data;
            });
    } catch (error) {
        console.log(error)
    }
};

const GetProjectUserList = async (projectId, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS + `/project/${projectId}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => { return response.json(); })
        .then((data) => {
            data.projectUsers.forEach(element => {
                element.email = callAPI.decrypt(element.email)
            });

            return data;
        });
    } catch (error) {
        console.log(error)
    }
};

const RemoveProjectUser = async (projectId, uid, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS + `/project/${projectId}/remove-user/${uid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => { return response.json(); })
            .then((data) => { return data; });
    } catch (error) {
        console.log(error)
    }
};

const UpdateProject = async (projectId, title, description, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS + `/project/${projectId}/update`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: title,
                description: description,
            })
        })
        .then((response) => { return response.json(); })
        .then((data) => {
            data.projectUsers.forEach(element => {
                element.email = callAPI.decrypt(element.email)
            });

            return data;
        });
    } catch (error) {
        console.log(error)
    }
};

const DeleteProject = async (projectId, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS + `/dashboard/delete/${projectId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => { return response.json(); })
            .then((data) => { return data; });
    } catch (error) {
        console.log(error)
    }
};


export {GetProjectSettings, GetProjectUserList, RemoveProjectUser, UpdateProject, DeleteProject};
