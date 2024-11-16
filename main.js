document.getElementById('addPlan').addEventListener('click', function () {
    const destination = document.getElementById('destination').value;
    const activities = document.getElementById('activity').value.split(',').map(act => act.trim());

    if (destination && activities.length > 0) {
        const plans = JSON.parse(localStorage.getItem('plans')) || [];
        plans.push({ destination, activities });
        localStorage.setItem('plans', JSON.stringify(plans));
        displayPlans();
        document.getElementById('destination').value = '';
        document.getElementById('activity').value = '';
    }
});

function displayPlans() {
    const plansList = document.getElementById('plansList');
    plansList.innerHTML = '';
    const plans = JSON.parse(localStorage.getItem('plans')) || [];

    plans.forEach((plan, index) => {
        const li = document.createElement('li');
        li.classList.add('list-item');

        const title = document.createElement('h3');
        title.textContent = `Local: ${plan.destination}`;
        li.appendChild(title);

        const activityList = document.createElement('ul');
        activityList.classList.add('activity-list');
        plan.activities.forEach(activity => {
            const activityItem = document.createElement('li');
            activityItem.textContent = `Atividade: ${activity}`;
            activityList.appendChild(activityItem);
        });
        li.appendChild(activityList);

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i> Editar';
        editButton.classList.add('edit-btn');
        editButton.onclick = function () {
            const newDestination = prompt('Editar Local:', plan.destination);
            const newActivities = prompt('Editar Atividades (separadas por vírgula):', plan.activities.join(', '));
            if (newDestination && newActivities) {
                plan.destination = newDestination;
                plan.activities = newActivities.split(',').map(act => act.trim());
                localStorage.setItem('plans', JSON.stringify(plans));
                displayPlans();
            }
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Excluir';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = function () {
            plans.splice(index, 1);
            localStorage.setItem('plans', JSON.stringify(plans));
            displayPlans();
        };

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        plansList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', displayPlans);

document.getElementById('logoutButton').addEventListener('click', function () {
    window.location.href = 'login.html';
});