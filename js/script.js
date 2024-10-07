////////////// Declaring the variables /////////////////////////////
const searchBtn = document.querySelector(".search_btn");
const content = document.querySelector(".content");

const row__container = document.createElement("div");
row__container.setAttribute("class", "row justify-content-center  mb-4");

const col = document.createElement("div");
col.setAttribute("class", " col-12 col-sm-12 col-lg-8 pt-lg-5 pb-lg-5 pt-md-5 p-xl-0");

const content__display = document.createElement("div");
content__display.setAttribute("class", "content__display");

const pop_up = document.querySelector(".pop_up");
const close_icon = document.querySelector(".close_icon");
const body = document.querySelector(".body");
const input = document.querySelector(".input");
const pop_title = document.querySelector(".pop_title");
//////////////////////////////////////////////////////////////////

//////// Event to close pop up //////////////////////////////////
close_icon.addEventListener("click", () => {
    pop_up.classList.add("d-none");
    body.classList.remove("pop_up_bg");
    input.removeAttribute('disabled');
})
//////////////////////////////////////////////////////////////////

///////////Using fetch() to get the response /////////////////////
async function fetchData() {
    try {
        const url = "https://data.covid19india.org/v4/min/data.min.json";
        const response = await fetch(url);
        const jsonData = await response.json();
        displayData(jsonData); /////// function to display the data
    }
    catch { ///// if error found then pop get displayed
        pop_up.classList.remove("d-none");
        body.classList.add("pop_up_bg");
        pop_title.textContent = "Please try again later 🙏";
        input.setAttribute('disabled', 'disabled');
    }
}
////////////////////////////////////////////////////////////

fetchData(); /// calling the async function to get response

///////////// function to display data on screen using the response ////////////
function displayData(jsonData) {
    searchBtn.addEventListener("click", () => { // event to happen when searchBtn click

        try {
            const userInput = document.querySelector(".user__input");
            const districtName = toTitleCase(userInput.value.trim());
            const data = jsonData.TN.districts[districtName];
            userInput.value = "";
            content__display.innerHTML = "";

            const card = document.createElement("div");
            card.setAttribute("class", "card mt-5 shadow borderless-card border_none");

            var cardHeader = document.createElement("div");
            cardHeader.setAttribute("class", "card-header fs-3 shadow border_none header_add-on");
            cardHeader.textContent = districtName;

            const cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");

            const p1 = document.createElement("p");
            p1.setAttribute("class", "fs-5")
            p1.textContent = `COVID-19 Confirmed: ${data.total.confirmed}`;

            const p2 = document.createElement("p");
            p2.setAttribute("class", "fs-5")
            p2.textContent = `People recovered: ${data.total.recovered}`;

            const p3 = document.createElement("p");
            p3.setAttribute("class", "fs-5")
            p3.textContent = `No of people vaccinated 1: ${data.total.vaccinated1}`;

            const p4 = document.createElement("p");
            p4.setAttribute("class", "fs-5")
            p4.textContent = `No of people vaccinated 2: ${data.total.vaccinated2}`;

            cardBody.append(p1, p2, p3, p4);
            card.append(cardHeader, cardBody);
            content.append(row__container);
            row__container.append(col);
            col.append(content__display);
            content__display.append(card);
        }
        catch (err) {  // if error found pop up get displayed
            pop_up.classList.remove("d-none");
            body.classList.add("pop_up_bg");
            input.setAttribute('disabled', 'disabled');
        }
    })

}
//////////////////////////////////////////////////////////////

///////////////// function to convert the user data to Title Case //////////////
function toTitleCase(userInput) {
    const returnArray = [];
    for (let i = 0; i < userInput.length; i++) {
        if (i == 0) {
            returnArray.push(userInput[i].toUpperCase());
        }
        else {
            returnArray.push(userInput[i].toLowerCase());
        }
    }
    return returnArray.join("");
}
///////////////////////////////////////////////////////////////////////////////////