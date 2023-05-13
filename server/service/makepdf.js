import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { jsPDF } from 'jspdf';

function createPDF(selectedOrder) {
  const doc = new jsPDF();
  
  // Add content to the document
  doc.setFontSize(12); 
  // doc.text(`Dear customer, Thank you for purchasing this Item and yours items detail is given below: `)
  doc.text(`Order ID: ${selectedOrder._id}`, 15, 5);
  doc.text(`Customer Name: ${selectedOrder.customerName}`, 15, 10);
  doc.text(`Customer Contact: ${selectedOrder.customerContact}`, 15, 15);
  doc.text(`Address:${selectedOrder.shippingAddress.address.split(", ").slice(0,5).join(", ")}`,15,20)
  doc.text(`Order Name: ${selectedOrder.orderItems.product.name}`, 15, 25);
  doc.text(`Brand: ${selectedOrder.orderItems.product.brand}`, 15, 30);
  doc.text(`Price: ${selectedOrder.orderItems.price}`, 15, 35);
  doc.text(`Shipping Fee: ${selectedOrder.shippingPrice}`, 15, 40); 
  doc.text(`Total payment: ${selectedOrder.totalPrice}`, 15, 45);
  doc.text(`Payment Method: ${selectedOrder.paymentMethod}`, 15, 50);
  doc.text(`Ordered Date: ${new Date(selectedOrder.updatedAt).toLocaleDateString()}`, 15, 55);
  doc.text(`                  Thank you for purchasing this Item keep using our site. visit again. `,15,60);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const folderPath = path.join(__dirname, "file");
  fs.mkdirSync(folderPath, { recursive: true });

  // Save the document inside the folder with a custom filename
  const filePath = path.join(folderPath, `${selectedOrder.customerName}_order.pdf`);
  const buffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(filePath, buffer);
  
  console.log('PDF created and saved:', filePath);
  return filePath;
}

export default createPDF;
