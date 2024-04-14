import React from 'react';
import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegistrationForm.css' // Import your custom styles here
import { Link } from 'react-router-dom';

const RegistrationForm = ({ route, method }) => {
    const initialValues = {
        username: '',
        email: '',
        password: ''
    };
    const [loading, setLoading] = useState(false);
    const name = method === 'register' ? 'Registration' : 'Login';
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Invalid email format'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters') // Password must be at least 8 characters
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            ),
        username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters')
    });

    const loginvalidationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            ),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setLoading(true);
        try {
            let requestData = {};
            if (method === 'login') {
                requestData = {
                    username: values.username,
                    password: values.password
                };
            } else if (method === 'register') {
                requestData = {
                    username: values.username,
                    email: values.email,
                    password: values.password
                };
            }
            const res = await api.post(route, requestData);
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/')
            } else if (method === 'register') {
                alert("Registration successful. Please log in to continue.");
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred. Please try again.");
        } finally {
            resetForm();
            setSubmitting(false);
            setLoading(false);
        }
    };


    return (
        <div className="form-container">
            <h2>{method === 'login' ? 'Login Form' : 'Registration Form'}</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={method === 'register' ? validationSchema : loginvalidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field type="text" name="username" className="form-control" />
                            <ErrorMessage name="username" component="div" className="error-message" />
                        </div>
                        {method === 'register' && (
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field type="email" name="email" className="form-control" />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type="submit" className="btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : `${name}`}
                            </button>
                            {method === 'login' ? (
                                <Link to="/register" style={{ display: 'flex', flexDirection: 'row' }}>Don't have an account? Sign Up Now</Link>
                            ) : (
                                <Link to="/login" >Already have an account? Login</Link>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegistrationForm;