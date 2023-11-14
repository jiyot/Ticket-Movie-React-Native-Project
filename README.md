# Ticket-Movie-React-Native-Project

Ticket Movie React Native App
This repository contains the code for a Cross-Platform React Native application that allows users to view currently playing movies and purchase movie tickets. The app is developed using the Expo CLI, React Native Navigation library, Firebase services for data persistence and authentication, Expo Firebase library, and Expo Vector Icons library.

Project Structure
The project is organized as follows:

App.js: The main entry point for the application, managing navigation and conditional rendering of screens based on the user's authentication status.

Screens:

NowPlayingScreen.js: Displays a list of currently playing movies, fetched from The Movie Database API.
MovieDetailsScreen.js: Displays details about a selected movie, including the ability to purchase tickets.
BuyTicketsScreen.js: Enables the user to purchase tickets for a selected movie.
MyPurchasesScreen.js: Displays a list of tickets purchased by the user.
LoginScreen.js: Allows the user to login or create a new account.
LogoutScreen.js: Enables the user to logout of the application.

Navigation:
The main screens are displayed using a Tab Bar Navigation component.
Conditional rendering in App.js ensures the appropriate tabs are shown based on the user's login status.
Stack Navigators connect screens for smooth navigation.

Firebase:
Firebase services are used for data persistence and authentication.
Firebase Firestore is used for data persistence, managing purchases and user information.
Firebase Auth with Email/Password Sign-In method is employed for user authentication.


Getting Started
Clone the repository:

git clone https://github.com/your-username/ticket-movie-react-native.git

Navigate to the project directory:
cd ticket-movie-react-native

Install dependencies:
npm install

Set up Firebase:
Obtain an API key from The Movie Database and replace YOUR_API_KEY in the Now Playing Screen's API endpoint.
Follow the Expo Firebase documentation to set up Firebase services.

Run the app:
npm start


Feel free to reach out if you have any questions or encounter issues. Good luck!
