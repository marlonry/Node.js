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
            if (err) reject('I could not write the file 🐱‍👤');
            resolve('Random dog saved to file');
        });
    });
}

const getDocPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
    
        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); // store data in a variable only when it returns data
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); // store the promise in a variable not its resolved value.
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]); // await all with promise.all 
        const imgs = all.map(el => el.body.message);
        console.log(imgs);
    
        await writeFilePro('dog-img.txt', imgs.join('\n')); // in this case this doesnt return data it just processes the file and doesnt return anything meaningful
        console.log('Random dog saved to the file');
    } catch(err) {
        console.log(err);

        throw err; // this is done to mark the promise as rejected when returning data from an async function
    }

    return "DONE 🐶"
}

(async () => { // IFEE to handle the returning data from the async function witch async functions // getting the data with only async functions
    try {
        console.log('Will get dog pics');
        const data = await getDocPic();
        console.log(data);
        console.log('Done getting dog pics');
    } catch(err) {
        console.log(`ERROR ✨: ${err}`);
    }
})();

/*                                                // getting the data with .then and catch
console.log('Will get dog pics');
getDocPic().then((data) => {
    console.log(data);
}).catch(err => {
    console.log(`ERROR ✨: ${err}`);
}) ;
console.log('Done getting dog pics');
*/

// readFilePro(`${__dirname}/dog.txt`).then(data => {
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
// }).then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message);
// }).then((data) => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });













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