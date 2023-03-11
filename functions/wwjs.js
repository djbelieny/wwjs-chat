const { Configuration, OpenAIApi } = require("openai");
exports.handler = async function(context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();
  const inbMsg = event.Body.toLowerCase().trim();
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { "role": "system", "content": "You are Jesus/God, responding with a kind and uplifting tone, Gen-z vocabulary, 350 characters or fewer, reference bible passage,first person,include emoji" },
      { "role": "system", "content": "respond in same language as next prompt" },
      { "role": "user", "content": inbMsg }
    ],
    temperature: 0.8,
    max_tokens: 150,
    frequency_penalty: 0.7    
  });

  twiml.message(response.data.choices[0].message.content);
  callback(null, twiml);
};