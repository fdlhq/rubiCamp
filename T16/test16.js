class Tyre {
  constructor(brand, size) {
    this.brand = brand;
    this.size = size;
  }
}

class Car extends Tyre {
  constructor(brand, size, varian, door, seat, warranty, year, sn) {
    super(brand, size);
    this.varian = varian;
    this.door = door;
    this.seat = seat;
    this.warranty = warranty;
    this.year = year;
    this.sn = sn;
  }
}

class Agya extends Car {}
class Rush extends Car {}

class CarFactory {
  constructor() {
    this.Cars = [];
  }

  produce(year) {
    for (let i = 0; i < 3; i++) {
      this.Cars.push(
        new Agya("Dunlop", 15, "Agya", 4, 4, 1, year, CarFactory.serialNumber())
      );
    }
    for (let i = 0; i < 3; i++) {
      this.Cars.push(
        new Rush(
          "Bridgestone",
          17,
          "Rush",
          5,
          5,
          3,
          year,
          CarFactory.serialNumber()
        )
      );
    }
    return this.Cars;
  }

  result() {
    console.log("Hasil produksi :");
    let count = 1;
    for (let car of this.Cars) {
      console.log(`
No. ${count}
Varian      : ${car.varian}
SN          : ${car.sn}
Door        : ${car.door}
Seat        : ${car.seat} Seater
Tyre        : ${car.brand} ${car.size} Inch
Year        : ${car.year}
Warranty    : ${car.warranty} Year
            `);
      count++;
    }
  }

  guaranteeSimulation(simulationYear) {
    console.log("Hasil simulasi garansi semua mobil pada tahun 2025 :");
    let count = 1;
    for (let car of this.Cars) {
      console.log(`
No. ${count}
Varian      : ${car.varian}
SN          : ${car.sn}
Door        : ${car.door}
Seat        : ${car.seat} Seater
Tyre        : ${car.brand} ${car.size} Inch
Year        : ${car.year}
Warranty    : ${car.warranty} Year
            `);
      console.log(
        car.year + car.warranty >= simulationYear
          ? `Status on ${simulationYear} this guarantee status is active`
          : `Status on ${simulationYear} this guarantee status is expired`
      );
      count++;
    }
  }

  static serialNumber() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}

const toyota = new CarFactory();
toyota.produce(2020);
toyota.produce(2022);
toyota.result();
toyota.guaranteeSimulation(2025);
