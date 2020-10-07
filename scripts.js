
function getQuotes () {
  $.ajax({
    type: 'get',
    accepts: 'application/json',
    url: 'https://smileschool-api.hbtn.info/quotes',
    success: (response) => setQuotes(response)
  })
}

function setQuotes (response) {
  $('div#testimonial-carousel').empty()
  if (typeof response === 'object') {
    response.forEach((testimonial, index) => {
      $('div#testimonial-carousel').append(
        `
        <div class="carousel-item" id="testimonial${index + 1}">
            <div class="d-flex justify-content-center align-items-center flex-wrap">
                <img src="${testimonial.pic_url}" alt="${testimonial.name}" width="160" height="160" class="rounded-circle">
                <blockquote>
                    <cite class="font-style">« ${testimonial.text}</cite>
                    <h2 class="pros-title">${testimonial.name}</h2>
                    <cite>${testimonial.title}</cite>
                </blockquote>
            </div>
        </div>
        `
      )
      $('div#testimonial1').addClass('active')
    })
  }
}
function getPopularTutorials () {
  $.ajax({
    type: 'get',
    accepts: 'application/json',
    url: 'https://smileschool-api.hbtn.info/popular-tutorials',
    success: (response) => setPopularTutorials(response)
  })
}
function setPopularTutorials (response) {
  $('div#popular-tutorials-carousel').empty()
  if (typeof response === 'object') {
    response.forEach(tutorial => console.log(tutorial))
    const inGroupsOfFour = Math.trunc(response.length / 4) + 1
    let counter = 1
    for (let i = 0; i < inGroupsOfFour; i++) {
      console.log(counter)
      $('div#popular-tutorials-carousel').append(
            `
            <div class="carousel-item" id=popularGroup${i}>
                <div class="row" id=row${i}>
            `
      )
      for (; counter <= response.length; counter++) {
        $(`div#row${i}`).append(
            `
            <div class="col-sm-6 col-md-3 clearfix d-none d-md-block">
                <div class="card-video d-flex flex-column justify-content-center">
                    <div class="image-inf">
                        <img src="${response[counter - 1].thumb_url}" alt="${response[counter - 1].author}" class="photo img-fluid" width="225" height="154">
                        <img src="images/play.png" alt="Play button" class="play-button"  width="64" height="64">
                    </div>
                    <blockquote class="pl-4 pr-4">
                        <h2 class="pros-title section-card-title">${response[counter - 1].title}</h2>
                        <p class="section-card-text">${response[counter - 1]['sub-title']}</p>
                    </blockquote>

                    <div class="recomendations align-items-center d-flex pl-4 pr-4">
                        <img src="${response[counter - 1].author_pic_url}" alt="${response[counter - 1].author}" width="30" height="30" class="perfil rounded-circle">
                        <h3 class="pros-title">${response[counter - 1].author}</h3>
                    </div>

                    <div class="cardfooter d-flex flex-wrap justify-content-between pl-4 pr-4">
                        <div class="stars" id="starsTutorial${counter - 1}">
                        </div>

                        <div class="hour">
                            <p>${response[counter - 1].duration}</p>
                        </div>
                    </div>
                </div>
            </div>  
            `
        )
        if (counter % 4 === 0) {
          counter++
          break
        }
      }
    }
    response.forEach((tutorial, index) => {
      for (let k = 0; k < tutorial.star; k++) {
        $(`div#starsTutorial${index}`).append(
            `
            <img src="images/star_on.png" alt="Star" width="15" height="15">
            `
        )
      }
    })
    $('div#popularGroup0').addClass('active')
  } else {
    window.alert('not an object error')
  }
}
$(
  getQuotes(),
  getPopularTutorials()
)
