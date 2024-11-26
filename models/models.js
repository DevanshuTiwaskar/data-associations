const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  productId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' 
  },
}, { timestamps: true });
const UserModel = mongoose.model('User', userSchema);




// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });
const ProductModel = mongoose.model('Product', productSchema);



// Sale Schema
const saleSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
    },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  
  username: { type: String },

  quantity: { type: Number },

  totalAmount: { type: Number },
  
}, { timestamps: true });

const SaleModel = mongoose.model('Sale', saleSchema);

// Creating Models

// Exporting Models
module.exports = {
  UserModel,
  ProductModel,
  SaleModel,
};
