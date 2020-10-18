import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { loginUser } from '../_actions/user_action';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Register from './Register';
import { TextField, Checkbox, Button, Modal, makeStyles } from '@material-ui/core';
import screamLogo64x from '../images/screamLogo64x.png';
import './Register.css';
import { withRouter } from 'react-router-dom';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        maxWidth: 500,
        objectFit: 'contain',
        width: '90%',
        backgroundColor: '#f9c5d1',
        backgroundImage: 'linear-gradient(315deg, #f9c5d1 0%, #9795ef 74%)',
        border: '4px solid rgb(176, 134, 200)',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Login(props) {

    const dispatch = useDispatch();

    const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

    const [open, setOpen] = useState(false)
    const [modalStyle] = useState(getModalStyle)
    const classes = useStyles();
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(rememberMeChecked);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    const initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : '';


    return (
        <Formik
            initialValues={{
                email: initialEmail,
                password: '',
            }}
            validationSchema={yup.object().shape({
                email: yup.string()
                    .email('Email is invalid!')
                    .required('Email is required'),
                password: yup.string()
                    .required('Password is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let submit = {
                        email: values.email,
                        password: values.password,
                    }
                    dispatch(loginUser(submit))
                        .then(response => {
                            if (response.payload.loginSuccess) {
                                window.localStorage.setItem('userId', response.payload.userId);
                                if (rememberMe === true) {
                                    window.localStorage.setItem('rememberMe', values.id);
                                } else {
                                    localStorage.removeItem('rememberMe');
                                }
                                props.history.push('/home');
                            } else {
                                setError('Invalid Username or Password');
                            }
                        })
                        .catch(err => {
                            setError('Invalid Username or Password again');
                            setTimeout(() => {
                                setError('');
                            }, 3000)
                        })
                    setSubmitting(false);
                }, 500)
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
                    <div className='home'>
                        <div className='home__hero'>
                            <div className='home__header'>
                                <img src={screamLogo64x} alt='screams' />
                                <h2>Screams'</h2>
                            </div>


                            <div className='home__container'>
                                <h1>Let Your Thoughts Be Loud Enough</h1>
                                <h1>Make Your Mind Scream!</h1>
                                <h1>Follow Your Interest</h1>
                            </div>
                        </div>

                        <div className='home__register'>
                            <form onSubmit={handleSubmit}>
                                <div className='home__login'>
                                    <TextField id='home__loginField'
                                        name='email'
                                        variant='outlined'
                                        label='Email'
                                        type='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        required
                                        className={
                                            errors.email && touched.email ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.email && touched.email && (
                                        <div className='input-feedback'>{errors.email}</div>
                                    )}

                                    <TextField id='home__loginField'
                                        name='password'
                                        variant='outlined'
                                        label='Password'
                                        type='password'
                                        value={values.password}
                                        onChange={handleChange}
                                        required
                                        className={
                                            errors.password && touched.password ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.password && touched.password && (
                                        <div className='input-feedback'>{errors.password}</div>
                                    )}

                                    {error && (
                                        <label><p className='login__error'>{error}</p></label>
                                    )}

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={rememberMe}
                                                onChange={handleRememberMe}
                                                color="primary"
                                            />
                                        }
                                        label="Remember Me"
                                    />

                                    <Button className='home__logBtn'
                                        variant='contained'
                                        type='submit'
                                        disabled={isSubmitting}
                                        onClick={handleSubmit}>Log in</Button>
                                </div>
                            </form>

                            <div className='home__signUp'>
                                <h3>Let's Screams' Today!</h3>
                                <Modal open={open} onClose={() => setOpen(false)}>
                                    <div style={modalStyle} className={classes.paper}>
                                        <Register />
                                    </div>
                                </Modal>
                                <Button className='home__logBtn home__signUpBtn' color='primary' variant='outlined' type='submit' onClick={() => setOpen(true)}>SignUp</Button>
                            </div>

                            <div className='home__footer'>
                                <span>© 2020 Screams', Inc.</span>
                            </div>
                        </div>

                    </div>
                )
            }}
        </Formik>
    )
}

export default withRouter(Login);
