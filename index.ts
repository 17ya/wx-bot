import { Contact, Message, ScanStatus, WechatyBuilder } from "wechaty";
import qrTerm from "qrcode-terminal";
// import { FileBox } from "file-box";

const bot = WechatyBuilder.build({
  name: "wechat-bot",
  puppet: "wechaty-puppet-wechat",
  puppetOptions: {
    uos: true, // 开启uos协议
  },
});

bot
  .on("logout", onLogout)
  .on("login", onLogin)
  .on("scan", onScan)
  .on("error", onError)
  .on("message", onMessage)
  .start()
  .catch(async (e) => {
    console.error("Bot start() fail:", e);
    await bot.stop();
    process.exit(-1);
  });

function onScan(qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    qrTerm.generate(qrcode, { small: true });
  } else {
    console.info("onScan: %s(%s)", ScanStatus[status], status);
  }
}

function onLogin(user: Contact) {
  console.info(`-------- ${user.name()} is login --------`);
}

function onLogout(user: Contact) {
  console.info(`${user.name()} logged out`);
}

function onError(e: Error) {
  console.log("------------Bot error------------");
  console.error(e);
  console.log("------------Bot error------------");
}

async function onMessage(msg: Message) {
  console.info(msg.text());
}
