// document.addEventListener('DOMContentLoaded', function () {
//     var modal = document.getElementById('myModal');
//     var link = document.getElementById("addLink");
//     var addButton = document.getElementById("add");
//     var contactList = document.getElementById('contactList');
//     var myForm = document.getElementById('myForm');

//     link.onclick = function () {
//         modal.style.display = "block";
//     }

//     addButton.onclick = function () {
//         modal.style.display = "none";
//     }

//     modal.onclick = function (event) {
//         event.stopPropagation();
//     }

//     window.onclick = function (event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }

//     myForm.addEventListener('submit', function(event) {
//         event.preventDefault(); 

//         var name = document.getElementById('name').value;
//         var email = document.getElementById('email').value;
//         var mobile = document.getElementById('mobile').value;
//         var landline = document.getElementById('landline').value;
//         var website = document.getElementById('website').value;
//         var address = document.getElementById('address').value;

//         var contact = {
//             name: name,
//             email: email,
//             mobile: mobile,
//             landline: landline,
//             website: website,
//             address: address
//         };

//         var contactsArray = JSON.parse(localStorage.getItem('contacts')) || [];
//         contactsArray.push(contact);
//         localStorage.setItem('contacts', JSON.stringify(contactsArray));

//         var contactItem = document.createElement('div');
//         contactItem.innerHTML = `
//             <b> ${name}</b>
//             <p> ${email}</p>
//             <p> ${mobile}</p>
//         `;
//         contactItem.onclick = function(){
//             displayIndividualDetails(contact);
//         }
//         contactList.appendChild(contactItem);

//         alert('Contact details added successfully!');

//         myForm.reset();

//         modal.style.display = "none";
//     });

//     function displayIndividualDetails(contact) {
//         let fullDetails = document.getElementById("fullDetails");
//         fullDetails.innerHTML = "";
//         var contactItem = document.createElement('div');
//         contactItem.innerHTML = `
//             <h1> ${contact.name}</h1>
//             <p> ${contact.email}</p>
//             <p> ${contact.mobile}</p>
//             <p> ${contact.landline}</P
//             <p> ${contact.website}</P>
//             <p> ${contact.address}</P>
//             <button onclick="editContact(${JSON.stringify(contact)})">Edit</button>
//             <button onclick="deleteContact(${JSON.stringify(contact)})">Delete</button>
//         `;
//         fullDetails.appendChild(contactItem);
//     }

//     function editContact(contact) {
//         document.getElementById('name').value = contact.name;
//         document.getElementById('email').value = contact.email;
//         document.getElementById('mobile').value = contact.mobile;
//         document.getElementById('landline').value = contact.landline;
//         document.getElementById('website').value = contact.website;
//         document.getElementById('address').value = contact.address;

//         var modal = document.getElementById('myModal');
//         modal.style.display = "block";
//     }

//     // function deleteContact(contact) {
//     //     var contactsArray = JSON.parse(localStorage.getItem('contacts')) || [];
//     //     var updatedContacts = contactsArray.filter(function (c) {
//     //         return c.email !== contact.email; 
//     //     });
//     //     localStorage.setItem('contacts', JSON.stringify(updatedContacts));

//     //     var contactItems = contactList.children;
//     //     for (var i = 0; i < contactItems.length; i++) {
//     //         if (contactItems[i].innerText.includes(contact.name)) {
//     //             contactItems[i].remove();
//     //             break;
//     //         }
//     //     }

//     //     document.getElementById("fullDetails").innerHTML = "";

//     //     alert('Contact deleted successfully!');
//     // }

// function editContact(contactId) {
//     var myForm = document.getElementById('myForm');
//     myForm.click();
// }

// });
// function closeForm() {
//     var modal = document.getElementById('myModal');
//     modal.style.display = "none";
// }




