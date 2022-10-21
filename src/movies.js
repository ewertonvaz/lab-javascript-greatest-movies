// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    let directors = [];
    directors = moviesArray.map(el => el.director);
    // console.log(moviesArray);
    return directors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    if (moviesArray.length === 0) {
        return 0;
    }
    let dramaMovies = moviesArray.filter(element => {
        return element.director === "Steven Spielberg" && element.genre.includes("Drama");
    });
    return dramaMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) {
        return 0;
    }
    let sumOfAll = moviesArray.reduce( (acc, element) => {
        if (!element.score){
            return acc;
        }
        return acc  + element.score;
    }, 0);
    let avg = sumOfAll / moviesArray.length;
    return parseFloat(avg.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    let drama = moviesArray.filter( el => el.genre.includes("Drama"));
    return (scoresAverage(drama));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    let sorted = [...moviesArray];
    sorted.sort((a, b) => a.year - b.year);
    sorted.sort((a, b) => {
        if (a.year === b.year) {
            b.title.localeCompare(a.title)
        }
    });
    //console.log(sorted);
    return sorted;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    let sorted = [...moviesArray], firstTwenty = [];
    sorted.sort((a, b) => a.title.localeCompare(b.title));
    for (let i = 0; i < sorted.length && i < 20; i++ ){
        firstTwenty.push(sorted[i].title);
    }
    return firstTwenty;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    let newArray = moviesArray.map( element => {
        return { ...element, duration: convertHoursToMinutes(element.duration)};
    }); 
    return newArray;
}

function convertHoursToMinutes(duration){
    let hours = 0, minutes = 0;
    hours = Number.parseInt(duration.substr(0, duration.indexOf('h')));
    if (duration.indexOf('min') !== - 1) {
        minutes =  Number.parseInt(duration.substr(duration.indexOf('min')-2, 2));
    }
    // console.log(`Vou converter ${duration} para ${hours} horas e ${minutes} minutos.`);
    return hours * 60 + minutes;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) {
        return null;
    }
    let arrFilmByYear = [];
    //1. Separar filmes por ano
    moviesArray.forEach(element => {
        if (element.year && !arrFilmByYear.includes(element.year)){
            arrFilmByYear.push(element.year);
        }
    });
    arrFilmByYear.forEach( (element, index, array) => {
        array[index] = { year: element } ;
        array[index].movies = moviesArray.filter( el => el.year == element);
    });
    //1.
    let maxScore = 0, year = 0;
    // Calcular o AvgScore de cada ano e determinar o maior
    arrFilmByYear.forEach( el => {
        let nextScore = scoresAverage(el.movies);
        console.log(el.year, el.movies);
        if (nextScore > maxScore) {
            maxScore = nextScore;
            year = el.year;
        }
        if (nextScore  === maxScore &&  year > el.year) {
            year = el.year;
        }
    });
    console.log(maxScore, year);
    // Exibir o ano que teve maior score
    return `The best year was ${year} with an average score of ${maxScore}`;
}
