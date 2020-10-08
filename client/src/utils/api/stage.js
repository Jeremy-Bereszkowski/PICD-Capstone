import React from "react";

/**
 * Get an array of all the versions of the current stage.
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
 * Get the stage details
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

export {GetStage, GetStageDetails, SubmitNewVersion};
