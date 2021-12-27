const fs = require('fs');
const through2 = require('through2');

const { Transform } = require('readable-stream')
 
const readPoemStream = fs.createReadStream('./on-joy-and-sorrow-emoji.txt')

// readPoemStream.on('data', (data) => {
//     const strData = data.toString()
//     const transformedData = strData.replace(/:\)/gi, 'joy').replace(/:\(/gi, 'sorrow')
//     console.log(transformedData)
// })

/* Create a write stream here */
const writePoemStream = fs.createWriteStream('./on-joy-and-sorrow-emoji-2.txt')


/* EXTENSION: Create a transform stream (modify the read stream before piping to write stream) */
const transformStream = through2(function(chunk, encoding, callback) {
        const strChunk = chunk.toString()
        const transformedData = strChunk.replace(/:\)/gi, 'joy').replace(/:\(/gi, 'sorrow')
        this.push(transformedData)
        callback()
    })
readPoemStream.pipe(transformStream).pipe(writePoemStream)


const transformStream2 = new Transform({
    transform(chunk, encoding, callback) {
        const strChunk = chunk.toString()
        const transformedData = strChunk.replace(/:\)/gi, 'joy2').replace(/:\(/gi, 'sorrow2')
        this.push(transformedData)
        callback()
    }
})
const writePoemStream2 = fs.createWriteStream('./on-joy-and-sorrow-emoji-3.txt')
readPoemStream.pipe(transformStream2).pipe(writePoemStream2)
