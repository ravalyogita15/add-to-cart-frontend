
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}



let productData = []
function Fetchdata() {
  fetch("https://add-to-cart-backend-3.onrender.com/pitches")
    .then((res) => res.json())
    .then((data) => {
      CardList(data)
      productData = data
    })
    .catch((err) => console.log(err))
}
Fetchdata()
function CardList(data) {
  const store = data.map((el) => SingleCarad(el.id, el.image, el.title, el.price, el.founder, el.category))
  //    console.log(store)
  mainSection.innerHTML = store.join("")
}

function SingleCarad(id, image, title, price, founder, category) {

  let Card = `
         <a href="d.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&price=${encodeURIComponent(price)}">
            <div class="card"  data-id=${id}>
          <div class="card-img">
            <img src=${image} alt="pitch">
          </div>
          <div class="card-body">
            <h4 class="card-title">${title}</h4>
            <p class="card-founder">  ${founder}</p>
            <p class="card-category">${category}</p>
            <p class="card-price">${price}</p>
            <a href="#" class="card-link" data-id="${id}">Edit</a>
            <button class="card-button" data-id="${id}">Delete</button>
            </div>
          </div>
          </a>
        `
  return Card;
}

// add...

pitchCreateBtn.addEventListener("click", () => {
  let prodouct = {
    title: pitchTitleInput.value,
    price: pitchPriceInput.value,
    category: pitchCategoryInput.value,
    image: pitchImageInput.value,
    founder: pitchfounderInput.value,
  }
  // console.log(prodouct)
  fetch("https://add-to-cart-backend-3.onrender.com/pitches", {
    method: "POST",
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(prodouct)
  }).then((res) => res.json())
    .then((data) => {
      console.log(data)
      alert("product added")

    }).catch((err) => {
      console.log(err)
      alert("something went wrong")

    })

})
// delet.....

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-button")) {
    deleteproduct(e.target.dataset.id);
  }
})
function deleteproduct(id) {
  fetch(`https://add-to-cart-backend-3.onrender.com/pitches/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Deleted..")
      console.log(data)
    })
    .catch((err) => console.log(err))
}

filterFood.addEventListener("click", () => {
  let filterFood = productData.filter((el) => el.category == "Food")
  console.log(filterFood)
  CardList(filterFood)
})

filterElectronics.addEventListener("click", () => {
  let filterElectronics = productData.filter((el) => el.category == "Electronics")
  console.log(filterElectronics)
  CardList(filterElectronics)
})

filterPersonalCare.addEventListener("click", () => {
  let filterPersonalCare = productData.filter((el) => el.category == "Personal Care")
  console.log(filterPersonalCare)
  CardList(filterPersonalCare)
})


// SORTING PART


sortAtoZBtn.addEventListener("click", () => {
  const sortAtoZBtn = productData.sort((a, b) => a.price - b.price)
  CardList(sortAtoZBtn)
})

sortZtoABtn.addEventListener("click", () => {
  const sortZtoABtn = productData.sort((a, b) => b.price - a.price)
  CardList(sortZtoABtn)
})


//Update

document.addEventListener("click", (e) => {
  // e.preventDefault()                                                                                                       
  if (e.target.classList.contains("card-link")) 
  {
      let id = (e.target.dataset.id)
      Populatedata(id)
  }
})

function Populatedata(id)
{
  fetch(`https://add-to-cart-backend-3.onrender.com/pitches/${id}`)
  .then((res)=>res.json())
  .then((data)=>{
      console.log(data)

      updatePitchIdInput.value=data.id,
      updatePitchTitleInput.value=data.title,
      updatePitchImageInput.value=data.image,
      updatePitchfounderInput.value=data.founder,
      updatePitchCategoryInput.value=data.category,
      updatePitchPriceInput.value=data.price
      
  })
  .catch((err)=>console.log(err))
}

updatePitchBtn.addEventListener("click",()=>{
  console.log(updatePitchPriceInput.value)

  let UpdateData={
      title:updatePitchTitleInput.value,
      image:updatePitchImageInput.value,
      founder:updatePitchfounderInput.value,
      category:updatePitchCategoryInput.value,
      price:updatePitchPriceInput.value,
      id:updatePitchIdInput.value
  }

  console.log(UpdateData)

  fetch(`https://add-to-cart-backend-3.onrender.com/pitches/${UpdateData.id}`,{
      method:"PUT",
      headers:{
          "Content-Type": "application/json",
      },
      body:JSON.stringify(UpdateData)
  })
  .then((res)=>res.json())
  .then((data)=>{
      console.log(data)
      alert("Data Updated...")
  })
  .catch((err)=>console.log(err))
})

// Update price

document.addEventListener("click", (e) => {
  e.preventDefault()
  if (e.target.classList.contains("card-link")) 
  {
      let id = (e.target.dataset.id)
      UpdatePrice(id)
  }
})

function UpdatePrice(id)
{
  fetch(`https://add-to-cart-backend-3.onrender.com/pitches/${id}`)
  .then((res)=>res.json())
  .then((data)=>{
      console.log(data)

      updatePricePitchId.value=data.id,
      updatePricePitchPrice.value=data.price
      updatePitchTitleInput.value=data.title,
      updatePitchImageInput.value=data.image,
      updatePitchfounderInput.value=data.founder,
      updatePitchCategoryInput.value=data.category
      
  })
  .catch((err)=>console.log(err))
}

updatePricePitchPriceButton.addEventListener("click",()=>{

  let UpdatePriceData={
      price:updatePricePitchPrice.value,
      id:updatePricePitchId.value,
      title:updatePitchTitleInput.value,
      image:updatePitchImageInput.value,
      founder:updatePitchfounderInput.value,
      category:updatePitchCategoryInput.value,
  }

  console.log(UpdatePriceData)

  fetch(`https://add-to-cart-backend-3.onrender.com/pitches/${UpdatePriceData.id}`,{
      method:"PUT",
      headers:{
          "Content-Type": "application/json",
      },
      body:JSON.stringify(UpdatePriceData)
  })
  .then((res)=>res.json())
  .then((data)=>{
      console.log(data)
      alert("Price Data Updated...")
  })
  .catch((err)=>console.log(err))
})
