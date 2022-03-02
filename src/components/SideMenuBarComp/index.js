import React from "react";
import { Switch, Route } from "react-router-dom";
import { Link, withRouter } from 'react-router-dom';

import Dashboard from "../../Pages/Dashboard";
import Badges from "../../Pages/Badges";
import Courses from "../../Pages/Courses";
import CourseView from "../../Pages/Courses/coursesView"
import Menu from "./Menu";
import {Row, Col} from "react-bootstrap";
import "./style.scss";

export default function Layout() {
  return (
    <div className="sideBar">
        <Row className="m-0">
        <Col xs={6} md={2} className="app__sidebar">
        <Menu />

      </Col>
      <Col xs={12} md={10} className="app__content p-0">
        <Switch>
          <Route path="/about" component={Dashboard} />
          <Route path="/badges" component={Badges} />
          <Route path="/courses" component={Courses} />
          <Route path="/coursesView" component={CourseView} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Col>
        </Row>
      

     
    </div>
  );
}
