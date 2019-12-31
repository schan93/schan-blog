import auth0 from 'auth0-js';

class Auth {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            redirectUri: 'http://localhost:8081/callback',
            responseType: 'id_token',
            scope: 'openid profile'
        });
    }

    isAuthenticated = () => {
        if(!this.expiresAt) {
            return false;
        } 
        return new Date().getTime() < this.expiresAt;
    }

    setSession = (authResult) => {
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
    }

    signin = () => {
        this.auth0.authorize();
    }

    signout = () => {
        this.auth0.logout({
            returnTo: 'http://localhost:8081',
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
          });
    }

    silentAuth = () => {
        return new Promise((resolve, reject) => {
          this.auth0.checkSession({}, (err, authResult) => {
              console.log("Auth result: ", authResult);
            if (err) {
                console.log("Err: ", err);
                return reject(err);
            } 
            this.setSession(authResult);
            resolve();
          });
        });
      }

    getProfile = () => {
        return this.profile;
    }

    getIdToken() {
        return this.idToken;
    }

    handleAuthentication = () => {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if(err) return reject(err);
                if(!authResult || !authResult.idToken) {
                    return reject(err);
                }
                this.setSession(authResult);
                resolve();
            });
        });
    }
}

const auth = new Auth();

export default auth;