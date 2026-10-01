import express from "express";
import { bootstrap } from "./src/bootstrap.js";

const app = express();
const port = process.env.PORT || 3000;

// تفعيل كل إعدادات التطبيق من خلال bootstrap
bootstrap(app, express);

app.listen(port, () => {
  console.log(`Server is running successfully on port ${port}!`);
});