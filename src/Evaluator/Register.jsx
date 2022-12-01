/* eslint-disable indent */
import React from 'react';
import { Modal, Form, FormGroup  } from 'react-bootstrap';
import { InputBox } from '../stories/InputBox/InputBox';
import { EyeOutlined, EyeInvisibleOutlined, CalendarOutlined } from '@ant-design/icons';
import { Label } from 'reactstrap';
import { Button } from '../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import axios from 'axios';
// import { getNormalHeaders } from '../../helpers/Utils';
// import { URL, KEY } from '../../constants/defaultValues';
// import CryptoJS from 'crypto-js';

const Register = (props) => {
    const handleClose = () => {};
    const [showPassword, setShowPassword] = React.useState(false);
    
    const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const inputPhone = {
    type: 'text',
    placeholder: 'Evaluator Phone Number',
    className: 'defaultInput'
};

const inputEmail = {
    type: 'email',
    placeholder: 'Evaluator Email Address',
    className: 'defaultInput'
};

const inputName = {
    type: 'text',
    placeholder: 'Evaluator Full Name',
    className: 'defaultInput'
};
const password = {
    placeholder: 'Enter Minimum 8 Characters',
    className: 'defaultInput'
};
const inputDOB = {
    type: 'date',
    placeholder: 'Date Of Birth',
    className: 'defaultInput',
};
const inputQualification = {
    type: 'text',
    placeholder: 'Evaluator Qualification',
    className: 'defaultInput'
};
const inputCity = {
    type: 'text',
    placeholder: 'City Name',
    className: 'defaultInput'
};

const formik = useFormik({
    initialValues: {
        username: '',
        full_name: '',
        password: '',
        role: 'EVALUATER',
        date_of_birth: '',
        qualification: '',
        city: '',
        district: '',
        state: '',
        country: ''
    },

    validationSchema: Yup.object({
        full_name: Yup.string()
            .trim()
            .min(2, 'Enter Name')
            .matches(/^[aA-zZ\s]+$/, 'Not allowed')
            .required('Required'),
        mobile: Yup.string()
            .required('required')
            .trim()
            .matches(phoneRegExp, 'Contact number is not valid')
            .min(10, 'Please enter valid number')
            .max(10, 'Please enter valid number'),
        username: Yup.string()
            .trim()
            .email('Invalid username format')
            .required('Required'),
        password: Yup.string()
            .trim()
            .required('Password is required')
            .min(8, 'Your password should be minimum 8 characters')
            .matches(/[a-zA-Z0-9]/, 'Password should be only alphanumeric'),
        date_of_birth: Yup.date()
            .required('Required'),
        qualification: Yup.string()
            .trim()
            .required('Required'),
        city: Yup.string()
            .trim()
            .required('Required'),
    }),

    onSubmit: async (values) => {
        // const axiosConfig = getNormalHeaders(KEY.User_API_Key);

        // values.password = values.password.trim();
        // const key = CryptoJS.enc.Hex.parse('253D3FB468A0E24677C28A624BE0F939');
        // const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
        // const encrypted = CryptoJS.AES.encrypt(values.password, key, {
        //     iv: iv,
        //     padding: CryptoJS.pad.NoPadding
        // }).toString();
        // values.password = encrypted;
        // await axios
        //     .post(
        //         `${URL.mentorRegister}`,
        //         JSON.stringify(values, null, 2),
        //         axiosConfig
        //     )
        //     .then((mentorRegRes) => {
        //         if (mentorRegRes?.data?.status == 201) {
        //             setUserData(mentorRegRes?.data?.data[0]);
        //             props.setShow(false);
        //         }
        //     })
        //     .catch((err) => {
        //         formik.setErrors({
        //             check: err.response && err?.response?.data?.message
        //         });
        //         return err.response;
        //     });
        console.warn('values',values);
    }
});
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className="assign-evaluator ChangePSWModal teacher-register-modal"
    backdrop="static"
>
    <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title
            id="contained-modal-title-vcenter"
            className="w-100 d-block text-center"
        >
            Sign Up
        </Modal.Title>
    </Modal.Header>

    <Modal.Body>
        <div>
            <Form
                    className="form-row row  mt-0 pb-5"
                    onSubmit={formik.handleSubmit}
                    isSubmitting
                >
                    <FormGroup className="form-group mb-5" md={12}>
                        <Label className="mb-2" htmlFor="name">
                         Name
                        </Label>

                        <InputBox
                            {...inputName}
                            id="full_name"
                            name="full_name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.full_name}
                            // isDisabled={stepTwoData.mobile ? true : false}
                        />

                        {formik.touched.full_name && formik.errors.full_name ? (
                            <small className="error-cls">
                                {formik.errors.full_name}
                            </small>
                        ) : null}
                    </FormGroup>
                    <FormGroup className="form-group" md={12}>
                        <Label className="mb-2" htmlFor="mobile">
                            Contact Number
                        </Label>
                        {/* <InputWithMobileNoComp {...inputPhone} id='mobile' name='mobile' /> */}
                        <InputBox
                            {...inputPhone}
                            id="mobile"
                            name="mobile"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mobile}
                        />

                        {formik.touched.mobile && formik.errors.mobile ? (
                            <small className="error-cls">
                                {formik.errors.mobile}
                            </small>
                        ) : null}
                    </FormGroup>

                    <FormGroup className="form-group mt-5" md={12}>
                        <Label className="mb-2" htmlFor="username">
                            Email Address
                        </Label>
                        <InputBox
                            {...inputEmail}
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            // isDisabled={stepTwoData.mobile ? true : false}
                        />

                        {formik.touched.username && formik.errors.username ? (
                            <small className="error-cls">
                                {formik.errors.username}
                            </small>
                        ) : null}
                    </FormGroup>
                    
                    <FormGroup className="form-group mt-5" md={12}>
                        <Label className="mb-2" htmlFor="date_of_birth">
                            Date of Birth
                        </Label>
                        <div className='position-relative'>
                            <InputBox
                                {...inputDOB}
                                id="date_of_birth"
                                name="date_of_birth"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.date_of_birth}
                            />
                                <div className='position-absolute' style={{right:'2rem', bottom:'2rem'}}>
                                    <CalendarOutlined/>
                                </div>
                        </div>
                        {formik.touched.date_of_birth && formik.errors.date_of_birth ? (
                            <small className="error-cls">
                                {formik.errors.date_of_birth}
                            </small>
                        ) : null}
                    </FormGroup>

                    <FormGroup className="form-group mt-5" md={12}>
                        <Label className="mb-2" htmlFor="qualification">
                            Qualification
                        </Label>
                        <InputBox
                            {...inputQualification}
                            id="qualification"
                            name="qualification"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.qualification}
                        />

                        {formik.touched.qualification && formik.errors.qualification ? (
                            <small className="error-cls">
                                {formik.errors.qualification}
                            </small>
                        ) : null}
                    </FormGroup>

                    <FormGroup className="form-group mt-5" md={12}>
                        <Label className="mb-2" htmlFor="city">
                            City Name
                        </Label>
                        <InputBox
                            {...inputCity}
                            id="city"
                            name="city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                        />

                        {formik.touched.city && formik.errors.city ? (
                            <small className="error-cls">
                                {formik.errors.city}
                            </small>
                        ) : null}
                    </FormGroup>

                    <FormGroup className="form-group mt-5" md={12}>
                        <Label className="mb-2" htmlFor="new_password">
                            Enter Password
                        </Label>
                        <div style={{ position: 'relative' }}>
                            <InputBox
                                {...password}
                                id="password"
                                placeholder={'Enter minimum 8 characters'}
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                type={showPassword ? 'text' : 'password'}
                            />

                            {showPassword ? (
                                <EyeOutlined
                                    onClick={() =>
                                        setShowPassword(
                                            (lastPassword) => !lastPassword
                                        )
                                    }
                                    className="position-absolute"
                                    style={{
                                        top: '25%',
                                        left: '90%',
                                        fontSize: '2.6rem'
                                    }}
                                />
                            ) : (
                                <EyeInvisibleOutlined
                                    onClick={() =>
                                        setShowPassword(
                                            (lastPassword) => !lastPassword
                                        )
                                    }
                                    className="position-absolute"
                                    style={{
                                        top: '25%',
                                        left: '90%',
                                        fontSize: '2.6rem'
                                    }}
                                />
                            )}
                        </div>

                        {formik.touched.password && formik.errors.password ? (
                            <small className="error-cls">
                                {formik.errors.password}
                            </small>
                        ) : null}
                    </FormGroup>
                    <div className="mt-5">
                        <Button
                            label={'Continue'}
                            // btnClass='primary w-100'
                            btnClass={
                                !(formik.dirty && formik.isValid) 
                                    ? 'default'
                                    : 'primary'
                            }
                            size="large "
                            type="submit"
                            disabled={
                                !(formik.dirty && formik.isValid)
                            }
                        />
                    </div>
                </Form>
        </div>
    </Modal.Body>
</Modal>
  );
};

export default Register;