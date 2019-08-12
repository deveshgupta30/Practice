const projectlist=document.querySelector('#prolist');
const form=document.querySelector('#enterIdea');

function renderplist(doc){
    let li=document.createElement('li');
    let pro= document.createElement('span');

    li.setAttribute('data-id',doc.id);
    pro.textContent = doc.data().pro;

    li.appendChild(pro);

    projectlist.appendChild(li);
}

db.collection('PLIST').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderplist(doc);
    })
})

const ran = Math.floor(Math.random() * 1000000); 

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('PLIST').add({
        pro: form.eidea.value
    });
    form.eidea.value='';
})