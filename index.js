const express = require('express')
const chance = require('chance').Chance() // chance is a random data generator, chancejs.com
const shuffleArray = require('shuffle-array')

const app = express()

app.use(express.static('public'))

const data = {
    headers: ['Name', 'Age', 'Profession', 'Country'],
    rows: new Array(10).fill(undefined).map(() => {
        return [chance.name(), chance.age(), chance.profession(), chance.country({ full: true })]
    }),
}

// make a route
app.get('/data', (req, res) => {
    res.json({
        headers: data.headers,
        rows: shuffleArray(data.rows),
        lastUpdated: new Date().toISOString(),
    })
})

app.listen(3001, () => console.log('app is running'))
