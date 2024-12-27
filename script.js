document.getElementById("calorie-form").addEventListener("submit", addEntry);

function addEntry(e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const food = document.getElementById("food").value;
  const calories = document.getElementById("calories").value;

  if (date && food && calories) {
    const entry = {
      date,
      food,
      calories,
    };

    let entries = localStorage.getItem("entries");
    if (entries) {
      entries = JSON.parse(entries);
    } else {
      entries = [];
    }

    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));

    displayEntries();
    document.getElementById("calorie-form").reset();
  }
}

function displayEntries() {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  const entriesDiv = document.getElementById("entries");
  const totalCaloriesDiv = document.getElementById("total-calories");
  entriesDiv.innerHTML = "";

  let totalCalories = 0;

  entries.forEach((entry, index) => {
    totalCalories += parseInt(entry.calories);

    const entryDiv = document.createElement("div");
    entryDiv.classList.add("entry");
    entryDiv.innerHTML = `
      <div>
        <strong>${entry.date}</strong>: ${entry.food} - ${entry.calories} calories
      </div>
      <div>
        <i class="fas fa-edit edit" onclick="editEntry(${index})"></i>
        <i class="fas fa-trash delete" onclick="deleteEntry(${index})"></i>
      </div>
    `;
    entriesDiv.appendChild(entryDiv);
  });

  totalCaloriesDiv.textContent = `Total Calories: ${totalCalories}`;
}

function deleteEntry(index) {
  let entries = JSON.parse(localStorage.getItem("entries"));
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  displayEntries();
}

function editEntry(index) {
  let entries = JSON.parse(localStorage.getItem("entries"));
  const entry = entries[index];

  document.getElementById("date").value = entry.date;
  document.getElementById("food").value = entry.food;
  document.getElementById("calories").value = entry.calories;

  deleteEntry(index);
}

document.addEventListener("DOMContentLoaded", displayEntries);
