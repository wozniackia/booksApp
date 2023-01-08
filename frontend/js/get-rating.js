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

setTimeout(getRating,1000);