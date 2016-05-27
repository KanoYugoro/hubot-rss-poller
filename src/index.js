import getFeed from './rss-feed-poller';

export default function rssPoller(robot) {
  // This will be loaded from a config file
  const feed = getFeed({
    name: 'Team Space RSS',
    rssFeedUrl: 'http://kb.extendhealth.com/spaces/createrssfeed.action?types=blogpost&spaces=ST&' +
      'maxResults=15&title=[Teams]+Blog+Feed&amp;publicFeed=false&amp;os_authType=basic',
      // the url to the RSS feed
    room: 'console', // room to ping when there is a change
    alertPrefix: 'test prefix', // What to prefix the output message with
    alertSuffix: 'test suffix', // What to append to the end of the output message
    robot,
    interval: 10,
  });

  feed.startFeed();
}
