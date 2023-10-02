document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('counter')
    const minus = document.getElementById('minus');
    const plus = document.getElementById('plus');
    const heart = document.getElementById('heart');
    const pause = document.getElementById('pause');
    const likesList = document.querySelector('.likes')
    const comments = document.querySelector('.comments')
    const form = document.querySelector('form')
    const input = document.getElementById('comment-input')

    let counter = 0
    let intervalId

    function changeCounter(){
        counterElement.textContent = counter
    }

    function incrementCounter(){
        counter++
        changeCounter()
    }
    function decrementCounter(){
        counter--
        changeCounter()
    }

    function likeCounter(){
        const number = counter;
        const existingLike = document.getElementById(`like-${number}`)
        if (existingLike){
            existingLike.dataset.count++
            existingLike.textContent = `${number} has been liked ${existingLike.dataset.count} times`
        } else {
            const newLike = document.createElement('li')
            newLike.id = `like-${number}`
            newLike.dataset.count = 1
            newLike.textContent = `${number} has been liked 1 time`
            likesList.appendChild(newLike)
        }
    }

    function pauseOrPlay(){
        if (pause.innerText === 'pause'){
            pause.textContent = 'resume'
            clearInterval(intervalId)
            minus.disabled = true
            plus.disabled = true
            heart.disabled = true
        } 
        else {
            intervalId = setInterval(incrementCounter, 1000)
            minus.disabled = false
            plus.disabled = false
            heart.disabled = false
            pause.textContent = 'pause'
        }
    }

    function submitComment(event){
        event.preventDefault()
        const comment = input.value
        const commentElement = document.createElement('p')
        commentElement.textContent = comment
        comments.appendChild(commentElement)
        input.value = ''
    }
    
    minus.addEventListener('click', decrementCounter)
    plus.addEventListener('click', incrementCounter)
    heart.addEventListener('click', likeCounter)
    pause.addEventListener('click', pauseOrPlay)
    form.addEventListener('submit', submitComment)

    intervalId = setInterval(incrementCounter, 1000);
})