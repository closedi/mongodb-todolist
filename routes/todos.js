const router = require('express').Router()
const Todo = require('../models/Todo')

router.get('/', async (req, res) => {
    const todos = await Todo.find().lean()
    res.render('index', {title: 'todos list', isIndex: true, todos})
})

router.get('/create', (req, res) => {
    res.render('create', {title: 'create todo', isCreate: true})
})

router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })

    await todo.save()
    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    try {
        const todo = await Todo.findById(req.body.id)

        todo.completed = !!req.body.checked
        await todo.save()
        res.redirect('/')
    } catch (e) {
        console.log('some error', e)
    }
})

router.post('/delete',  async (req, res) => {
    await Todo.findByIdAndDelete(req.body.id)
    res.redirect('/')
})


module.exports = router
