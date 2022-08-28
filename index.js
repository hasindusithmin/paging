
if (!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i))) {
    document.getElementById('root').style.width = '50%'
    document.getElementById('root').style.margin = 'auto'
}




async function createTable(id) {
    const cap = document.createElement('caption')
    cap.innerText = `User ${id}`
    document.getElementById('tbl').appendChild(cap)
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then(res => res.json())
        .then(data => {
            const tr = document.createElement('tr')
            tr.className = 'w3-green'
            const theads = ['Title', 'Body']
            theads.forEach(thead => {
                const th = document.createElement('th')
                th.innerText = thead
                tr.appendChild(th)
            })
            document.getElementById('tbl').appendChild(tr)
            data.forEach(dt => {
                // Create a table row 
                const tr = document.createElement('tr')

                for (let [key, value] of Object.entries(dt)) {
                    if (key == 'id' || key == 'userId') continue
                    if (key == 'body') value = value.replace('\n','')
                    const td = document.createElement('td')
                    td.innerText = value
                    tr.appendChild(td)
                }
                document.getElementById('tbl').appendChild(tr)
            })
        })
}

function colorButton(id) {
    const btns = document.getElementById('paging').children
    for (btn of btns) btn.className = 'w3-button'
    document.getElementById(id).className = 'w3-button w3-green'
}

async function getData(id) {
    document.getElementById('tbl').innerHTML = ''
    colorButton(id)
    createTable(id)
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    const data = await res.json()
}

window.addEventListener('DOMContentLoaded', (event) => {
    createTable(1)
    const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    userIds.forEach(userId => {
        const btn = document.createElement('button')
        btn.className = 'w3-button'
        if (userId == 1) btn.className = 'w3-button w3-green'
        btn.innerText = userId
        btn.id = userId
        btn.onclick = () => {
            getData(userId)
        }
        document.getElementById('paging').appendChild(btn)
    })
});



