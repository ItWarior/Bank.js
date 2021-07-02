let masOligarch = [];
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
let oligarchAddOligarch = oligarchForm.addOligarch;

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
// функція створення блокук депутата
function addBlockDeputy() {
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
// додаємо депутатів при кліку на кнопку
deputyAddDeputy.onclick = function () {
   if (deputyName.value && deputySurname.value && deputyAges.value && deputyDesk.value) {
      if (council.length === 0) {
         addBlockDeputy();
      } else {
         let flag = false;
         council.forEach(element => {
            if (element.name === deputyName.value) {
               flag = true;
            }
         });
         if (flag === false) {
            addBlockDeputy();
         } else {
            console.log("Депутат вже зареєстрований");
         }
      }
   }
};

oligarchAddOligarch.onclick = function () {
   if (oligarchName.value && oligarchSurname.value && oligarchAges.value && oligarchMoney.value) {
      let olig = new Oligarch(oligarchName.value, oligarchSurname.value, oligarchAges.value, oligarchMoney.value);
      masOligarch.push(olig);

      let oligarchBlockOne = document.getElementById("oligarchBlock");
      let oligarchBlock = document.createElement("div");

      let oligarchImgList = document.createElement("div");
      let oligarchGiveBribBLock = document.createElement("form");

      let img = document.createElement("img");
      let inputBlock = document.createElement("div");
      let OligarchName = document.createElement("spam");
      let OligarchSurname = document.createElement("spam");
      let OligarchAge = document.createElement("spam");
      let OligarchBtn = document.createElement("spam");
      let inpLaw = document.createElement("input");
      let inpDeputy = document.createElement("input");
      let inpVoice = document.createElement("input");
      let inpSumBreabe = document.createElement("input");
      let inpBtnGiveBreabe = document.createElement("button");

      oligarchBlock.classList.add("oligarch")
      img.classList.add("imgDeputy");
      oligarchImgList.classList.add("deputyH");
      inputBlock.classList.add("bclockBtn");
      OligarchName.classList.add("btn");
      OligarchSurname.classList.add("btn");
      OligarchAge.classList.add("btn");
      OligarchBtn.classList.add("btn");
      inpSumBreabe.type = "number";
      inpBtnGiveBreabe.style.width = "100px";
      inpBtnGiveBreabe.style.height = "30px";
      inpBtnGiveBreabe.style.height = "30px";
      inpBtnGiveBreabe.style.marginLeft = "69px";
      inpBtnGiveBreabe.style.backgroundColor = "green";


      oligarchBlockOne.appendChild(oligarchBlock);
      oligarchBlock.appendChild(oligarchImgList);
      oligarchBlock.appendChild(oligarchGiveBribBLock);
      oligarchImgList.appendChild(img);
      oligarchImgList.appendChild(inputBlock);
      inputBlock.appendChild(OligarchName);
      inputBlock.appendChild(OligarchSurname);
      inputBlock.appendChild(OligarchAge);
      inputBlock.appendChild(OligarchBtn);
      oligarchGiveBribBLock.appendChild(inpLaw);
      oligarchGiveBribBLock.appendChild(inpDeputy);
      oligarchGiveBribBLock.appendChild(inpVoice);
      oligarchGiveBribBLock.appendChild(inpSumBreabe);
      oligarchGiveBribBLock.appendChild(inpBtnGiveBreabe);

      img.src = "img/5766011.png";
      OligarchName.innerText = oligarchName.value;
      OligarchSurname.innerText = oligarchSurname.value
      OligarchAge.innerText = oligarchAges.value
      OligarchBtn.innerText = oligarchMoney.value
      inpLaw.placeholder = "Law";
      inpDeputy.placeholder = "Deputy";
      inpVoice.placeholder = "true or false";
      inpSumBreabe.placeholder = "bribe";
      inpBtnGiveBreabe.innerText = "Give";

      inpBtnGiveBreabe.onclick = function (event) {
         event.preventDefault();
         let flag = null;
         if (inpVoice.value == "true") {
            flag = true;
         } else if (inpVoice.value == "false") {
            flag = false;
         }
         let obj = event.target.parentElement.previousElementSibling.children[1].children[0].innerText;
         masOligarch.forEach(olig => {
            if (olig.name === obj) {
               council.forEach(deputy => {
                  if (inpDeputy.value === deputy.name) {
                     if (deputy.status != "prisoner") {
                        olig.giveBrive(+inpSumBreabe.value, deputy, inpLaw.value, flag);
                        OligarchBtn.innerText = Number(OligarchBtn.innerText) - Number(inpSumBreabe.value);
                     }
                  }
               });
            }
         });
         voitingAdd();
      }
   }
}

polismanAddPoliceman.onclick = function (ev) {
   deleteChild(police);
   let objPolisman = new Polisman(polismanName.value, polismanSurname.value, polismanAges.value);
   let polices = document.getElementById("police");
   let policeBlock = document.createElement("div");

   let imgListblock = document.createElement("div");
   let funcBLock = document.createElement("div");

   let img = document.createElement("img");
   let blockSpam = document.createElement("div");

   let spamName = document.createElement("spam");
   let spamSurname = document.createElement("spam");
   let spamAge = document.createElement("spam");

   let inpBlock = document.createElement("div");
   let status = document.createElement("h3");

   let inp = document.createElement("input");
   let btn = document.createElement("button");

   polices.appendChild(policeBlock);
   policeBlock.appendChild(imgListblock);
   policeBlock.appendChild(funcBLock);
   imgListblock.appendChild(img);
   imgListblock.appendChild(blockSpam);
   blockSpam.appendChild(spamName);
   blockSpam.appendChild(spamSurname);
   blockSpam.appendChild(spamAge);
   funcBLock.appendChild(inpBlock);
   funcBLock.appendChild(status);
   inpBlock.appendChild(inp);
   inpBlock.appendChild(btn);

   polices.classList.add("policeblock");
   img.classList.add("imgDeputy");
   imgListblock.classList.add("policehad");
   funcBLock.classList.add("policeFunk");
   blockSpam.classList.add("policeList");
   spamName.classList.add("list");
   spamSurname.classList.add("list");
   spamAge.classList.add("list");
   inpBlock.classList.add("inpBlock");
   inp.classList.add("list");
   btn.classList.add("inpPolis");

   img.src = "img/1900822.png";
   spamName.innerText = polismanName.value;
   spamSurname.innerText = polismanSurname.value;
   spamAge.innerText = polismanAges.value;
   inp.placeholder = "Name";
   btn.innerText = "Get info";
   status.innerText = "Status :";

   btn.onclick = function (ev) {
      council.forEach(element => {
         if (inp.value == element.name) {
            let flag = funcBLock.lastChild.innerText;
            if (element.status === false) {
               status.innerText = "Status : " + element.status + " " + element.bribeSum;
               if (flag === "catch") {
                  funcBLock.removeChild(funcBLock.lastChild);
                  flag = null;
               }
            } else if (element.status === true) {
               if (flag === "catch") {
                  status.innerText = "Status : " + element.status + " " + element.bribeSum;
               } else {
                  status.innerText = "Status : " + element.status + " " + element.bribeSum;
                  let cath = document.createElement("button");
                  funcBLock.appendChild(cath);
                  cath.classList.add("catchBtn");
                  cath.innerText = "catch";
                  cath.onclick = function () {
                     objPolisman.catsh(element);
                     let del = document.getElementById("deputyBlock");
                     for (let i = 0; i < del.children.length; i++) {
                        if (del.children[i].firstChild.innerText === element.name) {
                           let obj = del.children[i].children[2];
                           obj.src = "img/803335.png";
                        }
                     }
                  }
               }
            }

         }
      });
   }
}