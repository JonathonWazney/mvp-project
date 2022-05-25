require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db/pool');
app.use(express.json());

app.use(express.static('frontend'));

app.get('/api/list/:id', async (req,res)=>{
    try {
        let id = req.params.id
        let data = await db.query('SELECT list_id,task FROM list WHERE userid = $1', [id])
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})
app.get('/api/list', async (req,res)=>{
    try {
        
        let data = await db.query('SELECT * FROM list')
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.get('/api/user', async (req,res)=>{
    try {
        let data = await db.query('SELECT * FROM person')
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.post('/api/list', async (req,res) => {
    try {
        
        let id = req.body.userid
        let task = req.body.task
        let data = await db.query('INSERT INTO list (task, userid) VALUES ($1, $2) RETURNING list_id',[task, id])
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
        
    }
})
app.post('/api/user', async (req,res) => {
    try {
        let user = req.body.username
        let data = await db.query('INSERT INTO person (username) VALUES ($1) RETURNING *',[user])
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
        
    }
})
app.patch('/api/list', async (req,res) =>{
    try {
        let id = req.body.list_id
        let task = req.body.task
        await db.query('UPDATE list SET task = $1 WHERE list_id = $2 RETURNING *',[task,id])
        res.send('updated')
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.delete('/api/list', async (req,res) =>{
    try {
        let id = req.body.list_id
        await db.query('DELETE FROM list WHERE list_id = $1',[id])
        res.json('deleted')
    } catch (error) {
        console.log(error.message)
        res.send(error.message)   
    }
})
app.delete('/api/user', async (req,res) =>{
    try {
        let id = req.body.id
        await db.query('DELETE FROM person WHERE id = $1',[id])
        res.send('deleted')
    } catch (error) {
        console.log(error.message)
        res.send(error.message)   
    }
})




app.listen(process.env.PORT || 3000, () =>{
    console.log(`listening`)
});