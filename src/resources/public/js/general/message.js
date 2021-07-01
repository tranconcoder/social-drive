let notify = document.querySelector('.message')

if (notify) {
    
    notify.classList.add('message-show')
    
    setTimeout(function () {
        notify.classList.add('message-hidden')
        notify.classList.remove('message-show')
    }, 7000)

    const closeButton = notify.querySelector('.message-close-btn')
    closeButton.onclick = () => {
        notify.classList.replace('message-show', 'message-hidden')
    }
}