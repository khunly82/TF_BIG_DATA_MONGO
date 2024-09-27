// SELECT * FROM Persons
db.persons.find()

// SELECT TOP 1 * FROM Persons
db.persons.findOne()

// SELECT COUNT(*) FROM Persons
db.persons.find().count()
db.persons.countDocuments()


// SELECT * FROM Persons WHERE ...
db.persons.find({
    // SQL => nom = 'Ly'
    // nom: 'Ly'
    // nom: { $eq: 'Ly' },

    // SQL => LIKE 'l%'
    // nom: /^L/i
    // nom: { $regex: '^L', $options: 'i' }
})

// SELECT title, year 
// FROM Movies WHERE year = 1994
db.movies.find({
    // filtres 
    year: 1994 
}, {
    // projection

    // inclusions
    title: 1,
    year: 1,
    _id: 0
})

db.movies.find({
    // filtres 
    year: 1994 
}, {
    // projection

    // exclure les propriétés actors, ...
    actors: 0,
    actor_facets: 0,
    alternative_titles: 0,

    // on ne mélange pas les inclusions et les exculsions
    // title: 1
})

db.movies.find({}, {
    title: 1,

    // propriétés calculées
    nbActors: { $size: '$actors' },
    titreAvecDesCoeurs: { $concat: ['♥', '$title', '♥'] },
    actors5: { $slice: ['$actors', 5] }
})

db.movies.find({
    // = 1994
    // year: 1994
    // year: { $eq: 1994 }

    // <> 1994
    // year: { $ne: 1994 }

    // SQL =>  year > 1994
    // SQL =>  year >= 1994
    // SQL =>  year < 1994
    // SQL =>  year <= 1994
    // year: { $gt: 1994 }
    // year: { $gte: 1994 }
    // year: { $lt: 1994 }
    // year: { $lte: 1994 }
}, { title: 1, year: 1 })


db.persons.find({

    // tester l'existence ou non d'une propriété
    titre: { $exists: 1 }
})

db.movies.find({
    // and
    year: 1994,
    genre: 'Comedy'
})

db.movies.find({
    // between
    year: { $gte: 1994, $lte: 1998 },
    // year: { $lte: 1998 },
})

db.movies.find({
    $or: [
        { year: 1994 },
        { year: 1998 },
        { year: 2000 }
    ]
})

db.movies.find({
    // IN (1994, 1998, 2000)
    year: { $in: [1994, 1998, 2000] }
    // NOT IN (1994, 1998, 2000)
    // year: { $nin: [1994, 1998, 2000] }
})

db.movies.find(
    { /* filtres */ }, 
    { /* projection */  }
)
.sort({ /* tri */
    // année croissant 
    year: 1,
    // année décroissant
    // year: -1
    title: -1
})

// utiliser pour la pagination
// nombre à passer
.skip(2)
// nombre maximum
.limit(2)