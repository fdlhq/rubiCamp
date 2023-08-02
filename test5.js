function stringManipulation(word) {

    var vocal = 'aiueo'
    if(vocal.includes(word.charAt(0)) === true)  {
        // console.log(word.charAt(0))
        return word;
    } else if(vocal.includes(word.charAt(0)) === false)  {
        // console.log(word.charAt(0))
        return (word.slice(1) + word.charAt('') + 'nyo')
}
}

console.log(stringManipulation('ayam'));
console.log(stringManipulation('bebek'));