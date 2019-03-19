import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CalculateAgeService {
  constructor() {}
  calculateAge(dob) {
    var ageDifMs = Date.now() - new Date(dob).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    console.log(Math.abs(ageDate.getUTCFullYear() - 1970));
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
