const loadPhones = async () =>{
    // get search vlaue
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const searchTextValue = searchText.toLowerCase();
    searchField.value ='';
    // get phone API
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchTextValue}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = (phonesData) =>{
    const phoneDetailsResult = document.getElementById('phone-details');
    phoneDetailsResult.textContent ='';
    const phones = document.getElementById('phones');
    phones.textContent ='';
    phonesData.forEach(phone =>{
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary px-5 py-2" type="button">Details</button>
            </div>
        </div>
        `;
        phones.appendChild(div);
    })
}

const loadPhoneDetails = async (phoneId) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (phoneIdData) =>{
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent ='';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card w-50 mx-auto">
        <img src="${phoneIdData.image}" class="card-img-top p-3" alt="">
        <div class="card-body">
            <h3 class="card-title">${phoneIdData.brand}</h3>
            <p class="card-text fs-5">${phoneIdData.name}</p>
            <p class="card-text fs-5">${phoneIdData.releaseDate ? phoneIdData.releaseDate: 'Release date not found'}</p>
            <h3 class="card-title">Main Features</h3>
            <p><span class="fs-5">Storage:</span></p>
        </div>
    </div>
    `;
    phoneDetails.appendChild(div);
}