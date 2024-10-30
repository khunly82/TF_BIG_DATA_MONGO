// Créer un index unique

db.persons.createIndex({
    title: 1
}, { unique: 1 })

db.persons.insertOne({
    nom: 'LY',
    prenom: 'Piu',
    dateDeNaissance: new Date('1981-04-30')
})

db.movies.aggregate([
    { $match: {
        year: 2000
    } },
    { $sort: {
        title: 1
    } },
    { $skip: 5 },
    { $limit: 5 },
    { $project: { title: 1 } },
])

db.movies.find({
    year: 2000
}, { title: 1 })
.sort({
    title: 1
}).skip(5).limit(5)


db.movies.aggregate([
    // échantillon RANDOM
    { $sample: { size: 5 } },
    { $project: { title: 1 } }
])

db.movies.aggregate([
    // comme une projection sur laquelle
    // on conserve toutes les anciennes colonnes
    { $addFields: {
      nbActors: { $size: '$actors' },
    } },
    { $match: {
        nbActors: { $gt: 5 }
    } },
    { $sort: { nbActors: -1 } },
    { $project: { title: 1, actors: 1 } },
    // { $count: 'nbMovies' },
    // envoie les données autre part
    { $out: 'test' }
])


db.createCollection('customers')

db.customers.insertOne({
    nom: 'Lennon',
    prenom: 'John'
})

db.customers.insertOne({
    nom: 'Star',
    prenom: 'Ringo'
})

db.persons.find()
db.customers.find()

db.persons.aggregate([
    // réunir des données qui proviennent
    // de collection différentes
    { $unionWith: 'customers' },
    { $match: { nom: /^l/i } }
])

db.movies.aggregate([
    { $unwind: '$genre' },
    // { $unwind: '$actors' },
    { $group: {
        // _id: ['$genre', '$year'],
        _id: { g: '$genre', y: '$year' },
        moyenne: { $avg: '$rating' },
        count: { $count: {} },
        mediane: { $median: { 
            input: '$score', 
            method: 'approximate' 
        } }
    } },
    { $sort: { '_id.y': 1, '_id.g': -1}  },
    // { $project: {
    //     moyenne: 1,
    //     count: 1,
    //     genre: '$_id.g',
    //     year: '$_id.y',
    //     _id: 0
    // } }
])


db.movies.aggregate([
    { $project: { title: 1, genre: 1 } },
    { $unwind: '$genre' },
    { $group: {
        _id: '$genre',
        // titles: { $push: '$title' }
        // titles: { $firstN: { 
        //     input: '$title', 
        //     n: 10
        // } },
        // titles: { $topN: { 
        //     output: '$title', 
        //     n: 10,
        //     sortBy: { title: -1 }
        // } }
        titles: { $addToSet: '$title' }
    } }
])

db.movies.aggregate([
    { $group: {
      _id: { $floor: { $divide: ['$year', 10] } },
      m: { $avg: '$rating' }
    } },
    { $sort: { _id: 1 } }
])

db.movies.aggregate([
    { $bucket: {
      groupBy: '$year',
      boundaries: [ 1970, 2000, 2010 ],
      default: 'autres',
      output: {
        nb: { $count: {} },
        m: { $avg: '$rating' }
      }
    } }
])