// aggrégation (ATTENTION même si certaines requètes pourraient être réalisées avec une extraction simple, utiliser "aggregate")
// récupérer 20 titres de films aléatoires
db.movies.aggregate([
    { $sample: { size: 20 } },
    { $project: { title: 1 } }
])


// récupérer les 20 premiers films triés par ordre
// croissant sur leur titre
db.movies.aggregate([
    // tri
    { $sort: { title: 1 } },
    // limitation
    { $limit: 20 },
    // projection
    { $project: { title: 1 } }
])


// récupérer les 20 suivants
db.movies.aggregate([
    // tri
    { $sort: { title: 1 } },
    // skip
    { $skip: 20 },
    // limitation
    { $limit: 20 },
    // projection
    { $project: { title: 1 } }
])


// récupérer toutes les propriétés des films 
// en ajoutant leur score sur 100 
// dans lesquels Tom Hanks a joué, 
// triés par ordre décroissant sur leur score
db.movies.aggregate([
    // filtre
    { $match: { actors: /^tom hanks$/i } },
    // tri
    { $sort: { score: -1 } },
    // ajouter un champs
    { $addFields: { score100: { $multiply: [ '$score', 10 ] } } }
])


// SELECT AVG(score) FROM Movies WHERE Actors LIKE 'Tom Hanks'

// SELECT year, AVG(score) 
// FROM Movies WHERE Actors LIKE 'Tom Hanks' 
// GROUP BY year

// récupérer la moyenne des scores sur 100 
// dans lesquels Tom Hanks a joué
db.movies.aggregate([
    // filtre
    { $match: { actors: /^tom hanks$/i } },
    // ajouter un champs
    { $addFields: { score100: { $multiply: [ '$score', 10 ] } } },
    { $group: {
        _id: null,
        moyenne: { $avg: '$score100' }
    } }
])

// recupérer tous les titres de films groupés par genre
db.movies.aggregate([
    { $unwind: '$genre' },
    // { $addFields: { random: { $rand: {} } } },
    // { $sort: { random: 1 } },
    { $group: {
      _id: '$genre',
      titles: { $addToSet: '$title' }
    } },
    { $sort: { _id: 1 } }
])


// recupérer les 10 premiers titres de films groupés par genre
db.movies.aggregate([
    { $unwind: '$genre' },
    { $group: {
      _id: '$genre',
      titles: { $firstN: { input: '$title', n: 10 } }
    } },
    { $sort: { _id: 1 } }
])

// recupérer les 5 meilleures moyennes des scores des films 
// groupés par acteurs
db.movies.aggregate([
    { $unwind: '$actors' },
    { $group: {
      _id: '$actors',
      moyenne: { $avg: '$score' }
    } },
    { $sort: { moyenne: -1 } },
    { $limit: 5 }
])


// récupérer la moyenne des scores groupée par genre et par année
db.movies.aggregate([
    { $unwind: '$genre' },
    { $group: {
      // _id: ['$genre', '$year'],
      _id: { genre: '$genre', annee: '$year' },
      moyenne: { $avg: '$score' }
    } },
    { $sort: { '_id.annee': -1, '_id.genre': 1 } },
    // { $project: {
    //     _id: 0,
    //     annee: '$_id.annee',
    //     genre: '$_id.genre'
    // } }
]).toArray()


// récupérer par acteurs le nombre nombre de films 
// dans lesquels ils ont joué.
db.movies.aggregate([
    { $unwind: '$actors' },
    { $group: {
        _id: '$actors',
        nbFilms: { $count: {} },
        nbFilms2: { $sum: 1 }
    } }
])


// récupérer par acteurs l'ensemble des détails (genre, quantité) 
// dans lesquels ils ont joué

// format souhaité: 
// [{ 
//    _id: john Doe, 
//    details : [ { genre: comedy, quantite: 2 }, { genre: Horror, quantite: 5 } , ... (autres détails) } ]
//  }, ... (autres acteurs)]
db.movies.aggregate([
    { $unwind: '$genre' },
    { $unwind: '$actors' },
    { $group: {
        _id: { a: '$actors', g: '$genre' },
        q: { $count: {} }
    } },
    { $group: {
        _id: '$_id.a',
        details: {
            $push: {
                genre: '$_id.g',
                quantite: '$q'
            }
        }
    } }
])

