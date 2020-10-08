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

export {GetStage, GetStageDetails};
