const ids = require('./ids')
var bigtable = require('@google-cloud/bigtable')({
  projectId: 'project-flux-testing',
});

var instance = bigtable.instance('flux-test');
var table = instance.table('external2')

// instance.createTable('external2').then(function(data) {
//   var table = data[0];
//   var apiResponse = data[1];
//   console.log(apiResponse)
// });

// table.createFamily('cost').then(function(data) {
//   var family = data[0];
//   var apiResponse = data[1];
//   console.log(apiResponse)
// });

// table.delete().then(function(data) {
//   var apiResponse = data[0];
// });


let s = 200
let l = 300
const toRow = []

setInterval(function () {

  for (x = s; x < l; x++) {
    const row = table.row(ids[x].id)
    toRow.push(row.create({ trafficId: { id: ids[x].id }, cost: { v: '2.0' } }
    ).then(function (data) {
      var apiResponse = data[0];
      // console.log(apiResponse)
    }).catch(err => {
      console.log(err)
    }))
  }

  Promise.all(toRow).then(r => {
    console.log('done')
    s = s + 100
    l = l + 100
    console.log(l)
  })

}, 16000)


// var entries = [
//   {
//     key: 'test',
//     data: {
//       trafficId: {
//         name: {
//           value: 'rg0ihfp1ncwzwd7d41x7p66r',
//           timestamp: new Date()
//         }
//       }
//     }
//   }
// ];

// table.insert(entries).then(function() {
//   // All requested inserts have been processed.
//   console.log('don')
// });

// table.deleteRows().then(function(data) {
//   var apiResponse = data[0];
// });