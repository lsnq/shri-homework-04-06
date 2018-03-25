module.exports = {
    baseUrl: 'http://localhost:8080',
    sets: {
        desktop: {
            files: 'test/desktop'
        }
    },
    retry: 3,
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    args: ["--headless"]
                }
            }
        },
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        }
    }
};