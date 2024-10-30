# Aggregate

```js
db.nomDeLaCollection.aggregate([
    // étape 1,
    // étape 2,
    // étape 3,
])
```

## Opérateurs d'étapes

- $match (WHERE)

    *Les conditions requises par les documents*

- $project (SELECT)

    *La projection appliquée sur chacun des documents*

- $sort (ORDER BY)

    *L'ordre des documents*

- $limit (FETCH ONLY {nb} ROWS)

    *Limitation du nombre de documents*

- $skip (OFFSET {nb} ROWS)

    *Passer un certain nombre de document*