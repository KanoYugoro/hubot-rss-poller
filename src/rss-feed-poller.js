import NodePie from 'nodepie';
import request from 'request-promise';

export default function getFeed(options) {
  return {
    feedName: options.name || 'unnamed feed',
    rssFeedUrl: options.url, // the url to the RSS feed
    room: options.room, // room to ping when there is a change
    pingInterval: options.interval || 300, // number of seconds between checks
    alertPrefix: options.alertPrefix || '', // What to prefix the output message with
    alertSuffix: options.alertSuffix || '', // What to append to the end of the output message
    skipfirst: (options.skipFirst === true),
    request: options.request || request,
    robot: options.robot,
    _lastPing: null,
    async checkFeed() {
      const time = new Date().getTime();
      this.robot.logger.debug(`Checking ${this.feedName} at ${time.getTime()}`);
      const requestResult = await this.request({
        pathname: this.rssFeedUrl,
      });

      const feedResult = new NodePie(requestResult.body);
      feedResult.init();

      const [latestItem] = feedResult.getItems(0, 1);
      const itemPostedTime = latestItem.getUpdateDate();

      if (itemPostedTime >= time) {
        this.robot.logger.debug(`Found update for: ${latestItem.getTitle()}`);
        this.robot.messageRoom(
          this.room,
          `${this.alertPrefix}: ${latestItem.getTitle()} - ${latestItem.getPermaLink()}`
        );
      }
    },
    startFeed() {
      setInterval(this.checkFeed, this.pingInterval * 1000);
    },
  };
}
