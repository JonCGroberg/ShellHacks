// clear all local cookies
export const logout = () => {
    // loop through all cookies and delete them
    document.cookie.split(";").forEach((c) => {
        document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
};