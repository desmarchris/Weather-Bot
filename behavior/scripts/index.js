'use strict'

exports.handle = (client) => {

  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('welcome')
      client.addResponse('provide/documentation', {
        documentation_link: 'http://docs.init.ai',
      })
      client.addResponse('provide/instructions')
      client.updateConversationState({
        helloSent: true
      })
      client.done()
    }
  })    
    
  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('apology/untrained')
      client.done()
    }
  })

    const collectCity = client.createStep({
      satisfied() {
        return Boolean(client.getConversationState().weatherCity)
      },
        
      extractInfo() {
        const city = client.getFirstEntityWithRole(client.getMessagePart(), 'city')
        
        if (city) {
          client.updateConversationState({
            weatherCity: city,
          })
          
          console.log('User wants the weather in:', city.value)
        }
      },

      prompt() {
        client.addResponse('prompt/weather_city')
        client.done()
      },
    })

    const provideWeather = client.createStep({
      satisfied() {
        return false
      },

      prompt() {
        let weatherData = { // dummy data
          temperature: 60,
          condition: 'sunny',
          city: client.getConversationState().weatherCity.value,
        }

        client.addResponse('provide_weather/current', weatherData) // Init.ai takes message type and matches provided data
        client.done()
      }
    })
    
    client.runFlow({
    classifications: {},
    autoResponses: {},
    streams: {
      main: 'getWeather',
      hi: [sayHello],
      getWeather: [collectCity, provideWeather],
    },
  })
  
}
