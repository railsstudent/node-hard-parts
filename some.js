
setTimeout(() => console.log('hello'), 0)

setImmediate(() => console.log('call me last'))

setTimeout(() => console.log('world'), 0)

new Promise(() => {
    console.log('Microtask 2')
})

console.log('call me first')

new Promise(() => {
    console.log('Microtask')
})
