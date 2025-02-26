import express from "express";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "auth",
    password: "usmanwasti",
    port : 5432
});
db.connect();

app.use(bodyParser.urlencoded({extended: true}));

const result = await db.query("SELECT * FROM users");
 console.log(result.rows);


app.post("/login", async(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;

  const result = await db.query("SELECT username , password FROM users where username = $1 AND password = $2",
    [username , password]
  );
  
  if(result.rows.length === 0){
     return res.status(401).json({error: "invalid credential"});
  }else{
    res.json({message: "login successfully"})
  }

    


})

app.listen(port ,()=>{
  console.log(`listening on port ${port}`)
});