const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Client tracker API is running...");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/clients");
});

let clients = [
  {
  businessName : "Anastasiou Prefab",
  contactName : "Stavros",
  phone: "123456789",
  email: "aaaaa@hotmail.com",
  businessType: "Prefabricated houses",
  status: "Completed",
  notes: "Completed and delivered to client."
  }
];
app.get("/clients",(req,res)=>{
  res.json(clients);
});