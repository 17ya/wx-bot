import { Message } from "wechaty";

import request from "request";

class GenshinImpact {
  constructor() {}

  message = async (msg: Message) => {
    const room = msg.room();
    const text = msg.text();

    if (!room) return;

    const roomName = await room.topic();

    const currentRoom = await wechatBot.Room.find({ topic: roomName });

    if (!["杭州F", "test"].includes(roomName)) return;

    if (text.includes("#绑定")) {
      const uid = text.split(" ")[1];

      request.get(
        `https://enka.network/u/${uid}/__data.json`,
        (error, response, body) => {
          const { playerInfo } = JSON.parse(body);
          const { nickname, level, worldLevel } = playerInfo;
          currentRoom?.say(
            `绑定成功～\n玩家:${nickname}\n等级:${level}\n世界等级:${worldLevel}`
          );
        }
      );
    }
  };
}

const GI = new GenshinImpact();

export default GI;
