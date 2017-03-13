import getFeed from './rss-feed-poller';
import loadFile from './config-parser.js';

export default async function rssPoller(robot) {
  // This will be loaded from a config file
  let config;
  try {
    config = await loadFile(process.env.HUBOT_RSS_CONFIG_FILE || 'hubotrssconfig.json');
    config = JSON.parse(config);

    config.feeds.map(x => {
      const feed = getFeed({ ...x, robot });
      return feed;
    })
      .forEach(x => x.startFeed());
  } catch (err) {
    robot.logger.debug(err.message);
  }
}
