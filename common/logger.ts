// Node module
import pino from 'pino';
import chalk from 'chalk';

interface ILevels {
  [key: number]: string;
  default: string;
}

interface IColors {
  [key: number]: typeof chalk;
  default: typeof chalk;
}

const colorize = (value: number) => {
  const levels: ILevels = {
    20: 'DEBUG',
    30: 'INFO',
    40: 'WARN',
    50: 'ERROR',
    default: 'USERLVL',
  };
  const colors: IColors = {
    20: chalk.blue,
    30: chalk.green,
    40: chalk.yellow,
    50: chalk.red,
    default: chalk.white,
  };
  return colors.hasOwnProperty(value)
    ? (colors[value](levels[value]) as string)
    : colors.default(levels.default);
};

const logger = pino({
  prettyPrint: true,
  prettifier: () => ({ pid, hostname, name, level, time, v, ...value }) => {
    let line = `[${new Date(time).toISOString()}] ${colorize(level)}: `;
    if (value.type === 'Error') {
      line += `\n${chalk.bgRed(value.stack)}`;
    } else if (value.msg) {
      line += chalk.cyan(value.msg);
    } else if (value.detail) {
      line += `${pid}, ${hostname}, ${name}, ${v}`;
    } else {
      line += `\n${chalk.magentaBright(JSON.stringify(value, null, 2))}`;
    }
    return `${line}\n`;
  },
});

export default logger;
