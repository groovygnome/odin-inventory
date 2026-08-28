const owners = document.querySelector('#owners');
const addBtn = document.querySelector('#add-owner');

addBtn.addEventListener('click', () => {
    const owner = document.createElement('div');

    owner.classList.add('owner');

    owner.innerHTML = `
        <p>Owner Name: </p>
        <input name='oName' type='text'>
        <button type='button' class='remove-owner'>Remove</button>
    `;

    owners.appendChild(owner);

    owner.querySelector('.remove-owner').addEventListener('click', () => {
        owner.remove();
    });
});
