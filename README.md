Application Setup and Usage Guide
This application has two components: a server and a client. The client supports both mobile and desktop views, and features a protected route system using a sessionId stored in localStorage. Additionally, filters for groups and providers can be reset independently.

Setup Instructions
1. Install Dependencies
Server:

Navigate to the server directory and install the required modules:
bash
Copy code
yarn
Client:

Navigate to the client directory and install the dependencies:
bash
Copy code
yarn
2. Run the Application
Server:

Start the server by running:
bash
Copy code
node server.js
Client:

Start the client by running:
bash
Copy code
yarn start
3. Application Features
Responsive Design: The client provides an optimal experience across both mobile and desktop views.
Protected Routes: The application uses a sessionId (stored in localStorage) to control access to protected routes.
Filter Reset: The filters for groups and providers can be reset independently for flexibility in data filtering.
