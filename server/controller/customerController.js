import customerModel from "../model/customerAccount.js";
// import customerModel from './model/customerAccount.js';

export default class CustomerController {
async googleauth(req, res) {
    const user = req.user;
    const userId = user._id;   // Retrieve the user's ID
    // const userId="644e8f70b3559be9df31c4cc"
    const productId = req.query.product_id;
    console.log(productId);
    const productid ="644e8f70b3559be9df31c4cc"
    
    const successRedirectUrl= `http://localhost:3000/product/buy?userid=${userId}&productid=${productid}`

    console.log('users info:')
    console.log(user);
    // Insert the user's ID into the URL
    res.redirect(successRedirectUrl);  // Redirect the user to the success URL
  }

  async getCustomerById(req, res) {
    try {
      const customerId = req.body.customerId;
      const customer = await customerModel.findById(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'customer not found' });
      }
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


}