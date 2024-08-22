## Setting Up MongoDB Atlas

To run this project on your own computer, you need to set up a MongoDB Atlas account and configure your environment variables.

### Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. Create a new cluster.
3. In the cluster, create a new database user with a username and password.
4. Whitelist your IP address to allow connections from your local machine.

### Step 2: Get the Connection String

1. In your MongoDB Atlas cluster, click on the "Connect" button.
2. Choose "Connect your application".
3. Copy the connection string. It should look something like this: mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

### Step 3: Configure Environment Variables

1. Create a `.env` file in the root of your project.
2. Add the following line to the `.env` file, replacing `<username>`, `<password>`, and `<dbname>` with your actual MongoDB Atlas credentials and database name: MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority

## Running the Project

1. Install the dependencies:

### `npm install`

2. Navigate to backend folder and install dependencies there too:

### `npm install`


3. Start the backend server while in the backend directory:

### `node src/server.js`


4. Start the frontend development server:

### `npm start`


Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### [`npm run build`](command:_github.copilot.openSymbolFromReferences?%5B%22npm%20run%20build%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5Cuser%5C%5CDesktop%5C%5Cbloodbank%5C%5Cbloodbank-system%5C%5CREADME.md%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fc%253A%2FUsers%2Fuser%2FDesktop%2Fbloodbank%2Fbloodbank-system%2FREADME.md%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fuser%2FDesktop%2Fbloodbank%2Fbloodbank-system%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A21%2C%22character%22%3A13%7D%7D%5D%5D "Go to definition") fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
