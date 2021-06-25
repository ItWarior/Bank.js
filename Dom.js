// // Додаємо депутатів
// let taras = addDeputyInCouncil("Taras", "Lutsyk", 29, "Frydom");
// let ivan = addDeputyInCouncil("Ivan", "Lutsyk", 50, "Dom");
// let nazar = addDeputyInCouncil("Nazar", "Lutsyk", 22, "Frydom");
// let vira = addDeputyInCouncil("Vira", "Lutsyk", 32, "Byut");

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

function deleteChild(father) {
   if (father.firstChild) {
      father.removeChild(father.firstChild);
      deleteChild(father);
   } else {
      return
   }
}
// дістаємо блок законів
let lawes = document.getElementById("lawList");
function voitingAdd() {
   deleteChild(lawes);
   let listVoise = getLawList();
   listVoise.forEach(element => {
      addLawInBlock(element);
   });
}

function addLawInBlock(newLaw) {
   let block = document.createElement("div");
   block.style.border = "3 px solid red"
   let titles = document.createElement("h4");

   block.classList.add("blockLaw");

   titles.innerText = newLaw;
   titles.style.color = "green";

   lawes.appendChild(block);
   let [y, n, dont] = statusLaw(newLaw);
   let p1 = document.createElement("p");
   let p2 = document.createElement("p");
   let p3 = document.createElement("p");
   block.appendChild(titles);
   block.appendChild(p1);
   block.appendChild(p2);
   block.appendChild(p3);
   p1.innerText = `Say yes : ${y}`;
   p2.innerText = `Say no : ${n}`;
   p3.innerText = `Say I don't no : ${dont}`;
}
//events list
// додаємо депутатів при кліку на кнопку
deputyAddDeputy.onclick = function () {
   if (deputyName.value && deputySurname.value && deputyAges.value && deputyDesk.value || true) {
      addDeputyInCouncil(deputyName.value, deputySurname.value, deputyAges.value, deputyDesk.value)
      let deputyBlock = document.getElementById("deputyBlock");
      let deputyElement = document.createElement("div");
      let deputyH = document.createElement("h4");
      let deputyTim = document.createElement("h4");
      let img = document.createElement("img");
      let bclockBtn = document.createElement("div");

      let getBriveStatus = document.createElement("button");
      let addLaw = document.createElement("button");
      let voiting = document.createElement("button");
      let abouVoiting = document.createElement("button");

      deputyElement.classList.add("deputy");
      deputyH.classList.add("deputyH");
      deputyTim.classList.add("deputyH");
      img.classList.add("imgDeputy");
      bclockBtn.classList.add("bclockBtn");
      getBriveStatus.classList.add("btn");
      addLaw.classList.add("btn");
      voiting.classList.add("btn");
      abouVoiting.classList.add("btn");

      img.src = "img/7802750.png";
      deputyH.innerText = deputyName.value;
      deputyTim.innerText = deputyDesk.value;
      getBriveStatus.innerText = "getBriveStatus";
      addLaw.innerText = "addLaw";
      voiting.innerText = "voiting";
      abouVoiting.innerText = "abouVoiting";

      deputyBlock.appendChild(deputyElement);
      deputyElement.appendChild(deputyH);
      deputyElement.appendChild(deputyTim);
      deputyElement.appendChild(img);
      deputyElement.appendChild(bclockBtn);
      bclockBtn.appendChild(getBriveStatus);
      bclockBtn.appendChild(addLaw);
      bclockBtn.appendChild(voiting);
      bclockBtn.appendChild(abouVoiting);


      // getBriveStatus
      getBriveStatus.onclick = function () {
         council.forEach(element => {
            if (element.name === deputyH.innerText) {
               let a = element.getBriveStatus();
               console.log(a);
            }
         });

      }
      function createBlockFormInp() {
         bclockBtn.style.display = "none";

         let addForm = document.createElement("form");
         let inpNum = document.createElement("input");
         let inpLaw = document.createElement("input");
         inpNum.type = "number";
         let btn = document.createElement("input");
         btn.type = "button";
         btn.name = "btnAdd";
         inpNum.name = "inpNum";
         inpLaw.name = "inpLaw";
         let btnClose = document.createElement("input");
         btnClose.type = "button";
         btnClose.name = "btnClose";

         addForm.style.display = "flex";
         addForm.style.flexDirection = "column"

         inpNum.classList.add("lawFormInp");
         inpLaw.classList.add("lawFormInp");

         btn.value = "Regist";
         btnClose.value = "Close";
         btn.classList.add("btn");
         btnClose.classList.add("btn");

         deputyElement.appendChild(addForm);
         addForm.appendChild(inpNum);
         addForm.appendChild(inpLaw);
         addForm.appendChild(btn);
         addForm.appendChild(btnClose);

         return addForm;
      }
      addLaw.onclick = function () {
         let form = createBlockFormInp();
         let btnAd = form.btnAdd;
         let btnCl = form.btnClose;
         let inp1 = form.inpNum;
         let inp2 = form.inpLaw;
         inp1.placeholder = "Number";
         inp2.placeholder = "Your new law";

         btnAd.onclick = function () {
            if (inp1.value && inp2.value) {
               council.forEach(element => {
                  if (element.name === deputyH.innerText) {
                     element.addLawF(inp1.value, inp2.value);
                     console.log(inp2.value);
                     if (getLawList().indexOf(inp2.value) < 0 && element.status != "prisoner") {
                     }
                  }
               });
            }
         }
         btnCl.onclick = function () {
            bclockBtn.style.display = "block";
            form.style.display = "none";
         }
      }
      voiting.onclick = function () {
         let form = createBlockFormInp();
         let btnAd = form.btnAdd;
         let btnCl = form.btnClose;
         let inp1 = form.inpNum;
         inp1.type = "text";
         let inp2 = form.inpLaw;
         inp1.placeholder = "Law";
         inp2.placeholder = "Your voice : true or false";

         btnAd.onclick = function () {
            if (inp1.value && inp2.value) {
               council.forEach(element => {
                  if (element.name === deputyH.innerText) {
                     let boolen = null;
                     if (inp2.value === "true") {
                        boolen = true;
                     } else if (inp2.value === "false") {
                        boolen = false;
                     }
                     element.voiting(inp1.value, boolen);
                  }
               });
               voitingAdd();
            }
         }
         btnCl.onclick = function () {
            bclockBtn.style.display = "block";
            form.style.display = "none";
         }
      }
      abouVoiting.onclick = function () {
         let form = createBlockFormInp();
         let btnAd = form.btnAdd;
         let btnCl = form.btnClose;
         let inp1 = form.inpNum;
         inp1.type = "text";
         let inp2 = form.inpLaw;
         inp1.placeholder = "Law";
         inp2.style.display = "none";

         btnAd.onclick = function () {
            council.forEach(element => {
               if (element.name === deputyH.innerText) {
                  if (inp1.value) {
                     element.abouVoiting(inp1.value)
                  } else {
                     console.log("введіть дані");
                  }
               }
            });
         }
         btnCl.onclick = function () {
            bclockBtn.style.display = "block";
            form.style.display = "none";
         }
      }
   }
}

// abouVoiting.innerText