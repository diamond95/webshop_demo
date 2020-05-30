/**
 * @file Configuration file for project
 * @module config
 * @category server/src/config
 */
module.exports = {
    port: 8080,
    db: {
        database: "localhost" || process.env.DB_NAME,
        user: 'user' || process.env.DB_USER,
        password: '1kho1034uvkoa2!' || process.env.DB_PASS,
        driver: "mysql",
     
        options: {
            dialect: 'mysql',
            host: 'mysql-core.default.svc.cluster.local',
            port: 33066
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    },
    default: {
        backendBaseURL: `http://localhost:8080`,
        frontendBaseURL: `http://localhost:8081`
    },
    email: {
        host: "",
        port: 587,
        secure: false,
        auth: {
            user: '',
            pass: ''
        }
    }
}