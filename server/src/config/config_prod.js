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
        password: 'w1op0cm1!t' || process.env.DB_PASS,
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
        backendBaseURL: `https://webshop.local`, // change for production 
        frontendBaseURL: `https://webshop.local`
    },
    email: {
        host: "smtp.webshop.localhost.hr",
        port: 25,
        secure: false,
        auth: {
            user: '',
            pass: ''
        }
    }
}
