/* eslint-disable indent */
import { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';
import { Button } from '../../stories/Button';
import Layout from '../Layout';
import jsPDF from 'jspdf';
import { getCurrentUser, getNormalHeaders } from '../../helpers/Utils';
import TeacherCertificate from '../../assets/media/img/certificates/Mentor_KA.png';
import { useTranslation } from 'react-i18next';
import { KEY, URL } from '../../constants/defaultValues';
import { useSelector } from 'react-redux';
import { getLanguage } from '../../constants/languageOptions';
import Congo from '../../assets/media/survey-success.jpg';
import axios from 'axios';

const MyCertificate = () => {
    const { t } = useTranslation();
    const pdfRef = useRef(null);
    const currentUser = getCurrentUser('current_user');
    const language = useSelector((state) => state?.mentors.mentorLanguage);
    const [postSurveyStatus, setPostSurveyStatus] = useState('');
    let tempVar = postSurveyStatus === 'COMPLETED';
    const handleCertificateDownload = () => {
        const content = pdfRef.current;
        const doc = new jsPDF('l', 'px', [211, 298]);
        doc.html(content, {
            callback: function (doc) {
                doc.save('certificate.pdf');
            }
        });
    };

    useLayoutEffect(() => {
        let axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const lang = getLanguage(language);
        const final = lang.split('=');
        axiosConfig['params'] = {
            role: 'MENTOR',
            local: final[1]
        };
        axios
            .get(`${URL.getPostSurveyList}`, axiosConfig)
            .then((postSurveyRes) => {
                if (postSurveyRes?.status == 200) {
                    setPostSurveyStatus(
                        postSurveyRes.data.data[0].dataValues[1].progress
                    );
                }
            })
            .catch((err) => {
                return err.response;
            });
    }, [language]);
    return (
        <Layout>
            <Container className="presuervey mb-50 mt-5 ">
                <Fragment>
                    <Card className="course-sec-basic p-5">
                        {tempVar ? (
                            <CardBody>
                                <CardTitle
                                    className=" text-left pt-4 pb-4"
                                    tag="h2"
                                >
                                    {t('teacher_certificate.certificate')}
                                </CardTitle>
                                <p>
                                    {t('teacher_certificate.certificate_desc')}
                                </p>

                                <div
                                    ref={pdfRef}
                                    style={{ position: 'relative' }}
                                >
                                    <span
                                        className="text-capitalize"
                                        style={{
                                            position: 'absolute',
                                            top: '7.2rem',
                                            left: '9rem',
                                            fontSize: '0.75rem',
                                            fontWeight:'bold',
                                            fontFamily:"courier",
                                            color:'#000000'
                                        }}
                                    >
                                        {currentUser?.data[0]?.full_name}
                                    </span>
                                    <span
                                        className="text-capitalize"
                                        style={{
                                            position: 'absolute',
                                            top: '8.8rem',
                                            left: '5rem',
                                            fontSize: '0.75rem',
                                            fontWeight:'bold',
                                            fontFamily:"courier",
                                            color:'#000000'
                                        }}
                                    >
                                        {
                                            currentUser?.data[0]
                                                ?.organization_name
                                        }
                                    </span>
                                    <img
                                        src={TeacherCertificate}
                                        alt="certificate"
                                        style={{
                                            width: '297px',
                                            height: '209px',
                                            //border: '1px solid #ccc'
                                        }}
                                    />
                                </div>
                                <div className="text-right">
                                    <Button
                                        button="submit"
                                        label={t(
                                            'teacher_certificate.download'
                                        )}
                                        btnClass="primary mt-4"
                                        size="small"
                                        style={{ marginRight: '2rem' }}
                                        onClick={handleCertificateDownload}
                                    />
                                </div>
                            </CardBody>
                        ) : (
                            <div className="text-center">
                                <div>
                                    <img
                                        className="img-fluid w-25"
                                        src={Congo}
                                    ></img>
                                </div>
                                <div>
                                    <h2>
                                        {postSurveyStatus == 'COMPLETED'
                                            ? t(
                                                  'teacher_certificate.complete_post_survey_default'
                                              )
                                            : t(
                                                  'teacher_certificate.complete_postsurvey'
                                              )}
                                    </h2>
                                </div>
                            </div>
                        )}
                    </Card>
                </Fragment>
            </Container>
        </Layout>
    );
};

export default MyCertificate;
