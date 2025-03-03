// basic Calculator class
class BasicCalculation {
    // protected  val1 : number;
    // protected  val2 : number;
    constructor(val1 = 0, val2 = 0) {
        this.val1 = val1;
        this.val2 = val2;
        // this.val1 = val1;
        // this.val2 = val2;
    }
    // It will check the input is number or not
    // private checkIsNaNBasic(): boolean{
    //     if(!isNaN(this.val1) && !isNaN(this.val2)){
    //         return true;
    //     }
    //     return false;
    // }
    // It will perform addition
    add() {
        //this will check input is valid or not if not then return error
        // return this.checkIsNaNBasic() ? this.val1 + this.val2 : Error[3].message 
        return this.val1 + this.val2;
    }
    // It will perform subtraction
    subtract() {
        //this will check input is valid or not if not then return error
        // return this.checkIsNaNBasic() ? this.val1 - this.val2 : Error[3].message;
        return this.val1 - this.val2;
    }
    //  It will perform multiplication
    multiply() {
        //this will check input is valid or not if not then return error
        // return this.checkIsNaNBasic() ? this.val1 * this.val2 : Error[3].message;    
        return this.val1 * this.val2;
    }
    //  It will perform division only if val2 is not zero
    division() {
        // return this.checkIsNaNBasic() ? this.val1 / this.val2 : Error[3].message;   
        return this.val1 / this.val2;
    }
    //  It will perform modulo operation
    modulo() {
        //this will check input is valid or not if not then return error
        // return this.checkIsNaNBasic() ? this.val1 % this.val2 : Error[3].message;   
        return this.val1 % this.val2;
    }
    //  It will perform base and power operation
    basePower() {
        //this will check input is valid or not if not then return error
        // return this.checkIsNaNBasic() ? Math.pow(this.val1, this.val2) : Error[3].message;   
        return Math.pow(this.val1, this.val2);
    }
}
// advance calculation class
class AdvanceCalculation extends BasicCalculation {
    // protected  val1 : number;
    constructor(val1 = 0) {
        super();
        this.val1 = val1;
        // this.val1 = val1;
    }
    // It will check the input is number or not if not then return error
    // private checkIsNaNAdvance(calculationMethod : number | string) : number | string{
    //     if(!isNaN(this.val1)){
    //         return calculationMethod
    //     }
    //     return Error[3].message;
    // }
    //sin method used for radian
    sinR() {
        //this will check input is valid or not if not then return error
        // return this.checkIsNaNAdvance(Math.sin(this.val1));
        return Math.sin(this.val1);
    }
    //cos method used for radian
    cosR() {
        // return this.checkIsNaNAdvance(Math.cos(this.val1));
        return Math.cos(this.val1);
    }
    //tan method used for radian
    tanR() {
        // return this.checkIsNaNAdvance(Math.tan(this.val1)); 
        return Math.tan(this.val1);
    }
    //sin method used for degree
    sinD() {
        //  It will convert radian to degree
        const degree = this.val1 * Math.PI / 180;
        // return this.checkIsNaNAdvance(Math.sin(degree));
        return Math.sin(degree);
    }
    //cos method used for degree
    cosD() {
        //  It will convert radian to degree
        const degree = this.val1 * Math.PI / 180;
        // return this.checkIsNaNAdvance(Math.cos(degree));
        return Math.cos(degree);
    }
    //tan method used for degree
    tanD() {
        //  It will convert radian to degree
        const degree = this.val1 * Math.PI / 180;
        // return this.checkIsNaNAdvance(Math.tan(degree));
        return Math.tan(degree);
    }
    //  It will calculate log value with base 10
    log10() {
        // return this.checkIsNaNAdvance(Math.log10(this.val1))
        return Math.log10(this.val1);
    }
    //  It will calculator square root
    sqrt() {
        // return this.checkIsNaNAdvance(Math.sqrt(this.val1));
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