const genRandomString = (length) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

const calcChallengeFromVerifier = async (verifier = "") => {
    const hashedValue = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
    return btoa(String.fromCharCode(...new Uint8Array(hashedValue)))
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export const generatePKCE = async () => {
    const verifier = genRandomString(24);
    const code_challenge = await calcChallengeFromVerifier(verifier);
    sessionStorage.setItem("verifier", verifier);
    return code_challenge;
}

