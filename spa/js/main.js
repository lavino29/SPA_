console.log('SPA en JS')

function ajax(url, metodo) {
    let httpMetodo = metodo || 'get'
    let xhr = new XMLHttpRequest
    xhr.open(httpMetodo, url)
    xhr.send()

    return xhr
}

let main = document.querySelector('main')
let links = document.querySelectorAll('a')
//console.log(links)

/* //----------------------------------------
// SPA sin history
//----------------------------------------
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault()
        let id = link.id
        //console.log(id)
        let archivo = id + '.html'
        let xhr = ajax(archivo)
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                main.innerHTML = xhr.response
            }
        })
    })
})
 */
/*
 //----------------------------------------
// SPA con history (hash)
//----------------------------------------
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault()
        let id = link.id
        location.hash = id
    })
})

window.addEventListener('hashchange', () => {
    console.log('Cambió la URL')

    let hash = location.hash
    //console.log(hash)
    let archivo = hash.split('#')[1] + '.html'

    let xhr = ajax(archivo)
    xhr.addEventListener('load', () => {
        if (xhr.status == 200) {
            main.innerHTML = xhr.response
        }
    })
})
*/
//----------------------------------------
// SPA con history Push
//----------------------------------------
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault()
        let id = link.id
        console.log(id)
        //console.log(id)
        let archivo = id + '.html'
        let xhr = ajax(archivo)
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                history.pushState({
                    template: xhr.response
                },'',id)
                main.innerHTML = xhr.response
            }
        })
    })
})
window.addEventListener('popstate', e => {
    console.log('Cambió el historial')

    console.log(e.state)

    if(e.state.template) {
        main.innerHTML = e.state.template
    }
    else {
        let pathname = location.pathname
        console.log(pathname)
        let archivo = pathname.split('/')[1] + '.html'

        let xhr = ajax(archivo)
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                main.innerHTML = xhr.response
            }
        })
    }
})

let xhr = ajax('home.html')
/* let hash = location.hash
let archivo = hash.split('#')[1] + '.html'
let xhr = ajax(archivo)
 */
xhr.addEventListener('load', () => {
    if (xhr.status == 200) {
        main.innerHTML = xhr.response
    }
})