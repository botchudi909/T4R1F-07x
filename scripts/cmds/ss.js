module.exports = {
  config: {
    name: "ss",
    aliases: ["screenshot"],
    version: "1.0",
    author: "Jubayer",
    countDown: 3,
    role: 0,
    noPrefix: true,
    shortDescription: "Take a website screenshot",
    longDescription: "Capture and send a live screenshot of any website",
    category: "Inform",
    guide: "{pn} <url>"
  },

  onStart: async function ({ message, args }) {
    if (!args[0]) return message.reply("✅ Please provide a website URL\n\nExample: ss github.com");

    const url = args[0].startsWith("http") ? args[0] : `https://${args[0]}`;
    const imgUrl = `https://jubayer-screenshort-apis-xy.onrender.com/ss?url=${encodeURIComponent(url)}`;

    await message.reply({
      body: `Hye <BaBY> Screenshot of ${url}`,
      attachment: await global.utils.getStreamFromURL(imgUrl)
    });
  }
};
