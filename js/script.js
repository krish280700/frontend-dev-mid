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
                element.addEventListener("click", sortTable())
            })
    }
    else{
        table.innerHTML = 'No Data Found!'
    }
}

function sortTable(sort, field){
    if(sort == 'asc'){

    }else if(sort == 'desc'){

    }
}

function searchTable(query){
    let queryLen = query.length
    let searchData = userData.filter(user => {
        return user.name.slice(0,queryLen).toLowerCase() == query
    } )
    renderTable(searchData)
}

function pagination(){

}