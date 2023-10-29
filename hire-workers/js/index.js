// Sanity Fetch
async function fetchSanityData(url) {
    const response = await fetch(url)
    const sanityData = await response.json()
    return sanityData
}

fetchSanityData(
    'https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22profiles%22%5D+%7B%0A++profilesContent%5B%5D+%7B%0A++++name%2C%0A++++yearsExperience%2C%0A++++%22imageUrl%22%3A+image.asset-%3Eurl%2C%0A++++trade%2C%0A++%7D%0A%7D'
).then((profile) => {
    const { result } = profile
    const resolvedResult = result[0].profilesContent

    const jobPoolWrap = document.querySelector('.job-pool-card-wrap ')
    if (resolvedResult.length > 0) {
        jobPoolWrap.innerHTML = ''
        resolvedResult.forEach((result) => {
            let jobPoolItem = document.createElement('div')
            jobPoolItem.classList.add('job-pool-card')
            jobPoolWrap.appendChild(jobPoolItem)

            let jobPoolImage = document.createElement('figure')
            jobPoolItem.appendChild(jobPoolImage)

            let jobPoolImageSrc = document.createElement('img')
            jobPoolImageSrc.classList.add('anim-el', 'clip-anim')

            jobPoolImageSrc.src = result.imageUrl
            jobPoolImage.appendChild(jobPoolImageSrc)

            let jobPoolName = document.createElement('h4')
            jobPoolName.textContent = result.name
            jobPoolItem.appendChild(jobPoolName)

            let jobPoolTitle = document.createElement('h5')
            jobPoolTitle.textContent = result.jobTitle
            jobPoolItem.appendChild(jobPoolTitle)

            let anchorButton = document.createElement('a')
            anchorButton.classList.add('btn', 'btn-dark')
            anchorButton.classList.add('anchor-button')
            jobPoolItem.appendChild(anchorButton)
            let anchorButtonSpan = document.createElement('span')
            anchorButtonSpan.innerHTML = 'See details'
            anchorButton.appendChild(anchorButtonSpan)

            const popUp = document.querySelector('.pop-up')
            const profilePopUp = document.querySelector('.profile-pop-up')
            const hireMeButton = document.querySelector('.hire-me-btn')
            const applicationImage = document.querySelector(
                '.application-image-target img'
            )

            anchorButton.addEventListener('click', () => {
                profilePopUp.classList.add('active')
                applicationImage.src = result.imageUrl
            })
            // hireMeButton.addEventListener('click', () => {
            //     popUp.classList.add('active')
            //     profilePopUp.classList.remove('active')
            // })
            const xButton = document.querySelector('.pop-up .x-button')
            xButton.addEventListener('click', () => {
                popUp.classList.remove('active')
            })
            const profileXButton = document.querySelector(
                '.profile-pop-up .x-button'
            )
            profileXButton.addEventListener('click', () => {
                profilePopUp.classList.remove('active')
            })
        })
    }
    if (result.length < 1) {
        document
            .querySelector('.job-pool-inner')
            .classList.add('show-empty-workers')
    }
})
