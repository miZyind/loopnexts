// Node Module
import pino from 'pino';
import chalk from 'chalk';

let logger: pino.Logger;

if (pino.pretty) {
  const colorize = (value: any) => {
    const levels: any = { 20: 'DEBUG', 30: 'INFO', 40: 'WARN', 50: 'ERROR', default: 'USERLVL' };
    const colors: any = { 20: chalk.blue, 30: chalk.green, 40: chalk.yellow, 50: chalk.red, default: chalk.white };
    return colors.hasOwnProperty(value) ? colors[value](levels[value]) : colors.default(levels.default);
  };
  const pretty = pino.pretty({
    formatter: ({ pid, hostname, name, level, time, v, ...value }) => {
      let line = `[${new Date(time).toLocaleString()}] ${colorize(level)}: `;
      if (value.type === 'Error') {
        line += `\n${chalk.bgRed(value.stack)}`;
      } else if (value.msg) {
        line += chalk.cyan(value.msg);
      } else {
        line += `\n${chalk.magentaBright(JSON.stringify(value, null, 2))}`;
      }
      return line;
    }
  });
  pretty.pipe(process.stdout);
  logger = pino({}, pretty);
} else {
  logger = pino({ prettyPrint: true });
}

export default logger;
