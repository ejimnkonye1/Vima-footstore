const wishList = [
    "http://localhost:3000",
    "http://localhost:3000",
     "http://localhost:5173",
      "http://localhost:5174",
   
]

const corsOption = {
    origin: (origin,callback) => {
    if (wishList.includes(origin) || !origin){
        callback(null, true)
    } else {
        callback(new Error("Not Allowed By CORS") )
    }
    },
     credentials: true, 
    optionsSuccessStatus: 200
}


module.exports = corsOption