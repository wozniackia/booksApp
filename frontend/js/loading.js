const progress = document.getElementById('progress')

function hideLoading() {
    document.getElementById('loading').classList.add('visually-hidden')
    document.getElementById('loading').style.height = '0%'
    document.getElementById('loading').style.width = '100%'
}

setTimeout(function() {
    progress.style.width = '100%'
    setTimeout(hideLoading, 1000)
}, 1000)