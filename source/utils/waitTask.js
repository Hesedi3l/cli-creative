/******************************************
 * Function Tasks - wait
 ******************************************/
function wait(nbSeconds){
    return new Promise((resolve, reject) => {
        setTimeout(resolve,nbSeconds * 1000)
    })
}

module.exports = wait;