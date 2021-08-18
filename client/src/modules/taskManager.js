import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = "/api/task";

export const getAllUserTasks = () => {
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
                throw new Error("An unknown error occurred while trying to get your tasks.");
            }
        });
    });
};

export const addTask = (task) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("That's not yours, dont touch.");
            } else {
                throw new Error("An unknown error occurred while trying to add a task.");
            }
        });
    });
};

export const deleteTask = (taskId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${taskId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
    });
};

export const editTask = (task) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${task.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        }).then(res => {
            if (res.ok) {
                return;
            } else if (res.status === 401) {
                throw new Error("That's not yours.");
            } else {
                throw new Error("An unknown error occurred while trying to edit your task.");
            }
        });
    });
};

export const getTaskById = (id) => {
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
                throw new Error("An unknown error occurred while trying to get your task.");
            }
        });
    });
};