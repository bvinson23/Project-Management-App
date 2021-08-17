import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { NavbarToggler, NavbarBrand } from "reactstrap";
import { getAllUserProjects } from "../../modules/projectManager";
import Project from "./ProjectCard";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    const getProjects = () => {
        getAllUserProjects().then(projects => setProjects(projects));
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <>
            <div>
                <h1>Projects</h1>
            </div>
            <div>
                {projects.map((project) => (
                    <Project project={project} key={project.id} getProjects={getProjects} />
                ))}
            </div>
        </>
    )
}

export default ProjectList;