// дістаємо першу форму з дупутатами
let deputyForm = document.forms.deputy;
let deputyName = deputyForm.name;
let deputySurname = deputyForm.surname;
let deputyAges = deputyForm.ages;
let deputyDesk = deputyForm.desk;
let deputyAddDeputy = deputyForm.addDeputy;

//дістаємо другу форму з олігархами
let oligarchForm = document.forms.oligarch;
let oligarchName = oligarchForm.name;
let oligarchSurname = oligarchForm.surname;
let oligarchAges = oligarchForm.ages;
let oligarchMoney = oligarchForm.money;
let oligarchAddOligarch = oligarchForm.moaddOligarchney;

//дістаємо третю форму з поліцейськими
let polismanForm = document.forms.polisman;
let polismanName = polismanForm.name;
let polismanSurname = polismanForm.surname;
let polismanAges = polismanForm.ages;
let polismanAddPoliceman = polismanForm.addPoliceman;

//events list
deputyAddDeputy.onclick = function () {
   if (deputyName.value && deputySurname.value && deputyAges.value &&  deputyDesk.value) {
      
   }
}
// deputyAddDeputy.onclick(function () {
//    console.log("dfdfdfdfdfdfdfdfdf");
// })