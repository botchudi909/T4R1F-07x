module.exports = {
  config: {
    name: "add",
    version: "1.0",
    author: "AHMED TARIF",
    role: 1,
    category: "Group"
  },

  onStart: async ({ api, event, args }) => {
    const { threadID, messageID, messageReply, mentions } = event;

    api.setMessageReaction("⏳", messageID, () => {}, true);

    const T4R1F =
      messageReply?.senderID ||
      Object.keys(mentions || {})[0] ||
      args[0];

    if (!T4R1F) {
      return api.sendMessage(
        "🔄| hye <BaBY>\n━━━━━━━━━━━━━━\n• Reply, or use /add <uid>!",
        threadID,
        messageID
      );
    }

    try {
      const info = await api.getThreadInfo(threadID);

      if (!info.adminIDs.some(i => i.id == api.getCurrentUserID())) {
        return api.sendMessage(
          "❌| Hye <BaBY>😡!\n━━━━━━━━━━━━━━\n• Bot must be group admin!",
          threadID,
          messageID
        );
      }

      api.addUserToGroup(T4R1F, threadID, (err) => {
        api.setMessageReaction(err ? "❌" : "✅", messageID, () => {}, true);
        // কোনো Success বা Failed মেসেজ পাঠাবে না
      });

    } catch (err) {
      api.setMessageReaction("❌", messageID, () => {}, true);
      // Error হলেও কোনো মেসেজ পাঠাবে না
    }
  }
};
