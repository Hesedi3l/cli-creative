function randomNameGenerator(){
    const num = 8;
    let res = 'projet-';
    for(let i = 0; i < num; i++){
        const random = Math.floor(Math.random() * 6);
        res += String.fromCharCode(97 + random);
    }return res;
}

module.exports = randomNameGenerator;