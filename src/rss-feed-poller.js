import NodePie from 'nodepie';
import request from 'request-promise';

export default function getFeed(options) {
  let lastTime = 0;
  async function checkFeed() {
    const time = new Date().getTime();
    options.robot.logger.debug(`Checking ${options.name || 'unnamed feed'} at ${time}`);

    const requestResult = await request(options.url);

    const feedResult = new NodePie(requestResult);
    try {
      feedResult.init();
    } catch (err) {
      options.robot.logger.debug(`${err.message}`);
    }

    const latestItem = feedResult.getItem(0);
    if (latestItem) {
      const itemPostedTime = latestItem.getUpdateDate();
      options.robot.logger.debug(`${itemPostedTime}`);
      if (itemPostedTime >= lastTime) {
        options.robot.logger.debug(`Found update for: ${latestItem.getTitle()}`);
        options.robot.messageRoom(
          options.room,
          `${options.alertPrefix || ''}${latestItem.getTitle()} - ${latestItem.getPermalink()}` +
            `${options.alertSuffix || ''}`
        );
      }
    }

    lastTime = time;
  }

  function startFeed() {
    options.robot.logger.info(`Starting feed poller for ${options.name}.`);
    checkFeed();

    setInterval(checkFeed, options.pingInterval * 1000);
  }

  return {
    checkFeed,
    startFeed,
  };
}
