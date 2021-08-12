const express = require('express');
const bodyParse = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:true}));

const path = '/Users/hakobkhachatryan/Desktop/node-js/index.js/data.json';

const saveData = (data) => {
    let stringify = JSON.stringify(data);
    fs.writeFileSync(path, stringify);
}


const GetData = () => {
    const json = fs.readFileSync(path);
    return JSON.parse(json);

}


app.get('/users',(req , res) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err)
        {
            throw err
        }
        res.send(JSON.parse(data))

    })
})

app.post('/users', (req, res) => {
    let getdata = GetData();
    const id = uuidv4();

    getdata[id] = req.body;

    saveData(getdata);
    res.send({message: 'ok'});
})


app.put('/users/:id', (req, res) => {
    let newData = GetData();
    const userId = req.params['id'];
    newData[userId] = req.body;
    saveData(newData);

    res.send({message: 'Ok'});
})

app.delete('/users/:id', (req, res) => {
    let newData = GetData();
    const userId = req.params['id'];
    delete newData[userId];
    saveData(newData);

    res.send({message: 'Ok'});
})





app.listen(8080, ()=> {
    console.log("server start")
})

