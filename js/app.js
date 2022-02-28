const loadPhones = async () =>{
    // get search vlaue
    const searchValue = document.getElementById('search-value');
    const searchText = searchValue.value;
    const searchTextValue = searchText.toLowerCase();

    // get phone API
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchTextValue}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = (phonesData) =>{
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
                <button class="btn btn-primary px-5 py-2" type="button">Details</button>
            </div>
        </div>
        `;
        phones.appendChild(div);
    })
}