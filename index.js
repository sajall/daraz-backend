console.log("this is node");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const jsonwebtoken = require("jsonwebtoken");
const app = express();
// use is a middleware font end sy backend py data bejhny k liy yh line lazmi likhi hy
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

const PORT = process.env.PORT || 6070;
const mongodb = "mongodb+srv://aminaaslam985:amina123@cluster0.w7bvzq1.mongodb.net/userauthentication";

// array of products
let products = [
  {
    src: "https://www.elo.shopping/cdn/shop/files/vf_9e1b0994-d3da-40f7-9832-2fa8286da8c8.jpg?v=1701258671&width=360",
    category: "shoes",
    price: 3000,
  },
  {
    src: "https://www.elo.shopping/cdn/shop/files/4189_ad3d7297-4304-4001-8e66-422c592a3653.jpg?v=1701261029&width=360",
    category: "shoes",
    price: 2500,
  },
  {
    src: "https://www.elo.shopping/cdn/shop/files/DSC0264.jpg?v=1701164411&width=360",
    category: "shoes",
    price: 1500,
  },
  {
    src: "https://www.elo.shopping/cdn/shop/files/02_58cee82f-2b33-48ef-ab2c-564343594653.jpg?v=1700830197&width=360",
    category: "shoes",
    price: 2000,
  },
  {
    src: "https://www.elo.shopping/cdn/shop/files/365_1f8eda55-3376-4df2-bc7c-7fb63fd2ea2d.jpg?v=1701146883&width=360",
    category: "shoes",
    price: 3000,
  },
  {
    src: "https://www.elo.shopping/cdn/shop/files/DSC9965.jpg?v=1700899030&width=360",
    category: "shoes",
    price: 2500,
  },
  {
    src: "https://www.elo.shopping/cdn/shop/files/Untitled-14_0001_dw_008-23-85102-41-411_01.jpg?v=1700915308&width=360",
    category: "shoes",
    price: 4000,
  },
  {
    src: "https://www.elo.shopping/cdn/shop/files/Untitled-9_0002_dw_008-22-85207-29-001_03.jpg?v=1701063652&width=360",
    category: "shoes",
    price: 4500,
  },
  {
    src: "https://outfitters.com.pk/cdn/shop/files/F0819106227_2.jpg?v=1701081213",
    category: "shirts",
    price: 350,
  },
  {
    src: "https://outfitters.com.pk/cdn/shop/files/F0077125901_1.jpg?v=1699937321",
    category: "shirts",
    price: 500,
  },
  {
    src: "https://outfitters.com.pk/cdn/shop/files/F0077125414_2.jpg?v=1700201172",
    category: "shirts",
    price: 550,
  },
  {
    src: "https://outfitters.com.pk/cdn/shop/files/F0826106001_1.jpg?v=1701081046",
    category: "shirts",
    price: 600,
  },
  {
    src: "https://outfitters.com.pk/cdn/shop/files/F0807106112_1.jpg?v=1701079991",
    category: "shirts",
    price: 650,
  },
  {
    src: "https://deeds.pk/cdn/shop/files/Navy-Camo.jpg?v=1700068048&width=500",
    category: "jacket",
    price: 1500,
  },
  {
    src: "https://deeds.pk/cdn/shop/files/Jacket-Recovered.jpg?v=1700586393&width=500",
    category: "jacket",
    price: 5000,
  },
  {
    src: "https://deeds.pk/cdn/shop/files/Tigher-White.jpg?v=1698339891&width=500 ",
    price: 5000,
    category: "jacket",
  },
  {
    src: "https://deeds.pk/cdn/shop/files/Black_383bbfce-a50b-4668-9e79-ecfc68e3a21c.jpg?v=1699280382&width=500",
    category: "jacket",
    price: 4000,
  },
  {
    src: "https://deeds.pk/cdn/shop/files/Black_3c70172a-1fec-423a-8af9-8de6aeb32a05.jpg?v=1699290309&width=500",
    category: "jacket",
    price: 7000,
  },

  {
    src: "https://deeds.pk/cdn/shop/files/01_d66ab1ea-c405-42e2-b91f-ab5848247f4a.jpg?v=1699280061&width=500",
    category: "jacket",
    price: 9000,
  },
  {
    src: "https://deeds.pk/cdn/shop/files/Sa61e686a81644c0f96df2cad6a9c559e8.webp?v=1699279982&width=500",
    category: "jacket",
    price: 3300,
  },
  {
    src: "https://deeds.pk/cdn/shop/files/Mens-Double-Shaded-jacket-Back.jpg?v=1698167160&width=500",
    category: "jacket",
    price: 8000,
  },
  {
    src: "https://deeds.pk/cdn/shop/files/01_154cb4ac-aaba-4026-b77d-3aded7185c25.jpg?v=1698167151&width=500",
    category: "jacket",
    price: 1000,
  },
  {
    src: "https://deeds.pk/cdn/shop/files/02.webp?v=1698321101&width=500",
    category: "jacket",
    price: 6000,
  },
  {
    src: "https://deeds.pk/cdn/shop/files/Camel_67f2e1f0-e95c-4be2-9d81-db5bba50543e.jpg?v=1698167154&width=500",
    category: "jacket",
    price: 4400,
  },
  {
    src: "https://themothercare.pk/cdn/shop/files/BabyLotionNatural60ml_f3066472-f295-4b31-8588-8fe9982e8fe5.jpg?v=1683874416",
    category: "Mother & Baby",
    price: 1000,
  },
  {
    src: "https://themothercare.pk/cdn/shop/files/SanitizerSpecialOffer-Mineral.jpg?v=1697719398",
    category: "Mother & Baby",
    price: 1000,
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0560/8053/1620/files/Baby-Lotion-Soap-80gm_51626707-e517-4ee3-9113-5a70b4adc45a.jpg?v=1683874385",
    category: "Mother & Baby",
    price: 1000,
  },
  {
    src: "https://themothercare.pk/cdn/shop/files/3_15c24b94-2b20-4d93-9725-d0c2b239c91d.jpg?v=1700643378",
    category: "Mother & Baby",
    price: 500,
  },
  {
    src: "https://themothercare.pk/cdn/shop/files/5.jpg?v=1700643454",
    category: "Mother & Baby",
    price: 800,
  },
  {
    src: "https://themothercare.pk/cdn/shop/files/Ben-10-Gift-Bag_b0dc9bb8-8b53-4021-a3d6-7c7d340bc9e6.jpg?v=1683874404",
    category: "Mother & Baby",
    price: 1100,
  },
  {
    src: "https://m.media-amazon.com/images/I/51IR-UtjhWL._AC_UL320_.jpg",
    category: "Home & lifestyle",
    price: 1100,
  },
  {
    src: "https://m.media-amazon.com/images/I/815vZaQ9FXL._AC_UL320_.jpg",
    category: "Home & lifestyle",
    price: 1100,
  },
  {
    src: "https://m.media-amazon.com/images/I/71BJS+Tsu9L._AC_UL320_.jpg",
    category: "Home & lifestyle",
    price: 1100,
  },
  {
    src: "https://m.media-amazon.com/images/I/91x3mfnatML._AC_UL320_.jpg",
    category: "Home & lifestyle",
    price: 1100,
  },
  {
    src: "https://m.media-amazon.com/images/I/71CESXuBhuL._AC_UL320_.jpg",
    category: "Home & lifestyle",
    price: 1100,
  },
  {
    src: "https://m.media-amazon.com/images/I/713gP5t4HvL._AC_UL320_.jpg",
    category: "Home & lifestyle",
    price: 1100,
  },
  {
    src: "https://m.media-amazon.com/images/I/81FC5MjSO6L._AC_UL320_.jpg",
    category: "Home & lifestyle",
    price: 1100,
  },
  {
    src: "https://m.media-amazon.com/images/I/71n5liH+phL._AC_UL320_.jpg",
    category: "Home & lifestyle",
    price: 1100,
  },
  {
    src: "https://m.media-amazon.com/images/I/71DTJ31s80L._AC_UL320_.jpg",
    category: "Home & lifestyle",
    price: 1100,
  },
  {
    src: "https://m.media-amazon.com/images/I/61AZfCuN0oL._AC_UL320_.jpg",
    category: "Home & lifestyle",
    price: 1100,
  },
];

