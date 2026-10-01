import { connectDB } from "./DB/db.connection.js";
import userRouter from "./modules/user/user.router.js";
import noteRouter from "./modules/note/note.router.js";

export const bootstrap = (app, express) => {
  // 1. الاتصال بقاعدة البيانات
  connectDB();

  // 2. Body Parser Middleware
  app.use(express.json());

  // 3. مسارات التطبيق (Application Routes)
  app.use("/users", userRouter);
  app.use("/notes", noteRouter);

//   4. معالجة الروابط غير المعرفة (Not Found Handler - 404)
  app.use((req, res) => {
    return res.status(404).json({
      msg: `Invalid URL: ${req.originalUrl} not found`,
      status: 404,
      timestamp: new Date().toISOString(),
    });
  });

  // 5. معالجة الأخطاء المركزية (Global Error Handling Middleware)
  app.use((err, req, res, next) => {
    const status = err.cause?.statusCode || err.statusCode || 500;
    return res.status(status).json({
      msg: err.message || "Internal Server Error",
      status,
      timestamp: new Date().toISOString(),
    });
  });
};