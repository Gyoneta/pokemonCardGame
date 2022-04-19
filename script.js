let situationAtk = false
let situationDef = false
let situationHp = false
let situationSpcAtk = false
let situationSpcDef = false
let situationSpd = false
let $playerCase = document.querySelector('.playerCase')
let $machineCase = document.querySelector('.machineCase')
let $playerPokemonStats = document.querySelector('.playerPokemonStats')
let $machinePokemonStats = document.querySelector('.machinePokemonStats')
const machineInfo = document.querySelector('#machineInfo')
const result = document.querySelector('#result')
let firstDuel = false
let secondDuel = false
let thirdDuel = false
let fourthDuel = false
let fifthDuel = false
let playerScore = []
let machineScore = []
let draw = []

const pickCard = () => {
  fetchPlayerPokemon()
  fetchMachinePokemon()
  document.getElementById('playBtn').disabled = false
  document.getElementById('randomCardPick').disabled = true
  machineInfo.classList.add('hidden')
  result.classList.add('hidden')
  situationAtk = false
  situationDef = false
  situationHp = false
  situationSpcAtk = false
  situationSpcDef = false
  situationSpd = false
}

const fetchPlayerPokemon = () => {
  const playerPokemon = parseInt(Math.random() * 150)
  fetch(`https://pokeapi.co/api/v2/pokemon/${playerPokemon}`)
    .then(turnIntoJson)
    .then(showPlayerPokemon)
    .catch(showError)
}

const fetchMachinePokemon = () => {
  const machinePokemon = parseInt(Math.random() * 150)
  fetch(`https://pokeapi.co/api/v2/pokemon/${machinePokemon}`)
    .then(turnIntoJson)
    .then(showMachinePokemon)
    .catch(showError2)
}

const turnIntoJson = response => {
  return response.json()
}

const showPlayerPokemon = pokemon => {
  $playerCase.src = pokemon.sprites.front_default

  $playerPokemonStats.innerHTML = `</br><span id="playerPokemon">${pokemon.name} </span></br>HP: ${pokemon.stats[0].base_stat}  <input type="radio" name="status" id="player_hp_stats" value="${pokemon.stats[0].base_stat}"></br>
  Attack: ${pokemon.stats[1].base_stat}  <input type="radio" name="status" id="player_atk_stats" value="${pokemon.stats[1].base_stat}"></br>
  Defense: ${pokemon.stats[2].base_stat} <input type="radio" name="status" id="player_def_stats" value="${pokemon.stats[2].base_stat}"></br>
  Special-attack: ${pokemon.stats[3].base_stat}  <input type="radio" name="status" id="player_spc_atk_stats" value="${pokemon.stats[3].base_stat}"></br>
  Special-defense: ${pokemon.stats[4].base_stat}  <input type="radio" name="status" id="player_spc_def_stats" value="${pokemon.stats[4].base_stat}"></br>
  Speed: ${pokemon.stats[5].base_stat}  <input type="radio" name="status" id="player_spd_stats" value="${pokemon.stats[5].base_stat}"></br>
  `
}

const showMachinePokemon = pokemon => {
  $machineCase.src = pokemon.sprites.front_default
  $machinePokemonStats.innerHTML = `</br> <span id="machinePokemon">${pokemon.name} </span></br>HP:<span id="machineHp" value="${pokemon.stats[0].base_stat}">${pokemon.stats[0].base_stat}</span> </br>
   Attack: <span id="machineAtk" value="${pokemon.stats[1].base_stat}">${pokemon.stats[1].base_stat}</span> </br>
  Defense: <span id="machineDef" value="${pokemon.stats[2].base_stat}">${pokemon.stats[2].base_stat}</span> </br>
  Special-attack: <span id="machineSpcAtk" value="${pokemon.stats[3].base_stat}">${pokemon.stats[3].base_stat}</span></br>
  Special-defense: <span id="machineSpcDef" value="${pokemon.stats[4].base_stat}">${pokemon.stats[4].base_stat}</span> </br>
 Speed: <span id="machineSpd" value="${pokemon.stats[5].base_stat}">${pokemon.stats[5].base_stat} </span>
  `
}

const showError = () => {
  console.log('deu ruim')
}

const showError2 = () => {
  console.log('deu ruim2')
}

