"use strict";
(function () {
    const form = document.getElementById("taskForm");
    const input = document.getElementById("taskInput");
    const list = document.getElementById("taskList");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const taskName = input.value.trim();
        if (taskName === "")
            return;
        const item = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const taskText = document.createElement("span");
        taskText.textContent = taskName;
        checkbox.addEventListener("change", function () {
            taskText.classList.toggle("done", checkbox.checked);
        });
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            item.remove();
        });
        item.appendChild(checkbox);
        item.appendChild(taskText);
        item.appendChild(deleteButton);
        list.appendChild(item);
        input.value = "";
    });
})();
