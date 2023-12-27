const express = require('express')
const route = express()
const bodyParser = require('body-parser')
const port = 3000
const response = require('./response')
const db = require('./connection')

route.use(bodyParser.json())

route.get('/', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, result) => {
        if (err) throw err
        response(res, 200, result, "take all data")
    })
})

route.get('/:id', (req, res) => {
    db.query(`SELECT * FROM mahasiswa WHERE id = ${req.params.id}`, (err, result) => {
        if (err) response(res, 500, err, "data error")
        console.log(result)
        response(res, 200, result, "show data by id")
    })
})

route.post('/create', (req, res) => {
    const { nama, umur, kelas, alamat } = req.body
    db.query(`INSERT INTO mahasiswa (id, nama, umur, kelas, alamat) VALUES ('NULL', '${nama}', ${umur}, '${kelas}', '${alamat}');`, (err, result) => {
        if (err) response(res, 500, err, "data error")
        console.log(req.body)
        response(res, 200, result, "create new data")
    })
})

route.put('/edit/:id', (req,res)=>{
    const { nama, umur, kelas, alamat } = req.body
    db.query(`UPDATE mahasiswa SET nama = '${nama}', umur = ${umur}, kelas = '${kelas}', alamat = '${alamat}' WHERE id = ${req.params.id}`, (err, result) => {
        if (err) response(res, 500, err, "data error")
        response(res, 200, result, "update data")
    })
})

route.delete('/delete/:id', (req, res) => {
    db.query(`DELETE FROM mahasiswa WHERE id = ${req.params.id}`, (err, result) => {
        if(err) response(res, 500, err, "data error")
        if(result.affectedRows){
            response(res,200, result, "delete data")
        } else {
            response(res, 404, "data not found", "id not found")
        }
    }) 
})

route.listen(port, () => console.log(`App listen in http://localhost:${port}`))