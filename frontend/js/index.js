const bookCover1 = document.getElementById('bookCover1')
const bookName1 = document.getElementById('bookName1')
const bookCover2 = document.getElementById('bookCover2')
const bookName2 = document.getElementById('bookName2')
const bookCover3 = document.getElementById('bookCover3')
const bookName3 = document.getElementById('bookName3')

axios.get('./books/top')
  .then(function (response) {
      bookName1.innerHTML = response.data[0].name
      bookCover1.src = response.data[0].cover
      bookName2.innerHTML = response.data[1].name
      bookCover2.src = response.data[1].cover
      bookName3.innerHTML = response.data[2].name
      bookCover3.src = response.data[2].cover
  })
  .catch(function (error) {
    console.log(error);
  });