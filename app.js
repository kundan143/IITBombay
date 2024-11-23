class AnimalTable {
    constructor(data, tableId) {
      this.data = data;
      this.tableId = tableId;
      this.sortType = null;
    }
  
    render() {
      const tableBody = document.getElementById(`${this.tableId}-body`);
      tableBody.innerHTML = '';
  
      this.data.forEach((animal, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><img src="${animal.image}" class="animal-image" alt="${animal.name}"></td>
          <td class="name-cell">${animal.name}</td>
          <td>${animal.location || ''}</td>
          <td>${animal.size}</td>
          <td>
            <button class="btn btn-warning edit-btn" data-index="${index}">Edit</button>
            <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
  
      this.addEventListeners();
    }
  
    addEventListeners() {
      const editButtons = document.querySelectorAll('.edit-btn');
      editButtons.forEach(button => {
        button.addEventListener('click', this.editAnimal.bind(this));
      });
  
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach(button => {
        button.addEventListener('click', this.deleteAnimal.bind(this));
      });
    }
  
    editAnimal(event) {
      const index = event.target.getAttribute('data-index');
      const animal = this.data[index];
  
      const newName = prompt('Enter new name', animal.name);
      const newLocation = prompt('Enter new location', animal.location);
      const newSize = prompt('Enter new size', animal.size);
  
      if (newName && newSize) {
        this.data[index] = { ...animal, name: newName, location: newLocation, size: newSize };
        this.render();
      } else {
        alert('Invalid input');
      }
    }
  
    deleteAnimal(event) {
      const index = event.target.getAttribute('data-index');
      this.data.splice(index, 1);
      this.render();
    }
  
    addAnimal(animal) {
      this.data.push(animal);
      this.render();
    }
    sortData(key) {
      this.data.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      this.render();
    }
  }
  const bigCatsTable = new AnimalTable([
    { name: 'Lion', location: 'Africa', size: 'Large', image: 'lion.jpg' },
    { name: 'Tiger', location: 'Asia', size: 'Large', image: 'tiger.jpg' }
  ], 'big-cats');
  
  const dogsTable = new AnimalTable([
    { name: 'Golden Retriever', location: 'USA', size: 'Medium', image: 'golden_retriever.jpg' },
    { name: 'Bulldog', location: 'UK', size: 'Small', image: 'bulldog.jpg' }
  ], 'dogs');
  
  const bigFishTable = new AnimalTable([
    { name: 'Shark', location: 'Oceans', size: 'Large', image: 'shark.jpg' },
    { name: 'Whale Shark', location: 'Oceans', size: 'Very Large', image: 'whale_shark.jpg' }
  ], 'big-fish');
  
  bigCatsTable.render();
  dogsTable.render();
  bigFishTable.render();
  