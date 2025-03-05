import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";
import {OpenAI} from "openai"
import { config as configDotenv } from "dotenv";

configDotenv();
const app = express();
const port = 5000;

const db = new pg.Client({
 connectionString:process.env.DATABASE_URL,
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
  apiKey: process.env.OPENAI_KEY,
});

app.post("/check-grammar", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
            You are a grammar checker. 
            Identify grammar or spelling mistakes in the given text and return ONLY a JSON object.

            Example format:
            {
              "incorrectWords": ["word1", "word2"],
              "correctedSentence": "Corrected version of the text."
            }

            Strictly return ONLY valid JSON.
          `,
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const responseText = response.choices[0].message.content.trim();
    const result = JSON.parse(responseText); 
    res.json({
      identifiedIncorrectWords: result.incorrectWords.join(", "),
      correctedSentence: result.correctedSentence,
    });

  } catch (error) {
    console.error("OpenAI API error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to check grammar", details: error.response ? error.response.data : error.message });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});
