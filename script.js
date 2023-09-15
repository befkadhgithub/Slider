const track = document.querySelector(".image-track")
const op = document.querySelector(".op")

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX
}

window.onmousemove = e => {
    
    if(track.dataset.mouseDownAt === '0') {return}

    const mouseMoveDistance = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxWidth = innerWidth/2

    const percentage = (mouseMoveDistance/maxWidth) * -100

    const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    track.dataset.percentage = nextPercentage

    track.style.transform = `translate(${nextPercentage}%, -50%)`
    
    if(nextPercentage > 0) {
        track.style.transform = `translate(0, -50%)`
        track.dataset.percentage = '0'
    }

    if(nextPercentage < -100) {
        track.style.transform = `translate(-100%, -50%)`
        track.dataset.percentage = '-100'
    }
    
    for(const image of track.getElementsByClassName("image") ) {
        image.style.objectPosition = `${nextPercentage + 100 }% 50%`
        if(nextPercentage > 0) {
            image.style.objectPosition = `100% 50%`;
        }

        if(nextPercentage < -100) {
            image.style.objectPosition = `0 50%`;
        }
}
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = '0'
    track.dataset.prevPercentage = track.dataset.percentage
}
