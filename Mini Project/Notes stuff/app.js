const projectlist=document.querySelector('#prolist');
const form=document.querySelector('#enterIdea');

function renderplist(doc){
    let li=document.createElement('li');
    let pro= document.createElement('span');
    let cross=document.createElement('div');

    li.setAttribute('data-id',doc.id);
    pro.textContent = doc.data().pro;
    cross.textContent = '×';

    li.appendChild(pro);
    li.appendChild(cross);

    projectlist.appendChild(li);

    cross.addEventListener('click', (e) =>{
        e.stopPropagation();
        let id= e.target.parentElement.getAttribute('data-id');
        db.collection('PLIST').doc(id).delete();
    })
}

/* db.collection('PLIST').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderplist(doc);
    })
}) */


const ran = Math.floor(Math.random() * 1000000); 

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var empt= document.form1.eidea.value;
    if(empt==="")
    {
        alert("Boo!!! Please enter something atleast!!!");
        return false;

    }
    else{
    db.collection('PLIST').add({
        pro: form.eidea.value
    });
    form.eidea.value='';
    return true;
}
});

db.collection('PLIST').onSnapshot(snapshot =>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderplist(change.doc);
        } else if (change.type == 'removed'){
            let li = projectlist.querySelector('[data-id=' + change.doc.id + ']');
            projectlist.removeChild(li);
        }
    });
});

