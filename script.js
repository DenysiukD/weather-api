const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".modal-close");
const cards = document.querySelector(".cards");

const modalPoster = document.querySelector(".modal-poster");
const modalTitle = document.querySelector(".modal-box-data-title");
const modalDesc = document.querySelector(".modal-box-data-desc");

let currentPage = 0;
let genreQuery = "";



modalClose.addEventListener("click", () => {
    overlay.classList.remove("modal-open");
});


async function fetchEvents() {
    try {
        const res = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?apikey=dCkG1wKu6R5quyoXGoZgyyMJHge0r4FS&size=12&page=${currentPage}&keyword=${genreQuery}`
        );

        const data = await res.json();
        renderCards(data._embedded?.events || []);
    } catch (err) {
        console.log(err);
    }
}

function safeFormatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date) ? "N/A" : date.toISOString().split("T")[0];
}


function renderCards(events) {
    cards.innerHTML = "";

    events.forEach(e => {
        const date = safeFormatDate(e?.dates?.start?.dateTime);

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${e.images[0].url}" class="card-poster">
            <h3 class="card-title">${e.name}</h3>
            <p class="card-date">${date}</p>
            <p class="card-location">
              ${e._embedded.venues[0].name},
              ${e._embedded.venues[0].city.name}
            </p>
        `;

        card.dataset.img = e.images[0].url;
        card.dataset.title = e.name;
        card.dataset.desc = e.info || 

        card.addEventListener("click", () => openModal(card));

        cards.appendChild(card);
    });
}


function openModal(card) {
    modalPoster.src = card.dataset.img;
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;

    overlay.classList.add("modal-open");
}


fetchEvents();
