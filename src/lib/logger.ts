// Node Module
import pino from 'pino';
import chalk from 'chalk';

let logger: pino.Logger;

if (pino.pretty) {
  const colorize = (value: number) => {
    type Levels = { [key: number]: string, default: string };
    const levels: Levels = { 20: 'DEBUG', 30: 'INFO', 40: 'WARN', 50: 'ERROR', default: 'USERLVL' };
    type Colors = { [key: number]: typeof chalk, default: typeof chalk };
    const colors: Colors = { 20: chalk.blue, 30: chalk.green, 40: chalk.yellow, 50: chalk.red, default: chalk.white };
    return colors.hasOwnProperty(value) ? colors[value](levels[value]) as string : colors.default(levels.default);
  };
  const pretty = pino.pretty({
    formatter: ({ pid, hostname, name, level, time, v, ...value }) => {
      let line = `[${new Date(time).toLocaleString()}] ${colorize(level)}: `;
      if (value.type === 'Error') {
        line += `\n${chalk.bgRed(value.stack)}`;
      } else if (value.msg) {
        line += chalk.cyan(value.msg);
      } else if (value.detail) {
        line += `${pid}, ${hostname}, ${name}, ${v}`;
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
