import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, Container, Row } from "reactstrap";

const Task = () => {
    const history = useHistory();

    return (
        <Container>
            <Card>
                <CardBody>
                    <Row>Project Name:</Row>
                    <Row>Deadline</Row>
                    <Row>Priority Level</Row>
                    <Button>Delete Task</Button>
                    <Button>Back to Project</Button>
                    <Button>Mark as Completed</Button>
                </CardBody>
            </Card>
        </Container>
    );
};

export default Task;