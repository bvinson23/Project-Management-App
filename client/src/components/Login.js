import React, { useState } from "react";
import { useHistory, Link } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { login } from "../modules/authManager";

export default function Login() {
    const history = useHistory();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => history.push("/dashboard"))
            .catch(() => alert("Login Failed"));
    };

    return (
        <div>
            <div className="p-5 my-5 mx-5 rounded">
                <div>Login</div>
                <Form onSubmit={loginSubmit}>
                    <fieldset>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Button>Login</Button>
                        </FormGroup>
                    </fieldset>
                </Form>
            </div>
        </div>
    );
}