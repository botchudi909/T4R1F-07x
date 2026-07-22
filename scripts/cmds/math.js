const axios = require("axios");

const API =
"https://raw.githubusercontent.com/MR-TARIF-BOT-X404/T4R1F/refs/heads/main/math-api.json";

module.exports = {

config:{
 name:"math",
 aliases:["mathquiz","mathgame"],
 version:"7.0.0",
 author:"AHMED TARIF",
 countDown:0,
 role:0,
 category:"Game",
 guide:"{p}math"
},


onStart: async function({api,event,usersData}){

 const player =
 await usersData.getName(event.senderID);

 let quiz;


 try{

  const {data}=await axios.get(API,{
   timeout:7000
  });

  if(Array.isArray(data)&&data.length)
   quiz=data[Math.floor(Math.random()*data.length)];

 }catch(e){}



 if(!quiz){

  let a=rand(10,50);
  let b=rand(5,40);

  let ans=a+b;

  quiz={
   question:`${a} + ${b} = ?`,
   options:shuffle([
    ans,
    ans+2,
    ans-3,
    ans+5
   ]),
   answer:ans
  };

 }


 const question =
 quiz.question ||
 quiz.q ||
 quiz.problem;


 const options =
 quiz.options ||
 quiz.choices;


 const answer =
 quiz.answer ||
 quiz.correct ||
 quiz.correctAnswer;



 const index =
 options.findIndex(
  x=>String(x)==String(answer)
 );


 const correctLetter =
 ["a","b","c","d"][index];



 const msg =
`⚙| 𝗤𝘂𝗶𝘇 ( Math )👨🏿‍🌾
━━━━━━━━━━━━

• [👤]➜ Player: ${player}

• [📜]➜ • ${question}

━━━━━━━━━━━━

• [A]➜ ${options[0]}
• [B]➜ ${options[1]}
• [C]➜ ${options[2]}
• [D]➜ ${options[3]}

━━━━━━━━━━━━

• [💬]➜ Reply A/B/C/D`;



 api.sendMessage(
  msg,
  event.threadID,
  (err,info)=>{

   if(err)return;


   global.GoatBot.onReply.set(
    info.messageID,
    {

     type:"math",
     commandName:"math",

     author:event.senderID,
     messageID:info.messageID,

     answer:String(answer),
     correctLetter,

     attempts:0,
     maxAttempts:2,

     rewardCoins:3000,
     rewardExp:1000

    }
   );


  },
  event.messageID
 );

},



onReply: async function({api,event,Reply,usersData}){


 if(!Reply || Reply.type!=="math")
 return;



 if(event.senderID!==Reply.author)
 return;



 let input =
 event.body.toLowerCase().trim();


 const convert={
  "1":"a",
  "2":"b",
  "3":"c",
  "4":"d"
 };


 input=convert[input]||input;



 if(!["a","b","c","d"].includes(input))
 return;



 // WIN

 if(input===Reply.correctLetter){


  try{
   await api.unsendMessage(
    Reply.messageID
   );
  }catch(e){}



  let user=
  await usersData.get(
   Reply.author
  );



  await usersData.set(
   Reply.author,
   {
    money:(user.money||0)+Reply.rewardCoins,
    exp:(user.exp||0)+Reply.rewardExp,
    data:user.data||{}
   }
  );



  return api.sendMessage(
`⚙ 𝗤𝘂𝗶𝘇 ( Win )👨🏿‍🌾
━━━━━━━━━━━━

• [🎊]➜ YOU WON!
• [💲]➜ +${Reply.rewardCoins} Coins
• [🌡]➜ +${Reply.rewardExp} Exp
• [✅]➜ Answer: ${Reply.answer}

━━━━━━━━━━━━`,
event.threadID,
event.messageID
);

 }



 // WRONG


 Reply.attempts++;



 if(Reply.attempts>=Reply.maxAttempts){


 return api.sendMessage(
`⚙ 𝗤𝘂𝗶𝘇 ( Game Over )👨🏿‍🌾
━━━━━━━━━━━━

• [😢]➜ GAME OVER!
• [🚫]➜ Wrong Answer!
• [✅]➜ Answer: ${Reply.answer}

━━━━━━━━━━━━`,
event.threadID,
event.messageID
);

 }



 global.GoatBot.onReply.set(
  Reply.messageID,
  Reply
 );


 return api.sendMessage(
`⚙ 𝗤𝘂𝗶𝘇 ( Try Again )👨🏿‍🌾
━━━━━━━━━━━━

• [❌]➜ WRONG ANSWER!
• [🔄]➜ Try Again
• [❤‍🩹]➜ Chance Left: ${Reply.maxAttempts-Reply.attempts}

━━━━━━━━━━━━`,
event.threadID,
event.messageID
);

}

};



function rand(min,max){

return Math.floor(
Math.random()*(max-min+1)
)+min;

}


function shuffle(arr){

return arr.sort(
()=>Math.random()-0.5
);

}
