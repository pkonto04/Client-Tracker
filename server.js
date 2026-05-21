const express = require("express");
const app = express();

//ON-SITE CONFIRMATION
//-----------------------------


app.get("/", (req, res) => {
  res.send("Client tracker API is running...");
});

//POWERSHELL CONFIRMATION on port 3000
//-----------------------------


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

//ENTRY OF FAKE DATA
//----------------------------- 
let clients = [{
  id: 1,        //primary key
  businessName : "Anastasiou Prefab", 
  contactName : "Stavros",
  phone: "123456789",
  email: "aaaaa@hotmail.com",
  businessType: "Prefabricated houses",
  status: "Completed",
  estimatedPrice:"1000",
  monthlyFee:"50",
  nextFollowUp:"23/06/26",
  notes: "Completed and delivered to client."

},
{
  id: 2,        //primary key
  businessName : "Coffee Crossing", 
  contactName : "Yiota",
  phone: "99183200",
  email: "CC@gmail.com",
  businessType: "Coffee",
  status: "Completed",
  estimatedPrice:"0",
  monthlyFee:"50",
  nextFollowUp:"23/06/26",
  notes: "Completed and delivered to client."

}
];

//RETURNS ALL -CLIENTS(not deleted ones)
//----------------------------
app.get("/clients",(req,res)=>{
  res.json(clients);
});
const activeClients=clients.filter((client)=> client.status !=="deleted");
//PRINTS ALL -CLIENTS ------DEBUGGING PURPOSES
console.log(activeClients);

//RETURNS CLIENTS BASED ON ID
//----------------------------
app.get('/clients/:id', function(req,res){

const id=Number(req.params.id);
const client= clients.find((client) => Number(client.id)===id);
if( Number.isNaN(id) || !client ){
  return res.status(404).json({error: "Invalid client id"});
}

res.json(activeClients);
});

//ADD A NEW CLIENT(accepts NULL)
//-----------------------------

app.use(express.json());
app.post("/clients", (req,res)=>{
  const newClient={
  id: clients.length+1,
  businessName : req.body.businessName ?? null, 
  contactName : req.body.contactName ?? null,
  phone: req.body.phone ?? null,
  email: req.body.email ?? null,
  businessType: req.body.businessType ?? null,
  status: req.body.status ?? null,
  estimatedPrice: req.body.estimatedPrice ?? null,
  monthlyFee: req.body.monthlyFee ?? null,
  nextFollowUp: req.body.nextFollowUp ?? null,
  notes: req.body.notes ?? null
  
}
  clients.push(newClient);
  res.status(201).json({message: "Client created.",client :newClient,});
});

//UPDATE A CLIENT
//----------------------------

app.put("/clients/:id", (req,res)=>{
  const id=Number(req.params.id);
  const client=clients.find((client) => Number(client.id)===id);

  if(!client){
    return res.status(404).json({error:"Client not found"});
  }
  Object.assign(client,{
    id: client.id,
  businessName : req.body.businessName ?? client.businessName, 
  contactName : req.body.contactName ?? client.contactName,
  phone: req.body.phone ?? client.phone,
  email: req.body.email ?? client.email,
  businessType: req.body.businessType ?? client.businessType,
  status: req.body.status ?? client.status,
  estimatedPrice: req.body.estimatedPrice ?? client.estimatedPrice,
  monthlyFee: req.body.monthlyFee ?? client.monthlyFee,
  nextFollowUp: req.body.nextFollowUp ?? client.nextFollowUp,
  notes: req.body.notes ?? client.notes
  
  });
  
  res.json(client);
});

app.delete("/clients/:id", (req,res)=>{

  const id=Number(req.params.id);
  const client=clients.find((client)=> Number(client.id===id));
  if(!client){
    return res.status(404).json({error: "client not found!" });
  }

  client.status="deleted";

  res.json({
    message:"Client deleted succesfully",
    client: client});
});