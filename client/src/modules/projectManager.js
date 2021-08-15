import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = "/api/project";

export const getAllUserProjects = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get your projects.")
            }
        });
    });
};

export const addProject = (project) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("That's not yours, don't touch it.");
            } else {
                throw new Error("An unknown error occurred while trying to save a project.");
            }
        });
    });
};

export const deleteProject = (projectId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${projectId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
    });
};

export const editProject = (project) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${project.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        }).then(res => {
            if (res.ok) {
                return;
            } else if (res.status === 401) {
                throw new Error("That's not yours.");
            } else {
                throw new Error("An unknow error occurred while trying to update your project.");
            }
        });
    });
};

export const getProjectById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get your project.");
            }
        });
    });
};