import url from 'url';

export default class CustomerController {
async googleauth(req, res) {
    const user = req.user;
    // const userId = user._id;   // Retrieve the user's ID
    const userId="644e8f70b3559be9df31c4cc"
    const productId = req.query.product_id;
    console.log(productId);
    const productid ="644e8f70b3559be9df31c4cc"
    // const successRedirectUrl = `http://localhost:3000/product/buy?userid=${userId}`;
    // const successRedirectUrl=` http://localhost:3000/product/buy?userid=${userId}&productid=644e8f70b3559be9df31c4cc`; 
    const successRedirectUrl= `http://localhost:3000/product/buy?userid=${userId}&productid=${productid}`

    // const successRedirectUrl = `http://localhost:3000/poduct/buy?userid=${userId}&productid=${productid}`;

    console.log('users info:')
    console.log(user);
    // Insert the user's ID into the URL
    res.redirect(successRedirectUrl);  // Redirect the user to the success URL
  }
}