

// variables //
clickBtnHTML = document.querySelector('.clickBtn')
balanceHTML = document.querySelector('.balance')
perClickHTML = document.querySelector('.perClick')
upgradesListHTML = document.querySelector('.upgrades-list')
perSecHTML = document.querySelector('.perSec')
infoHTML = document.querySelector('.info')

let balance = parseFloat(localStorage.getItem('balance')) || 0;
let formula = parseFloat(localStorage.getItem('formula')) || 1;
let passive = parseFloat(localStorage.getItem('passive')) || 0;

upgrades = {
    Shestyorki: {
        displayName: 'Нанять шестёрок',
        displayPrice: 100,
        displayDescription: 'Вербовка шестёрок начинает приносить вам пассивный доход (+0.5 в секунду)',
        displayLevel: 1,
        buff: function () {
            this.displayLevel = this.displayLevel + 1
            passive = passive + 0.5
            this.displayPrice = this.displayPrice * 2
        }
    },
    Costume: {
        displayName: 'Купить презентабельный костюм',
        displayPrice: 750,
        displayDescription: 'Покупка нового, стильного костюма определенно заставит ваших клиентов уважать Вас. (*1.5 за клик)',
        displayLevel: 1,
        buff: function () {
            this.displayLevel = this.displayLevel + 1
            formula = formula * 1.5
            this.displayPrice = this.displayPrice * 2
        }
    },
    Mining: {
      displayName: "Купить майнинг ферму",
      displayPrice: 5000,
      displayDescription: "Приобретая майнинг ферму вы начинаете получать +5 $ в секунду",
      displayLevel: 1,
      buff: function() {
        this.displayLevel = this.displayLevel + 1
        passive = passive + 5
        this.displayPrice = this.displayPrice * 3
      }
    }
}

// functions //
clearInfo()
showInfo()
clearUpgrades()
getUpgrades()
showUpgrades()
passiveIncome()

// event listeners //
clickBtnHTML.addEventListener('click', function(){
    balance = balance + formula
    saveData()
    clickHandler()
    
})


// functions //
function clickHandler () {
    clearInfo()
    showInfo()

}

function showUpgrades () {
    clearUpgrades()
    for (let upgrade in upgrades) {
        upgradeHTML = document.createElement('li')
        upgradeDescHTML = document.createElement('p')
        upgradeBtnHTML = document.createElement('button')

        upgradeHTML.innerHTML = `<b>${upgrades[upgrade].displayName}</b> [${upgrades[upgrade].displayLevel} Ур.]`
        upgradeDescHTML.innerHTML = upgrades[upgrade].displayDescription
        upgradeBtnHTML.innerHTML = `${upgrades[upgrade].displayPrice} $`

        upgradeBtnHTML.classList.add('btn', 'btn-dark')
        upgradeBtnHTML.style.marginBottom = '15px'
        upgradesListHTML.append(upgradeHTML)
        upgradesListHTML.append(upgradeDescHTML)
        upgradesListHTML.append(upgradeBtnHTML)

        upgradeBtnHTML.addEventListener('click', function() {
            if (balance < upgrades[upgrade].displayPrice) {

            } else {
                balance = balance - upgrades[upgrade].displayPrice
                upgrades[upgrade].buff()
                showUpgrades()
                clearInfo()
                showInfo()
                saveUpgrades()
                saveData()
            }
        })


    }
}

function clearUpgrades () {
    while (upgradesListHTML.firstChild) {
        upgradesListHTML.removeChild(upgradesListHTML.firstChild)
      }
}

function passiveIncome () {
    setInterval(function () {
        if (passive != 0) {
            balance = balance + passive
            console.log('added passive income!')
            clearInfo()
            showInfo()
            saveData()
        }
    }, 1000 )
}

function clearInfo () {
    while (infoHTML.firstChild) {
        infoHTML.removeChild(infoHTML.firstChild)
    }
}

function showInfo () {
    balanceHTML = document.createElement('h2')
    perClickHTML = document.createElement('p')
    perSecHTML = document.createElement('p')

    balanceHTML.classList.add('balance', 'sample-text')
    perClickHTML.classList.add('perClick', 'sample-text')
    perSecHTML.classList.add('perSec', 'sample-text')


    balanceHTML.innerHTML = `${Math.round(balance)} $`
    perClickHTML.innerHTML = `Ваша выручка за клик: ${formula} $`
    perSecHTML.innerHTML = `Ваша выручка в секунду: ${passive} $`

    infoHTML.append(balanceHTML)
    infoHTML.append(perClickHTML)
    infoHTML.append(perSecHTML)
}

function saveUpgrades () {
    localStorage.setItem('upgrades', JSON.stringify({
        Shestyorki: {
          displayLevel: upgrades.Shestyorki.displayLevel,
          displayPrice: upgrades.Shestyorki.displayPrice
        },
        Costume: {
          displayLevel: upgrades.Costume.displayLevel,
          displayPrice: upgrades.Costume.displayPrice
        }
    }))
}

function getUpgrades () {
    const savedUpgrades = JSON.parse(localStorage.getItem('upgrades'));
    if (savedUpgrades) {
        upgrades.Shestyorki.displayLevel = savedUpgrades.Shestyorki.displayLevel;
        upgrades.Shestyorki.displayPrice = savedUpgrades.Shestyorki.displayPrice;
        upgrades.Costume.displayLevel = savedUpgrades.Costume.displayLevel;
        upgrades.Costume.displayPrice = savedUpgrades.Costume.displayPrice;
    }
}

function saveData () {
    localStorage.setItem('balance', balance)
    localStorage.setItem('passive', passive)
    localStorage.setItem('formula', formula)
}