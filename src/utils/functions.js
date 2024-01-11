export const getAge = (birthDate) => {
    return Math.floor((new Date() - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
}

export const orderUsersByBirthDateDesc = (data, nextData) => {
    if (data.dataNascimento) {
        if (data.idade < nextData.idade) {
            return 1
        } else {
            return -1
        }
    } else {
        return 1
    }
}