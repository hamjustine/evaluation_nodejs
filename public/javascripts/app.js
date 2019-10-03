

const run = () => {
  document.getElementById('search').addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation();
    const search = event.target.querySelector('input[type=search]') ;
    fetch('/posts?search='+search.value).then(result => result.json()).then(result => {
      if(result.ok && result.nbResults) {
        document.getElementById('container').innerHTML = '' ;
        result.result.forEach(l => {
          document.getElementById('container').innerHTML += l ;
        })
      }
      search.value = "";
    })
  })

  document.getElementById('modifContact').addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation();
    const firstname = event.target.querySelector('input[name=firstname]').value ;
    const lastname = event.target.querySelector('input[name=lastname]').value  ;
    const avatar = event.target.querySelector('input[name=avatar]').value  ;
    const description = event.target.querySelector('input[name=description]').value  ;
    const mail = event.target.querySelector('input[name=mail]').value  ;
    const mail2 = event.target.querySelector('input[name=mail2]').value ;
    const telephone = event.target.querySelector('input[name=telephone]').value  ;
    const telephone2 = event.target.querySelector('input[name=telephone2]').value  ;
    const _id = event.target.querySelector('input[name=_id]').value ;
    const url ="/contact/"+_id;
    var data = {
       'firstname' :firstname,
       'lastname' :lastname,
       'avatar' :avatar,
       'description':description,
       'mail' :mail,
       'mail2':mail2,
       'telephone' :telephone,
       'telephone2' :telephone2,
    };
    console.log(data);
    fetch(url, {method:'PUT',headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)}).then(result => result.json()).then(result => {
      if(result.ok ) {
        document.getElementById('message').innerHTML = 'contact modifié' ;
      }
      data.value = "";
    })
  })

  document.getElementById('supprimer').addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    const _id = document.getElementById("_id").value ;

    const url ="/contact/"+_id;
    console.log(url)
    fetch(url, {method:'DELETE',headers: {'Content-Type': 'application/json'}}).then(result => result.json()).then(result => {
      if(result.ok ) {
        document.getElementById('message').innerHTML = 'contact supprimé' ;
      }
    })
  
  })


};


window.addEventListener('DOMContentLoaded',run) ;