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