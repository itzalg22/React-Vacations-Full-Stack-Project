class VacationModel{

    constructor(vacation){
        this.vacationId = vacation.vacationId;
        this.vacationDestination = vacation.vacationDestination;
        this.vacationStart = vacation.vacationStart;
        this.vacationEnd = vacation.vacationEnd;
        this.price = vacation.price;
        this.description = vacation.description;
        this.image = vacation.image;
    }

}

module.exports = VacationModel;