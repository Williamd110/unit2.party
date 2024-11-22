const COHORT = "2410-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    events: [],
  };


function renderEvents() {
    const eventsList = document.getElementById("events");
    eventsList.innerHTML = '';
 console.log(state.events)
    if (state.events.length === 0) {
        const noEventsMessage = document.createElement("li");
        noEventsMessage.textContent = "no Events";
        eventsList.appendChild(noEventsMessage);
    }
    state.events.forEach((event) => {
        console.log("Event:", event);
        const eventItem = document.createElement("li");
        eventItem.innerHTML = `
        <p> Event Name: ${event.name} : </p>
        <p> Date: ${event.date} : </p>
        <p> Location: ${event.location}: </p>
        <p> Description: ${event.description} </p>
         <button class = "deleteButton" data-id="${event.id}">Delete Button</button>
         `;
//   const form = document.getElementById("addEvents");
// form.addEventListener("submit", )
        eventsList.appendChild(eventItem);
        const deleteButton = eventItem.querySelector(".deleteButton");
        deleteButton.addEventListener("click", () => {
            deleteEvent(event.id);
            });


    });
}
const deleteButton = document.querySelector(".deleteButton");
console.log(deleteButton)

async function deleteEvent(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, 
            {method: "DELETE"}
        )
        fetchEvents()
    } 
    catch (error) 
    {console.error(error);}
    
}




async function fetchEvents() {
    try {
        const response = await fetch(API_URL);
        const events = await response.json();
        console.log("API Response:", events);

        state.events = events.data; 
        renderEvents(); 
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

  fetchEvents()
 
//   here is the beginning of trying to submit a new event to API:
  const addEventsForm = document.getElementById("addEvents");

  addEventsForm.addEventListener("submit", async function(event) {
    event.preventDefault(); 
  
    // Get the form data
    const name = addEventsForm.querySelector('[name="name"]').value;
    const description = addEventsForm.querySelector('[name="description"]').value;
    const date = addEventsForm.querySelector('[name="date"]').value;
    const location = addEventsForm.querySelector('[name="location"]').value;
  
    const dateIso = new Date(date).toISOString();
    // redudant with 47.****
    const newEvent = {
      name,
      description,
      date: dateIso,
      location,
    };
  console.log(newEvent)
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      const createdEvent = await response.json();
         
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
  
      state.events.push(createdEvent); 
      renderEvents();
  
      addEventsForm.reset(); 
    } catch (error) {
      console.error("Error adding event:", error); 
    }
    fetchEvents()
  });


//   const deleteButton = document.createElement("button");
//   deleteButton.textContent = "Relete Recipe"
//   eventsList.appendChild(deleteButton);

//   deleteButton.addEventListener("click", () => deleteRecipe(recipe.id));
  
//   const form = document.getElementById("addEvents");
// form.addEventListener("submit", handleFormSubmit);
