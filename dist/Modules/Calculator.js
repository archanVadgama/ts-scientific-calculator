// basic Calculator class
class BasicCalculation {
    constructor(val1 = 0, val2 = 0) {
        this.val1 = val1;
        this.val2 = val2;
    }
    // It will perform addition
    add() {
        return this.val1 + this.val2;
    }
    // It will perform subtraction
    subtract() {
        return this.val1 - this.val2;
    }
    //  It will perform multiplication
    multiply() {
        return this.val1 * this.val2;
    }
    //  It will perform division only if val2 is not zero
    division() {
        return this.val1 / this.val2;
    }
    //  It will perform modulo operation
    modulo() {
        return this.val1 % this.val2;
    }
    //  It will perform base and power operation
    basePower() {
        return Math.pow(this.val1, this.val2);
    }
}
// advance calculation class
class AdvanceCalculation extends BasicCalculation {
    constructor(val1 = 0) {
        super();
        this.val1 = val1;
    }
    //sin method used for radian
    sinR() {
        return Math.sin(this.val1);
    }
    //cos method used for radian
    cosR() {
        return Math.cos(this.val1);
    }
    //tan method used for radian
    tanR() {
        return Math.tan(this.val1);
    }
    //sin method used for degree
    sinD() {
        //  It will convert radian to degree
        const degree = this.val1 * Math.PI / 180;
        return Math.sin(degree);
    }
    //cos method used for degree
    cosD() {
        //  It will convert radian to degree
        const degree = this.val1 * Math.PI / 180;
        return Math.cos(degree);
    }
    //tan method used for degree
    tanD() {
        //  It will convert radian to degree
        const degree = this.val1 * Math.PI / 180;
        return Math.tan(degree);
    }
    //  It will calculate log value with base 10
    log10() {
        return Math.log10(this.val1);
    }
    //  It will calculator square root
    sqrt() {
        return Math.sqrt(this.val1);
    }
    //  It will calculator factorial
    fact() {
        let n = this.val1;
        let res = 1;
        for (let i = 1; i <= n; i++) {
            res *= i;
        }
        return res;
    }
}
// this is main class which extends BasicCalculation class
class Calculator extends BasicCalculation {
    constructor(val1, val2) {
        super();
        this.val1 = val1;
        this.val2 = val2;
    }
}
export { Calculator, AdvanceCalculation };
//# sourceMappingURL=Calculator.js.map