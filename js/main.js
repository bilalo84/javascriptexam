let stars
let age = document.getElementById("age");
let myName = document.getElementById("name");
let myEmail = document.getElementById("email");
let myPhone = document.getElementById("phone")
let myPassord =document.getElementById("password")
let reMyPassword=document.getElementById("repassword")
$(document).ready(() => {
  $(".load").fadeIn(3000);

  // getHomeMeals();
  $(".load").fadeOut(3000, function () {
    $(".load").removeClass("d-flex");
  });


$("#open-Nave").click(function () {
  openNav();
});

$("#close-Nave").click(function () {
  closeNav();
});

function closeNav() {
  $("#navbar").css("left", "-250");
  $("#open-Nave").removeClass("d-none");
  $("#close-Nave").addClass("d-none");
  $(".li-minu").animate(
    {
      top: 300,
    },
    800
  );
}

function openNav() {
  $("#navbar").css("left", "0");
  $("#open-Nave").addClass("d-none");
  $("#close-Nave").removeClass("d-none");

  for (let i = 0; i < 6; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 6) * 100
      );
  }
}

$(".li-minu").animate(
  {
    top: 300,
  },
  200
);

function cardHoverIn() {
  $(this).find($(".overlay")).css({ opacity: "1", visibility: "visible" });
  $(this).find($(".overlay .title")).removeClass("animate__slideOutLeft");
  $(this)
    .find($(".overlay .title"))
    .addClass("animate__fadeInDown animate__delay-0s");
  $(this).find($(".overlay .desc")).removeClass("animate__slideOutLeft");
  $(this)
    .find($(".overlay .desc"))
    .addClass("animate__flipInX animate__delay-0s");
  $(this).find($(".overlay .date")).removeClass("animate__slideOutLeft");
  $(this)
    .find($(".overlay .date"))
    .addClass("animate__fadeInUp animate__delay-0s");
  $(this).find($(".overlay .rate")).removeClass("animate__slideOutLeft");
  $(this)
    .find($(".overlay .rate"))
    .addClass("animate__fadeInUp animate__delay-0s");
  $(this).find($(".cardImage img")).addClass("animate");
}
function cardHoverOut() {
  $(this).find($(".overlay")).css({ opacity: "0", visibility: "hidden" });
  $(this)
    .find($(".overlay .title"))
    .removeClass("animate__fadeInDown animate__delay-0s");
  $(this).find($(".overlay .title")).addClass("animate__slideOutLeft");
  $(this)
    .find($(".overlay .desc"))
    .removeClass("animate__flipInX animate__delay-0s");
  $(this).find($(".overlay .desc")).addClass("animate__slideOutLeft");
  $(this)
    .find($(".overlay .date"))
    .removeClass("animate__fadeInUp animate__delay-0s");
  $(this).find($(".overlay .date")).addClass("animate__slideOutLeft");
  $(this)
    .find($(".overlay .rate"))
    .removeClass("animate__fadeInUp animate__delay-0s");
  $(this).find($(".overlay .rate")).addClass("animate__slideOutLeft");
  $(".cardImage img").removeClass("animate");
}



let movies = [];

async function nowPlayingReq() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWQwOWZiMTM4Yzg3ZmE0M2E0YjM3MDFiN2U2Y2M4OSIsInN1YiI6IjY0ZmIyYzI5YTM1YzhlMDBlMjU2MmY2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tRlCEZgy9Zm988Uqccd7m0j1w95izzDX0-V5f6wlpmk'
    }
  };
  
  let myreq = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  Data = await myreq.json();
  movies = Data.results

  console.log(movies)
  displayMovis()
}


function displayMovis(){
  let hTemp = "";

  movies.forEach((el) => {

    checkMovieVote(el)
    if(el.poster_path==null){
      imgSr = "images/default-movie.jpg"
    }else{
      imgSr = "https://image.tmdb.org/t/p/w500/"+el.poster_path
    }
    
      hTemp += `
  
      <div class="col-lg-4 col-md-6 col-sm-12 animate__animated animate__fadeIn">
      <div class="item overflow-hidden position-relative animate__fadeIn">
          <div class="cardImage animate__fadeIn">
              <img src="${imgSr}" class="cardimg img-fluid animate">
          </div>
          <div class="text-white overlay overflow-hidden animate__fadeIn">
              <h1 class="animate__animated title animate__slideOutLeft text-center">${el.title}</h1>    
              <p class="animate__animated desc animate__slideOutLeft">${el.overview}</p>
              <p class="animate__animated date animate__slideOutLeft"><span class="fst-normal">Release Date : <span>${el.release_date}</span></span></p>
              <h3 class="rate animate__animated animate__slideOutLeft">${stars}</h3>
              <h3 class="rate numrat animate__animated vote animate__slideOutLeft">${el.vote_average.toFixed(1)}</h3>
          </div>
      </div>
  </div>
  
          `;
  
          
      document.getElementById("homePage").innerHTML = hTemp;
      
      $(".item").mouseenter(cardHoverIn);
      $(".item").mouseleave(cardHoverOut);
     
    

    });
}



