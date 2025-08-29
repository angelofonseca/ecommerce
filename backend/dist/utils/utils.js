const isValidEmail = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
};
const isValidCPF = (cpf) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
};
export default {
    isValidEmail,
    isValidCPF
};
