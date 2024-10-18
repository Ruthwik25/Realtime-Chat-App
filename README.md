Real-Time Chat Application
Overview
This project is a real-time chat application built using React and Firebase. The application allows users to register, log in, and engage in conversations with other users. It utilizes Firebase for authentication, storage, and Cloud Firestore to manage messages.

Features
User Authentication: Secure login and registration using Firebase Authentication.
Real-Time Messaging: Send and receive messages instantly with Firebase Cloud Firestore.
Media Support: Send messages with emojis and images.
Message Management: Ability to delete messages if necessary.

Technologies Used
Frontend: React
Backend: Firebase (Firestore, Authentication, Storage)
Styling: Sass

Getting Started
Prerequisites
Node.js
Yarn or npm

Install dependencies:


yarn install
  or
npm install

Set up Firebase:

Create a new Firebase project.
Enable Firestore and Authentication.
Set up a web app and copy the Firebase config.
Add your Firebase configuration to firebase.js:


To start the development server, run:

bash
Copy code
yarn dev
 or
npm run dev


Usage
Open the application in your browser.
Register a new account or log in with an existing one.
Start chatting by sending messages, emojis, and images.
Manage your messages by deleting them if needed.
