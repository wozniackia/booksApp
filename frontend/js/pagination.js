const pag = document.getElementById('pagination')
function updateRating () {

  const text = document.getElementsByClassName('card-text')
  const one = document.getElementsByClassName('one-star')
  const two = document.getElementsByClassName('two-star')
  const three = document.getElementsByClassName('three-star')
  const four = document.getElementsByClassName('four-star')
  const five = document.getElementsByClassName('five-star')

  for(let i = 0; i < one.length; i++) {
      axios.get('/books?name='+text[i].innerHTML)
          .then(function (response) {
              console.log(text[i].innerHTML)
              console.log(response.data.average)
              console.log(i)
              one[i].style.color = "";
              two[i].style.color = "";
              three[i].style.color = "";
              four[i].style.color = "";
              five[i].style.color = "";
              if(response.data.average == 5) {
                  one[i].style.color = "gold";
                  two[i].style.color = "gold";
                  three[i].style.color = "gold";
                  four[i].style.color = "gold";
                  five[i].style.color = "gold";
              } else if(response.data.average >= 4) {
                  one[i].style.color = "gold";
                  two[i].style.color = "gold";
                  three[i].style.color = "gold";
                  four[i].style.color = "gold";
                  five[i].style.color = "";
              } else if(response.data.average >= 3) {
                  one[i].style.color = "gold";
                  two[i].style.color = "gold";
                  three[i].style.color = "gold";
                  four[i].style.color = "";
                  five[i].style.color = "";
              } else if(response.data.average >= 2) {
                  one[i].style.color = "gold";
                  two[i].style.color = "gold";
                  three[i].style.color = "";
                  four[i].style.color = "";
                  five[i].style.color = "";
              } else if(response.data.average >= 1) {
                  one[i].style.color = "gold";
                  two[i].style.color = "";
                  three[i].style.color = "";
                  four[i].style.color = "";
                  five[i].style.color = "";
              }
          })
  }
}

let numberOfPages;
axios.get('/books')
  .then(function (response) {
    for(let i = 0; i < Math.floor(response.data.length/9); i++) {
      pag.innerHTML += `<li class="page-item" onclick="fetchCovers(${i+1}); fetchRatings(${i+1}); setTimeout(updateRating,1000);"><a class="page-link" href="#">${i+1}</a></li>`
    }   
  })
  .catch(function (error) {
    console.log(error);
  });