function checkMovieVote(value)
{
    if(value.vote_average < 1)
    {
        stars = `<i class="fa-solid fa-star text-muted fs-6"></i>`;
    }
    else if(value.vote_average < 2)
    {
        let term = '';
        stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average < 3)
    {
        stars =  `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    }
    else if(value.vote_average <4)
    {
        let term = '';
        for (let i = 0; i < 1; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average <5)
    {
        let term = '';
        for (let i = 0; i < 2; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term;
    }
    else if(value.vote_average <6)
    {
        let term = '';
        for (let i = 0; i < 2; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average < 7)
    {
        let term = '';
        for (let i = 0; i < 3; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term;
    }
    else if(value.vote_average < 8)
    {
        let term = '';
        for (let i = 0; i < 3; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average < 9)
    {
        let term = '';
        for (let i = 0; i < 4; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term;
    }
    else if(value.vote_average < 10)
    {
        let term = '';
        for (let i = 0; i < 4; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else
    {
        let term = '';
        for (let i = 0; i < 5; i++) {
            term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = term;
    }
}


async function movieSearchReq(searchVal){
  let myreq = await fetch (`https://api.themoviedb.org/3/search/movie?query=${searchVal}&api_key=dad09fb138c87fa43a4b3701b7e6cc89`)
  Data = await myreq.json();
  movies = Data.results
  
  displayMovis()
  console.log(movies)
}

function movieSearch(){
    let serByName = document.getElementById("serByName");

  serByName.addEventListener("keyup", function () {
    let srvalue = serByName.value;
    if(serByName.value != ""){
      movieSearchReq(srvalue);
      console.log("hello")
    }
    else
    {
      console.log("movies")
      nowPlayingReq();
      
    }
  });
}

movieSearch()
nowPlayingReq()
async function popularMovieReq(){
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWQwOWZiMTM4Yzg3ZmE0M2E0YjM3MDFiN2U2Y2M4OSIsInN1YiI6IjY0ZmIyYzI5YTM1YzhlMDBlMjU2MmY2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tRlCEZgy9Zm988Uqccd7m0j1w95izzDX0-V5f6wlpmk'
    }
  };
  
  let myreq = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  Data = await myreq.json();
  movies = Data.results
 
  displayMovis()
 
}

async function topRateMovieReq(){

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWQwOWZiMTM4Yzg3ZmE0M2E0YjM3MDFiN2U2Y2M4OSIsInN1YiI6IjY0ZmIyYzI5YTM1YzhlMDBlMjU2MmY2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tRlCEZgy9Zm988Uqccd7m0j1w95izzDX0-V5f6wlpmk'
    }
  };
  
  let myreq = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  Data = await myreq.json();
  movies = Data.results
  console.log(movies);
  displayMovis()
  $('html, body').animate({scrollTop:0}, 2000);
}

async function trandingMovieReq(){

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWQwOWZiMTM4Yzg3ZmE0M2E0YjM3MDFiN2U2Y2M4OSIsInN1YiI6IjY0ZmIyYzI5YTM1YzhlMDBlMjU2MmY2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tRlCEZgy9Zm988Uqccd7m0j1w95izzDX0-V5f6wlpmk'
    }
  };
  
  let myreq = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
  Data = await myreq.json();
  movies = Data.results
  console.log(movies);
  displayMovis()
  $('html, body').animate({scrollTop:0}, 2000);
}

async function upcomingMovieReq(){

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWQwOWZiMTM4Yzg3ZmE0M2E0YjM3MDFiN2U2Y2M4OSIsInN1YiI6IjY0ZmIyYzI5YTM1YzhlMDBlMjU2MmY2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tRlCEZgy9Zm988Uqccd7m0j1w95izzDX0-V5f6wlpmk'
    }
  };
  
  let myreq = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
  Data = await myreq.json();
  movies = Data.results
  console.log(movies);
  displayMovis()
  $('html, body').animate({scrollTop:0}, 2000);
}



