document.addEventListener("DOMContentLoaded", function() {
    let input = document.querySelector(".form-control")
    let submitButton = document.querySelector(".btn")
    let username = document.querySelector("#username")
    let main = document.querySelector("main")

    async function getData (user){
        let response = await fetch(`https://api.github.com/users/${user}/repos`);
        let data = await response.json()
        return data
    }

    async function handleSubmit (e){
        e.preventDefault()
        let user = input.value
        username.innerHTML = user
        let data = await getData(user)
        main.innerHTML = ""
        displayData(data)
    }

    function displayData (data) {
        console.log(data)
        data.map(repository => {
            let container = document.createElement('div')
            container.classList.add("row", "repo")

            // Name of Repo with Link
            let name = document.createElement('h3')
            let link = document.createElement('a')
            link.setAttribute("href", "https://github.com/" + repository.full_name)
            link.innerHTML = repository.name
            name.appendChild(link)
            container.appendChild(name)

            // Description of Repo
            let description = document.createElement('p')
            let strong = document.createElement("strong")
            strong.innerHTML = "Description: "
            let descriptionSpan = document.createElement('span')
            descriptionSpan.innerHTML = repository.description
            description.appendChild(strong)
            description.appendChild(descriptionSpan)
            container.appendChild(description)


            //Owner of Repo

            let owner = document.createElement("p")
            let strong2 = document.createElement("strong")
            let ownerSpan = document.createElement("span")
            ownerSpan.innerHTML = repository.owner.login
            strong2.appendChild(ownerSpan)
            owner.appendChild(strong2)
            container.appendChild(strong2)

            //Stats for Repo

            let stats = document.createElement('div')
            stats.classList.add('stats')
            stats.innerHTML = `<div class="stats">
                <div class="col-sm-1 stars">
                    <svg class="icon" aria-hidden="true" height="16" version="1.1" viewBox="0 0 14 16" width="14">
                        <use xlink: href="./svg/sprites.svg#star"></use>
                </svg >
                <span>${repository.forks}</span>
            </div >
                <div class="col-sm-1 forks">
                    <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 10 16" width="10">
                        <use xlink: href="./svg/sprites.svg#fork"></use>
                </svg>
                <span>${repository.stargazers_count}</span>
            </div >`
            container.appendChild(stats)

            main.appendChild(container)

        })
    }

    submitButton.addEventListener('click', handleSubmit)
});
