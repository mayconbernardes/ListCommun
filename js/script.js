function getOrSetLocalStorageState(key, defaultValue) {
  const storedValue = localStorage.getItem(key);
  if (storedValue === null) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  } else {
    return JSON.parse(storedValue);
  }
}

const ToDoList = [
  {
    Title: "Accessibilité Web",
    Items: [
      "Le langage utilisé est simple et compréhensible.",
    ]
  },
  {
    Title: "Gestion des Erreurs dans les Formulaires",
    Items: [
      "Les erreurs dans les formulaires sont clairement identifiées et expliquées.",
    ]
  },
  {
    Title: "Structuration Logique des Pages avec En-têtes Appropriés",
    Items: [
      "Les pages ont une structure logique avec des en-têtes appropriés."
    ]
  },
  {
    Title: "Gestion des Erreurs dans les Formulaires",
    Items: [
      "Les erreurs dans les formulaires sont clairement identifiées et expliquées.",
    ]
  },
  {
    Title: "Structuration Logique des Pages avec En-têtes Appropriés",
    Items: [
      "Les pages ont une structure logique avec des en-têtes appropriés."
    ]
  },
];

const selectedItemsState = getOrSetLocalStorageState('selectedItems', {});
let progressValue = parseInt(localStorage.getItem('progressValue')) || 0;

function createTaskList() {
  const taskListContainer = document.getElementById('taskList');

  ToDoList.forEach(item => {
    const section = document.createElement('li');
    section.classList.add('task');

    const h3 = document.createElement('h3');
    h3.textContent = item.Title;
    section.appendChild(h3);

    const itemList = document.createElement('ul');

    item.Items.forEach(subItem => {
      const li = document.createElement('li');

      const itemCheckbox = document.createElement('input');
      itemCheckbox.type = 'checkbox';
      itemCheckbox.id = subItem.replace(/\s+/g, '');

      if (selectedItemsState[item.Title] && selectedItemsState[item.Title][subItem]) {
        itemCheckbox.checked = true;
        li.classList.add('completed');
      }

      itemCheckbox.addEventListener('change', function () {
        if (!selectedItemsState[item.Title]) {
          selectedItemsState[item.Title] = {};
        }
        selectedItemsState[item.Title][subItem] = this.checked;
        localStorage.setItem('selectedItems', JSON.stringify(selectedItemsState));
        updateProgressBar();
        updateLabelStyle(li, this.checked);
      });

      li.appendChild(itemCheckbox);

      const label = document.createElement('label');
      label.textContent = subItem;
      li.appendChild(label);

      itemList.appendChild(li);
    });

    section.appendChild(itemList);
    taskListContainer.appendChild(section);
  });
}

function updateLabelStyle(labelContainer, isChecked) {
  const label = labelContainer.querySelector('label');

  if (isChecked) {
    label.style.textDecoration = 'line-through';
  } else {
    label.style.textDecoration = 'none';
  }
}
function updateProgressBar() {
  const totalTasks = document.querySelectorAll('.task').length;
  const completedTasks = document.querySelectorAll('.task input:checked').length;

  const percentage = (completedTasks / totalTasks) * 100;
  const progressBarInner = document.getElementById('progress-bar-inner');
  progressBarInner.style.width = `${percentage}%`;

  const percentageText = document.querySelector('.percentage');
  percentageText.textContent = `${Math.round(percentage)}%`;

  const fileProgressBar = document.getElementById('file');
  fileProgressBar.value = percentage;

  progressValue = Math.round(percentage);
  localStorage.setItem('progressValue', progressValue.toString());
}

document.addEventListener('DOMContentLoaded', function () {
  createTaskList();
  updateProgressBar();
});


document.addEventListener('DOMContentLoaded', function () {
  // Your existing code here
  
  // Get the reset button element
  const resetButton = document.getElementById('resetButton');
  
  // Add a click event listener to the reset button
  resetButton.addEventListener('click', function () {
    // Reset your list and local storage
    resetList();
    
    // Reload the page
    location.reload();
  });

  // Your existing code here
  
  function resetList() {
    // Reset your list logic here
    // For example, clear local storage
    localStorage.removeItem('selectedItems');
    localStorage.removeItem('progressValue');
  }
});
