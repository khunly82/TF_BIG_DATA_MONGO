/*
créer une collection films
titre: string max 255
synopsis: string
anneeDeSortie: int max 9999
acteurs: array<string> max: 10
realisateur: {
    nom: string 50,
    prenom: string 50,
    origine: string 50,
    email: string pattern email
},
categories: array<'Horror','Comedy','Action'>
duree: int
*/

const defaultStringSchema = { bsonType: 'string', maxLength: 50 }

const realisateurSchema = {
    required: ['nom', 'prenom', 'origine', 'email'],
    properties: {
        nom: defaultStringSchema,
        prenom: defaultStringSchema,
        origine: defaultStringSchema,
        email: { bsonType: 'string', pattern: '^[a-zA-Z0-9-\\.]+@[a-zA-Z0-9-\\.]+\\.[a-zA-Z0-9]{2,4}$' }
    }
}

const filmSchema = {
    required: [
        'titre', 
        'synopsis', 
        'anneeDeSortie', 
        'acteurs', 
        'realisateur', 
        'categories', 
        'duree'
    ],
    properties: {
        titre: { bsonType: 'string', maxLength: 255 },
        synopsis: { bsonType: 'string' },
        anneeDeSortie: { bsonType: 'int', maximum: 9999 },
        acteurs: { bsonType: 'array', items: { bsonType: 'string' }, maxItems: 10 },
        realisateur: realisateurSchema,
        categories: { bsonType: 'array', items: { enum: ['Horror', 'Comedy', 'Action'] } },
        duree: { bsonType: 'int', minimum: 0 }
    }
}

db.createCollection('films', {
    validator: {
        $jsonSchema: filmSchema
    }
})

db.films.insertOne({
    titre: 'Star wars - Episode IV',
    synopsis: '...',
    anneeDeSortie: 1977,
    acteurs: ['Marc Hamil', 'Harrisson Ford', 'Carrie Fisher'],
    realisateur: {
        nom: 'Lucas',
        prenom : 'Georges',
        origine: 'USA',
        email: 'g.lucas@yahoo.com',
    },
    categories: ['Action'],
    duree: 121
})
