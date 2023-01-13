function getRating () {
    const text = document.getElementsByClassName('card-text')
    const one = document.getElementsByClassName('one-star')
    const two = document.getElementsByClassName('two-star')
    const three = document.getElementsByClassName('three-star')
    const four = document.getElementsByClassName('four-star')
    const five = document.getElementsByClassName('five-star')

    for(let i = 0; i < one.length; i++) {
        axios.get('/books?name='+text[i].innerHTML)
            .then(function (response) {
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

function giveRating () {
    const one = document.getElementsByClassName('one-star')
    const two = document.getElementsByClassName('two-star')
    const three = document.getElementsByClassName('three-star')
    const four = document.getElementsByClassName('four-star')
    const five = document.getElementsByClassName('five-star')

    for(let i = 0; i < one.length; i++) {

        one[i].addEventListener("mouseenter", function( event ) {
            one[i].style.color = "gold";
            two[i].style.color = "";
            three[i].style.color = "";
            four[i].style.color = "";
            five[i].style.color = "";
        }, false)
        one[i].addEventListener("mouseleave", getRating)
        one[i].addEventListener("click", function( event ) {
            let uri = '/books/addReview?name='+String(document.getElementById(`bookName${i+1}`).innerHTML).replace(' ','+')+'&review='+1;
            axios.post(uri)
                .then(function (response) {
                    axios.get('/books?name='+String(document.getElementById(`bookName${i+1}`).innerHTML).replace(' ','+'))
                        .then(function( response) {
                            document.getElementById(`bookRating${i+1}`).innerHTML = `Average: ${response.data.average}`
                            getRating()
                        })
                })
        })

        two[i].addEventListener("mouseenter", function( event ) {
            one[i].style.color = "gold";
            two[i].style.color = "gold";
            three[i].style.color = "";
            four[i].style.color = "";
            five[i].style.color = "";
        }, false)
        two[i].addEventListener("mouseleave", getRating)
        two[i].addEventListener("click", function( event ) {
            let uri = '/books/addReview?name='+String(document.getElementById(`bookName${i+1}`).innerHTML).replace(' ','+')+'&review='+2;
            axios.post(uri)
                .then(function (response) {
                    axios.get('/books?name='+String(document.getElementById(`bookName${i+1}`).innerHTML).replace(' ','+'))
                        .then(function( response) {
                            document.getElementById(`bookRating${i+1}`).innerHTML = `Average: ${response.data.average}`
                            getRating()
                        })
                })
        })

        three[i].addEventListener("mouseenter", function( event ) {
            one[i].style.color = "gold";
            two[i].style.color = "gold";
            three[i].style.color = "gold";
            four[i].style.color = "";
            five[i].style.color = "";
        }, false)
        three[i].addEventListener("mouseleave", getRating)
        three[i].addEventListener("click", function( event ) {
            let uri = '/books/addReview?name='+String(document.getElementById(`bookName${i+1}`).innerHTML).replace(' ','+')+'&review='+3;
            axios.post(uri)
                .then(function (response) {
                    axios.get('/books?name='+String(document.getElementById(`bookName${i+1}`).innerHTML).replace(' ','+'))
                        .then(function( response) {
                            document.getElementById(`bookRating${i+1}`).innerHTML = `Average: ${response.data.average}`
                            getRating()
                        })
                })
        })

        four[i].addEventListener("mouseenter", function( event ) {
            one[i].style.color = "gold";
            two[i].style.color = "gold";
            three[i].style.color = "gold";
            four[i].style.color = "gold";
            five[i].style.color = "";
        }, false)
        four[i].addEventListener("mouseleave", getRating)
        four[i].addEventListener("click", function( event ) {
            let uri = '/books/addReview?name='+String(document.getElementById(`bookName${i+1}`).innerHTML).replace(' ','+')+'&review='+4;
            axios.post(uri)
                .then(function (response) {
                    axios.get('/books?name='+String(document.getElementById(`bookName${i+1}`).innerHTML).replace(' ','+'))
                        .then(function( response) {
                            document.getElementById(`bookRating${i+1}`).innerHTML = `Average: ${response.data.average}`
                            getRating()
                        })
                })
        })

        five[i].addEventListener("mouseenter", function( event ) {
            one[i].style.color = "gold";
            two[i].style.color = "gold";
            three[i].style.color = "gold";
            four[i].style.color = "gold";
            five[i].style.color = "gold";
        }, false)
        five[i].addEventListener("mouseleave", getRating)
        five[i].addEventListener("click", function( event ) {
            let uri = '/books/addReview?name='+String(document.getElementById(`bookName${i+1}`).innerHTML).replace(' ','+')+'&review='+5;
            axios.post(uri)
                .then(function (response) {
                    axios.get('/books?name='+String(document.getElementById(`bookName${i+1}`).innerHTML).replace(' ','+'))
                        .then(function( response) {
                            document.getElementById(`bookRating${i+1}`).innerHTML = `Average: ${response.data.average}`
                            getRating()
                        })
                })
        })
    }
}
setTimeout(getRating,1000);
giveRating()