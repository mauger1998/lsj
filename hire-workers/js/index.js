let URL =
    'https://1r3pn5o9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27profiles%27%5D%7B%0A%22image%22%3A+image.asset-%3Eurl%2C%0Aname%2C%0AjobTitle%2C%0Aage%2C%0AyearsExperience%2C%0Abio%0A%7D&perspective=published'

// fetch the content
fetch(URL)
    .then((res) => res.json())
    .then(({ result }) => {
        const jobPoolWrap = document.querySelector('.job-pool-card-wrap ')
        if (result.length > 0) {
            jobPoolWrap.innerHTML = ''
            result.forEach((result) => {
                let jobPoolItem = document.createElement('div')
                jobPoolItem.classList.add('job-pool-card')
                jobPoolWrap.appendChild(jobPoolItem)

                let jobPoolImage = document.createElement('figure')
                jobPoolItem.appendChild(jobPoolImage)

                let jobPoolImageSrc = document.createElement('img')
                jobPoolImageSrc.classList.add('anim-el', 'clip-anim')

                jobPoolImageSrc.src = result.image
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
                    applicationImage.src = result.image
                })
                hireMeButton.addEventListener('click', () => {
                    popUp.classList.add('active')
                    profilePopUp.classList.remove('active')
                })
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
    .catch((err) => console.error(err))

//Submit Button

const submitButton = document.querySelector('.texts-btn-inner .btn')
const submitPopUp = document.querySelector('.texts-btn-wrap .pop-up')
submitButton.addEventListener('click', () => {
    submitPopUp.classList.add('active')
})
const xButton = document.querySelector('.texts-btn-wrap .x-button')
xButton.addEventListener('click', () => {
    submitPopUp.classList.remove('active')
})
