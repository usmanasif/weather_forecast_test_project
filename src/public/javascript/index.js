$(function () {
  let loader = $('.loader-bg').css('display', 'none')
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  let getDirection = (angle) => {
    let directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ]
    let section = parseInt(angle / 22.5 + 0.5)
    section = section % 16
    return directions[section]
  }
  $('#countries').on('change', () => {
    let code = document.getElementById('countries').value

    $('#cities').empty()
    cities.forEach((value) => {
      if (value.countryCode == code) {
        $('#cities').append(
          `<option value="${value.longitude},${value.latitude}"> ${value.name} </option>`,
        )
      }
    })
  })

  $('#fetchWeatherButton').on('click', () => {
    let value = document.getElementById('cities').value
    if (!value) {
      let selected_country = document.getElementById('countries').value
      let country = countries.find((val) => {
        return selected_country == val.isoCode
      })
      value = `${country.longitude},${country.latitude}`
    }
    loader.css('display', 'inline-block')
    $.ajax({
      url: `./weekly?location=${value}`,
      success: (data) => {
        loader.css('display', 'none')
        let forecast = JSON.parse(data).forecast
        let elem = $('#forecast')
        elem.empty()
        forecast?.forEach((val) => {
          elem.append(`
              <div class="card">
                <div class="card-item bold text-center f-larger">${
                  days[new Date(val.date).getDay()]
                }</div>
                <div class="card-item text-center">${val.date}</div>
                <img width="50%" class="content-center card-item" src="https://developer.foreca.com/static/images/symbols/${
                  val.symbol
                }.png"
                  alt="">
                <div class="card-item text-center">${val.symbolPhrase}</div>
                <div class="card-item text-center">${val.minTemp}&#8451 | ${
            val.maxTemp
          }&#8451</div>
                <div class="card-item text-center">Wind ${
                  val.maxWindSpeed
                } km/h ${getDirection(val.windDir)}</div>
              </div>
    `)
        })
      },
      error: (e) => {
        loader.css('display', 'none')
        alert(
          JSON.parse(e.responseText || '').error?.messages ||
            'Unable to fetch forecast',
        )
      },
    })
  })
})
