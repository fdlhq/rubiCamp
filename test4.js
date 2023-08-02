function indexPrime (param1) {
    let hasil = []
    for (i = 2; ; i++) {
        let biPrim = true
        for (j = 2; j < i; j++) {
        if (i % j == 0) {
        biPrim = false;
        }} if (biPrim == true) {
        hasil.push(i);
    } if (param1 == hasil.length) {
        break;
    }
    }

    return hasil[param1 -1];
}

console.log(indexPrime(4));
console.log(indexPrime(500));
console.log(indexPrime(37786));