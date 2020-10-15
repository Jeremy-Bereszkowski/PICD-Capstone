/**
 * Get an array of all the versions of the current stage.
 * 
 * @param {*} projectId 
 * @param {*} stageId 
 * @param {*} getAccessTokenSilently 
 */
const GetStage = async (projectId, stageId, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS + `/project/version/${projectId}/${stageId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }})
            .then((response) => { return response.json(); })
            .then(res => { return res; });
    } catch (error) {
        console.log(error)
    }
};

/**
 * Get All Stages
 * 
 * @param {*} projectId 
 * @param {*} getAccessTokenSilently 
 */
const GetStages = async (projectId, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS+`/project/${projectId}/stages`,
            {
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

/**
 * 
 * Get the stage details
 * 
 * @param {*} projectId 
 * @param {*} stageId 
 * @param {*} getAccessTokenSilently 
 */
const GetStageDetails = async (projectId, stageId, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS+`/project/${projectId}/stage/${stageId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }})
            .then((response) => { return response.json(); })
            .then(res => { return res; });
    } catch (error) {
        console.log(error)
    }
};

/**
 * Submit New Version
 * 
 * @param {*} projectId 
 * @param {*} stageId 
 * @param {*} newRevisionName 
 * @param {*} getAccessTokenSilently 
 */
const SubmitNewVersion = async (projectId, stageId, newRevisionName, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS+`/project/version/new/${projectId}/${stageId}`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                newRevisionName: newRevisionName
            })
        })
        .then((response) => { return response.json(); })
        .then(res => {
            return fetch(process.env.REACT_APP_API_SERVER_ADDRESS + `/project/version/${projectId}/${stageId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
        })
        .then((response) => { return response.json(); })
        .then(res => { return res; });
    } catch (error) {
        console.log(error)
    }
};

/**
 * 
 * Create New Stage
 * 
 * @param {*} projectId 
 * @param {*} stageName 
 * @param {*} userId 
 * @param {*} getAccessTokenSilently 
 */
const NewStage = async (projectId, stageName, userId, getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/project/'+project_id+'/stage/new', {
            method: 'post',
            headers: {
                'content-type': 'appliction/json',
                Authentication: `Bearer ${token}`
            },
            body: JSON.stringify({
                projectID: projectId,
                stageName: stageName,
                userID: userId
            })
        })
        .then((response) => { return response.json(); })
        .then(res => { return res; });


    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * Delete Stage
 * 
 * @param {*} projectId 
 * @param {*} stageId 
 * @param {*} userId 
 */
const DeleteStage = async (projectId, stageId, userId) => {
    try {
        const token = await getAccessTokenSilently();

        return await fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/project/stage/delete', {
            method: 'post',
            headers: {
                'content-type': 'appliction/json',
                Authentication: `Bearer ${token}`
            },
            body: JSON.stringify({
                projectID: projectId,
                stageID: stageId,
                userID: userId
            })
        })
        .then((response) => { return response.json(); })
        .then(res => { return res; });
    } catch (error) {
        console.log(error)
    }
}

export {GetStage, GetStages, NewStage, GetStageDetails, SubmitNewVersion, DeleteStage};


// newStage = (cb, user_id, project_id, stage_name, error) => {
//     fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/project/'+project_id+'/stage/new', {
//       method: 'post',
//       headers: {
//         'content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         userID: user_id,
//         projectID: project_id,
//         stageName: stage_name
//       })
//     }).then(res => {
//       const status = res.status;
//       const data = res.json();
//       return Promise.all([status, data])
//     })
//     .then(([status, data]) => {
//       if(status !== 200) {
//         error(data)
//       }else{
//         cb(data)
//       }
//     })
//     .catch((err) => {
//       error(err)
//     })
//   }

//   deleteStage = (cb, user_id, project_id, stage_id, error) => {
//     fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/project/stage/delete', {
//       method: 'post',
//       headers : {
//         'content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         userID: user_id,
//         projectID: project_id,
//         stageID: stage_id
//       })
//     }).then(res => {
//       const status = res.status;
//       const data = res.json();
//       return Promise.all([status, data])
//     })
//     .then(([status, data]) => {
//       if(status !== 200) {
//         error(data)
//       }else{
//         cb(data)
//       }
//     })
//     .catch((err) => {
//       error(err)
//     })
//   }
// }