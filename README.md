# Event Web Application

## Description
This project is a web application for managing events. It allows users to create new events, like events, view events posted by the logged-in user, and see all posts. Additionally, it features user registration and login functionalities.

## Technologies Used
- Django (Backend)
- React.js (Frontend)
- Formik and Yup (for form management and validation)
- CSS (for styling)

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the backend directory and install dependencies: `cd backend` then `pip install -r requirements.txt`
3. Create a `.env` file inside the frontend directory with `REACT_APP_API_URL=http://127.0.0.1:8000`
4. Install frontend dependencies: ` cd .\frontend\ then `npm install`

## Usage
1. Start the Django development server: `cd backend` then `python manage.py runserver`
2. Start the React development server: `cd frontend` then `npm start`
3. Access the application in your web browser at `http://localhost:3000`
4. Django Development server will be running at `http://localhost:8000/`

## Features
- User authentication (registration and login)
- Event creation
- Event liking
- View events posted by the logged-in user
- View liked events
- View all events

![alt text](https://github.com/ADKANK/event/blob/master/Screenshots/current_user_posts.png?raw=true)
![alt text](https://github.com/ADKANK/event/blob/master/Screenshots/liked_post_by_user.png?raw=true)
![alt text](https://github.com/ADKANK/event/blob/master/Screenshots/liked_post_page.png?raw=true)
![alt text](https://github.com/ADKANK/event/blob/master/Screenshots/login.png?raw=true)
![alt text](https://github.com/ADKANK/event/blob/master/Screenshots/posts_page.png?raw=true)
![alt text](https://github.com/ADKANK/event/blob/master/Screenshots/register.png?raw=true)

Test Users