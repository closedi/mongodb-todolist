const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const hbs = exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
})
const todosRoutes = require('./routes/todos')


const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(todosRoutes)
app.use(express.static(path.join(__dirname, '/public')))

app.engine('hbs', hbs)
app.set('view engine', 'hbs')
app.set('views', 'views')

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:123@cluster0.zzz2v.mongodb.net/todos')
        app.listen(PORT, () => console.log(`server is running on localhost:${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

