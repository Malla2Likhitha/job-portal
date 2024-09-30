# Job Portal

Job Portal is a MERN Stack based web app which helps in streamlining the flow of job application process. It allows users to select there roles (applicant/recruiter), and create an account. In this web app, login session are persistent and REST APIs are securely protected by JWT token verification. After logging in, a recruiter can create/delete/update jobs, shortlist/accept/reject applications, edit profile. And, an applicant can view jobs, perform fuzzy search with various filters, apply for jobs with an SOP, view applications, upload profile picture, upload resume and edit profile. Hence, it is an all in one solution for a job application system.

# Features

- User Authentication (Sign up, Login, Logout)
- Job Search with Filters (by title, location, industry, salary range)
- Job Listings with detailed descriptions
- Apply for Jobs functionality
- Admin panel for managing job listings and user applications
- Responsive UI using Tailwind CSS

Directory structure of the web app is as follows:

```
- backend/
    - controllers/
    - middlewares/
    - models/
    - routes/
    - utils/
- frontend/
    - public/
    - src/
        - assets/
        - components/
            - admin/
            - auth/
            - shared/
            - ui/
        - controllers/
        - hooks/
        - lib/
        - redux/
        - utils/
- README.md
```

## Instructions for initializing web app:

- git clone https://github.com/Malla2Likhitha/job-portal.git
- cd job-portal
- cd backend
- npm install
- cd ../frontend
- npm install
- Create a .env file in the backend directory and add your MongoDB connection string and any other required environment variables: MONGO_URI=your_mongodb_connection_string

# Usage

- Move inside backend directory: `cd backend`
- Install dependencies in backend directory: `npm install`
- Start express server: `npm start`
- Backend server will start on port 4444.
- Now go inside frontend directory: `cd ..\frontend`
- Install dependencies in frontend directory: `npm install`
- Start web app's frontend server: `npm start`
- Frontend server will start on port 5173.
- Now open `http://localhost:5173/` and proceed creating jobs and applications by signing up in required categories.

## Frontend Dependencies
- `@radix-ui/react-avatar`
- `@radix-ui/react-checkbox`
- `@radix-ui/react-dialog`
- `@radix-ui/react-label`
- `@radix-ui/react-popover`
- `@radix-ui/react-radio-group`
- `@radix-ui/react-select`
- `@radix-ui/react-slot`
- `@reduxjs/toolkit`
- `axios`
- `class-variance-authority`
- `clsx`
- `embla-carousel-react`
- `framer-motion`
- `lucide-react`
- `next-themes`
- `react`
- `react-dom`
- `react-redux`
- `react-router-dom`
- `react-spinners`
- `react-toastify`
- `redux-persist`
- `sonner`
- `tailwind-merge`
- `tailwindcss-animate`

## Backend Dependencies
- `bcryptjs`
- `cookie-parser`
- `cors`
- `dotenv`
- `express`
- `jsonwebtoken`
- `mongoose`
- `multer`
- `nodemon`


## API Endpoints

### Authentication
- **POST** `/api/v1/auth/signup`: Register a new user
- **POST** `/api/v1/auth/login`: Authenticate a user and return a JWT token
- **GET** `/api/v1/auth/logout`: Log out the user

### Jobs
- **GET** `/api/v1/job/get`: Get all jobs (query with keyword)
- **GET** `/api/v1/job/get/:id`: Get a specific job by ID
- **POST** `/api/v1/job/create`: Create a new job (Admin only)
- **PUT** `/api/v1/job/update/:id`: Update a job (Admin only)
- **DELETE** `/api/v1/job/delete/:id`: Delete a job (Admin only)

### Applications
- **GET** `/api/v1/application/get`: Get all applications (Admin only)
- **POST** `/api/v1/application/apply/:jobId`: Apply for a job

## Contributing

Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a pull request.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/MyFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/MyFeature`
5. Open a pull request
