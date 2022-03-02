function createLog(type?: string) {
    // eslint-disable-next-line
    let log_fun = console[type];
    if (!log_fun) {
        // eslint-disable-next-line
        log_fun = console.log;
    }
    return log_fun.bind(window.console);
}

export const log: typeof console.log = createLog();
export const debug: typeof console.warn = createLog('debug');
export const error: typeof console.error = createLog('error');
