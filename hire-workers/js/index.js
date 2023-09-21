let URL = "https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27profiles%27%5D%7B%0A%22image%22%3A+image.asset-%3Eurl%2C%0Aname%2C%0AjobTitle%2C%0Aage%2C%0AyearsExperience%2C%0Abio%0A%7D&perspective=published"

// fetch the content
fetch(URL)
    .then((res) => res.json())
    .then(({
        result
    }) => {
        console.log(result)

        const jobPoolWrap = document.querySelector(".job-pool-card-wrap ")
        if (result.length > 0) {
            jobPoolWrap.innerHTML = ""
            result.forEach((result) => {
                let jobPoolItem = document.createElement("div")
                jobPoolItem.classList.add("job-pool-card")
                jobPoolWrap.appendChild(jobPoolItem)

                let jobPoolImage = document.createElement("figure")
                jobPoolImage.classList.add("anim-el", "clip-anim")
                jobPoolItem.appendChild(jobPoolImage)

                let jobPoolImageSrc = document.createElement("img")
                jobPoolImageSrc.src = result.image
                jobPoolImage.appendChild(jobPoolImageSrc)

                let jobPoolName = document.createElement("h4")
                jobPoolName.textContent = result.name
                jobPoolItem.appendChild(jobPoolName)

                let jobPoolTitle = document.createElement("h5")
                jobPoolTitle.textContent = result.jobTitle
                jobPoolItem.appendChild(jobPoolTitle)
                
                let anchorButton = document.createElement("a")
                anchorButton.setAttribute('href',"#");
                anchorButton.classList.add("btn", "btn-dark")
                jobPoolItem.appendChild(anchorButton)
                let anchorButtonSpan = document.createElement("span")
                anchorButtonSpan.innerHTML = "See details";
                anchorButton.appendChild(anchorButtonSpan)


            });

        }
    })
    .catch((err) => console.error(err));