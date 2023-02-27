

// variables //
clickBtnHTML = document.querySelector('.clickBtn')
balanceHTML = document.querySelector('.balance')
perClickHTML = document.querySelector('.perClick')
upgradesListHTML = document.querySelector('.upgrades-list')
perSecHTML = document.querySelector('.perSec')
infoHTML = document.querySelector('.info')

balance = 0
formula = 1
passive = 0

const upgrades = {
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
            this.displayPrice = this.displayPrice * 3
        }
    }
}
// functions //
showUpgrades()
passiveIncome()

// event listeners //
clickBtnHTML.addEventListener('click', function(){
    balance = balance + formula
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