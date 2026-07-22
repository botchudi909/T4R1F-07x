module.exports = {
	config: {
		name: "unsend",
    aliases: ["uns"," unse","unsen"],
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
    noPrefix: true,
		description: {
			vi: "Gỡ tin nhắn của bot",
			en: "Unsend bot's message"
		},
		category: "Group",
		guide: {
			vi: "reply tin nhắn muốn gỡ của bot và gọi lệnh {pn}",
			en: "reply the message you want to unsend and call the command {pn}"
		}
	},

	langs: {
		vi: {
			syntaxError: "Vui lòng reply tin nhắn muốn gỡ của bot"
		},
		en: {
			syntaxError: "• আমার মেসেজ এর রিপ্লাই দে বলদ-!?\n• Reply to my message, you idiot-!?"
		}
	},

	onStart: async function ({ message, event, api, getLang }) {
		if (!event.messageReply || event.messageReply.senderID != api.getCurrentUserID())
			return message.reply(getLang("syntaxError"));
		message.unsend(event.messageReply.messageID);
	}
};
