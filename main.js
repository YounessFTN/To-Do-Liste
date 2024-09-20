// expliquation des fonctions :

// Voici une explication succincte de chaque fonction :

// 1. **apiGET** : Cette fonction asynchrone récupère les données d'utilisateurs
//  depuis une API. Elle gère les erreurs de connexion et renvoie les données au
//  format JSON si la requête réussit.

// 2. **renderTodos** : Cette fonction prend les données de l'API et les affiche
//  dans une liste HTML. Elle crée un élément de liste pour chaque utilisateur et
//  met en place les gestionnaires d'événements pour les boutons de suppression.

// 3. **setupDeleteButtons** : Cette fonction attache un gestionnaire d'événements
//  à chaque bouton de suppression. Lorsque le bouton est cliqué, l'élément de
//  liste correspondant est supprimé du DOM.

// 4. **setupFormHandler** : Cette fonction gère la soumission d'un formulaire.
//  Elle empêche le comportement par défaut, ajoute une nouvelle tâche à la liste
//  si le champ de saisie n'est pas vide, et réinitialise le champ de saisie.

// 5. **setupCheckboxHandler** : Cette fonction surveille les changements d'état
//  des cases à cocher. Elle met à jour les tableaux `tasksCompleted` et
//  `tasksPending` en fonction de l'état de la case (cochée ou non).

// 6. **setupFilterButtons** : Cette fonction ajoute des gestionnaires
// d'événements aux boutons de filtre. Elle ajuste l'affichage des éléments de la
//  liste selon le filtre sélectionné (tout, tâches à faire, tâches terminées).
let tasksCompleted = [];
let tasksPending = [];

async function apiGET() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Erreur de réponse");
    }
    return response.json();
  } catch (error) {
    console.error("Erreur de connexion à l'API:", error.message);
  }
}

apiGET()
  .then((data) => {
    renderTodos(data);
    setupFormHandler();
    setupCheckboxHandler();
    setupFilterButtons();
  })
  .catch((error) => console.error(error.message));

function renderTodos(apiData) {
  const listElement = document.querySelector("ul");

  apiData.forEach((item, index) => {
    const liElement = document.createElement("li");
    liElement.className =
      "todo flex items-center p-4 bg-white text-gray-800 border-b border-gray-200 transition-all duration-300";

    liElement.innerHTML = `
      <input class="checkbox form-checkbox h-6 w-6 text-green-500 rounded-md transition duration-200 ease-in-out focus:ring-2 focus:ring-green-500" type="checkbox" id="todo-${index}" />
      <label class="ml-2 flex-grow cursor-pointer" for="todo-${index}">${item.name}</label>
      <button class="delete ml-4 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out">Supprimer</button>
    `;

    listElement.appendChild(liElement);
  });

  setupDeleteButtons();
}

function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const liToRemove = event.currentTarget.closest("li");
      liToRemove.remove();
    });
  });
}

function setupFormHandler() {
  const form = document.querySelector("form");
  const input = document.querySelector("input[name='title']");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (value) {
      renderTodos([{ name: value }]);
      input.value = "";
    }
  });
}

function setupCheckboxHandler() {
  document.addEventListener("change", (event) => {
    if (event.target.classList.contains("checkbox")) {
      const todoItem = event.target.closest("li");
      const itemName = todoItem.querySelector("label").textContent;

      if (event.target.checked) {
        tasksCompleted.push({ name: itemName });
        tasksPending = tasksPending.filter((item) => item.name !== itemName);
      } else {
        tasksPending.push({ name: itemName });
        tasksCompleted = tasksCompleted.filter(
          (item) => item.name !== itemName
        );
      }

      console.log("Tâches terminées:", tasksCompleted);
      console.log("Tâches en attente:", tasksPending);
    }
  });
}

function setupFilterButtons() {
  const filterButtons = document.querySelectorAll("button[data-filter]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const filterType = event.currentTarget.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("bg-gray-200"));
      event.currentTarget.classList.add("bg-gray-200");

      const listItems = document.querySelectorAll("ul li");

      listItems.forEach((item) => {
        const checkbox = item.querySelector(".checkbox");
        item.style.display =
          filterType === "all" ||
          (filterType === "todo" && !checkbox.checked) ||
          (filterType === "done" && checkbox.checked)
            ? "flex"
            : "none";
      });
    });
  });
}
