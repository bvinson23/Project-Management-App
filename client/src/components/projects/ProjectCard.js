import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { deleteProject } from "../../modules/projectManager";

const Project = ({ project, getProjects }) => {
    const history = useHistory();
    const deleteSelectedProject = (evt) => {
        evt.preventDefault();
        let result = window.confirm(`Are you sure you want to delete ${project.name}?`);
        if (result) {
            deleteProject(project.id).then(() => getProjects());
        }
    }
    
    return (
        <Container>
            <Row>{project.name}</Row>
            <Row>{project.number}</Row>
            <Row>Earliest Due Date (placeholder)</Row>
        </Container>
    )
};

export default Project;