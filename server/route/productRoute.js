import {Router} from 'express';
import  ProductController from '../controller/productController.js'
import multer from 'multer';
import fs from 'fs';

// const upload = multer({ dest: 'uploads/' })

const router =Router();

const productController=new ProductController();

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const folder = './public/image/';
      // create the folder if it does not exist
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }
      cb(null, folder);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    },
  });
  
  
  const fileFilter = (req, file, cb) => {
    // Check file type
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 3,//this is for limit 1mb
    },
    fileFilter: fileFilter,
  });


router.post('/addproduct',upload.single('image'), productController.addProduct);
// router.put('/update',productController.updateProduct);
router.put('/updateprice',productController.updateProductPrice);
router.put('/addfeature',productController.addFeatures);
router.post('/remove',productController.deleteProduct);
router.get('/getproduct',productController.getAllProduct);
router.post('/getfilterproduct',productController.getProductsWithFilters);
router.post('/getproductbyid',productController.getProductById)

export default router;