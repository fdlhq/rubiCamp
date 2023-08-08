function spiral(param1) {
  var arr = [];
  var kolom = 0;
  var baris = 0;
  var kolomEnd = param1 - 1;
  var barisEnd = param1 - 1;
  var penampung = 0;

  for (let h = 0; h < param1; h++) {
    arr.push([]);
  }

  for (let i = 0; i < param1; i++) {
    for (let j = 0; j < param1; j++) {
      arr[i][j] = penampung;
      penampung++;
    }
  }
  let kurung = [];
  while (kolom <= kolomEnd && baris <= barisEnd) {
    for (let i = kolom; i <= kolomEnd; i++) {
      kurung.push(arr[baris][i]);
    }
    baris++;

    for (let i = baris; i <= barisEnd; i++) {
      kurung.push(arr[i][kolomEnd]);
    }
    kolomEnd--;

    if (baris <= barisEnd)
      for (let i = kolomEnd; i >= kolom; i--) {
        kurung.push(arr[barisEnd][i]);
      }
    barisEnd--;

    if (kolom <= kolomEnd) {
      for (let i = barisEnd; i >= baris; i--) {
        kurung.push(arr[i][kolom]);
      }
      kolom++;
    }
  }
  return kurung;
}

console.log(spiral(5));
// console.log(spiral(6))
// console.log(spiral(7))
