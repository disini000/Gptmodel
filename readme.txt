GPT Model Application

This repository contains a GPT model application developed using React.js, Spring Boot, and MongoDB Atlas. The application allows users to sign up or sign in, initiate new chats, and ask questions to the GPT model.



Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed on your local machine.
- Java Development Kit (JDK) installed.
- MongoDB Atlas account for database management.

Installation

1. Clone the Repository

    bash
    git clone https://github.com/your-username/Gptmodel.git
    cd gpt-model-app
    

2. Install Node Modules

    Navigate to the frontend directory and install the required node modules:

    bash
    cd frontend
    npm install
    
3. Set Up Spring Boot Application

    Navigate to the backend directory and set up the Spring Boot application:

    bash
    cd ../backend
    ./mvnw clean install
    ` 

 Running the Application

1. Start the Spring Boot Backend

    bash
    cd backend
    ./mvnw spring-boot:run
    

2. Start the React Frontend

    bash
    cd ../frontend
    npm start
    ```



Usage

1. Sign Up/Sign In

    Users need to sign up or sign in to access the GPT model. Create an account or use existing credentials to log in.

2. Start a New Chat

    Once logged in, users can initiate a new chat session and ask questions to the GPT model.

Project Status

This GPT model application is currently under development. We are continuously working on adding new features and improving the existing ones.