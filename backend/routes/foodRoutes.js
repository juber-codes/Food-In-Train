// import express from "express"
// import { addFood } from "../controllers/foodControllers.js"
// import multer from "multer" 


// const foodRouter = express.Router();



// // image storage engine 

// const storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//             return cb(null,`${Date.now()}${file.originalname}`)
//     }
// })


// const upload = multer({storage:storage})

// foodRouter.post("/add",upload.single("image"),addFood)




// export default foodRouter;

import express from "express";
import multer from "multer";
import { addFood,listFood,removeFood } from "../controllers/foodControllers.js";

const foodRouter = express.Router();

// Storage engine for multer
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);

export default foodRouter;
