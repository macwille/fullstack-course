const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give password as parameter')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack_noob:${password}@fullstack.vynbv.mongodb.net/Fullstack?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteScema = new mongoose.Schema({
    key: Number,
    name: String,
    number: String
})

const Person = mongoose.model('Person', noteScema)

if (process.argv.length < 4) {
    console.log('Persons:')

    Person.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}

else {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(res => {
        console.log(`Person ${person} saved to database`)
        mongoose.connection.close()
    })

}