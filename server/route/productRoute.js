import {Router} from 'express';
import  ProductController from '../controller/productController.js'


const router =Router();

const productController=new ProductController();


router.post('/addproduct',productController.addProduct);
// router.put('/update',productController.updateProduct);
router.put('/updateprice',productController.updateProductPrice);
router.put('/addfeature',productController.addFeatures);
// router.post('/remove',productController.removeProduct);
router.get('/getproduct',productController.getAllProduct);
router.get('/getfilterproduct',productController.getProductsWithFilters);

export default router;