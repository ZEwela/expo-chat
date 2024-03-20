# Expo Chat Project with Firebase Authentication - Practise 

## Introduction
Setting up a basic Expo project with Firebase authentication. Firebase provides a comprehensive suite of tools for building and managing mobile and web applications, including authentication, database, storage, and hosting services.

## Installation
  ```
      git clone 
      cd expo-chat
      npm install
  ```

## Configuration

Before running the application, you need to set up Firebase authentication and configure your Firebase project.

1. Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
2. Enable Firebase Authentication and choose the authentication methods you want to use (e.g., email/password, Google, Facebook).
3. Obtain your Firebase configuration object from the Firebase Console.
4. Create a file named `firebaseConfig.js` in the project root directory and paste your Firebase configuration object. (see firebaseConfig_template.js)


## Usage

1. Start the development server:
  ```
    npx expo start
  ```

2. Open the Expo Go app on your mobile device and scan the QR code displayed in the terminal.
3. Alternatively, run the app in a web browser using the provided URL.