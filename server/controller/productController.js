
import productModel from '../model/productModel.js';
import fs from 'fs';
import "dotenv/config";

export default class ProductController{
    async addProduct(req,res){
       console.log(req.body);
      try {
        const productData = {
          name: req.body.name,
          brand: req.body.brand,
          description: req.body.description,
          category: req.body.category,
          image: {
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype,
          },
          price: req.body.price,
          countInStock: req.body.countInStock,
          features: req.body.features,
          user: req.body.user,
        
        };
        const response = await productModel.create(productData);
        res.status(200).json({ response });
      } catch (err) {
        return res.json(err);
      }
    

          // try {
          //   const response = await productModel.create({...req.body});
          //   if (response === null) {
          //     return res.json([]);
          //   } else {
          //         res.status(200).json({response})
          //   }
          // } catch (err) {
          //   return res.json(err);
          // }
        
}

 async getAllProduct(req, res) {
    try {
      const products = await productModel.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductsWithFilters(req, res) {
    try {
      const { brand, priceMin, priceMax, features } = req.body;
      let filter = {};
  
      if (brand) {
        filter.brand = { $regex: brand, $options: 'i' };
      }
  
      if (priceMin && priceMax) {
        filter.price = { $gte: priceMin, $lte: priceMax };
      } else if (priceMin) {
        filter.price = { $gte: priceMin };
      } else if (priceMax) {
        filter.price = { $lte: priceMax };
      }
  
      if (features) {
        const featureFilters = features.map(feature => ({
          'features.name': feature.name,
          'features.value': feature.value
        }));
        filter.$and = featureFilters;
      }
    
     console.log(filter);
      const products = await productModel.find(filter).populate('user', 'id name email');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async addFeatures(req,res){
    const {productId,newFeature}=req.body;

    try{
    const product = await productModel.findById(productId);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    
    if (Array.isArray(newFeature)) {
      newFeature.forEach((feature) => {
        if (feature.name && feature.value) {
          product.features.push(feature);
        }
      });
    } else if (newFeature.name && newFeature.value) {
      product.features.push(newFeature);
    } else {
      return res.json({
        success: false,
        message: 'Invalid newFeature parameter',
      });
    }

    await product.save();

    res.json( { success: true, message: 'Product updated successfully', product });


  }catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error updating product' });
  }

  }

  

    async updateProductPrice (req,res){
      const {productId, newPrice}=req.body
    try {
      const product = await productModel.findByIdAndUpdate(
        productId,
        { price: newPrice },
        { new: true }
      );
      res.json({ product});
    } catch (error) {
      console.error(error);
      res.json(error);
      throw new Error('Error updating product price');
    }
  };

  async updateCountStock(req,res){
    const {productId, newCountStock}=req.body
  try {
    const product = await productModel.findByIdAndUpdate(
      productId,
      { countInStock: newCountStock },
      { new: true }
    );
    res.json({ product});
  } catch (error) {
    console.error(error);
    res.json(error);
    throw new Error('Error updating product count');
  }
};

async  deleteProduct(req, res) {
  try {
    const id = req.body.productId;
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
       res.status(404).json({ message: "Product not found" });
    }
     res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
     res.status(500).json({ message: "Internal server error" });
  }
}

  }