// user schema
let userSchema = mongoose.Schema(
  {
    email: String,
    password: String,
    ads: [],
  },
  {
    timestamps: true,
  }
);

// user model
const usersModel = mongoose.model("user", userSchema);


// making products schema
let productsSchema = mongoose.Schema({
  category: String,
  price: String,
  src: String,
  userId: {
    ref:"user",
    type:mongoose.Schema.Types.ObjectId,
  }
});

// creating products model
let productsModel = mongoose.model("product", productsSchema);

// creating documnets
// const createDocument = async()=>{
//     const result = await productsModel.insertMany(products);
// }
// createDocument();






//getting products
app.get("/products", async (req, res) => {
  const data = await productsModel.find();
  return res.json(data);
});




// finding product for product details
app.put("/find-product/:id", async (req, res) => {
  try {
    const product = await productsModel.findOne( {_id : req.params.id}).populate('userId').exec(); 
   return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);

  }
});





// create product 
app.post('/create-product' , async(req , res)=>{
  try {
    const product = productsModel( req.body);
   await product.save();
   return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);

  }
      
})



// _______________________users ________________________________


// api for creating user in database
app.post("/create-user", async (req, res) => {
  try {
    const data = new usersModel(req.body);
    await data.save();
    return res.json("User created successfully!");
  } catch (err) {
    return res.status(500).json(err);
  }
});




