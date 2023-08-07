function pola(str) {
  let jawab = [];
  let bilangan = str.split("*");
  // console.log(bilangan);
  let bilangan1 = bilangan[0];
  // console.log(bilangan1);
  bilangan = bilangan[1].split("=");
  // console.log(bilangan);
  let bilangan2 = bilangan[0];
  // console.log(bilangan2);
  let bilangan3 = bilangan[1];
  // console.log(bilangan3);
  for (let i = 0; i < 10; i++) {
    let data = bilangan1.replace("#", i);
    // console.log(data * bilangan2);
    for (let j = 0; j < 10; j++) {
      let data2 = bilangan3.replace("#", j);
      //   console.log(data2);
      if (data * bilangan2 === parseInt(data2)) {
        jawab.push(i, j);
        return jawab;
      }
    }
  }

  //   console.log(bilangan1, bilangan2, bilangan3);
}

console.log(pola("42#3 * 188 = 80#204"));

// console.log(pola("8#61 * 895 = 78410#5"));
