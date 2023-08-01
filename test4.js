function indexPrime (param1) {
    let primaNum = []
    for(let i = 2; ; i++) {
        let bilPrim = false;
        for(let j = 2; j < i ; j++) {
        if(i % j == 0) {
        bilPrim = true; 
        } 
    }
    if(bilPrim == false) {
            primaNum.push(i)
        } if(param1 == primaNum.length){
        break;
        }  
}
    return primaNum[param1 -1] 
}

console.log(indexPrime(4));
console.log(indexPrime(500));
console.log(indexPrime(37786));