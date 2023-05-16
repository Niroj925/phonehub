import customerModel from "../model/customerAccount.js";
// import customerModel from './model/customerAccount.js';

export default class CustomerController {
async googleauth(req, res) {
    const user = req.user;
    const userId = user._id;   // Retrieve the user's ID
   
    const successRedirectUrl= `https://fonehub.netlify.app/product/buy?userid=${userId}`
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