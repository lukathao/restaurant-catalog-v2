"user server";

class inMemoryDb {
  constructor() {
    this.memory = {};
  }

  add(field, key, value) {
    this.memory[field] = { ...this.memory[field], [key]: value };
  }

  getMemory(field, key) {
    if (this.memory[field]) {
      if (this.memory[field][key]) {
        return this.memory[field][key];
      }
    }
    return null;
  }

  deleteMemory(field, key) {
    if (this.memory[field]) {
      if (this.memory[field][key]) {
        delete this.memory[field][key];
        return true;
      }
    }
    return false;
  }

  deleteAllKeys(key) {
    let deletions = 0;
    for (const k in this.memory) {
      for (const i in this.memory[k]) {
        if (i === key) {
          delete this.memory[k][i];
          deletions++;
        }
      }
    }
    return deletions;
  }

  getAllValuesOfField(field) {
    if (this.memory[field]) {
      //this returns the key values as an array
      return Object.keys(this.memory[field]).map((key) => ({ [key]: this.memory[field][key] }));
      //this returns only the values as an array
      // return Object.values(this.memory[field]);
    }
    return null;
  }
}



export const runTest = () => {
  const newMem = new inMemoryDb();
  newMem.add("toys", "A", 1);
  newMem.add("toys", "B", 2);
  newMem.add("toys", "A", 3);
  newMem.add("dig", "A", 1);
  newMem.add("dig", "B", 2);
  newMem.add("pig", "A", 1);
  newMem.add("pig", "B", 2);
  newMem.add("xyz", "A", 1);
  newMem.add("xyz", "B", 2);
  newMem.add("abc", "A", 1);
  newMem.add("abc", "B", 2);
  const field = newMem.getAllValuesOfField("xyz");
  console.log(field);

  // const test1 = newMem.getMemory("toys", "A");
  // console.log(test1);
  // const test2 = newMem.getMemory("nothing", "A");
  // console.log(test2);
  // const test3 = newMem.getMemory("toys", "C");
  // console.log(test3);
  // const test4shouldbeFalse = newMem.deleteMemory("nothing", "A");
  // console.log(test4shouldbeFalse);
  // const test5shouldbeTrue = newMem.deleteMemory("toys", "A");
  // console.log(test5shouldbeTrue)
  // const deletions = newMem.deleteAllKeys("A");
  // console.log(deletions);
  console.log(newMem);

  return newMem;
}