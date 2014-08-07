var mmm = require('./mmm');

mmm(process.argv, callback);

function callback(err, data){
  if ( err )
    throw err;

  console.log(data);
}
