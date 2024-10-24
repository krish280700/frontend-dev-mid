var table = document.getElementById("table-data")
var tableSearch = document.getElementById("table-search")

document.addEventListener('load',fetchData())
var userData = ''

tableSearch.addEventListener('keyup', function(e) {
    searchTable(e.target.value)
})

// Render table using mock data

function fetchData(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        userData = json
        renderTable(userData)
      })
}

function renderTable(data){
    let tableData = ''
    if(data?.length){
        table.innerHTML = ''
        data.forEach(user => {
            tableData += `<tr>
                <td class="px-6 py-3">${user.name}</td>
                <td class="px-6 py-3">${user.username}</td>
                <td class="px-6 py-3">${user.phone}</td>
                <td class="px-6 py-3">${user.email}</td>
                <td class="px-6 py-3">${user.website}</td>
                <td class="px-6 py-3">${user.company.name}</td>
            </tr>`
        });
            table.innerHTML += `
                <thead>
                    <tr>
                        <th class="px-6 py-3 field-header" data-field="name" data-sort="asc">Name</th>
                        <th class="px-6 py-3 field-header" data-field="username" data-sort="asc">User Name</th>
                        <th class="px-6 py-3 field-header" data-field="phone" data-sort="asc">Phone</th>
                        <th class="px-6 py-3 field-header" data-field="email" data-sort="asc">Email</th>
                        <th class="px-6 py-3 field-header" data-field="website" data-sort="asc">Website</th>
                        <th class="px-6 py-3 field-header" data-field="company" data-sort="asc">Company</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableData}
                </tbody>
            `
            
            let elements =  document.getElementsByClassName("field-header")
            Array.from(elements).forEach((element) => {
                element.addEventListener("click",(e) => sortTable(e))
            })
    }
    else{
        table.innerHTML = 'No Data Found!'
    }
}

function sortTable(e){
    let field = e.target.dataset.field
    let sort = e.target.dataset.sort
    let sortedData = userData.sort((a, b) => {
        let nameA, nameB
        if(typeof a[field] === 'string'){
            nameA = a[field].toUpperCase();
            nameB = b[field].toUpperCase(); 
        }

        if(sort == 'asc'){
            if(nameA < nameB){
                return -1
            }
            if(nameA > nameB){
                console.log('desc')
                return 1
            }
        }
        else if(sort == 'desc'){
            if(nameA > nameB){
                return -1
            }
            if(nameA < nameB){
                console.log('desc')
                return 1
            }
        }

        return 0
    })

    renderTable(sortedData)

    let element = document.querySelector(`[data-field=${field}]`)
    sort == 'asc' ? element.setAttribute('data-sort', 'desc') : element.setAttribute('data-sort', 'asc')
}

function searchTable(query){
    query = query.toLowerCase()
    let searchData = userData.filter(user => {
        return user.name.toLowerCase().includes(query) ||
               user.username.toLowerCase().includes(query) ||
               user.phone.toLowerCase().includes(query) ||
               user.email.toLowerCase().includes(query) ||
               user.website.toLowerCase().includes(query) ||
               user.company.name.toLowerCase().includes(query) 
    } )
    renderTable(searchData)
}

function pagination(){
    // Code
}