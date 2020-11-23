

let githubForm;
let repoList;
let userList;

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/vnd.github.v3+json"
}


document.addEventListener('DOMContentLoaded', () => {
  userList = document.getElementById('user-list');
  repoList = document.getElementById('repos-list');
  githubForm = document.getElementById('github-form');
});

    // <form id='github-form'>
    //   <input id='search' type='text' name='search'>
    //   <input type='submit' name='submit'/>
    // </form>

    // <div id='github-container'>
    //   <ul id='user-list'>

    //   </ul>

    //   <ul id='repos-list'>

    //   </ul>
    // </div>
function prepareFormEvents(){
  const dataUrl = 'https://api.github.com/search/users';
  githubForm.addEventListener('submit', function(event){
    const user = {
      search: event.target.search.value
    };
    const configObject = { method: "GET", headers: headers, body: JSON.stringify(user) };
    fetch(dataUrl, configObject)
      .then(resp => resp.json())
      .then(json => renderUsersList(json))
  });
}

function renderUsersList(data){
  for (const user in data){
    const listElement = document.createElement('li');
    const avatar = document.createElement('img');
    avatar.src = `${user.avatar_url}`;
    listElement.append(`User: ${user.login}`);
    listElement.append(avatar);
    listElement.append(`<a href=${user.url}>Profile</a>`);
    listElement.addEventListener('click', function(event){
      renderRepoList(user);
    });
  }
}

function renderRepoList(user){
  let reposUrl = `https://api.github.com/users/${user.login}/repos`;
  const configObject = { method: "GET", headers: headers};
  fetch(reposUrl, configObject)
    .then(resp => resp.json())
    .then(json => renderUsersList(json))
}
