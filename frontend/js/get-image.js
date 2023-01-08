const getText = (id) => {
  const textArea = document.getElementById(id)
  return textArea.value
}

const setImage = (id, book) => {
  const container = document.getElementById(id)
  let correctImages = []

  let p = new Promise(function(resolve, reject) {
    axios.get(`https://openlibrary.org/search.json?q=${book}`)
    .then(function (response) {
      let data = response.data.docs[0]["edition_key"]
      for(let i = 0; i < size; i++) {
        axios.get(`https://covers.openlibrary.org/b/olid/${data[i]}-L.jpg`)
          .then(function (response) {
            //console.log(response.headers["content-type"])
            if(response.headers["content-type"] == 'image/jpeg') {
              // console.log(i)
              asyncPush(correctImages, data[i], resolve)
            }
          })
      }
    })
  });

  p.then(function() {
    let a = getArr()
    console.log(a)
    for(let i = 0; i < a.length && i < 5; i++) {
      container.innerHTML += `<img src="https://covers.openlibrary.org/b/olid/${a[i]}-L.jpg" class="img-fluid">`
    }
  });

  function asyncPush(a, val, cb) {
    setTimeout(function() { a.push(val); }, 0);
    if(a.length > 4) {
      cb();
    }
  }
  function getArr() { return correctImages; }
}