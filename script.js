const card = document.querySelectorAll(".card")
const overlay = document.querySelector(".overlay")
const modalCLose = document.querySelector(".modal-close")


modalCLose.addEventListener("click", function(){
    overlay.classList.remove("modal-open")
})

card.forEach(function(element, index){
    element.addEventListener("click", function(){
        overlay.classList.add("modal-open")
    })
})


// const postList = document.querySelector(".posts");

// fetchPostsBtn.addEventListener("click", async () => {
//   try {
//     const posts = await fetchPosts();
//     renderPosts(posts);
//   } catch (error) {
//     console.log(error);
//   }
// });
let currentPage = 1
const cards = document.querySelector('.cards')
const fetchUsers = async () => {
 try {
   const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=dCkG1wKu6R5quyoXGoZgyyMJHge0r4FS&size=16&page=${currentPage}`);
   const users = await response.json();
   users._embedded.events.forEach(element => {
    console.log(element);
    cards.innerHTML+=`
      <div class="card"> 
      <img src="${element.images[0].url}" alt="" class="card-poster">
      <h3 class="card-title">${element.name}</h3>
      <p class="card-date">${element.dates.start.dateTime}</p>
      <p class="card-location">
        ${element._embedded.venues[0].name}, 
        ${element._embedded.venues[0].city.name}
      </p>
    </div>
    `
   });
 } catch (error) {
   console.log(error.message);
 }
};

fetchUsers();




