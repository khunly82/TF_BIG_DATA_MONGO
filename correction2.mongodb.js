// récupérer les 10 premiers films triés par ordre décroissant
// sur le score
db.movies.find().sort({
    score: -1
}).limit(10)

// récupérer les 10 suivants
db.movies.find().sort({
    score: -1
}).skip(10).limit(10)

// récupérer le titre, le rating de tous les films 
// qui ont un rating égal à 3
db.movies.find({
    // filtres // query
    rating: 3
}, {
    // projection
    title: 1,
    rating: 1,
    _id: 0
})

// récupérer le titre, 
// l'année de tous les films qui sont sortis 
// dans les années 90 (de 1990 à 1999)
db.movies.find({
    year: { $gte: 1990, $lte: 1999 }
}, {
    title: 1,
    year: 1,
    _id: 0
})

// récupérer le titre 
// tous les films d'horreur 
// sortis après 2000
db.movies.find({
    genre: 'Horror',
    year: { $gt: 2000 }
}, {
    title: 1,
    // genre: 1,
    // year: 1,
    _id: 0
})/*.count()*/

// récupérer le titre des films
// dans lesquels tom hanks a joué 
// triés par année
db.movies.find({
    actors: 'Tom Hanks'
}, { title: 1 }).sort({
    year: 1
})
// récupérer le titre, le nombre d'acteurs 
// des films d'aventure sortis 
// dans les années 2000 
// triés par rating

db.movies.find({
    year: { $gte: 2000, $lt: 2010 },
    genre: 'Adventure'
}, {
    _id: 0,
    title: 1,
    // actors: 1,
    nbActors: { $size: '$actors' }
})


// récupérer le titre, les acteurs des films 
// dont le nombre d'acteurs = 5
db.movies.find({
    actors: { $size : 5 }
}, {
    _id: 0,
    title: 1,
    actors: 1
})

// récupérer le titre, les acteurs des films 
// dont le nombre d'acteurs > 5
db.movies.find({
   $expr: {
        $gt: [
            { $size: '$actors' },
            5   
        ]
   }
    // déconseillé car plus LENT !!!
    // $where: 'this.actors.length > 5'
}, {
    _id: 0,
    title: 1,
    actors: 1
})

db.movies.aggregate([
    // etape 1 ,
    { $project: {
        title: 1,
        nbActors: { $size: '$actors' }
    } },
    // etape 2 ,
    { $match: {
        nbActors: { $gt: 5 }
    } }
    // ...
])


// récupérer le nombre de films
// d'horreur ou de comédie
db.movies.find({
    // $or: [
    //     { genre: 'Comedy' },
    //     { genre: 'Horror' }
    // ]
    genre: { $in: ['Comedy', 'Horror'] }
}).count()


// récupérer le nombre films qui contiennent 
// le mot "christmas"
db.movies.find({
    title: /xmas|noel|christmas/i
}).count()

// récupérer le titre, 
// les 5 premiers acteurs (triés par ordre croissant) 
// des films sortis dans les années 90 
// et dont le genre est "Horror" ou "Comedy"
// trié par année
db.movies.find({
    year: { $gte: 1990, $lt: 2000 },
    genre: { $in: ['Horror', 'Comedy'] }
}, {
    title : 1,
    // actors: 1,
    //actors5: { $slice: ['$actors', 5] },
    sortedActors: { $sortArray: { 
        input: { $slice: ['$actors', 5] },
        sortBy: 1
    }}
}).sort({
    year: 1
})

// Bonus

// récupérer le titre, la liste des acteurs 
// si le nombre d'acteurs est plus petit que 3 
// sinon afficher le nombre d'acteurs
db.movies.find({}, {
    title: 1,
    actorsOrNb: {
        $cond: [
            // si,
            { $lt: [{$size: '$actors'}, 3] },
            // alors,
            '$actors',
            // sinon
            { $size: '$actors' }
        ]
    }
})

// récupérer à l'aide de l'opérateur $cond
// le titre des films, l'année, le score 
    // qui sont sortis apres 2000
    // si le score est plus grand que 5
    // qui sont sortis avant 2000 sinon

db.movies.find({
    $expr: {
        $cond: [
            { $gt: ['$score', 5] },
            { $gt: ['$year', 2000] },
            { $lte: ['$year', 2000] },
        ]
    }
}, { 
    title: 1,
    year: 1,
    score: 1
}).toArray()