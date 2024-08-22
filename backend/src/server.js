//server.js
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});