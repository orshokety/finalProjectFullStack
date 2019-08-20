

export class user {
    constructor(fullName:string, idNumber:string,  userName:string, password:string,
        gender:string, email:string, birthDate?:Date, pic?:any,  userType:string = "Regular", id?:number){
            this.fullName = fullName;
            this.idNumber = idNumber;
            this.userName = userName;
            this.password = password;
            this.gender = gender;
            this.email = email;
            this.birthDate = birthDate;
            this.pic = pic;
            this.userType = userType;
            this.id = id;
            
    }
    id:number;
    fullName:string;
    idNumber:string;
    userName:string;
    password:string;
    userType:string;
    gender:string;
    email:string;
    birthDate:Date;
    pic:any;
}

export class car {
    constructor(id:number, typeNumber:number,  currentKM:string, proper:string,
        available:string, carNumber:string){
            this.id = id;
            this.typeNumber = typeNumber;
            this.currentKM = currentKM;
            this.proper = proper;
            this.available = available;
            this.carNumber = carNumber

    }
    id:number;
    typeNumber:number;
    currentKM:string;
    carNumber:string;
    available:string;
    proper:string;

}
export class carType {
    constructor(id:number, maker:string,  model:string, dailyCost:number,
        CostOfOverdue:number, year:string, gear:string, photo:string){
            this.id = id;
            this.maker = maker;
            this.model = model;
            this.dailyCost = dailyCost;
            this.CostOfOverdue = CostOfOverdue;
            this.year = year;
            this.gear = gear;
            this.photo = photo
    }
    id:number;
    maker:string;
    model:string;
    dailyCost:number;
    CostOfOverdue:number;
    year:string;
    gear:string;
    photo:string
}
export class order {
    constructor(carNumber:string,  userIDNumber:string, startDate:Date,
        endDate:Date, returnDate?:Date){

            this.carNumber = carNumber;
            this.userIDNumber = userIDNumber;
            this.startDate = startDate;
            this.endDate = endDate;
            this.returnDate = returnDate;
    }
    id:number
    carNumber:string;
    userIDNumber:string;
    startDate:Date;
    endDate:Date;
    returnDate:Date;

}
export class newOrder {
    constructor(carNumber:string, startDate:Date,
        endDate:Date){

            this.carNumber = carNumber;
            this.startDate = startDate;
            this.endDate = endDate;
    }
    carNumber:string;
    startDate:Date;
    endDate:Date;

}
