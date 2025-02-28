import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";
import {OpenAI} from "openai"


const app = express();
const port = 5000;

const db = new pg.Client({
 connectionString:'postgresql://postgres:JQBWTQtbnSMXGoTIQekHIbrwUSkaKhSY@yamabiko.proxy.rlwy.net:49831/railway',
 ssl: { rejectUnauthorized: false },
});
db.connect();

app.use(cors());
app.use(bodyParser.json({extented:true}));
app.use(express.urlencoded({ extended: true }));

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username,password)


  try {
    const result = await db.query("SELECT username , password FROM users where username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "invalid credential" });
    } else {
      res.json({ message: "login successfully" })
    }
  } catch (error){
    console.error("Login failed", error);
    res.status(500).json({ error: "Internal server error" });
  }

});


const openai = new OpenAI({
  apiKey: "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", // Replace with your OpenAI API key
});

app.post("/check-grammar", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      // model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful grammar checker. Identify any grammar or spelling mistakes in the given text. Return the only incorrect words. Format the response as follows: [ only incorrect words ] ",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });
    const identifiedIncorrectWords = response.choices[0].message.content;
    res.json({ identifiedIncorrectWords });
  }
  catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to check grammar" });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});