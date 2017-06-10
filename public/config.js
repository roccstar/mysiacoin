var config = {
    dev: {
        server: {
            port: 3000
        }
    },
    qa: {
        server: {
            port: 3001
        }
    },
    production: {
        server: {
            port: 8080
        }
    }
};

module.exports = config[process.env.NODE_ENV || 'dev'];
