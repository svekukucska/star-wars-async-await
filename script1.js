(getJson = async () => {
    try {
        let url = 'https://swapi.co/api/films/';
        let moviesJson = await fetch(url);
        let moviesObject = await moviesJson.json();
        let path = window.location.pathname;
        let page = path.split("/").pop();
        let episodesList = [2, 1, 3, 0, 5, 4, 6];
        for(let i = 1; i <= episodesList.length; i++) {
            //checks if we are on the homepage/index.html page or not
            if (page == "index.html") {
                let movieTitle = document.querySelector('#movies-list'); 
                movieTitle.innerHTML += `<a href="/episode${i}.html">${i }. ${moviesObject.results[episodesList[i - 1]].title}</a><br/>`;
            } else {
                let container = document.querySelector('#container');
                if(container.className == `container${i}`){
                    container.innerHTML +=
                        `<div class="subtitle">Star Wars: ${moviesObject.results[episodesList[i - 1]].title}</div>
                        <div class="items"><strong>Title:</strong> "${moviesObject.results[episodesList[i - 1]].title}"</div>
                        <div class="items"><strong>Release Date:</strong> ${moviesObject.results[episodesList[i - 1]].release_date}</div>
                        <div class="items"><strong>Opening Crawl:</strong> ${moviesObject.results[episodesList[i - 1]].opening_crawl}</div>
                        <div class="items"><strong>Characters: </strong></div>`;
                    let charactersList = moviesObject.results[i - 1].characters;
                    //fetches the characters for each film
                    charactersList.map(async (urlCharacter) => { 
                        try {
                            const charListJson = await fetch(urlCharacter);
                            const charListObject = await charListJson.json();
                            container.innerHTML += `<span class="title-list"> ${charListObject.name}; </span>`; 
                        } catch(err1) {
                            console.error("CATCH (characters): " + err1);
                            // >>> UN-COMMENT WHEN DONE
                            alert("CATCH (characters): " + err1);
                        }
                    });
                }
            };  
        };
    } catch(err2) {
        console.error("CATCH (movies): " + err2);
        alert("There is a great disturbance in the Force! (ERROR: " + err2);
    } finally {
        document.querySelector('#spinner').style.display = 'none';
    }
})();
