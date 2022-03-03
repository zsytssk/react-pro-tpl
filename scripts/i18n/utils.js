const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const pipeAsyncFunctions = (...fns) => (arg) => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

const runPromisesInSeries = (ps) => ps.reduce((p, next) => p.then(next), Promise.resolve());

const chainAsync = (fns) => {
  let curr = 0;
  const last = fns[fns.length - 1];
  const next = () => {
    const fn = fns[curr++];
    fn === last ? fn() : fn(next);
  };
  return next;
};

const promisify = (func) => (...args) =>
  new Promise((resolve, reject) => func(...args, (err, result) => (err ? reject(err) : resolve(result))));

const recursive = (dir, handler) => {
  return runPromisesInSeries(
    require('fs')
      .readdirSync(dir)
      .map((name) => async () => {
        const filename = require('path').join(dir, name);
        const stats = require('fs').statSync(filename);
        if (stats.isFile()) {
          await handler(filename);
        } else if (stats.isDirectory()) {
          await recursive(filename, handler);
        }
      }),
  );
};

/**
 * Format a date like YYYY-MM-DD.
 *
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 * @license MIT
 */
function formatDate(template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
  return date
    .toISOString()
    .split(/[-:.TZ]/)
    .reduce(function (template, item, i) {
      return template.split(specs[i]).join(item);
    }, template);
}

module.exports = {
  sleep,
  pipeAsyncFunctions,
  runPromisesInSeries,
  chainAsync,
  recursiveFiles: recursive,
  promisify,
  formatDate,
};