const play = () => {
  document.getElementById('playBtn').disabled = true
  document.getElementById('randomCardPick').disabled = false
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
    machineInfo.classList.add('hidden')
    document.getElementById('randomCardPick').disabled = true
    document.getElementById('playBtn').disabled = false

    return
  }

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
      `Acabaram as lutas! Você ganhou ${playerScore.length}, seu adversário ganhou ${machineScore.length} e foram ${draw.length}!`
    )
  }

  if (hp_stat.checked == true) {
    const machineHp = parseInt(document.getElementById('machineHp').innerHTML)
    situationHp = true

    return battle(machine_pokemon, machineHp)
  } else if (atk_stat.checked == true) {
    const machineAtk = parseInt(document.getElementById('machineAtk').innerHTML)
    situationAtk = true

    return battle(machine_pokemon, machineAtk)
  } else if (def_stat.checked == true) {
    const machineDef = parseInt(document.getElementById('machineDef').innerHTML)
    situationDef = true
    return battle(machine_pokemon, machineDef)
  } else if (spc_atk_stat.checked == true) {
    const machineSpcAtk = parseInt(
      document.getElementById('machineSpcAtk').innerHTML
    )
    situationSpcAtk = true
    return battle(machine_pokemon, machineSpcAtk)
  } else if (spc_def_stat.checked == true) {
    const machineSpcDef = parseInt(
      document.getElementById('machineSpcDef').innerHTML
    )
    situationSpcDef = true
    return battle(machine_pokemon, machineSpcDef)
  } else if (spd_stat.checked == true) {
    const machineSpd = parseInt(document.getElementById('machineSpd').innerHTML)
    situationSpd = true
    return battle(machine_pokemon, machineSpd)
  }
}

const battle = (pokemon, stat) => {
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
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>Você GANHOU pois seu ${playerPokemon} possui ${hp_stat.value} de HP contra ${stat} de HP do ${pokemon} adversário!`
    } else if (hp_stat.value < stat) {
      machineScore.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>Você PERDEU pois seu ${playerPokemon} possui  ${hp_stat.value} de HP contra ${stat} de HP do ${pokemon} adversário!`
    } else {
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>EMPATOU!! TANTO seu ${playerPokemon} quanto ${pokemon} possuem HP de ${hp_stat.value} !`
    }
  } else if (situationAtk == true) {
    if (atk_stat.value > stat) {
      playerScore.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>Você GANHOU pois seu ${playerPokemon} possui  ${atk_stat.value} de Atk contra ${stat} de Atk do ${pokemon} adversário!`
    } else if (atk_stat.value < stat) {
      machineScore.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>Você PERDEU pois seu ${playerPokemon} possui  ${atk_stat.value} de Atk contra ${stat} de Atk do ${pokemon} adversário!`
    } else {
      draw.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>EMPATOU!! TANTO seu ${playerPokemon} quanto ${pokemon} possuem Atk de ${atk_stat.value} !`
    }
  } else if (situationDef == true) {
    if (def_stat.value > stat) {
      playerScore.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>Você GANHOU pois seu ${playerPokemon} possui  ${def_stat.value} de Def contra ${stat} de Def do ${pokemon} adversário!`
    } else if (def_stat.value < stat) {
      machineScore.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>Você PERDEU pois seu ${playerPokemon} possui  ${def_stat.value} de Def contra ${stat} de Def do ${pokemon} adversário!`
    } else {
      draw.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>EMPATOU!! TANTO seu ${playerPokemon} quanto ${pokemon} possuem Def de ${def_stat.value} !`
    }
  } else if (situationSpcAtk == true) {
    if (spc_atk_stat.value > stat) {
      playerScore.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>Você GANHOU pois seu ${playerPokemon} possui  ${spc_atk_stat.value} de Spc.Atk contra ${stat} de SpcAtk do ${pokemon} adversário!`
    } else if (spc_atk_stat.value < stat) {
      machineScore.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>Você PERDEU pois seu ${playerPokemon} possui  ${spc_atk_stat.value} de SpcAtk contra ${stat} de Spc.Atk do ${pokemon} adversário!`
    } else {
      draw.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>EMPATOU!! TANTO seu ${playerPokemon} quanto ${pokemon} possuem Atk de ${spc_atk_stat.value} !`
    }
  } else if (situationSpcDef == true) {
    if (spc_def_stat.value > stat) {
      playerScore.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>Você GANHOU pois seu ${playerPokemon} possui  ${spc_def_stat.value} de Spc.Def contra ${stat} de Atk do ${pokemon} adversário!`
    } else if (spc_def_stat.value < stat) {
      machineScore.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>Você PERDEU pois seu ${playerPokemon} possui  ${spc_def_stat.value} de Spc.Def contra ${stat} de HP do ${pokemon} adversário!`
    } else {
      draw.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>EMPATOU!! TANTO seu ${playerPokemon} quanto ${pokemon} possuem Spc.Def de ${spc_def_stat.value} !`
    }
  } else if (situationSpd == true) {
    if (spd_stat.value > stat) {
      playerScore.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>Você GANHOU pois seu ${playerPokemon} possui  ${spd_stat.value} de Spd contra ${stat} de Spd do ${pokemon} adversário!`
    } else if (spd_stat.value < stat) {
      machineScore.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>Você PERDEU pois seu ${playerPokemon} possui  ${spd_stat.value} de Spd contra ${stat} de Spd do ${pokemon} adversário!`
    } else {
      draw.push(1)
      document.querySelector(
        '#result'
      ).innerHTML = `</br></br></br>EMPATOU!! TANTO seu ${playerPokemon} quanto ${pokemon} possuem Spd de ${spd_stat.value} !`
    }
  }
}

//teste
