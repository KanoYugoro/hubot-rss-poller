import getFeed from './rss-feed-poller';
import loadFile from './config-parser.js';

export default async function rssPoller(robot) {
  try {
    const config = await loadFile(process.env.HUBOT_RSS_CONFIG_FILE || 'hubotrssconfig.json');

    JSON.parse(config).feeds.map(x => getFeed({ ...x, robot }))
      .forEach(x => x.startFeed());
  } catch (err) {
    robot.logger.debug(err.message);
  }
}
