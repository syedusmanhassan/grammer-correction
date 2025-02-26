import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "auth",
  password: "usmanwasti",
  port: 5432
});
db.connect();

app.use(cors());
app.use(bodyParser.json({extented:true}));
app.use(express.urlencoded({ extended: true }))



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

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});