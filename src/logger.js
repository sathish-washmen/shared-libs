const getKeys = () => {
    const isDev = process.env.NODE_ENV !== 'production';

    const logLevel = (parseInt(process.env.LOG_LEVEL) || 3);
    const debugPattern = process.env.DEBUG;
    return { isDev, logLevel, debugPattern }
}

module.exports = {

    log: (...args) => {
        const { isDev, logLevel } = getKeys();
        console.log(isDev, logLevel)
        if (isDev || logLevel <= 1) {
            console.log(...args)
        }
    },

    info: (...args) => {
        const { isDev, logLevel } = getKeys();
        if (isDev || logLevel <= 2) {
            console.info(...args)
        }
    },
    warn: (...args) => {
        const { isDev, logLevel } = getKeys();
        if (isDev || logLevel <= 3) {
            console.warn(args)
        }
    },
    debug: (debugKey, ...args) => {
        const { isDev, logLevel, debugPattern } = getKeys();
        if (isDev || logLevel <= 4) {
            if (debugPattern) {
                if ((debugKey || '').startsWith(debugPattern)) {
                    console.debug(debugKey, ...args)
                }
            } else {
                console.debug(debugKey, ...args)
            }
        }
    },
    error: (...args) => {
        const { isDev, logLevel } = getKeys();
        if (isDev || logLevel <= 5) {
            console.error(...args)
        }
    },
}