$("#nowPlaying").click( function () {
 $('html, body').animate({scrollTop:0}, 3000 );
 closeNav();
 nowPlayingReq()

  
});




$("#Popular").click(function () {
  $('html, body').animate({scrollTop:0}, 3000 );
  closeNav();
  popularMovieReq() 
});

$("#topRated").click(function () {
  $('html, body').animate({scrollTop:0}, 3000 );
  closeNav();
  topRateMovieReq()
});

$("#Trending").click(function () {
  $('html, body').animate({scrollTop:0}, 3000 );
  closeNav();
  trandingMovieReq()
});

$("#Upcoming").click(function () {
  $('html, body').animate({scrollTop:0}, 3000 );
  closeNav();
  upcomingMovieReq()
});


$(".arw-p").click( function () {
  $('html, body').animate({scrollTop:0}, 2000 );
 });

 

$(window).scroll(function(){
  let top = $(window).scrollTop()
 if(top > 0){
   $(".arw-p").fadeIn(1000)
}else{
 
   $(".arw-p").fadeOut(1000)
}
})

$(".load").fadeOut(3000, function () {
  $(".load").removeClass("d-flex")})



  function checkReg(val,reg,massage){
    val.addEventListener("keyup",function(){
    const regex = reg;
    let eror = val.nextElementSibling;
    if(val.value == "" || regex.test(val.value)){
     console.log("hello")
     eror.classList.add("d-none")
     val.style.borderColor="#ced4da";
     eror.classList.remove("d-block")
     document.getElementById("btnC").classList.remove("animate__shakeX")
     document.getElementById("btnC").classList.remove("btn-danger")
     document.getElementById("btnC").classList.add("form-btn")
    }else{
      eror.innerHTML = massage
      eror.classList.add("text-danger")
      eror.classList.remove("d-none")
      eror.classList.add("d-block")
      val.style.borderColor="rgb(214, 46, 51)";
     
      document.getElementById("btnC").classList.add("animate__shakeX")
      document.getElementById("btnC").classList.add("btn-danger")
      document.getElementById("btnC").classList.remove("form-btn")
    }
    
    })
    }


    reMyPassword.addEventListener("keyup",function(){
      
      let eror = reMyPassword.nextElementSibling;
      if(reMyPassword.value == myPassord.value){
       eror.classList.add("d-none")
       reMyPassword.style.borderColor="#ced4da";
       eror.classList.remove("d-block")
       document.getElementById("btnC").classList.remove("animate__shakeX")
       document.getElementById("btnC").classList.remove("btn-danger")
       document.getElementById("btnC").classList.add("form-btn")
      }else{
        eror.innerHTML ="Password not match"
        eror.classList.add("text-danger")
        eror.classList.remove("d-none")
        eror.classList.add("d-block")
        reMyPassword.style.borderColor="rgb(214, 46, 51)";
        
       
        document.getElementById("btnC").classList.add("animate__shakeX")
        document.getElementById("btnC").classList.add("btn-danger")
        document.getElementById("btnC").classList.remove("form-btn")
        formButtonValidation()
      }
      
      })

    
    checkReg(myName,/^[a-zA-z\s]{1,36}$/,"Invalid Name , only Characters allowed")
    checkReg(myEmail,/^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{3}$/,"Invalid Email , try example@domain.com")
    checkReg(myPhone,/^(02)?(01)[0125][0-9]{8}$/,"Invalid Phone Number")
    checkReg(age,/^(1[6-9]|[2-9][0-9]|100)$/,"Your age must be over 16+")
    checkReg(myPassord,/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"password must contain numbers & letters at least 8 character")



    $('.showPass').click(function(){
      if ($('#password').attr('type') == "text") 
      {
          $('#password').attr('type','password');
          $('.showPass').html('<i data-show="show" class="fa-solid fa-eye-slash"></i>');
          
      } else {
          $('#password').attr('type','text');
          $('.showPass').html('<i data-show="show" class="fa-solid fa-eye"></i>');
         
      }
  })
  $('#password').focus(function(){
      $('.showPass').css("opacity",1);
      $('.showPass').css("bottom",10);
  })
  $(document).click(function(e){
      if($(e.target)[0] == $('#password')[0] || $(e.target).attr('data-show') == $('.showPass i').attr('data-show') )
      {
          $('.showPass').css("opacity",1);
          $('.showPass').css("top",30);
          
      }
      else
      {
          $('.showPass').css("opacity",0);
          $('.showPass').css("top",70);
         
      }
  })


});





