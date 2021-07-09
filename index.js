const parse = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];
function isHabitablePlanet(planet) {
  return planet.koi_disposition === 'CONFIRMED'
          && planet.koi_prad < 1.6
          && planet.koi_insol < 1.11
          && planet.koi_insol > 0.36
}
console.log('processing begins...');
fs.createReadStream('kepler-data.csv')
  .pipe(parse({
    comment:'#',
    columns:true
  }))
  .on('data',(data)=>{
    if(isHabitablePlanet(data))
      habitablePlanets.push(data);
  })
  .on('error',(err)=>{
    console.error(err);
  })
  .on('end',()=>{
    console.log('processing ends!');
    console.log(`${habitablePlanets.length} habitable planet was found `);
    console.log(habitablePlanets.map(p => p.kepler_name));

  })
