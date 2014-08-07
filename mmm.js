module.exports = function(argv, callback){
  var v = getNumericValues(argv);
  var report = {};

  report.mean = meanOf(v);
  report.median = medianOf(v);
  report.mode = modeOf(v);

  callback(null, report);

  // mode
  function modeOf(v){
    var counts = v.map(function(item, index, arr){
      var count = 0;
      for (var k = 0; k < arr.length; k++) {
        if(arr[k] === item) count++;
      }
      return count;
    });

    var highest = 0;
    for (var i = 0; i < counts.length; i++) {
      // update highest value
      if(counts[i] > highest) highest = counts[i];
    }

    var modes = [];
    for (var j = 0; j < counts.length; j++) {
      // push value of high counts, but only once
      if(counts[j] === highest){
        if( modes.indexOf(v[j]) === -1 )  modes.push(v[j]);
      }
    }

    return (modes.length > 1) ? modes : modes[0];
  }

  // mean
  function meanOf(v){
    var sum = v.reduce(function(prev, curr, index, arr){
      return prev + curr;
    });
    return sum / v.length;
  }

  // median
  function medianOf(values){
    var length = values.length;
    if( length % 2 === 0){
      // take an average of the two median values
      return (values[length/2 - 1] + values[length/2]) / 2;
    }else{
      // get the median value
      console.log(length/2);
      return values[ Math.ceil(length / 2) ];
    }
  }

  // return array of numbers, given process.argv[]
  function getNumericValues(argv){
    var values = argv.slice(2);
    values = values.map(function(val){
      return Number(val);
    });
    return values;
  }

};
