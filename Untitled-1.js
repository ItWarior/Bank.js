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
class oligarch extends Humen{
    constructor(name, surname, ages, money) {
       super(name, surname, ages);
       this.money = money;
   }
   giveBrive(sum, deputy, law, status) {
      this.money = this.money - sum;
      deputy.getBribe(sum);
      deputy.voiting(law, status);
   }
}
class Polismen extends Humen {
    constructor(params) {
        super()
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
      console.log([this.status, this.bribeSum]);
   }
   addLaw(number, title) {
      if (getLawList().indexOf(title) < 0) {
         this.lawList.set(number , title);
      } else{
         console.log("Законопроект вже зареєстрованийі");
      }
   }
   voiting(law, voise) {
      let list = getLawList();
      if (list.indexOf(law) >= 0 && typeof(voise) === "boolean") {
         this.voitinging.set(law,voise);
      } else {
         console.log("Закону не існує, або ви не коректно проголосували");
      } 
   }
   abouVoiting(law) {
      if (this.voitinging.has(law)) {
         console.log(this.voitinging.get(law));
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
      console.log(`Say yes : ${yes}`);
      console.log(`Say no : ${no}`);
      console.log(`Say I don't no : ${notvoit}`);
   } else {
      console.log("Законопроект не зареєстрований");
   }
}
//створення нового депутата, повертає обєкт дупутат
function addDeputyInCouncil(name,surname,ages,desk) {
   let deputy = new Deputy(name, surname, ages, desk);
   council.push(deputy);
   return deputy;
}
// Додаємо депутатів
let taras = addDeputyInCouncil("Taras", "Lutsyk", 29, "Frydom");
let ivan = addDeputyInCouncil("Ivan", "Lutsyk", 50, "Dom");
let nazar = addDeputyInCouncil("Nazar", "Lutsyk", 22, "Frydom");
let vira = addDeputyInCouncil("Vira", "Lutsyk", 32, "Byut");

//створення олігарха
let ahmetow = new oligarch("Ahmed","Bubabua", 38, 100000);
console.log(ahmetow);

// додаємо законопроекти
taras.addLaw(1, "Language");
taras.addLaw(2, "Water");
ivan.addLaw(1, "Rabesh");

// голосуємо за законопроекти
taras.voiting("Language", true);
nazar.voiting("Language", true);
ivan.voiting("Language", true);
vira.voiting("Language", false);
vira.voiting("Rabesh", false);

//даємо хабарі
taras.getBribe(150);
ahmetow.giveBrive(150, taras, "Rabesh", true);


//дивимось стату депутата
taras.getBriveStatus();

// виводимо в консоль всі зареєстровані законопроекти
console.log(getLawList());

//перевіряємо як проголосували депутати
statusLaw("Language");

//перевіряємо як проголосував депутат за даний законопроект
taras.abouVoiting("Rabesh");
console.log(council);