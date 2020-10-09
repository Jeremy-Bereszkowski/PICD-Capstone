export const setId = (projectData, id) => {
    projectData.setState({ id })
}

export const setTitle = (projectData, title) => {
    projectData.setState({ title })
}

export const setDescription = (projectData, description) => {
    projectData.setState({ description })
}

export const setOwner = (projectData, owner) => {
    projectData.setState({ owner })
}

export const setCreatedAt = (projectData, created_at) => {
    projectData.setState({ created_at })
}

export const setUpdatedAt = (projectData, updated_at) => {
    projectData.setState({ updated_at })
}

export const setUsers = (projectData, users) => {
    projectData.setState({ users })
}

export const setStages = (projectData, stages) => {
    projectData.setState({ stages })
}