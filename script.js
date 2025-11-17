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

const fetchPostsBtn = document.querySelector(".btn");
const postList = document.querySelector(".posts");

fetchPostsBtn.addEventListener("click", async () => {
  try {
    const posts = await fetchPosts();
    renderPosts(posts);
  } catch (error) {
    console.log(error);
  }
});
const fetchUsers = async () => {
 try {
   const response = await fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=dCkG1wKu6R5quyoXGoZgyyMJHge0r4FS&size=20&page=1");
   const users = await response.json();
   users._embedded.events.forEach(element => {
    console.log(element);
    
   });
 } catch (error) {
   console.log(error.message);
 }
};

fetchUsers();



