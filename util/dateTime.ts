export class DateTime {
    public date: Date;

    constructor() {
        this.date = new Date();
    }

    /**
     *  get current date in yyMMdd format
     * @param hours set it to true if you want to include hour in the result (default false)
     * @param minutes set it to true if you want to include minute in the result (default false)
     * @param seconds set it to true if you want to include second in the result (default false)
     */
    public getDate(
        hours: boolean = false,
        minutes: boolean = false,
        seconds: boolean = false
    ): number {
        return Number(
            this.date.getFullYear().toString() +
                this.pad2(this.date.getMonth() + 1) +
                this.pad2(this.date.getDate()) +
                (hours ? this.pad2(this.date.getHours()) : "") +
                (minutes ? this.pad2(this.date.getMinutes()) : "") +
                (seconds ? this.pad2(this.date.getSeconds()) : "")
        );
    }

    private pad2(n) {
        return n < 10 ? "0" + n : n;
    }
}
