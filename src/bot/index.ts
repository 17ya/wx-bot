import { Contact, Message, ScanStatus, WechatyBuilder } from "wechaty";
import qrTerm from "qrcode-terminal";
import { getLogger } from "../logger";
// import { FileBox } from "file-box";

const appLogger = getLogger("app");

const WechatBot = WechatyBuilder.build({
  name: "wechat-bot",
  puppet: "wechaty-puppet-wechat",
  puppetOptions: {
    uos: true, // 开启uos协议
  },
});

WechatBot.on("logout", onLogout)
  .on("login", onLogin)
  .on("scan", onScan)
  .on("error", onError)
  .on("message", onMessage);

function onScan(qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    qrTerm.generate(qrcode, { small: true });
  } else {
    console.info("onScan: %s(%s)", ScanStatus[status], status);
  }
}

function onLogin(user: Contact) {
  console.log(`${user.name()} is login`);
  appLogger.log(`${user.name()} is login`);
}

function onLogout(user: Contact) {
  appLogger.log(`${user.name()} logged out`);
}

function onError(e: Error) {
  appLogger.error(e);
}

async function onMessage(msg: Message) {
  console.info(msg.toString());
}

export { WechatBot };
