// built in, user defined, third party
const fs = require('fs')

console.log('Started reading!')

// fs.readFile('fs.txt', 'utf8', (err, data)=> {
//     if(err){
//         console.error(err);
//         return
//     }
//     console.log('File content:', data)
// })

const data = fs.readFileSync('fs.txt', 'utf8')

console.log('File content:', data)

console.log('Ended Reading!')