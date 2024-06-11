// class Samurai {
//     constructor(name) {
//         this.name = name
//     }
//     hello() {alert(this.name)}
// }

// let shogun = new Samurai('max');

// console.log(shogun.__proto__.constructor.__proto__)

// function one() {}
// function two () {}

// console.log(one.__proto__ === two.__proto__)



// const person = {
//     name: 'Max',
//     age: '24',
//     job: 'Frontend',
//     getInfo: function(dog, address) {
//         console.log(this.name)
//         console.log(this.job)
//         console.log(this.age)
//         console.log(dog)
//         console.log(address)
//     }
// }

// const nastya = {
//     name: 'Nastya',
//     age: '244',
//     job: 'Backend',
// }

// const fakeNastya = nastya

// // console.log(nastya.__proto__ === fakeNastya.__proto__)
// // person.getInfo.bind(nastya)()

// // console.log(Object.prototype)
// console.log(nastya.__proto__, Object.prototype)
// console.log(Array.prototype)
// // console.log(person.getInfo.prototype)