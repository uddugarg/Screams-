import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { registerUser } from '../_actions/user_action';
import { TextField, Button } from '@material-ui/core';
import screamLogo64x from '../images/screamLogo64x.png';
import './Register.css';


function Register(props) {

    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                username: '',
                phNumber: '',
            }}
            validationSchema={Yup.object().shape({
                firstName: Yup.string()
                    .required('First Name is required'),
                lastName: Yup.string()
                    .required('Last Name is required'),
                email: Yup.string()
                    .email('Email is Invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(8, 'Password must be at least 8 characters')
                    .required('Name is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Password must match')
                    .required('Name is required'),
                username: Yup.string()
                    .required('Username is required'),
                phNumber: Yup.string()
                    .required('Phone is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let submit = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password,
                        username: values.username,
                        phNumber: values.phNumber,
                        image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
                    }

                    dispatch(registerUser(submit)).then(response => {
                        if (response.payload.success) {
                            props.history && props.history.push('/');
                        } else {
                            alert(response.payload.err.errmsg)
                        }
                    })
                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;

                return (
                    <div>
                        <center><img src={screamLogo64x} alt='screams'></img></center>
                        <form onSubmit={handleSubmit}>
                            <center>
                                <section className='home__modalNameField'>
                                    <TextField
                                        name='firstName'
                                        label='First Name'
                                        variant='outlined'
                                        type='text'
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.firstName && touched.firstName ? 'text error' : 'text'
                                        }
                                        required
                                    />
                                    {errors.firstName && touched.firstName && (
                                        <div className='input-feedback'>{errors.firstName}</div>
                                    )}
                                    <TextField
                                        name='lastName'
                                        label='Last Name'
                                        variant='outlined'
                                        type='text'
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.lastName && touched.lastName ? 'text error' : 'text'
                                        }
                                        required
                                    />
                                    {errors.lastName && touched.lastName && (
                                        <div className='input-feedback'>{errors.lastName}</div>
                                    )}
                                </section>
                                <TextField
                                    name='username'
                                    label='Username'
                                    variant='outlined'
                                    type='text'
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.username && touched.username ? 'text-reg-input error' : 'text-reg-input'
                                    }
                                    required
                                />
                                {errors.username && touched.username && (
                                    <div className='input-feedback'>{errors.username}</div>
                                )}

                                <TextField
                                    name='email'
                                    label='email'
                                    variant='outlined'
                                    type='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email ? 'text-reg-input error' : 'text-reg-input'
                                    }
                                    required
                                />
                                {errors.email && touched.email && (
                                    <div className='input-feedback'>{errors.email}</div>
                                )}

                                <TextField
                                    name='password'
                                    label='Password'
                                    variant='outlined'
                                    type='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password ? 'text-reg-input error' : 'text-reg-input'
                                    }
                                    required
                                />
                                {errors.password && touched.password && (
                                    <div className='input-feedback'>{errors.password}</div>
                                )}

                                <TextField
                                    name='confirmPassword'
                                    label='Confirm Password'
                                    variant='outlined'
                                    type='password'
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.confirmPassword && touched.confirmPassword ? 'text-reg-input error' : 'text-reg-input'
                                    }
                                    required
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className='input-feedback'>{errors.confirmPassword}</div>
                                )}

                                <TextField
                                    name='phNumber'
                                    label='Mobile'
                                    variant='outlined'
                                    type='text'
                                    value={values.phNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.phNumber && touched.phNumber ? 'text-reg-input error' : 'text-reg-input'
                                    }
                                    required
                                />
                                {errors.phNumber && touched.phNumber && (
                                    <div className='input-feedback'>{errors.phNumber}</div>
                                )}

                                <Button className='home__logBtn' variant='outlined' type='submit' onClick={handleSubmit} disabled={isSubmitting}>SignUp</Button>
                            </center>
                        </form>
                    </div>
                );
            }}
        </Formik>
    )
}

export default Register
