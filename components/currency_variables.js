export const currencyInfo = [
    {
        id: 1,
        currencyName: "Chinese Yuan",
        currencySymbol: "￥",
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
        initalState: {
            asNum1: 1,
            asNum2: {
                toUSD: 6.67,
                toJPY: 0.056,
            },
        },
        historyTitle: 'cny',
        
    },
    {
        id:2, 
        currencyName: "US Dollar",
        currencySymbol: "$",
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
        initalState: {
            asNum1: 1,
            asNum2: {
                toCNY: 0.15,
                toJPY: 0.009,
            },
        },
        historyTitle: 'usd',
    },
    {
        id: 3,
        currencyName: 'Japenese Yen',
        currencySymbol: '¥',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg',
        initalState: {
            asNum1: 1,
            asNum2: {
                toCNY: 17.775,
                toUSD: 110.77,
            },
        },
        historyTitle: 'jpy',
    },
    {
        id: 'Example',
        currencyName: '',
        currencySymbol: '',
        currencyImage: '',
        initalState: {
            asNum1: 1,
            asNum2: {

            },
        },
        historyTitle: '',
    },

]

export const findCurrency = (value) => {
    for (let i = 0; i<currencyInfo.length; i++) {
        if (value == currencyInfo[i].currencyName) {
            return i
        }
    }
}