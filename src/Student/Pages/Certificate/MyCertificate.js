import { Fragment, useLayoutEffect, useRef } from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import { Button } from '../../../stories/Button';
import Layout from '../../Layout';
import jsPDF from 'jspdf';
import { getCurrentUser } from '../../../helpers/Utils';
import courseCompletionCertificate from '../../../assets/media/img/certificates/Student_KA.png';
import ideaSubmissionCertificate from '../../../assets/media/img/certificates/Student_KA_idea_submission.png';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    getStudentChallengeSubmittedResponse,
    getStudentDashboardStatus,
    studentPostSurveyCertificate,
    updateStudentBadges,
    updateStudentCertificate
} from '../../../redux/studentRegistration/actions';
import Congo from '../../../assets/media/survey-success.jpg';

const Certificate = ({
    type,
    currentUser,
    postSurveyStatus,
    language
}) => {
    const { t } = useTranslation();
    const pdfRef = useRef(null);
    const partRef = useRef(null);
    const dispatch = useDispatch();
    const handleCertificateDownload = () => {
        const content = type ? partRef.current : pdfRef.current;
        const badge = 'the_finisher';
        const doc = new jsPDF('l', 'px', [298, 211]);
        const certName = `${currentUser?.data[0]?.full_name}_${
            type ? 'idea_certificate' : 'course_certificate'
        }`;
        doc.html(content, {
            callback: function (doc) {
                doc.save(certName);
            }
        });
        if (!type)
            dispatch(
                updateStudentBadges(
                    { badge_slugs: [badge] },
                    currentUser?.data[0]?.user_id,
                    language,
                    t
                )
            );
        if (!type)
            dispatch(
                updateStudentCertificate(currentUser?.data[0]?.student_id)
            );
    };

    return (
        <Card
            className="course-sec-basic p-5 m-4 w-100"
            style={{
                backgroundColor: `${postSurveyStatus ? '' : 'lightgrey'}`
            }}
        >
            <CardBody>
                <CardTitle className=" text-left pt-4 pb-4" tag="h2">
                    {type
                        ? t('teacher_certificate.participate_certificate')
                        : t('teacher_certificate.certificate')}
                </CardTitle>
                <div className="common-flex">
                    <div
                        ref={type ? partRef : pdfRef}
                        className="position-relative"
                        style={{ width: 'fit-content' }}
                    >
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: `${type ? '7.3rem' : '7.2rem'}`,
                                left: `${type ? '9rem' : '9rem'}`,
                                fontSize: '0.75rem',
                                fontFamily:"courier",
                                fontWeight:'bold',
                                color:'#000000'
                                
                            }}
                        >
                            {currentUser?.data[0]?.full_name}
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: `${type ? '8.9rem' : '8.8rem'}`,
                                left: `${type ? '5rem' : '5rem'}`,
                                fontSize: '0.75rem',
                                fontFamily:"courier",
                                fontWeight:'bold',
                                color:'#000000'
                            }}
                        >
                            {currentUser?.data[0]?.organization_name}
                        </span>
                        <img
                            src={
                                type
                                    ? ideaSubmissionCertificate
                                    : courseCompletionCertificate
                            }
                            alt="certificate"
                            style={{
                                width:'297px',
                                height:'210px',
                            }}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <Button
                        button="submit"
                        disabled={!postSurveyStatus}
                        label={
                            type
                                ? t('teacher_certificate.download_participate')
                                : t('teacher_certificate.download')
                        }
                        btnClass={`${
                            postSurveyStatus ? 'primary' : 'default'
                        } mt-4`}
                        size="small"
                        style={{ marginRight: '2rem' }}
                        onClick={handleCertificateDownload}
                    />
                </div>
            </CardBody>
        </Card>
    );
};

const MyCertificate = () => {
    const showDummypage = false;
    const { t } = useTranslation();
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const postSurveyStatusGl = useSelector(
        (state) => state?.studentRegistration?.postSurveyStatusGl
    );
    const dashboardStatus = useSelector(
        (state) => state?.studentRegistration?.dashboardStatus
    );
    const ideaSubmissionStatus = useSelector(
        (state) => state?.studentRegistration.ideaSubmissionStatus
    );
    const ideaSubmissionsSubmittedAt = useSelector(
        (state) => state?.studentRegistration?.challengesSubmittedResponse[0]
    );
    let { all_topics_count, topics_completed_count } = dashboardStatus
        ? dashboardStatus
        : { all_topics_count: null, topics_completed_count: null };
    const currentUser = getCurrentUser('current_user');
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        if (!dashboardStatus)
            dispatch(
                getStudentDashboardStatus(
                    currentUser?.data[0]?.user_id,
                    language
                )
            );
        if (!ideaSubmissionStatus)
            dispatch(
                getStudentChallengeSubmittedResponse(
                    currentUser?.data[0]?.team_id,
                    language
                )
            );
        if (!ideaSubmissionsSubmittedAt)
            dispatch(
                getStudentChallengeSubmittedResponse(
                    currentUser?.data[0]?.team_id,
                    language
                )
            );
        if (!postSurveyStatusGl)
            dispatch(studentPostSurveyCertificate(language));
    }, [language]);
    const enablePostSurvey = ideaSubmissionStatus === 'SUBMITTED';
    return (
        <Layout>
            <Container className="presuervey mb-50 mt-5 ">
                <Fragment>
                    {!showDummypage ? (
                        <Row>
                            <Col className="d-lg-flex justify-content-center">
                                <Certificate
                                    type={'participate'}
                                    currentUser={currentUser}
                                    postSurveyStatus={enablePostSurvey}
                                    ideaDate={ideaSubmissionsSubmittedAt}
                                    language={language}
                                />
                                <Certificate
                                    language={language}
                                    currentUser={currentUser}
                                    certDate={dashboardStatus}
                                    postSurveyStatus={
                                        all_topics_count ===
                                        topics_completed_count
                                    }
                                />
                            </Col>
                        </Row>
                    ) : (
                        <Card className="course-sec-basic p-5">
                            <div className="text-left">
                                <div>
                                    <img
                                        className={`${'w-25'} img-fluid `}
                                        src={Congo}
                                    ></img>
                                </div>
                                <h6
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            t('dummytext.name') +
                                            currentUser?.data[0].full_name
                                    }}
                                ></h6>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            t('dummytext.certificate_msg') +
                                            t('dummytext.student_my_cer')
                                    }}
                                ></p>
                            </div>
                        </Card>
                    )}
                </Fragment>
            </Container>
        </Layout>
    );
};

export default MyCertificate;
