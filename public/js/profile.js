const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  //const needed_funding = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

//   if (name && needed_funding && description) {
//     const response = await fetch(`/api/projects`, {
  if (name && description) {
    const response = await fetch(`/api/projects`, { //need to change projects
      method: 'POST',
      //body: JSON.stringify({ name, needed_funding, description }),
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project'); //need to change project
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, { //need to change projects
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');  //need to change projects
    }
  }
};

document
  .querySelector('.new-project-form') // need to change projects
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')      //need to change projects
  .addEventListener('click', delButtonHandler);
