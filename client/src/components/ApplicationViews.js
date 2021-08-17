import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import ProjectList from "./projects/ProjectList";
import Register from "./Register";

const ApplicationViews = ({ isLoggedIn }) => {
    return (
        <main>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/">
                    {isLoggedIn ? <ProjectList /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};

export default ApplicationViews;