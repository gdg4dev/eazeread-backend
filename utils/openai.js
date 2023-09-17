const OpenAI = require("openai")

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

const prompts = {
    "0": "You will be provided with a large text content. It will most likely be something like blog or article or news or tutorial or a reciepe. It's up to decide on which category does the text content fits the best. Above categories are just examples, You can always create new catergories if necessary. Now After deciding the category you will have to summarize the content. For example, if it's a personal blog then you can return a sumarry about what happened in the blog. if it's a news then you can return the catchy title first and then major updates and description regarding the news. if it's  a tutorial then you should return a summarized tutorial with bullet points for each step. These were just some of the example, you can always add you touch. Summary should not be just abstract. It can be entire article with just main points of what's in it. Do not shorten it too much. Don't mention pr show affirmatively or expressionism or anything, just provide the content",
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