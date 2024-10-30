// equi join
db.movies.aggregate([
    { $lookup: {
      from: 'actors',
      localField: 'actors',
      foreignField: 'name',
      as: 'actors'
    } }
])


// non equi join
db.movies.aggregate([
    // step 1
    { $lookup: {
        from: 'actors',
        let: { a: '$actors' },
        pipeline: [
            { $match: 
                { $expr: { $in: ['$name', '$$a'] } }
            },
        ],
        as: 'actors' 
    } }
])

db.movies.aggregate([
    { $lookup: {
        from: 'movies',
        let: { year: '$year' },
        pipeline: [
            { $match: {
              $expr: { $eq: ['$year', '$$year'] }
            } },
            { $group: {
                _id: '$year',
                m: { $avg: '$score' }
            } },
        ],
        as: 'r'
    } },
    { $unwind: '$r' },
])

db.movies.aggregate([
    { $setWindowFields: {
      partitionBy: '$year',
      output: {
        m: { $avg: '$score' }
      }
    } },
    { $sort: { score: -1 } },
    { $match: {
        $expr: { $gt: ['$score', '$m'] }
    } },
    { $count:  'title' }
])