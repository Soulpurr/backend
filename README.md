Setting up Express Mongoose backend in local env with MongoDB URL and secret

Prerequisites:

Node.js
MongoDB
Steps:

Create a .env file in the root directory of your project and add the following environment variables:
MONGO_URI=<mongodb_url>
SECRET=<secret>
Replace <mongodb_url> with the connection string to your MongoDB database. You can find this connection string in the MongoDB Atlas console.

Replace <secret> with a strong secret that you will use to sign and verify JWTs.

Install the required dependencies:
"
npm install
"

This will install the Express, Mongoose, and dotenv packages.

Start the Express server:
node index.js
This will start the Express server on port 3000 by default. You can change this port by setting the PORT environment variable.

Testing the backend:

You can test the backend using a tool like Postman.


