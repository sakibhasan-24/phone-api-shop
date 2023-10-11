/* 

URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

Example: https://openapi.programming-hero.com/api/phones?search=iphone

Phone detail url:
URL Format: https://openapi.programming-hero.com/api/phone/${id}

Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089

*/

function loadData(dataName) {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${dataName}`)
    .then((res) => res.json())
    .then((data) => getphones(data));
}
// initial call with iphone
loadData("iphone");
const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const showAllBtn = document.getElementById("show-all-btn");
function getphones(phones) {
  let phoneList = phones.data;
  if (phoneList.length > 9) {
    phoneList = phoneList.slice(0, 9);
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
    return phoneList;
  }

  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  phoneList.forEach((phone) => {
    const phoneContainer = document.createElement("div");
    phoneContainer.innerHTML = `<div class="my-2 border border-white  h-[600px] rounded-lg shadow-xl cursor-pointer">
    <div class="bg-blue-100">
      <img
        class="w-3/4 p-2 mx-auto"
        src="${phone.image}"
        alt="img"
      />
    </div>
    <div class="my-3 text-center space-y-4 px-3 py-2">
      <h1 class="text-4xl">${phone.phone_name}</h1>
      <p>
        There are many variations of passages of available, but the
        majority have suffered
      </p>
      <p>$699</p>
      <button
      onClick="showDetails('${phone.slug}')" 
        id="details-btn"
        class="bg-blue-400 text-white px-4 py-2 rounded-lg outline-none font-bold"
      >
        Show Details
      </button>
    </div>`;
    phonesContainer.appendChild(phoneContainer);
  });
  loadingSpinner(false);
}

searchBtn.addEventListener("click", function () {
  const searchText = searchField.value;
  searchField.value = "";
  //   document.getElementById("loding").classList.remove("hidden");
  if (searchText.length <= 0) {
    alert("no data");

    return;
  }
  loadingSpinner(true);
  loadData(searchText);
});
function loadingSpinner(isLoading) {
  const loading = document.getElementById("loading");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
}

function showDetails(id) {
  fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((data) => displaySinglePhone(data.data));
}

function displaySinglePhone(phone) {
  console.log(phone);
  const modal = document.getElementById("modal");
  const mainPart = document.getElementById("main");
  modal.textContent = "";
  modal.classList.remove("hidden");
  mainPart.classList.add("hidden");
  const div = document.createElement("div");

  div.innerHTML = `
  <div id="w-1/2   px-3">
          <img
            src="${phone.image}"
            class="w-[300px] mx-auto p-4 rounded-md"
            alt=""
          />
          <div class=" px-4 py-3">
          <h1 class="text-2xl text-center my-4">brand: ${phone.brand}</h1>
          <h1>Name: ${phone.name}</h1>
          <p>manufacuturer: ${phone.mainFeatures.storage} ${phone.mainFeatures.displaySize}</p>
          <h4>others: ${phone.others.WLAN}</h4>
          
          <p>sensor</p>
          </div>
        </div>
  `;
  modal.appendChild(div);
}

function closeModal() {
  const modal = document.getElementById("modal");
  const mainPart = document.getElementById("main");
  modal.textContent = "";
  modal.classList.add("hidden");
  mainPart.classList.remove("hidden");
}
