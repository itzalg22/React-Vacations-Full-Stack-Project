class VacationModel {
    public vacationId: number;
    public destination: string;
    public dateFrom: string;
    public dateUntil: string;
    public price: number;
    public description: string;
    public followCount: number;
    public image: string;
    public imageName: FileList;

    public static convertToFormData(vacation: VacationModel): FormData {
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("dateFrom", vacation.dateFrom);
        myFormData.append("dateUntil", vacation.dateUntil);
        myFormData.append("description", vacation.description);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.imageName.item(0));
        return myFormData;
    }
    
}

export default VacationModel;
