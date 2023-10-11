/* 

URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

Example: https://openapi.programming-hero.com/api/phones?search=iphone

Phone detail url:
URL Format: https://openapi.programming-hero.com/api/phone/${id}

Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089

*/
fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
  .then((res) => res.json())
  .then((data) => getphones(data));

function getphones(phones) {
  const phoneList = phones.data;
  console.log(phoneList);
  const phonesContainer = document.getElementById("phones-container");
  phoneList.forEach((phone) => {
    const phoneContainer = document.createElement("div");
    phoneContainer.innerHTML = `<div class="my-2 border border-white min-h-full">
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
        id="details-btn"
        class="bg-blue-400 text-white px-4 py-2 rounded-lg outline-none font-bold"
      >
        Show Details
      </button>
    </div>`;

    console.log(phoneContainer.innerText);
    phonesContainer.appendChild(phoneContainer);
  });
}
