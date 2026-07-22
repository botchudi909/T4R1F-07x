const axios = require("axios");
const fs = require("fs-extra");

const API = "https://raw.githubusercontent.com/MR-TARIF-BOT-X404/T4R1F/refs/heads/main/info-api.json";

module.exports = {
  config: {
    name: "info",
    aliases: [],
    author: "AHMED TARIF",
    role: 0,
    category: "Inform",
    countDown: 5
  },

  onStart: async ({ api, event }) => {
    try {
      const { data } = await axios.get(API);
      const T4R1F = data.infoList[Math.floor(Math.random() * data.infoList.length)];

      const txt = `╭[ 𝗧𝗔𝗥𝗜𝗙 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢𝗥𝗠 ]
├‣𝙽𝙰𝙼𝙴: ${T4R1F.name}
├‣𝙰𝙶𝙴: ${T4R1F.age}
├‣𝚂𝚃𝙰𝚃𝚄𝚂: ${T4R1F.status}
├‣𝙽𝚄𝙼𝙱𝙴𝚁: ${T4R1F.number}
├‣𝚃𝙴𝙻𝙴𝙶𝚁𝙰𝙼: ${T4R1F.telegram}
├‣𝙵𝙱: ${T4R1F.facebook}
├‣𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝙰𝙼: ${T4R1F.instagram}
╰‣𝚁𝙾𝙻𝙴: ${T4R1F.role}`;

      if (!T4R1F.img) return api.sendMessage(txt, event.threadID);

      const file = __dirname + "/cache/info.jpg";
      const res = await axios({ url: T4R1F.img, responseType: "stream" });

      res.data.pipe(fs.createWriteStream(file)).on("finish", () =>
        api.sendMessage(
          {
            body: txt,
            attachment: fs.createReadStream(file)
          },
          event.threadID,
          () => fs.unlinkSync(file)
        )
      );
    } catch {
      api.sendMessage("❌ API Error!", event.threadID);
    }
  }
};
