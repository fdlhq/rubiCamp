function deretKaskus(n) {
    let hasil = []
    for(let index = 0; index < n; index++) {
        let data = (index + 1) * 3
        // hasil.push(data) 
        if ((data % 5 === 0) && (data % 6 === 0)) {
            hasil.push('KASKUS')
        } else if (data % 5 === 0) {
            hasil.push('KAS')
        } else if (data % 6 === 0) {
            hasil.push('KUS')
        } else {
            hasil.push(data)
        }

}
return hasil 
}
console.log(deretKaskus(10))