
function getQuotes () {
  $.ajax({
    type: 'get',
    accepts: 'application/json',
    url: 'https://smileschool-api.hbtn.info/quotes',
    success: (response) => setQuotes(response)
  })
}

function setQuotes (response) {
  $('div.carousel-inner').empty()
  if (typeof response === 'object') {
    response.forEach(testimonial => {
      console.log(testimonial)
      $('div.carousel-inner').append(
        `
        <div class="carousel-item">
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
      $('div.carousel-item:first-child').addClass('active')
    })
  }
}
$(
  getQuotes()
)
