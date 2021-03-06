const loadPhones = async () =>{
    // get search vlaue
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const searchTextValue = searchText.toLowerCase();
    displaySpinner('block');
    searchField.value ='';
    // get phone API
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchTextValue}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
    
}
// add spinner
const displaySpinner = (displayStyle) =>{
    document.getElementById('spinner').style.display = displayStyle;
}
// show display phones
const displayPhones = (phonesData) =>{
    if(phonesData.length == 0){
        document.getElementById('error-message').style.display ='block';
    }
    else{
        document.getElementById('error-message').style.display ='none';
    }

    if(phonesData.length = 20){
        const phoneDetailsResult = document.getElementById('phone-details');
        phoneDetailsResult.textContent ='';
        const phones = document.getElementById('phones');
        phones.textContent ='';
        phonesData.forEach(phone =>{
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card custom-card-style border-0 shadow-lg">
                <img src="${phone.image}" class="custom-img-style" alt="...">
                <div class="card-body">
                    <h5 class="card-title custom-text-style">${phone.phone_name}</h5>
                    <p class="card-text">Brand: ${phone.brand}</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn custom-color fs-5 px-3 py-1" type="button">Details</button>
                </div>
            </div>
            `;
            phones.appendChild(div);
        });
        displaySpinner('none');
    }
}
// load phone details
const loadPhoneDetails = async (phoneId) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
// display phone details
const displayPhoneDetails = (phoneIdData) =>{
    console.log(phoneIdData);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent ='';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div id="phone-details-card" class="card custom-card-details-style border-0 p-3 shadow-lg mx-auto">
        <img src="${phoneIdData.image}" class="card-img-top p-3" alt="">
        <div class="card-body">
            <p class="custom-text-style card-text fs-2">${phoneIdData.name}</p>
            <h3 class="card-title fs-5"><span class="custom-text-style">Brand: ${phoneIdData.brand}</span></h3>
            <p class="card-text fs-5">Release Date: ${phoneIdData.releaseDate ? phoneIdData.releaseDate: 'Release date not found'}</p>
            <h3 class="custom-text-style card-title mb-3">Main Features:</h3>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">Storage:</span>${phoneIdData.mainFeatures.storage}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">Display-Size:</span>${phoneIdData.mainFeatures.displaySize}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">Chipset:</span>${phoneIdData.mainFeatures.chipSet}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">Memory:</span>${phoneIdData.mainFeatures.memory}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">Sensors:</span>${phoneIdData.mainFeatures.sensors}</p>
            <h3 class="custom-text-style card-title mb-3">Others:</h3>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">Blutooth:</span>${phoneIdData?.others?.Bluetooth ? phoneIdData.others.Bluetooth:'no result found'}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">GPS:</span>${phoneIdData?.others?.GPS ? phoneIdData.others.GPS:'no result found'}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">NFC:</span>${phoneIdData?.others?.NFC ? phoneIdData.others.NFC:'no result found'}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">Radio:</span>${phoneIdData?.others?.Radio ? phoneIdData.others.Radio:'no result found'}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">USB:</span>${phoneIdData?.others?.USB ? phoneIdData.others.USB:'no reslut found'}</p>
            <p class="pe-2 fs-normal"><span class="fs-6 pe-2 fw-bold">WLAN:</span>${phoneIdData?.others?.WLAN ? phoneIdData.others.WLAN:'no result found'}</p>
        </div>
    </div>
    `;
    phoneDetails.appendChild(div);
}