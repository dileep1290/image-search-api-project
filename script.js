const accessKey = "JU0jo7s7bK85dwJR9Fde8mu92ij1hk3-TMUif-IVJDY";

const formEl = document.querySelector("form");

const inputEl = document.getElementById("search-input");

const searchResults = document.querySelector(".search-results");

const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    try{
        inputData = inputEl.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;
        console.log(results);
        if(page == 1){
            searchResults.innerHTML = "";
        }

        appending(results);
    }
    catch(error){
        console.log("Error Fetching API Data", error);
    }
    
}

function appending(data){
    data.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        imageWrapper.append(image, imageLink,);
        searchResults.append(imageWrapper);
    })
    
    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    page= 1;
    searchImages();
});

showMore.addEventListener("click", ()=>{
    searchImages();
});