

const express = require("express");
const app = express();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
// const cookieParser = require("cookie-parser");

app.use(express.json());
// app.use(cookieParser());
app.use(cors());

const configuration = new Configuration({
  apiKey:"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", // Make sure to set your API key in the environment variable OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("<h1>Shayari Generator</h1>");
});

app.post("/generate-shayari", async (req, res) => {
  try {
    let prompt = req.body.prompt || 'Love'; // Default prompt is 'Love'
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate a Shayari  in hindi  and ${"\n"} english about ${prompt}.`,
      max_tokens:500, // Adjust the number of tokens as needed
      temperature: 0.7, // Controls the randomness of the generated text (0.2 for less randomness, 0.7 for more randomness)
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const shayari = response?.data?.choices?.[0].text;
    res.json({
      shayari: shayari,
      prompt: prompt
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "error":error.message});
  }
});


app.post("/quote", async (req, res) => {
  try {
    let prompt = req.body.prompt || 'Love'; // Default prompt is 'Love'
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate a quote  in hindi  and ${"\n"} english about ${prompt}.`,
      max_tokens:500, // Adjust the number of tokens as needed
      temperature: 0.7, // Controls the randomness of the generated text (0.2 for less randomness, 0.7 for more randomness)
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const quote = response?.data?.choices?.[0].text;
    res.json({
      quote: quote,
      prompt: prompt
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "error":error.message});
  }
});


app.post("/joke", async (req, res) => {
  try {
    let prompt = req.body.prompt || 'Love'; // Default prompt is 'Love'
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate a joke in hindi ${"\n"}  and english ${"\n"} about ${prompt}.`,
      max_tokens:500, // Adjust the number of tokens as needed
      temperature: 0.7, // Controls the randomness of the generated text (0.2 for less randomness, 0.7 for more randomness)
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const joke = response?.data?.choices?.[0].text;
    res.json({
      joke: joke,
      prompt: prompt
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "error":error.message});
  }
});


app.post("/story", async (req, res) => {
  try {
    let prompt = req.body.prompt || 'Love'; // Default prompt is 'Love'
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate a story  in hindi ${"\n"}  and english ${"\n"}  about ${prompt}.`,
      max_tokens:500, // Adjust the number of tokens as needed
      temperature: 0.7, // Controls the randomness of the generated text (0.2 for less randomness, 0.7 for more randomness)
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const story = response?.data?.choices?.[0].text;
    res.json({
      story: story,
      prompt: prompt
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "error":error.message});
  }
});

app.post("/chat",(req,res)=>{
  let question=req.body.question || 'How to use chatgpt?'
  openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${question}`,
      max_tokens: 4000,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }).then(response=>{
      return response?.data?.choices?.[0].text;
    }).then((ans)=>{
      const arr=ans?.split("\n").filter(ele=>ele).map(value=>value.trim());
      return arr;
    })
    .then(response=>{
      res.json({
          answer:response,
          prompt:question
      })        
  })
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
