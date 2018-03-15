const mergeDataStreams = function(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
        let keys = Object.keys(array1);
        let people = array2.filter(function(object) {
            return object.id = keys[i];
        })
        console.log(mergeData(array1[key[i]], people));;
    }
    let mergeData = function(person, people) {
        person.age = person.age ? person.age || people.age;
        person.firstName = person.firstName ? person.firstName || people.firstName;
        person.lastName = person.lastName ? person.lastName || people.lastName;
        person.occupation = person.occupation ? person.occupation || people.occupation;
        person.address = person.address ? person.address || people.address;

        return person;
    }
}



array1 = [{
    id: 'aBcDeFgH',
    firstName: 'Juan',
    lastName: 'Doe',
    age: 32
  },
  {
    id: 'zYxWvUt',
    firstName: 'Alex',
    lastName: 'Smith',
    age: 24
  }]
array2 = [{
    id: 'aBcDeFgH',
    occupation: 'architect',
    address: {
      street: '123 Main St',
      city: 'CityTown',
      Country: 'USA'
    }
  },
  {
    id: 'zYxWvUt',
    occupation: 'receptionist',
    address: {
      street: '555 Ocean Ave',
      city: 'Beach City',
      Country: 'USA'
    }
  }]


console.log(mergeDataStreams(array1, array2)); 