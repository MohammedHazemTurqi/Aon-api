
const express = require('express');
const req = require('express/lib/request');
const app = express()
const port = 3000
const fs=require("fs");
app.use(express.json());

const data = fs.readFileSync("./users.json", "utf8");
const users = JSON.parse(data);


// let users = [
//     {
//         id: 2,
//         name: "ali"
//     },
//     {
//         id: 3,
//         name: "Mohammed"
//     },
// ];
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/users', (req, res) => {
  
    res.send(users);
})
app.get('/users/:id', (req, res) => {
   let id=req.params.id;
   let user =users.find ((el)=>el.id=== parseInt(id))
    res.send(user);
})
// Search by name
app.get('/users/name/:name', (req, res) => {
    let name = req.params.name;
    let user = users.find((el) => el.name === name);
    res.send(user);
  });
  
  // Search by city
  app.get('/users/city/:city', (req, res) => {
    let city = req.params.city;
    let user = users.find((el) => el.city === city);
    res.send(user);
  });
  
  // Search by username
  app.get('/users/username/:username', (req, res) => {
    let username = req.params.username;
    let user = users.find((el) => el.username === username);
    res.send(user);
  });
  
  // Search by street
  app.get('/users/street/:street', (req, res) => {
    let street = req.params.street;
    let user = users.find((el) => el.street === street);
    res.send(user);
  });
app.post('/adduser',(req,res)=>{
    let name=req.body.name;
    let age=req.body.age;

    let newUser={name ,age};
      users.push(newUser);

 fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send({ success: true });


})
// Update user by ID
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, city, username, street } = req.body;
  
    // Find the user by ID
    const userIndex = users.findIndex((el) => el.id === userId);
  
    // If the user is found, update the fields
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        name: name || users[userIndex].name,
        city: city || users[userIndex].city,
        username: username || users[userIndex].username,
        street: street || users[userIndex].street,
      };
  
      res.send(users[userIndex]);
    } else {
      res.status(404).send('User not found');
    }
  });
  
// Delete user by ID
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
  
    // Find the index of the user by ID
    const userIndex = users.findIndex((el) => el.id === userId);
  
    // If the user is found, remove it from the array
    if (userIndex !== -1) {
      const deletedUser = users.splice(userIndex, 1);
      res.send(deletedUser);
    } else {
      res.status(404).send('User not found');
    }
  });
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})