class Person {
  constructor(name, email) {
    this.email = email;
    this.name = name;
  }
}

class TalkingPerson extends Person {
  introduce() {
    console.log(`Hi, I'm ${this.name}!`);
  }
}

class Student extends TalkingPerson {
  constructor(name, email, yearBorn) {
    super(name, email);
    this.yearBorn = yearBorn;
  }

  introduce() {
    console.log("the following introduction comes from a student");
    super.introduce();
  }

  study() {
    console.log("I'm studying!");
  }
}

class Mime extends Person {
  pantamime() {
    console.log("*moves around impressively*");
  }
}

class Teacher extends TalkingPerson {
  teach() {
    console.log("blah blah blah");
  }
}
