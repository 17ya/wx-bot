import "./src/logger";
import "./plugin";

import { WechatBot } from "./src/bot";

global.wechatBot = WechatBot;

WechatBot.start().catch(async (e) => {
  console.error("Bot start() fail:", e);
  await WechatBot.stop();
  process.exit(-1);
});
