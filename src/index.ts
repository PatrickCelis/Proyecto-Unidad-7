import app from "./app";
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`El servidor se ejecuta en http://localhost:${port}`);
});