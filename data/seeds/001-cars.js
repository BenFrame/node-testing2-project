exports.seed = function(knex, Promise) {
    return knex('cars')
        .truncate()
        .then(function(){
            return knex('cars').insert([
                {make: 'ford'},
                {make: 'chevy'},
                {make: 'buick'},
                {make: 'jeep'}
            ])
        })
}