document.addEventListener('DOMContentLoaded', async function () {
    let modal = document.getElementById('myModal');
    let link = document.getElementById("addLink");
    let addButton = document.getElementById("submitBtn");
    let contactList = document.getElementById('contactList');
    let myForm = document.getElementById('myForm');
    await loadContacts();

    link.onclick = function () {
        modal.style.display = "block";
        addButton.innerHTML = "Add";
    }
    addButton.onclick = function () {
        modal.style.display = "none";
    }
    modal.onclick = function (event) {
        event.stopPropagation();
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    myForm.addEventListener('submit', async function (event) {
        try {
            event.preventDefault();
            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            let mobile = document.getElementById('mobile').value;
            if (!validateMobile()) {
                modal.style.display = "block";
                document.getElementById('mobile').value = '';
                return;
            }
            let landline = document.getElementById('landline').value;
            let website = document.getElementById('website').value;
            let address = document.getElementById('address').value;
            const formId = document.getElementById('id').value;
            let id = Math.random().toString(16).slice(2);
            let contactsArray = JSON.parse(sessionStorage.getItem("contacts")) || [];
            let updateFlag = false;
            let updateIndex;

            for (let i in contactsArray) {
                if (formId === contactsArray[i].id) {
                    contactsArray[i].id = formId;
                    contactsArray[i].name = name;
                    contactsArray[i].email = email;
                    contactsArray[i].mobile = mobile;
                    contactsArray[i].landline = landline;
                    contactsArray[i].website = website;
                    contactsArray[i].address = address;
                    updateFlag = true
                    updateIndex = i;
                }
            }
            if (!updateFlag) {
                let contact = {
                    name: name,
                    email: email,
                    mobile: mobile,
                    landline: landline,
                    website: website,
                    address: address,
                    id: id
                };
                contactsArray.push(contact);

                let contactItem = document.createElement('div');
                contactItem.innerHTML = `
                         <div id="${id}" class="list">
                            <span id="leters"> ${name}</span>
                             <p> ${email}</p>
                                <p id="para"> ${mobile}</p>
                         </div>
                      `;
                contactItem.onclick = async function () {
                    await displayIndividualDetails(contact);
                }

                contactList.appendChild(contactItem);
                location.reload()
                await displayIndividualDetails(contact);
                alert('Contact details added successfully!');
            }
            else {
                location.reload()
                alert('Contact details updated successfully!');
                await displayIndividualDetails(contactsArray[updateIndex]);
            }
            sessionStorage.setItem("contacts", JSON.stringify(contactsArray));
            myForm.reset();
            modal.style.display = "none";
        } catch (err) {
            modal.style.display = "block";
        }
    });

    editContact = async (id) => {
        
        let contactsArray = JSON.parse(sessionStorage.getItem('contacts')) || [];

        for (let contact of contactsArray) {
            if (contact.id === id) {
                addButton.value = "Update";
                document.getElementById('name').value = contact.name;
                document.getElementById('email').value = contact.email;
                document.getElementById('mobile').value = contact.mobile;
                document.getElementById('landline').value = contact.landline;
                document.getElementById('website').value = contact.website;
                document.getElementById('address').value = contact.address;
                document.getElementById('id').value = contact.id;

                let modal = document.getElementById('myModal');
                modal.showModal();
                break;
            }
        }
    }
    clearContactById = async (id) => {
        let contactsArray = JSON.parse(sessionStorage.getItem('contacts')) || [];
        const filteredContactsArray = contactsArray.filter((list) => list.id !== id);
        sessionStorage.setItem("contacts", JSON.stringify(filteredContactsArray));
    }
    deleteContact = async (id) => {
        let contactsArray = JSON.parse(sessionStorage.getItem('contacts')) || [];
        const filteredContactsArray = contactsArray.filter((list) => list.id !== id);
        sessionStorage.setItem("contacts", JSON.stringify(filteredContactsArray));
        if (contactsArray && filteredContactsArray && (contactsArray.length !== filteredContactsArray.length)) {
            alert('Contact deleted successfully!');
        }
        location.reload();
    }
    
    async function displayIndividualDetails(contact) {
        if (contact) {
            let fullDetails = document.getElementById("fullDetails");
            fullDetails.innerHTML = "";
            var contactItem = document.createElement('div');
            contactItem.innerHTML = `
                     <div class="showfulldetails">
                         <div>
                         <h1 id="display-name"> ${contact.name}</h1>
                         <p> Email: ${contact.email}</p>
                         <p id="display-mobile"> Mobile: ${contact.mobile}</p>
                         <p id="display-landline"> Landline: ${contact.landline}</P>
                         <p id="display-website"> Website: ${contact.website}</P>
                         <p id="display-address"> Address: ${contact.address}</P>
                         </div>
                         <div class="editdeletecontainer">
                         <div class="editIcon" onclick="editContact('${contact.id}')">
                             <img  class="harshaa" src="./assets/Edit-icon.png"  />
                             <span id="edit1">EDIT</span>
                         </div>
                         <div class="editIcon" onclick="deleteContact('${contact.id}')">
                         <img  class="delete" src="./assets/delete1.png"/>
                         <span id="edit2">Delete</span>
                     </div>
                         </div>
                     </div>
                         `;
            fullDetails.appendChild(contactItem);
        }
    }
    async function loadContacts() {
        let contactsArray = JSON.parse(sessionStorage.getItem("contacts")) || [];
        for (let contact of contactsArray) {
            let contactItem = document.createElement('div');
            contactItem.innerHTML = `
        <div id="id${contact.id}" class="list">
        <span id="leters"> ${contact.name}</span>
        <p> ${contact.email}</p>
        <p id="para"> ${contact.mobile}</p>
        </div>
        `;
            contactItem.onclick = function () {
                displayIndividualDetails(contact);

            }
            contactList.appendChild(contactItem);
        }
        if (contactsArray) {
            await displayIndividualDetails(contactsArray[0]);
        }
    }
});

function validateMobile() {
    let mobile = document.getElementById('mobile').value;
    let mobilePattern = /^\d{10}$/; 
    let errorElement = document.getElementById('mobileError');

    if (!mobile.match(mobilePattern)) {
        document.getElementById('mobile').style.border = "1px solid red";
        document.getElementById('mobile').placeholder = "Enter valid 10 digit mobile number";

        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = 'mobileError';
            errorElement.style.color = 'red';
            errorElement.textContent = 'Please enter a valid 10 digit mobile number';
            document.getElementById('myForm').appendChild(errorElement);
        }

        return false;
    } else {
        document.getElementById('mobile').style.border = "1px solid #000";
        if (errorElement) {
            errorElement.remove();
        }
        return true;
    }
}










