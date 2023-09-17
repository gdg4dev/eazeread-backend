const OpenAI = require("openai")

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

const prompts = {
    "0": "You will be provvided with the large text content. You have to sumarize the main points or steps or process from the article. Make it brief without any stories but Don't make it sumarry too small, every major points, events and bullet points needs to be mentioned.  Don't mention pr show affirmatively or expressionism or anything, just provide the content. ",
    "1": "You will be provided with the large text content. You will have to modify it and explain it like I'm 5 year old. Meaning you should remove buzzwords, remove unnecessary information, simlpify complex explanation if there are any, use very simple analogies to explain things if it's too complex. don't care too much about the lenghh of the response, but try to keep the length low. Don't mention pr show affirmatively or expressionism or anything, just provide the content."
}   

const getGPTResponse = async (type, content) => {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": prompts[type.toString()]
          },
          {
            "role": "user",
            "content": content
          }
        ],
        temperature: 0.02,
        max_tokens: 1250,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0.01,
      });

      return await response
}

module.exports = {getGPTResponse}