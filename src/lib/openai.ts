const {Configuration, OpenAIApi} = require("openai");

const cfg = Configuration({
	apiKey: process.env.OPEN_AI_API_KEY,
	model: process.env.OPEN_AI_MODEL
});

const openai = new OpenAIApi(cfg);
export default openai;