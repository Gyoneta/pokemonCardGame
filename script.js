let situationAtk = false
let situationDef = false
let situationHp = false
let situationSpcAtk = false
let situationSpcDef = false
let situationSpd = false

let firstDuel = false
let secondDuel = false
let thirdDuel = false
let fourthDuel = false
let fifthDuel = false
let playerScore = []
let machineScore = []
let draw = []


const turnIntoJson = response => {
  return response.json()
}


const showError = () => {
  console.log('deu ruim')
}

const showError2 = (error) => {
  console.log(error)
}

const Main =  {
  init: function() {
    this.cacheSelector()
    this.cache
    this.bindEvents()
    this.Events
  },
 
  cacheSelector: function() {
    this.$playerCase = document.querySelector('.playerCase')
    this.$machineCase = document.querySelector('.machineCase')
    this.$playerPokemonStats = document.querySelector('.playerPokemonStats')
    this.$machinePokemonStats = document.querySelector('.machinePokemonStats')
    this.machineInfo = document.querySelector('#machineInfo')
    this.result = document.querySelector('#result')
    this.$pickCard = document.querySelector('#pickCard')
    this.$playBtn = document.querySelector('#playBtn')
    
  },

   cache: {
    showPlayerPokemon: pokemon => {
       Main.$playerCase.src = pokemon.sprites.front_default
       console.log(pokemon)
       Main.$playerPokemonStats.innerHTML = `<span id="playerPokemon">${pokemon.name} </span></br>HP: ${pokemon.stats[0].base_stat}  <input type="radio" name="status" id="player_hp_stats" value="${pokemon.stats[0].base_stat}"></br>
       Attack: ${pokemon.stats[1].base_stat}  <input type="radio" name="status" id="player_atk_stats" value="${pokemon.stats[1].base_stat}"></br>
       Defense: ${pokemon.stats[2].base_stat} <input type="radio" name="status" id="player_def_stats" value="${pokemon.stats[2].base_stat}"></br>
       Special-attack: ${pokemon.stats[3].base_stat}  <input type="radio" name="status" id="player_spc_atk_stats" value="${pokemon.stats[3].base_stat}"></br>
       Special-defense: ${pokemon.stats[4].base_stat}  <input type="radio" name="status" id="player_spc_def_stats" value="${pokemon.stats[4].base_stat}"></br>
       Speed: ${pokemon.stats[5].base_stat}  <input type="radio" name="status" id="player_spd_stats" value="${pokemon.stats[5].base_stat}"></br>
       `
     },

     showMachinePokemon: pokemon => {
    
      Main.$machineCase.src = pokemon.sprites.front_default
      console.log(pokemon)
      Main.$machinePokemonStats.innerHTML = `<span id="machinePokemon">${pokemon.name} </span></br>
       HP:<span id="machineHp">${pokemon.stats[0].base_stat}</span> </br>
       Attack: <span id="machineAtk">${pokemon.stats[1].base_stat}</span> </br>
       Defense: <span id="machineDef">${pokemon.stats[2].base_stat}</span> </br>
       Special-attack: <span id="machineSpcAtk">${pokemon.stats[3].base_stat}</span></br>
       Special-defense: <span id="machineSpcDef">${pokemon.stats[4].base_stat}</span> </br>
       Speed: <span id="machineSpd">${pokemon.stats[5].base_stat} </span>
       `
     },

     fetchPlayerPokemon: () => {
      const playerPokemon = parseInt(Math.random() * 150)
      fetch(`https://pokeapi.co/api/v2/pokemon/${playerPokemon}`)
        .then(turnIntoJson)
        .then(Main.cache.showPlayerPokemon)
        .catch(showError)
    },
    
    fetchMachinePokemon: () => {
      const machinePokemon = parseInt(Math.random() * 150)
      fetch(`https://pokeapi.co/api/v2/pokemon/${machinePokemon}`)
        .then(turnIntoJson)
        .then(Main.cache.showMachinePokemon)
        .catch(showError2)
    },

    battle: (pokemon, stat) => {
      
        const hp_stat = document.getElementById('player_hp_stats')
        const atk_stat = document.getElementById('player_atk_stats')
        const def_stat = document.getElementById('player_def_stats')
        const spc_atk_stat = document.getElementById('player_spc_atk_stats')
        const spc_def_stat = document.getElementById('player_spc_def_stats')
        const spd_stat = document.getElementById('player_spd_stats')
        const playerPokemon = document.getElementById('playerPokemon').innerHTML
        console.log(`o ${pokemon} possui stats de ${stat}`)
        if (situationHp == true) {
          if (hp_stat.value > stat) {
            playerScore.push(1)
            result.classList.remove('hidden')
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>You WIN!! Your <span class="pokemon-name">${playerPokemon}</span> has ${hp_stat.value} HP against ${stat} HP from <span class="pokemon-name">${pokemon}</span>!!`
          } else if (hp_stat.value < stat) {
            result.classList.remove('hidden')
            machineScore.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>You LOSE!! Your <span class="pokemon-name">${playerPokemon}</span> has ${hp_stat.value} HP against ${stat} HP from <span class="pokemon-name">${pokemon}</span>!!`
          } else {
            result.classList.remove('hidden')
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>DRAW!! Your <span class="pokemon-name">${playerPokemon}</span> and <span class="pokemon-name">${pokemon}</span> have ${hp_stat.value} HP!!`
          }
        } else if (situationAtk == true) {
          if (atk_stat.value > stat) {
            result.classList.remove('hidden')
            playerScore.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>You WIN!! Your <span class="pokemon-name">${playerPokemon}</span> has ${atk_stat.value} Atk. against ${stat} Atk from <span class="pokemon-name">${pokemon}</span>!!`
          } else if (atk_stat.value < stat) {
            result.classList.remove('hidden')
            machineScore.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>You LOSE!! Your <span class="pokemon-name">${playerPokemon}</span> has ${atk_stat.value} Atk. against ${stat} Atk from <span class="pokemon-name"> ${pokemon} </span>!!`
          } else {
            result.classList.remove('hidden')
            draw.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>DRAW!! Your <span class="pokemon-name">${playerPokemon}</span> and <span class="pokemon-name">${pokemon}</span> have ${atk_stat.value} Atk.!!`
          }
        } else if (situationDef == true) {
          if (def_stat.value > stat) {
            result.classList.remove('hidden')
            playerScore.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>You WIN! Your <span class="pokemon-name">${playerPokemon}</span> has ${def_stat.value} Def. against ${stat} Def. from <span class="pokemon-name">${pokemon}</span>!!`
          } else if (def_stat.value < stat) {
            result.classList.remove('hidden')
            machineScore.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>You LOSE!! Your <span class="pokemon-name">${playerPokemon}</span> has ${def_stat.value} Def. against ${stat} Def. from <span class="pokemon-name">${pokemon}</span> !!`
          } else {
            result.classList.remove('hidden')
            draw.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>DRAW!! Your <span class="pokemon-name">${playerPokemon}</span> and <span class="pokemon-name">${pokemon}</span> have ${def_stat.value} Def.!!`
          }
        } else if (situationSpcAtk == true) {
          if (spc_atk_stat.value > stat) {
            result.classList.remove('hidden')
            playerScore.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>You WIN!! Your <span class="pokemon-name">${playerPokemon}</span> has ${spc_atk_stat.value} Spc.Atk. against ${stat} Spc.Atk. from <span class="pokemon-name">${pokemon}</span>!!`
          } else if (spc_atk_stat.value < stat) {
            result.classList.remove('hidden')
            machineScore.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>You LOSE!! Your <span class="pokemon-name">${playerPokemon}</span> has  ${spc_atk_stat.value} Spc.Atk. against ${stat} Spc.Atk. from <span class="pokemon-name">${pokemon}</span> !!`
          } else {
            result.classList.remove('hidden')
            draw.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>DRAW!! Your <span class="pokemon-name">${playerPokemon}</span> and <span class="pokemon-name">${pokemon}</span> have ${spc_atk_stat.value} Spc.Atk.!!`
          }
        } else if (situationSpcDef == true) {
          if (spc_def_stat.value > stat) {
            result.classList.remove('hidden')
            playerScore.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>You WIN!! Your <span class="pokemon-name">${playerPokemon}</span> has ${spc_def_stat.value} Spc.Def. against ${stat} Spc.Def. from <span class="pokemon-name">${pokemon}</span>!!`
          } else if (spc_def_stat.value < stat) {
            result.classList.remove('hidden')
            machineScore.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>You LOSE!! Your <span class="pokemon-name">${playerPokemon}</span> has ${spc_def_stat.value} Spc.Def. against ${stat} Spc.Def. from <span class="pokemon-name">${pokemon}</span>!!`
          } else {
            result.classList.remove('hidden')
            draw.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>DRAW!! Your <span class="pokemon-name">${playerPokemon}</span> and <span class="pokemon-name">${pokemon}</span> have ${spc_def_stat.value} Spc.Def.!!`
          }
        } else if (situationSpd == true) {
          if (spd_stat.value > stat) {
            result.classList.remove('hidden')
            playerScore.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>You WIN!! Your <span class="pokemon-name">${playerPokemon}</span> has  ${spd_stat.value} Spd. against ${stat} Spd. from <span class="pokemon-name">${pokemon}</span>!!`
          } else if (spd_stat.value < stat) {
            result.classList.remove('hidden')
            machineScore.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>You LOSE!! Your <span class="pokemon-name">${playerPokemon}</span> has  ${spd_stat.value} Spd. against ${stat} Spd. from <span class="pokemon-name">${pokemon}</span>!!`
          } else {
            result.classList.remove('hidden')
            draw.push(1)
            document.querySelector(
              '#result'
            ).innerHTML = `</br></br>DRAW!! Your <span class="pokemon-name">${playerPokemon}</span> and <span class="pokemon-name">${pokemon}</span> have ${spd_stat.value} Spd.!!`
          }
        }
      }
      
    
    

    },

  Events: {
    pickCard: () =>  {    
    const self = Main
    
      console.log(self.cache.showMachinePokemon)
      self.cache.fetchPlayerPokemon()
      self.cache.fetchMachinePokemon()
      console.log(self.$playBtn)
      self.$playBtn.disabled = false
      self.$pickCard.disabled = true
      machineInfo.classList.add('hidden')
      result.classList.add('hidden')
      situationAtk = false
      situationDef = false
      situationHp = false
      situationSpcAtk = false
      situationSpcDef = false
      situationSpd = false
      
    },
    play: () => {
      const self = Main
      
      
      const machine_pokemon = document.getElementById('machinePokemon').innerHTML
      const hp_stat = document.getElementById('player_hp_stats')
      const atk_stat = document.getElementById('player_atk_stats')
      const def_stat = document.getElementById('player_def_stats')
      const spc_atk_stat = document.getElementById('player_spc_atk_stats')
      const spc_def_stat = document.getElementById('player_spc_def_stats')
      const spd_stat = document.getElementById('player_spd_stats')
      machineInfo.classList.remove('hidden')
      result.classList.remove('hidden')
      
      console.log(machine_pokemon)
      if (
        hp_stat.checked == false &&
        atk_stat.checked == false &&
        def_stat.checked == false &&
        spc_atk_stat.checked == false &&
        spc_def_stat.checked == false &&
        spd_stat.checked == false
      ) {
        alert('Favor selecionar um Atributo!')
        result.classList.add('hidden')
        machineInfo.classList.add('hidden')
        document.getElementById('#playBtn').disabled = true
        document.getElementById('#pickCard').disabled = false
    
        return
      }
      self.$playBtn.disabled = true
      self.$pickCard.disabled = false
    
      if (firstDuel == false) {
        firstDuel = true
      } else if (firstDuel == true && secondDuel == false) {
        secondDuel = true
      } else if (secondDuel == true && thirdDuel == false) {
        thirdDuel = true
      } else if (thirdDuel == true && fourthDuel == false) {
        fourthDuel = true
      } else if (fourthDuel == true && fifthDuel == false) {
        fifthDuel = true
      } else if (fifthDuel == true) {
        alert(
          `It's over! You won ${playerScore.length}, your opponent won ${machineScore.length} and you had ${draw.length} draws!`
        )
      }
    
      if (hp_stat.checked == true) {
        const machineHp = parseInt(document.getElementById('machineHp').innerHTML)
        situationHp = true
    
        return self.cache.battle(machine_pokemon, machineHp)
      } else if (atk_stat.checked == true) {
        const machineAtk = parseInt(document.getElementById('machineAtk').innerHTML)
        situationAtk = true
    
        return self.cache.battle(machine_pokemon, machineAtk)
      } else if (def_stat.checked == true) {
        const machineDef = parseInt(document.getElementById('machineDef').innerHTML)
        situationDef = true
        return self.cache.battle(machine_pokemon, machineDef)
      } else if (spc_atk_stat.checked == true) {
        const machineSpcAtk = parseInt(
          document.getElementById('machineSpcAtk').innerHTML
        )
        situationSpcAtk = true
        return self.cache.battle(machine_pokemon, machineSpcAtk)
      } else if (spc_def_stat.checked == true) {
        const machineSpcDef = parseInt(
          document.getElementById('machineSpcDef').innerHTML
        )
        situationSpcDef = true
        return self.cache.battle(machine_pokemon, machineSpcDef)
      } else if (spd_stat.checked == true) {
        const machineSpd = parseInt(document.getElementById('machineSpd').innerHTML)
        situationSpd = true
        return self.cache.battle(machine_pokemon, machineSpd)
      }
    }
   
    
  
}

  ,
  bindEvents: function () {
    console.log(this)
    this.$pickCard.addEventListener('click', function() {
      Main.Events.pickCard()
    })
    this.$playBtn.addEventListener('click', function() {
      Main.Events.play()
    })
    console.log(this)
  }
 
}

Main.init()
