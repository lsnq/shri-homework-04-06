module.exports = {
    sets: {
        desktop: {
            files: 'test/desktop'
        }
    },
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