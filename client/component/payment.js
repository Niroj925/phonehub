import React from 'react';
import { Button } from 'react-bootstrap';

const Payment = ({ formData }) => {
  console.log('formdata info')
  console.log(formData)

  const handleSubmit = (event) => {
    event.preventDefault();
    post("https://uat.esewa.com.np/epay/main", {
      amt: formData.itemsPrice,
      psc: 0,
      pdc: formData.shippingPrice,
      txAmt: 0,
      tAmt: formData.totalPrice,
      pid: formData._id,
      scd: "EPAYTEST",
      su: "https://fonehub.netlify.app/payment/success?q=su",
      fu: "https://fonehub.netlify.app/payment/failed?q=fu"
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
      <Button onClick={handleSubmit}>Continue Pay with Esewa</Button>
    </div>
  );
};

export default Payment;
