# DRL

## Recherche (Extraction simple) Simple

```js
// rechercher plusieurs documents
db.nomDeLaCollection.find()
// ou rechercher le premier document qui correspond à la recherche
db.nomDeLaCollection.findOne()
```

## Compter les documents
```js
db.nomDeLaCollection.find().count()
// ou
db.nomDeLaCollection.countDocuments()
```

## Filtres
```js
db.nomDeLaCollection.find(filtres)
db.nomDeLaCollection.findOne(filtres)
db.nomDeLaCollection.countDocuments(filtres)
```

## Projection
```js
db.nomDeLaCollection.find(filtres, projection)
db.nomDeLaCollection.findOne(filtres, projection)
```