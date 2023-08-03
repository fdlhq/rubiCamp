let hasilFinal = 0;
function weirdMultiply(sentence) {
  let hasil = 1;
  let pecahBilangan = sentence.toString().split("");
  for (let i = 0; i < pecahBilangan.length; i++) {
    hasil = hasil * parseInt(pecahBilangan[i]);
  }
  return hasil;
}

function loadData(value) {
  if (hasilFinal === 0) {
    hasilFinal = value;
  }
  for (let i = 0; i < 10; i++) {
    console.log(hasilFinal);
    let data = weirdMultiply(hasilFinal);
    hasilFinal = data;
    if (hasilFinal < 10) {
      return hasilFinal;
    }
  }
}

console.log(loadData(39));
hasilFinal = 0;
console.log(loadData(999));
hasilFinal = 0;
console.log(loadData(3));
