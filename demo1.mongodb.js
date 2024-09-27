const nameSchema = { 
    bsonType: 'string', 
    minLength: 1, 
    maxLength: 100,
    pattern: '^[a-zA-Z\\- ]+$'
}

db.runCommand({
    collMod: 'persons',
    validator: {
        $jsonSchema: {
            // permet de définir les propriétés requises
            required: ['nom', 'prenom', 'dateDeNaissance'],
            // permet de définir le type de données autorisés pour chacunes de propriétés
            properties: {
                nom: nameSchema,
                prenom: nameSchema,
                dateDeNaissance: { bsonType: 'date' },
                titre: { enum: ['Mr', 'Mme', 'Melle'] }
            }
        }
    }
})

db.persons.insertOne({
    nom: 'Person',
    prenom: 'Mike',
    dateDeNaissance: new Date('1982-03-17'),
    titre: 'Mr'
})

