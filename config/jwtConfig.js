module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret', // Change this in production
    JWT_EXPIRATION: '1d', // Token expiration time
};
