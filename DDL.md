# DDL

- Utiliser un base de données

    ```js
    use('nomDeLaDB')
    // or
    use nomDelaDB
    ```

- Créer une collection
    ```js
    db.createCollection('nomDeLaCollection')
    ```

- Créer une collection avec schema de validations
    ```js
    db.createCollection('nomDeLaCollection', {
        validator: {
            $jsonSchema: { /* schema de validations */ }
        }
    })
    ```

- Ajouter un schema de validation à une collection déjà existante
    ```js
    db.runCommand({
        collMod: 'nomDeLaCollection',
        validator: {
            $jsonSchema: { /* schema de validations */ }
        }
    })
    ```

- Supprimer une collection
    ```js
    db.nomDeLaCollection.drop()
    ```

- Ajouter un document
    ```js
    db.nomDeLaCollection.insertOne({ /*le document*/ })
    ```

- Ajouter plusieurs documents
    ```js
    db.nomDeLaCollection.insertMany([
        { /*document1*/ },
        { /*document2*/ }
    ])
    ```

## Validations
[jsonSchema.org](https://json-schema.org/)
