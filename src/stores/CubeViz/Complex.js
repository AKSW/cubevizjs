class Complex {

  constructor(dataCube) {
      this.dataCube = dataCube;
  }

  chooseVisualization() {
  }
}

export class Comparison extends Complex {

  chooseVisualization() {
      return 'Comparison';
  }
}

export class MaxNumber extends Complex {

  chooseVisualization() {
      return 'MaxNumber';
  }
}
