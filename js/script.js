const RESULTS = 20
const KEY = '&key=AIzaSyDBDKJmH87zPUIRhfMpZSghS6nVFbvUyKs'
const API = 'https://www.googleapis.com/youtube/v3/search?&part=snippet&maxResults=' + RESULTS + '&type=video' + KEY + '&q='

const input = document.getElementById('input')
const output = document.getElementById('output')
const button = document.getElementById('btn')


const searchVideo = async (videoName = 'JS') => {
    const req = await fetch(API + videoName)
    const res = await req.json()
    output.innerHTML = ''
    renderAllVideos(res.items)

}

const renderAllVideos = (data) => {
    data.map(el => {
        const col = document.createElement('div')
        col.className = 'col-3'
        const box = document.createElement('div')
        box.className = 'main__box'
        const video = document.createElement('div')
        const title = document.createElement('h4')
        title.textContent = el.snippet.title.slice(0,30) + '...'
        title.className = 'video__title'


        let currentDate = new Date(),
            needDate = new Date(el.snippet.publishedAt),
            remainingDays = Math.ceil((currentDate - needDate) / 1000 / 60 / 60 / 24);
        let date = `${remainingDays} day ago`;
        date.className='video__date'


        video.innerHTML = `
        <iframe width="100%" height="150px" src="https://www.youtube.com/embed/${el.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `


        title.textContent = el.snippet.title.slice(0,30) + '...'
        

        box.append(video, title, date)
        col.append(box)
        output.append(col)
    })
}

button.addEventListener('click', () => {
    searchVideo(input.value)
})

const makeVoiceRecognizer = () => {
    const voice = document.getElementById('voice')
    let recognizer = new webkitSpeechRecognition()
    let name = ''
    recognizer.interimResult = true
    recognizer.lang = 'ru-Ru'

    recognizer.onresult = (event) => {
        let result = event.results[event.resultIndex]
        if (result.isFinal) {
            name = result[0].transcript
            input.placeholder = name
            searchVideo(name)
            talk()
        }
    }

    const talk = () => {
        let listen = window.speechSynthesis
        let result = new SpeechSynthesisUtterance(name)
        listen.speak(result)
    }

    const speech = () => {
        recognizer.start()
    }

    voice.addEventListener('click', speech)
}
makeVoiceRecognizer()