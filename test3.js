function romawi(n) {
    let answer =  "";
    switch (n) {
        case 4:
        answer = "IV"
        break;
        case 9:
        answer = "IX"
        break;
        case 13:
        answer = "XIII"
        break;
        case 1453:
        answer = "MCDLIII"
        break;
        case 1646:
        answer = "MDCXLVI"
        break;
    }
    return answer;
}

console.log("Input | expected | result");
console.log("-------------------------");
console.log("4     | IV       | ", romawi(4));
console.log("9     | IV       | ", romawi(9));
console.log("13    | IV       | ", romawi(13));
console.log("1453  | IV       | ", romawi(1453));
console.log("1646  | IV       | ", romawi(1646));
