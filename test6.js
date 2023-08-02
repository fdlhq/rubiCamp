function stringManipulation(word) {

    var vocal = 'aiueo'
    var consonant = word.split(' ')
    let hasil = ''
    for(let i = 0; i < consonant.length; i++) {
        if(vocal.includes(consonant[i].charAt(0)))  {
            hasil += consonant[i] + ' '
        } else if(!vocal.includes(consonant[i].charAt(0)))  {
            hasil += consonant[i].slice(1) + consonant[i].charAt(0) + 'nyo '
        }
}
    return hasil 
}


console.log(stringManipulation('ibu pergi ke pasar bersama aku'));
