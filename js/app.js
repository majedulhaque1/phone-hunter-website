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
    if(phonesData.length = 20){
        const phoneDetailsResult = document.getElementById('phone-details');
        phoneDetailsResult.textContent ='';
        const phones = document.getElementById('phones');
        phones.textContent ='';
        phonesData.forEach(phone =>{
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card border-0 shadow-lg p-2">
                <img src="${phone.image}" class="card-img-top p-3" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary fs-5 px-3 py-1" type="button">Details</button>
                </div>
            </div>
            `;
            phones.appendChild(div);
        })
    }
    
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
    <div class="card border-0 p-3 shadow-lg w-50 mx-auto">
        <img src="${phoneIdData.image}" class="card-img-top p-3" alt="">
        <div class="card-body">
            <h3 class="card-title">${phoneIdData.brand}</h3>
            <p class="card-text fs-5">${phoneIdData.name}</p>
            <p class="card-text fs-5">${phoneIdData.releaseDate ? phoneIdData.releaseDate: 'Release date not found'}</p>
            <h3 class="card-title mb-3">Main Features:</h3>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">Storage:</span>${phoneIdData.mainFeatures.storage}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">Display-Size:</span>${phoneIdData.mainFeatures.displaySize}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">Chipset:</span>${phoneIdData.mainFeatures.chipSet}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">Memory:</span>${phoneIdData.mainFeatures.memory}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">Bluetooth:</span>${phoneIdData.others.Bluetooth}</p>
            <h3 class="card-title mb-3">Others:</h3>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">GPS:</span>${phoneIdData.others.GPS}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">NFC:</span>${phoneIdData.others.NFC}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">Radio:</span>${phoneIdData.others.Radio}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">USB:</span>${phoneIdData.others.USB}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">WLAN:</span>${phoneIdData.others.WLAN}</p>
        </div>
    </div>
    `;
    phoneDetails.appendChild(div);
}