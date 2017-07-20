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
            port: 5000
        }
    }
};

module.exports = config[process.env.NODE_ENV || 'dev'];
