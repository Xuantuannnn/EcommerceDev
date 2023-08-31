const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
// trung gian kết nối giữa nodejs và mongodb, giúp cho cơ sở dữ liệu chặt chẽ hơn, có tính ràng buộc hơn
const mongoose = require('mongoose')
//middleware
// kiểm soát yêu cầu và phẩn hồi của bất kỳ API nào
app.use(bodyParser.json())
// kiểm soát postman
app.use(morgan('tiny'))
const cors = require('cors')
require('dotenv/config')
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
app.use(authJwt());
app.use(errorHandler);
app.use(cors())
app.options('*',cors())
//Routes
const categoriesRoutes = require('./routers/categories');
const productsRoutes = require('./routers/products');
const usersRoutes = require('./routers/users');
// const ordersRoutes = require('./routers/orders');

const api = process.env.API_URL;
// nó sẽ nhận các router bên trong làm tuyến con của routers
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
// app.use(`${api}/orders`, ordersRoutes);
//new mongoose

// // Tạo model
// const productSchema = mongoose.Schema({
//   name: String,
//   image:String,
//   countInStock: {
//     type: Number,
//     required:true,
//     unique:true
//   }
// })
// // cái chuỗi Product đầu ở model() nó sẽ tự chuyển hóa sang products trong mongodb
// const Product = mongoose.model('Product',productSchema)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.get(`${api}/products`, async(req, res)=>{
//   const productList =await Product.find()

//   if(!productList){
//     res.status(500).json({success:false})
//   }
//   res.send(productList)
// })

// app.post(`${api}/products`, (req, res)=>{
//   const product = new Product({
//      name: req.body.name,
//      image: req.body.image,
//      countInStock: req.body.countInStock
//   })
//   // product.save() trả về promise
//   product.save().then((createdProduct =>{
//     res.status(201).json(createdProduct)
//   }))
//   .catch((err) =>{
//     res.status(500).json({
//       error: err,
//       success:false
//     })
//   })
// })
mongoose.connect('mongodb+srv://shop-user:Xuantuan1410@cluster0.zqc9q1h.mongodb.net/shop-e?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology:true,
  dbName:'shop-e'
})
.then(()=>{
  console.log('Succesfully');
})
.catch((err)=>{
  console.log(err);
})

app.listen(port, () => {
  console.log(api);
  console.log(`Example app listening on port ${port}`)
})