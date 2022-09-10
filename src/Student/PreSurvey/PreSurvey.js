import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import { Button } from '../../stories/Button';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import Layout from '../Layout';
import { URL, KEY } from '../../constants/defaultValues';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import axios from 'axios';
import Congo from '../../assets/media/img/congo.svg';

const PreSurvey = () => {
    const [preSurveyList, setPreSurveyList] = useState([]);
    const [quizSurveyId, setQuizSurveyId] = useState(0);
    const [preSurveyStatus, setPreSurveyStatus] = useState('COMPLETED');

    const formik = useFormik({
        initialValues: {},
        onSubmit: async (values) => {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);

            console.log(
                '🚀 ~ file: PreSurvey.js ~ line 39 ~ onSubmit: ~ values',
                values,
                quizSurveyId
            );

            let responsesData = Object.keys(values).map((eachValues) => {
                let selected = values[eachValues].split(' -- ');
                return {
                    quiz_survey_question_id: selected[0],
                    selected_option: selected[1]
                };
            });

            let submitData = {
                responses: responsesData
            };
            console.log(
                '🚀 ~ file: PreSurvey.js ~ line 54 ~ onSubmit: ~ submitData',
                submitData
            );

            return await axios
                .post(
                    `${URL.getPreSurveyList}/${quizSurveyId}/responses`,
                    JSON.stringify(submitData, null, 2),
                    axiosConfig
                )
                .then((preSurveyRes) => {
                    if (preSurveyRes?.status == 200) {
                        openNotificationWithIcon(
                            'success',
                            'PreSurvey is been submitted successfully..!!',
                            ''
                        );

                        formik.resetForm();
                    }
                })
                .catch((err) => {
                    return err.response;
                });
        }
    });

    useEffect(() => {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        axios
            .get(`${URL.getPreSurveyList}?role=STUDENT`, axiosConfig)
            .then((preSurveyRes) => {
                if (preSurveyRes?.status == 200) {
                    console.log(
                        '🚀 ~ file: PreSurvey.js ~ line 76 ~ .then ~ preSurveyRes',
                        preSurveyRes
                    );
                    setQuizSurveyId(
                        preSurveyRes.data.data[0].dataValues[0].quiz_survey_id
                    );
                    setPreSurveyStatus(
                        preSurveyRes.data.data[0].dataValues[0].progress
                    );
                    let allQuestions = preSurveyRes.data.data[0].dataValues[0];
                    setPreSurveyList(allQuestions.quiz_survey_questions);
                }
            })
            .catch((err) => {
                return err.response;
            });
    }, []);

    return (
        <Layout>
            <Container className="presuervey mb-50 mt-5 ">
                <Col>
                    <Row className=" justify-content-center">
                        <Card className="aside  mb-5 p-4">
                            <CardBody>
                                {preSurveyStatus != 'COMPLETED' && (
                                    <Form
                                        className="form-row row mb-5 mt-3 py-5"
                                        onSubmit={formik.handleSubmit}
                                        isSubmitting
                                    >
                                        {preSurveyList.map(
                                            (eachQuestion, i) => (
                                                <Row key={i}>
                                                    <div className="question quiz">
                                                        <b>
                                                            {i + 1}.{' '}
                                                            {
                                                                eachQuestion.question
                                                            }
                                                        </b>
                                                    </div>
                                                    <div className="answers">
                                                        <FormGroup
                                                            tag="fieldset"
                                                            className="w-100"
                                                            id="radioGroup1"
                                                            label="One of these please"
                                                            value={
                                                                formik.values
                                                                    .radioGroup1
                                                            }
                                                            error={
                                                                formik.errors
                                                                    .radioGroup1
                                                            }
                                                            touched={
                                                                formik.touched
                                                                    .radioGroup1
                                                            }
                                                            onChange={
                                                                formik.handleChange
                                                            }
                                                            onBlur={
                                                                formik.handleBlur
                                                            }
                                                        >
                                                            <FormGroup
                                                                check
                                                                className="mx-5"
                                                            >
                                                                <Label check>
                                                                    <Input
                                                                        type="radio"
                                                                        name={`radioGroup${i}`}
                                                                        id="radioOption1"
                                                                        value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_a}`}
                                                                    />{' '}
                                                                    {
                                                                        eachQuestion.option_a
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup
                                                                check
                                                                className="mx-5"
                                                            >
                                                                <Label check>
                                                                    <Input
                                                                        type="radio"
                                                                        name={`radioGroup${i}`}
                                                                        id="radioOption2"
                                                                        value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_b}`}
                                                                    />{' '}
                                                                    {
                                                                        eachQuestion.option_b
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup
                                                                check
                                                                className="mx-5"
                                                            >
                                                                <Label check>
                                                                    <Input
                                                                        type="radio"
                                                                        name={`radioGroup${i}`}
                                                                        id="radioOption3"
                                                                        value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_c}`}
                                                                    />{' '}
                                                                    {
                                                                        eachQuestion.option_c
                                                                    }
                                                                </Label>
                                                            </FormGroup>

                                                            <FormGroup
                                                                check
                                                                className="mx-5"
                                                            >
                                                                <Label check>
                                                                    <Input
                                                                        type="radio"
                                                                        name={`radioGroup${i}`}
                                                                        id="radioOption4"
                                                                        value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_d}`}
                                                                    />{' '}
                                                                    {
                                                                        eachQuestion.option_d
                                                                    }
                                                                </Label>
                                                            </FormGroup>

                                                            <hr />
                                                        </FormGroup>
                                                    </div>
                                                </Row>
                                            )
                                        )}

                                        <div className="text-right">
                                            <Button
                                                type="submit"
                                                btnClass={
                                                    !(
                                                        formik.dirty &&
                                                        formik.isValid
                                                    )
                                                        ? 'default'
                                                        : 'primary'
                                                }
                                                disabled={
                                                    !(
                                                        formik.dirty &&
                                                        formik.isValid
                                                    )
                                                }
                                                size="small"
                                                label="Submit"
                                            />
                                        </div>
                                    </Form>
                                )}

                                {preSurveyStatus == 'COMPLETED' && (
                                    <div style={{ textAlign: 'center' }}>
                                        <div>
                                            <img src={Congo}></img>
                                        </div>
                                        <div>
                                            <h2>
                                                Pre Survery is already been
                                                submitted
                                            </h2>
                                        </div>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </Row>
                </Col>
            </Container>
        </Layout>
    );
};

export default PreSurvey;
