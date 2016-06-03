// Temporarily needed until the folowing two issues are resolved:
//   https://github.com/github/hubot/issues/851
//   https://github.com/github/hubot/issues/858
//
const scriptPath = __dirname;
const fileName = 'poller-script.js';

export default function scriptLoader(robot) {
  robot.loadFile(scriptPath, fileName);
}
