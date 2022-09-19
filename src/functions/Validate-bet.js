export function ValidateBet () {
    const value = sessionStorage.getItem('betPlaced')
    if (JSON.parse(value) !== 0) {
        console.log('greater than')
        return window.location.assign('/menu')
    }else if (!value) {
        console.log('value')
        return window.location.assign('/menu')
    }
}