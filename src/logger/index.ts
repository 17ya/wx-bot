import Logger from "log4js";

const appLog = "logs/app/app.log";
const pluginLog = "logs/plugin/pluginLog.log";

Logger.configure({
  appenders: {
    app: { type: "file", filename: appLog },
    plugin: { type: "file", filename: pluginLog },
  },
  categories: { default: { appenders: ["app", "plugin"], level: "all" } },
});

const getLogger = (name: string) => {
  return Logger.getLogger(name);
};

export { getLogger };
