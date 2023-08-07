const suggestionBox = document.getElementsByClassName("autocomplete-box")[0];
let superheroes = [];
const template = document.querySelector(".template ul li");
const UL = document.querySelector(".needpopulate ul");
const textbox=document.querySelector(".textbox");
class Superhero{
    constructor(id,name,description,modified,resourceURI,urls,thumbnail,comics,stories,events,series) {
    this.id=id ,
    this.name=name,
    this.description=description,
    this.modified=modified,
    this.resourceURI =resourceURI,
    this.urls=urls ,
    this.thumbnail=thumbnail,
    this.comics =comics,
    this.stories =stories,
    this.events =events,
    this.series =series
    }
}
let isLoaded=false;
loader=document.getElementById("loader_el");
if(!isLoaded){

	 console.log(loader)
	 loader.classList.remove("d-none")
	 loader.classList.add("d-block")
	 console.log(loader)

	console.log(isLoaded)
	

}
async function checkurl(){

    try {
		const url = "https://superhero-hunter-app-mini-server.onrender.com";
		const response = await fetch(url);
		if (response.ok) console.log("API Running Successfully");
		if (!response.ok) console.log("API Not Running");
	} catch (error) {
		console.log(error);
	}
}

const fetchallsuperheros=async()=>{
    try{
        const value=textbox.value;
        const url=`https://gateway.marvel.com/v1/public/characters?limit=100&ts=1&apikey=25bc25fa856241618e736a13eecea19c&hash=a2f15b5149ba0539a0b5b6e71d79db78`;
        const response = await fetch(url);
        let data=await response.json();
        data=data.data;
        suggestionBox.querySelectorAll("li").forEach((li) => {
            li.remove();
        });
        const superheroList = data.results;
        number=1;
        superheroes=superheroList.map((Superhero)=>{
            const suggestion = template.cloneNode(true);
            const name = suggestion.querySelector("div span");
					const image = suggestion.querySelector("div img");
					const favouriteBtn = suggestion.querySelector(".fav-btn");
					suggestion.querySelector(".btn-success").onclick=function(){
           			    var val2 = Superhero.name
            		    var url = "./SuperHeroPage.html?id1=" + encodeURIComponent(val2);
            			window.location.href = url;
					};
					suggestion.querySelector(".fav-btn").onclick=function(){
						if(null != localStorage.getItem(`${Superhero.name}`)){
							window.alert('SuperHero Already added In system');
							return;
						}else{
							localStorage.setItem(`${Superhero.name}`,'Superhero');
							window.alert('SuperHero Added in to favourite');
						}
					 };
					
					//Setting the name and image of the superhero
						name.textContent = Superhero.name;
						image.src = Superhero.thumbnail.path+"/portrait_xlarge.jpg";
						suggestion.setAttribute("data-id", Superhero.id);
						suggestion.setAttribute(
							"data-image-url",
							Superhero.thumbnail.path+"/portrait_xlarge.jpg"
						);
					
					if (
					 	name.textContent === "" ||
					 	name.textContent === null ||
					 	name.textContent === undefined
					 ) {
					 	return null;
					 }
                     console.log(this.number);
                     number++;
					//Return the superhero
					return suggestion;
				});
                if (superheroes[0] === null) {
					UL.style.visibility = "hidden";
					flag = "not found";
					return;
				}
				//Showing the suggestions in the suggestion box
				suggestionBox.append(...superheroes);
				UL.style.visibility = "visible";
				//flag = "found";
				loader.classList.remove("d-block")
				loader.classList.add("d-none")

    }catch(e){
        console.log(e);
    }
}

async function searchandpaste(){
	
    try{
        const value=textbox.value;
		console.log(value)
        const half="https://gateway.marvel.com/v1/public/characters?nameStartsWith=";
        const second="&ts=1&apikey=25bc25fa856241618e736a13eecea19c&hash=a2f15b5149ba0539a0b5b6e71d79db78"
        const url1=half+value+second;
        const response = await fetch(url1);
        let data=await response.json();
        data=data.data;
		
        suggestionBox.querySelectorAll("li").forEach((li) => {
            li.remove();
        });
        const superheroList = data.results;
        number=1;
        superheroes=superheroList.map((Superhero)=>{
            const suggestion = template.cloneNode(true);
            const name = suggestion.querySelector("div div div span");
					const image = suggestion.querySelector("div img");
					const favouriteBtn = suggestion.querySelector(".fav-btn");
					suggestion.querySelector(".btn-success").onclick=function(){
						var val2 = Superhero.name
					 var url = "./SuperHeroPage.html?id1=" + encodeURIComponent(val2);
					 window.location.href = url;
				 };
				 suggestion.querySelector(".fav-btn").onclick=function(){
					if(null != localStorage.getItem(`${Superhero.name}`)){
						window.alert('SuperHero Already added In system');
						return;
					}else{
						localStorage.setItem(`${Superhero.name}`,'Superhero');
						window.alert('SuperHero Added in to favourite');
					}
				 };
					//Setting the name and image of the superhero
					
						name.textContent = Superhero.name;
						image.src = Superhero.thumbnail.path+"/portrait_xlarge.jpg";
						suggestion.setAttribute("data-id", Superhero.id);
						suggestion.setAttribute(
							"data-image-url",
							Superhero.thumbnail.path+"/portrait_xlarge.jpg"
						);


					if (
					 	name.textContent === "" ||
					 	name.textContent === null ||
					 	name.textContent === undefined
					 ) {
					 	return null;
					 }
                     console.log(this.number);
                     number++;
					//Return the superhero
					return suggestion;
				});
                if (superheroes[0] === null) {
					UL.style.visibility = "hidden";
					flag = "not found";
					return;
				}
				//Showing the suggestions in the suggestion box
				suggestionBox.append(...superheroes);
				UL.style.visibility = "visible";
				//flag = "found";
			

    }catch(e){
		loader.classList.remove("d-block")
		loader.classList.add("d-none")
        console.log(e);
    }
}

checkurl();
fetchallsuperheros();
