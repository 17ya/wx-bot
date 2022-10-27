import { WechatyInterface } from "wechaty/impls";

declare global {
  var wechatBot: WechatyInterface;
}

export { global };
