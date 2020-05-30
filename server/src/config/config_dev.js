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
        password: 'JGpb9n9TgaIO1ttrt' || process.env.DB_PASS,
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
        backendBaseURL: `https://webshop.local`,
        frontendBaseURL: `https://webshop.local`
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