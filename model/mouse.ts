export class Mouse{
    public k_type: Array<number> = new Array();

    constructor(){
        for (let index = 1; index < 44; index++)
        	this.k_type[index] = 0;
        this.k_type[9] = 1;
        this.k_type[10] = 1;
        this.k_type[20] = 1;
        this.k_type[21] = 1;
    }
}