module.exports = {
  exit: function exit(code) {
    let prefix = '\u2618';

    if(code !== 0) {
      prefix = '\u2620';
    }
    console.info(`${prefix} email-scraper is now exiting.`);
    process.exit(code);
  }
};
