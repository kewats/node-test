import express from 'express'
import { createConnection } from 'mysql2/promise'

const app = express()
let db

async function go() {
    db = await createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'example',
        database: 'pets'
    })
    app.listen(3000)
}

go()

app.get('/', async (req, res) => {
    const [users] = await db.execute('SELECT * FROM users')
    console.log(users)
    res.send(`<ul>${users.map(animal => `<li>${animal.name}</li>`).join('')}</ul>`)
})