// getting users 
app.get("/user-lao", async (req, res) => {
  const data = await usersModel.find({});
  res.json({ sucess: true, data: data });
});





// deleting the user
app.delete("/delete-user/:id", async (req, res) => {
  try {
    const data = await usersModel.deleteOne({ _id: req.params.id });
    return res.json({
      success: true,
      message: "user deleted successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});





// updating the user 
app.put("/update-user/:id", async (req, res) => {
  const data = await usersModel.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });
  res.json({ success: true, data: data });
});



// authenticating the user
app.put("/find-user", async (req, res) => {
  console.log(req.body , 'this is request body nowwwww');
  try {
    const user = await usersModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found against this email");
    }
    const validatePass = user.password === req.body.password;
    if (!validatePass) {
      return res.status(400).send("wrong Password");
    }

    jsonwebtoken.sign(
      { email: user.email },
      " my name is amina",
      { expiresIn: "1w" },
      function (err, token) {
      return res.json({
          myToken: token,
          data: user,
          messsage: "login faild , invalid",
        });
      }
    );
  } catch (err) {
    return res.status(400).json(err);
  }
});




// checking the jsonwebtoken in localstorage
app.post("/check-token", (req, res) => {
  jsonwebtoken.verify(
    req.body.token,
    " my name is amina",
    async (err, myData) => {
      const user = await usersModel.findOne({ email: myData.email });
      res.json({
        success: true,
        data: user,
      });
    }
  );
});




// for connecting frontend with backend for deployment
app.use(express.static("./build"));



// mongoodb connection
mongoose
  .connect(mongodb)
  .then(() => {
    console.log("successfully connected to database");
    app.listen(6070, () => {
      console.log("hi! this is bckend server running there");
    });
  })
  .catch((err) => {
    console.log("cannot connect to database", err);
  });

// for importing exporting
// module.exports hmesha aik object leta hy jis mn jo jo chezein export krni hun wo rakh dety hyn
// module.exports = {
// x:10,
// y:20
// }

// dossri file jis mn import krna hy us mn ja k import krny k liy
// const (variable ka nam mostly jis file sy import kr rhy  hun us file k nam py hi rkhty hyn) app = require(file ka nam './app')
// const app = require('./app')
// poori file ko require kr liya hy jo kuch pichli file sy export k object mn rkha hoga wo app k variable mn store ho jy ga then
// apny mtlb ki chez app.dash kr k nikal skty hyn
// __dirname >> for checking the name of your directry
// __filename >> also provides us the file name you are in 5
