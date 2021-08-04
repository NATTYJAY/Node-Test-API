const express = require('express');
const {products,people} = require('./data');

const {logger,ready} = require('./middleware/logger');

const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get('/', [logger], (req, res) => {
    res.send('<h1> Home Page</h1><a href="/api/products">products</a>')
});

app.get('/api/people', (req, res) => {
    return res.status(200).json({success:true, message:'Data gotten already', data: people });
});

app.post('/api/people', (req, res)=> {
    const {name___} = req.body;
    if (!name___) {
        return res
        .status(400)
        .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).json({ success: true, person: name___ });
})

app.put('/api/people/:id', (req, res) => {
    const {name} = req.body; // get the person name
    const {id} = req.params; // get the person parameter, in this case the ID
        // Check if the person name is not there, return the 
    if(!name){
        return res.status(400).json({success:false, message:'Please provide the person name', data:name});
    }
    const person_loop = people.find((person)=> {
        return person.id === Number(id);
    });
        if(!person_loop){
            return res
            .status(400)
            .json({ success: false, error: `There is no such person with ${id}`});
        }
        const people_new = people.map((person) => {
            if(person.id === Number(id)){
                 person.name = name;
            }
            return person
        });
        res.status(201).json({ success: true, person: people_new });
});

app.delete('/api/people/:id', (req, res)=>{
    const {id} = req.params;
    const person_loop = people.find((person)=> {
        return person.id === Number(id);
    });
    if(!person_loop){
        return res
        .status(400)
        .json({ success: false, error: `There is no such person with ${id}`});
    }
    const newPeople = people.filter((person) => {
        return person.id !== Number(req.params.id);
    });
   if(newPeople){
        return res.status(200).json({ success: true, data: newPeople });
   }
})

app.get('/api/products', [logger, ready], (req, res) => {
    const newProducts = products.map((product) => {
      const { id, name, image } = product
      return { id, name, image }
    })
    res.json(newProducts)
});
app.listen(9000, () => {
    console.log('Server is listening on port 9000....')
});
