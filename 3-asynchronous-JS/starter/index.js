const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find the file 😒');
            resolve(data);
        });
    });
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('I could not find the file 🐱‍👤');
            resolve('Random dog saved to file');
        });
    });
}

readFilePro(`${__dirname}/doggg.txt`).then(data => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
}).then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
}).then((data) => {
    console.log(data);
}).catch(err => {
    console.log(err);
});













// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);

//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then((res) => {
//         console.log(res.body.message);

//         fs.writeFile('dog-img.txt', res.body.message, err => {
//             if (err) return console.log(err.message);
//             console.log('Random dof saved to file');
//         });
//     }).catch(err => {
//         console.log(err.message);
//     });
// });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);

//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, data) => {
//         if(err) return console.log(err);
//         console.log(res.body.message);

//         fs.writeFile('dog-img.txt', res.body.message, err => {
//             if (err) return console.log(err.message);
//             console.log('Random dof saved to file');
//         });
//     })
// });