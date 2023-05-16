import React from 'react';
import { Button } from 'react-bootstrap';
const Payment = ({formData}) => {
  console.log('formdata info')
  console.log(formData)
  const handleSubmit = (event) => {
    event.preventDefault();
    post("https://uat.esewa.com.np/epay/main", {
      amt: 200,
      psc: 50,
      pdc: 10,
      // txAmt: 0,
      tAmt: 260,
      pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d458",
      scd: "EPAYTEST",
      su: "http://localhost:3000/payment/success?q=su",
      fu: "http://localhost:3000/payment/failed?q=fu"
    });
  };

  const post = (path, params) => {
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (const key in params) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      <form action="https://uat.esewa.com.np/epay/main" method="POST"  >
      <input value={formData.totalPrice} name="tAmt" type="hidden"/>
    <input value={formData.itemsPrice} name="amt" type="hidden"/>
    <input value="0" name="txAmt" type="hidden"/>
    <input value="0" name="psc" type="hidden"/>
    <input value={formData.shippingPrice} name="pdc" type="hidden"/>
    <input value="EPAYTEST" name="scd" type="hidden"/>
    <input value={formData._id} name="pid" type="hidden"/>
    <input value="https://fonehub.netlify.app//payment/success?q=su" type="hidden" name="su"/>
    <input value="https://fonehub.netlify.app//payment/failed?q=fu" type="hidden" name="fu"/>
      <Button  type="submit" >Continue Pay with Esewa </Button>
    </form>
    </div>
  );
};

export default Payment;


