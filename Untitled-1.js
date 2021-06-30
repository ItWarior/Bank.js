// є верховна рада клас можу добавити депутатів теж класи в верховну раду можна буде добавити закони
// можна дати хабарі деяким депутатам в кінці можна подивитись хто за що голосував і які хабарі брав
// рада
// депутати
// закони
// хабарі
// хто хабарник
// скільки хто брав
// хто які закони видавав
// голосування
class Humen {
   constructor(name, surname, ages) {
      this.name = name;
      this.surname = surname;
      this.ages = ages;
   }
}
class Oligarch extends Humen {
   constructor(name, surname, ages, money) {
      super(name, surname, ages);
      this.money = money;
   }
   giveBrive(sum, deputy, law, status) {
      this.money = this.money - sum;
      deputy.getBribe(sum);
      if (sum > 100) {
         deputy.voiting(law, status);
      } else {
         "Треба більше грошей"
      }
   }
}
class Polisman extends Humen {
   constructor(name, surname, ages) {
      super(name, surname, ages);
      this.prison = new Map();
   }
   catsh(deputy) {
      let status = deputy.getBriveStatus();
      if (status[1] > 1000) {
         this.prison.set(deputy.name, "prisoner");
         deputy.status = "prisoner";
      }

   }
}
class Deputy extends Humen {
   constructor(name, surname, ages, desk) {
      super(name, surname, ages);
      this.desk = desk;
      this.status = false;
      this.bribeSum = 0;
      this.lawList = new Map();
      this.voitinging = new Map();
   }
   getBribe(sum) {
      if (sum >= 100) {
         this.status = true;
         this.bribeSum += sum;
      } else {
         console.log("I need more!");
      }
   }
   getBriveStatus() {
      return ([this.status, this.bribeSum]);
   }
   addLawF(number, title) {
      let ifa = getLawList().indexOf(title);
      if (ifa < 0 && this.status != "prisoner") {
         this.lawList.set(number, title);
         addLawInBlock(title);
         console.log("ви успішно зареєстрували законопроект");
      } else if (this.status === "prisoner") {
         console.log("Хабарники не можуть додавати свої закони");
      } else {
         console.log("Законопроект вже зареєстрований");
      }
   }
   voiting(law, voise) {
      let list = getLawList();
      if (list.indexOf(law) >= 0 && typeof (voise) === "boolean" && this.status != "prisoner") {
         this.voitinging.set(law, voise);
         console.log("Вітаємо ваш голос зарахований");
      } else if (this.status === "prisoner") {
         console.log("Хабарники не можуть голосувати");
      } else {
         console.log("Закону не існує, або ви не коректно проголосували");
      }
   }
   abouVoiting(law) {
      let list = getLawList();
      if (list.indexOf(law) >= 0) {
         list.forEach(element => {
            if (element === law) {
               if (this.voitinging.has(law)) {
                  console.log(this.voitinging.get(law));
               }
               else {
                  console.log("Утримався");
               }
            }
         });
      } else {
         console.log("Законопроекту не існеє");
      }
   }
}

// масив ради
let council = [];
// повертає масив законопроектів
function getLawList() {
   let list = [];
   council.forEach(deputy => {
      list = list.concat([...deputy.lawList.values()]);
   });
   return list;
}
// виводить в консоль кількість голосів за даний законопроект
function statusLaw(law) {
   if (getLawList().indexOf(law) >= 0) {
      let yes = null;
      let no = null;
      let notvoit = null;
      for (const person of council) {
         if (person.voitinging.get(law) === true) {
            yes++;
         } else if (person.voitinging.get(law) === false) {
            no++;
         } else {
            notvoit++;
         }
      }
      return [yes, no, notvoit];
   } else {
      console.log("Законопроект не зареєстрований");
   }
}
//створення нового депутата, повертає обєкт дупутат
function addDeputyInCouncil(name, surname, ages, desk) {
   let deputy = new Deputy(name, surname, ages, desk);
   council.push(deputy);
   return deputy;
}
