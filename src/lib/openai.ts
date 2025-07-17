const {Configuration, OpenAIApi} = require("openai");

const cfg = Configuration({
	apiKey: process.env.OPEN_AI_API_KEY
});

const openai = new OpenAIApi(cfg);
export default openai;