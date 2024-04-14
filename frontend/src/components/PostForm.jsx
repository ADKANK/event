import React, { useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ACCESS_TOKEN } from '../constants';
import '../styles/PostForm.css';

const PostForm = ({ onClose, fetchPosts }) => {
    const initialValues = {
        title: '',
        content: '',
        image: null,
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
        image: Yup.mixed().required('Image is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData(); // Create a new FormData object
            formData.append('title', values.title); // Append the title to the form data
            formData.append('content', values.content); // Append the content to the form data
            formData.append('image', values.image); // Append the image to the form data

            const response = await axios.post('http://localhost:8000/api/posts/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                    'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) || '', // Pass the access token in the header
                },
            });

            console.log('Post created:', response.data);

            resetForm();
            onClose();
            fetchPosts();
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="post-form-container">
            <div className='post-form'>
                <h2>Create Post</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            <div className='form-group'>
                                <label htmlFor="title">Title</label>
                                <Field type="text" name="title" />
                                <ErrorMessage name="title" component="div" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="content">Content</label>
                                <Field as="textarea" name="content" />
                                <ErrorMessage name="content" component="div" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="image">Image</label>
                                <input type="file" name="image" onChange={(e) => setFieldValue('image', e.target.files[0])} />
                                <ErrorMessage name="image" co mponent="div" />
                            </div>
                            <div className='form-actions'>
                                <button className='create-button' type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Creating...' : 'Create'}
                                </button>
                                <button className='create-button' onClick={onClose}>Cancel</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PostForm;
