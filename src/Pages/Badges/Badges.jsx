import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import "./style.scss";
import { BsChevronRight, BsFilter } from "react-icons/bs";
import badgesBg from "../../assets/img/badge_header.svg";
import starBadge from "../../assets/img/Star_Badge.png";
import likeBadge from "../../assets/img/like_badge.png";
import MonitorBadge from "../../assets/img/Monitor_Badge.png";
import shuttleBadge from "../../assets/img/Shuttle_Badge_Color.png";
import cupBadge from "../../assets/img/Cup_Badge_Color.png";
import medalBadge from "../../assets/img/Medal_Badge_Color.png";
import growthBadge from "../../assets/img/Growth_Badge_Color.png";

import { ProgressComp } from "../../stories/Progress/Progress";
import { Figure } from "react-bootstrap";
import Layout from "../../Layout";
// import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";

const BadgesComp = () => {
  const badgesList = [
    {
      icon: starBadge,
      name: "Knowledge Keeper",
      date: "19 November, 2021 ",
    },
    {
      icon: likeBadge,
      name: "Rockstar",
      date: "19 November, 2021 ",
    },
    {
      icon: MonitorBadge,
      name: "Badge Name",
      date: "19 November, 2021 ",
    },
    {
      icon: likeBadge,
      name: "Badge Name",
      date: "19 November, 2021 ",
    },
    // {
    //   icon: starBadge,
    //   name: "Knowledge Keeper",
    //   date: "19 November, 2021 ",
    // },
  ];
  const progressProp = {
    label: "Progress",
    options: [{ id: 1, teams: "CSK", percent: 50, status: "active" }],
  };
  const ProgressCardList = [
    {
      icon: shuttleBadge,
      name: "Challenger",
      count: "300/600",
      text: "Lorem 50 ipsum dolor sit amet",
    },
    {
      icon: cupBadge,
      name: "Ten to the Fourth",
      count: "300/600",
      text: "Lorem 50 ipsum dolor sit amet",
    },
    {
      icon: medalBadge,
      name: "Collaborator",
      count: "300/600",
      text: "Lorem 50 ipsum dolor sit amet",
    },
    {
      icon: growthBadge,
      name: "Mad Scientist",
      count: "300/600",
      text: "Lorem 50 ipsum dolor sit amet",
    },
    {
      icon: shuttleBadge,
      name: "Making progress",
      count: "300/600",
      text: "Lorem 50 ipsum dolor sit amet",
    },
    {
      icon: medalBadge,
      name: "Badge Name",
      count: "300/600",
      text: "Lorem 50 ipsum dolor sit amet",
    },
    ,
    {
      icon: cupBadge,
      name: "Badge Name",
      count: "300/600",
      text: "Lorem 50 ipsum dolor sit amet",
    },
    ,
    {
      icon: medalBadge,
      name: "Badge Name",
      count: "300/600",
      text: "Lorem 50 ipsum dolor sit amet",
    },
    ,
    {
      icon: medalBadge,
      name: "Badge Name",
      count: "300/600",
      text: "Lorem 50 ipsum dolor sit amet",
    },
  ];
  return (
    <Layout>
      <div className="badges-page">
        <Row className="m-0 badges-head">
          <Col xs={12} sm={12} md={12} xl={6} className="p-0 badges-content">
            <div>
              <h2>Learn more and earn Badges</h2>
              <p className="pt-1">
                The more badges you earn, the higher your level - and the more
                you’re recognized in the community for your contributions.
              </p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} xl={6} className="p-0 badgeHeader">
            <div className="courses-head">
              <Figure className="my-0">
                <img className="w-100 img-fluid" src={badgesBg} />
              </Figure>
            </div>
          </Col>
        </Row>
        <Row className="myBadges equal justify-content-center">
          {/* <Col>
          <h2 className="title">MY Badges</h2>
          <div className="d-flex badgesCard">
            {badgesList.map((badge) => {
              return (
                <div className="badge-card">
                  <img src={badge.icon} />
                  <p className="badge-name mt-3">{badge.name}</p>
                  <p className="badge-date">
                    EARNED ON: <span className="badge-time">{badge.date}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </Col> */}

          {badgesList.map((badge) => {
            return (
              <Col className="badgesCard mb-5 col-xs-12 col-sm-6 col-md-6 col-lg-3  col-12">
                <Card className="badge-card py-5 h-100">
                  <Figure className="w-100 text-center">
                    <CardImg
                      alt={badge.icon}
                      src={badge.icon}
                      style={{ width: "7.4rem" }}
                    />
                  </Figure>
                  <CardBody>
                    <CardTitle className="badge-name mb-4">
                      {badge.name}
                    </CardTitle>
                    <CardSubtitle className="badge-date">
                      EARNED ON:{" "}
                      <span className="badge-time">{badge.date}</span>
                    </CardSubtitle>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Row className="myBadges">
          <Col>
            <h2 className="title">Possible Badges</h2>
            <Row className="progressCard justify-content-center">
              {ProgressCardList.map((progress) => {
                return (
                  <Col xs={12} sm={6} md={6} xl={4} className="mb-4">
                    <Card className="progress-card">
                      <div className="d-flex">
                        <Figure className="my-auto" style={{ width: "7.4rem" }}>
                          <CardImg src={progress.icon} />
                        </Figure>
                        <CardBody className="progress-section">
                          <CardTitle className="progress-name mt-3">
                            {progress.name}
                            <span className="progress-count">
                              {progress.count}
                            </span>
                          </CardTitle>
                          <CardSubtitle className="progress-text">
                            <ProgressComp {...progressProp} />
                            <div className="progress-text mt-1">
                              {progress.text}
                            </div>
                          </CardSubtitle>
                        </CardBody>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default BadgesComp;
