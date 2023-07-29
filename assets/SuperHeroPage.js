const suggestionBox = document.getElementsByClassName("autocomplete-box")[0];
const suggestionBox2 = document.getElementsByClassName("autocomplete-box2")[0];
const template = document.querySelector(".template ul li");
const template2 = document.querySelector(".template2 ul li");
const UL = document.querySelector(".needpopulate ul");

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

class comic{
    constructor(name,resourceURI){
        this.name=name,
        this.resourceURI=resourceURI
    }
}

var queryString = new Array();
        window.onload = function () {
            if (queryString.length == 0) {
                if (window.location.search.split('?').length > 1) {
                    var params = window.location.search.split('?')[1].split('&');
                    for (var i = 0; i < params.length; i++) {
                        var key = params[i].split('=')[0];
                        var value = decodeURIComponent(params[i].split('=')[1]);
                        queryString[key] = value;
                    }
                }
            }
            if (queryString["id1"] != null) {
                searchandpaste(queryString["id1"]);
            }
           
        };

        async function searchandpaste(name){
            try{
                const half="https://gateway.marvel.com/v1/public/characters?name=";
                const second="&ts=1&apikey=25bc25fa856241618e736a13eecea19c&hash=a2f15b5149ba0539a0b5b6e71d79db78"
                const url1=half+name+second;
                const response = await fetch(url1);
                let data=await response.json();
                data=data.data;
                suggestionBox.querySelectorAll("li").forEach((li) => {
                    li.remove();
                });
                suggestionBox2.querySelectorAll("li").forEach((li) => {
                    li.remove();
                });
                const superheroList = data.results;
                number=1;
                superheroes=superheroList.map((Superhero)=>{
                    const suggestion = template.cloneNode(true);
                   
                    const name = suggestion.querySelector("div h1");
                   
                            const image = suggestion.querySelector("div img");
                            //Setting the name and image of the superhero
                                name.textContent = Superhero.name;
                                image.src = Superhero.thumbnail.path+"/portrait_xlarge.jpg";
                                suggestion.setAttribute("data-id", Superhero.id);
                                suggestion.setAttribute(
                                    "data-image-url",
                                    Superhero.thumbnail.path+"/portrait_xlarge.jpg"
                                );
                                const listofcomic = Superhero.comics.items;
                                  if (!Array.isArray(listofcomic)) {
                                     // Check if listofcomic is an array
                                     console.error("The 'comics' property should be an array.");
                                  return null;
                                 }       
                                
                                const comicslist = listofcomic.map((comic) => { // Use map instead of forEach
                                    const suggestion2 = template2.cloneNode(true);
                                    const name2 = suggestion2.querySelector("h3");
                                    name2.textContent=comic.name;
                                    // ... Code to set name and resourceURI of the comic ...
                                    return suggestion2;
                                });
                                suggestionBox2.append(...comicslist);
        
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
                console.log(e);
            }
        }

    