import { Error } from "./Error";

// basic Calculator class
class BasicCalculation {
    
    constructor(protected val1: number = 0, protected val2: number = 0) {}
    
    // It will perform addition
    add(): number {
        return this.val1 + this.val2 
    }
    
    // It will perform subtraction
    subtract(): number  {
        return this.val1 - this.val2
    }
    
    //  It will perform multiplication
    multiply(): number  {
        return this.val1 * this.val2    
    }
    
    //  It will perform division only if val2 is not zero
    division(): number {
        return this.val1 / this.val2   
    }
    
    //  It will perform modulo operation
    modulo(): number  {
        return this.val1 % this.val2   
    }
    
    //  It will perform base and power operation
    basePower(): number  {
        return Math.pow(this.val1, this.val2)   
    }
    
}


// advance calculation class
class AdvanceCalculation extends BasicCalculation {
    
    constructor(protected val1 : number = 0){
        super();
    }
    
    //sin method used for radian
    sinR(): number  {
        return Math.sin(this.val1)
    }
    
    //cos method used for radian
    cosR(): number  {
        return Math.cos(this.val1)
    }
    
    //tan method used for radian
    tanR(): number  {
        return Math.tan(this.val1) 
    }
    
    //sin method used for degree
    sinD(): number  {
        //  It will convert radian to degree
        const degree = this.val1 * Math.PI / 180;
        return Math.sin(degree)
    }
    
    //cos method used for degree
    cosD(): number  {
        //  It will convert radian to degree
        const degree = this.val1 * Math.PI / 180;
        return Math.cos(degree)
    }
    
    //tan method used for degree
    tanD(): number  {
        //  It will convert radian to degree
        const degree = this.val1 * Math.PI / 180;
        return Math.tan(degree)
    }

    //  It will calculate log value with base 10
    log10(): number  {
        return Math.log10(this.val1)
    }

    //  It will calculator square root
    sqrt(): number  {
        return Math.sqrt(this.val1)
    }   
    
    //  It will calculator factorial
    fact(): number  {
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
    
    constructor(protected val1: number, protected val2: number) {
        super();
    }
    
}

export { Calculator, AdvanceCalculation};


