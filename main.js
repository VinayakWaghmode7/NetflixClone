//To some constants stuff
const apikey = "7543524441a260664a97044b8e2dc621";
const apiEndpoint = "https://api.themoviedb.org/3"
const imgPath = "https://image.tmdb.org/t/p/original";

//APi fetch 
const apiPaths = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending:`${apiEndpoint}/trending/all/week?api_key=${apikey}&language=en-US`,
     searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyD1c6YVxq5XUcKcz2Ljx43X0ROdzvB18aw`
} 

function init(){
   fetchAndBuildAllSections();
   fetchTrendingMovies();
}

function fetchTrendingMovies(){
    fetchAndBuildMovieSection(apiPaths.fetchTrending,'Trending Now')
    .then(list => {
        const randomIndex= parseInt(Math.random()*list.length);
        buildBannerSection(list[randomIndex]);
    }).catch(error => {
        console.log(error);
    });
    
}

function buildBannerSection(movie){
    const bannerCont = document.getElementById('banner-section');
    bannerCont.style.backgroundImage = `url('${imgPath}${movie.backdrop_path}') ` ;

    //The below code is when you click on banner section or banner image it neviagtes to youtube tariler of that movie we nedd not to add separeate onclick event on play button because it comes in banner section.
    // bannerCont.onclick = function(){
    //     searchMovieTrailer(movie.title);
    // }
    
    
    const div=document.createElement('div');
    div.innerHTML =`
    <h2 class="banner_title">${movie.title}</h2>
    <p class="banner_info">Released on ${movie.release_date}</p>
    <p class="banner_overview">${movie.overview && movie.overview.length > 200 ? movie.overview.slice(0,200).trim()+ '...':movie.overview}</p>
    <div class="action-buttons-cont" >
    <button class="action-button" onclick="searchMovieTrailer('${movie.title}')"  ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg> &nbsp; &nbsp; play  </button>
    <button class="action-button" ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg> &nbsp;&nbsp; More Info</button>
    </div>`;
    div.className = "banner-content ";
    bannerCont.append(div);
}

//below code is when you particuraly click on the play button it nevigates to the youtube trailer of that movie title.

//<button class="action-button" onclick="searchMovieTrailer('${movie.title}')"  ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg> &nbsp; &nbsp; play  </button>




//play button code

//<button class="action-button" ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg> &nbsp; &nbsp; play  </button>


function fetchAndBuildAllSections (){
    fetch(apiPaths.fetchAllCategories)
   .then(res => res.json())
   .then(res => {
    const categories = res.genres;
    if(Array.isArray(categories)&& categories.length){
        categories.forEach(category => { 
      fetchAndBuildMovieSection(apiPaths.fetchMoviesList(category.id),category.name);
    });
    }
    //console.table(categories);
   })
   .catch(err => console.error(err));
}

 function fetchAndBuildMovieSection(fetchUrl,categoryName){
    // console.table(fetchUrl);
    console.table(fetchUrl,categoryName);
       return fetch(fetchUrl)
       .then(res => res.json())
       .then(res =>{
            const movies = res.results;
            if (Array.isArray(movies) && movies.length) {
                buildMovieSection(movies.slice(0,6), categoryName);
       }
        // console.table(res.results);
        
        return movies;
    })
    .catch (err => console.error(err)); 
      
}


function buildMovieSection(list,categoryName){
 console.log(list,categoryName);


const moviesCont = document.getElementById("movies-cont");

 const moviesListHTML= list.map(item =>
    {
    return `<img class="movie-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}" onclick = "searchMovieTrailer('${item.title}')" >`;
}).join('');

const moviesSectionHTML =`
<h2 class="movies-section-heading"> ${categoryName} <span class="explore-nudge">Explore all</span></h2>
<div class="movies-row">
 ${moviesListHTML}
</div>
`

console.log(moviesSectionHTML);

const div= document.createElement("div");
div.className= "movies-section";
div.innerHTML= moviesSectionHTML;

moviesCont.append(div);
}

// window.addEventListener('scroll', function(){
//     // header ui update
//     const header = document.getElementById('header');
//     const scrolledClass = 'scrolled';

//     if (window.scrollY > 0) {
//       header.classList.add(scrolledClass);
//     } else {
//       header.classList.remove(scrolledClass);
//     }
// });

function searchMovieTrailer(movieName) {
    if(!movieName) return ;

    fetch(apiPaths.searchOnYoutube(movieName))
        .then(res => res.json())
        .then(res => {
            const bestresult = res.items[0];
            const youtubeUrl = `https://www.youtube.com/watch?v=${bestresult.id.videoId}`;
            console.log(youtubeUrl);
            window.open(youtubeUrl,`_blank`);
    })
    .catch(err => console.log(err));
}


const home=document.getElementById('nav-item');

    home.addEventListener('click',function(){
          location.reload();
    });

const logo=document.getElementById('logo');

   logo.addEventListener('click',function(){
    location.reload();
   });

window.addEventListener(`load`,function(){
    init();

});








//as below code  normally we will fetch the api using javascript simillarly as like above code also we will fetch api using javascript.

// fetch('https://www.omdbapi.com/?s=thor&page=1&apikey=1944a46f')
//     .then(res => res.json())
//     .then(data=>{
//         console.log(data);
//     })
//     .catch(error => {
//         console.log(error);
//     });

// https://www.googleapis.com/youtube/v3/search?part=snippet&q=&key=AIzaSyD1c6YVxq5XUcKcz2Ljx43X0ROdzvB18aw
