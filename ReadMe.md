
//this a flow of how a client request on any api how body parser use and how server send respond to client


[ Client Request ]
      ⬇️
[ Express App (app.js) ]
      ⬇️
[ Middleware: express.json() → req.body ban gaya ] ===> ye body parser "app.use("/menu", menuItemRoutes)" iske phele he likhna hain kyuki body parser jo req aaye hain usse json main format main covert karke req.body main dal dete hainn taki express ya server usse read kar paye aur further use kar paye agar phele define nhi kiya toh req.body undefined rahe jayegi aue usse routes use nhi kar payenge
      ⬇️
[ app.use("/menu", menuItemRoutes) ]
      ⬇️
[ menuItemRoutes.js → router.post("/") match ]
      ⬇️
[ req.body access → DB me save ]
      ⬇️
[ res.json() se response back to client ]




//nodejs server is online you can access it from this url
https://mydatabase-cyvs.onrender.com/