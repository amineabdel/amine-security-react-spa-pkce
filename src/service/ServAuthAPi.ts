import { User, UserManager } from 'oidc-client';
import axios from 'axios';


export class ServAuthAPi {
  public userManager: UserManager;

  constructor() {
    //inspiration links below:
    //https://github.com/maxmantz/redux-oidc/wiki/2.-Configuration
    //https://github.com/IdentityModel/oidc-client-js/wiki
    //https://www.npmjs.com/package/react-openidconnect
    //https://github.com/stsiwo/idp_auth_pkce_client/blob/master/src/config/oidc.js
    //https://www.npmjs.com/package/oidc-client
    //https://github.com/IdentityModel/oidc-client-js

    const conf = {
      authority: 'https://demo.identityserver.io/',
      client_id: 'spa',
      redirect_uri: 'http://localhost:4200/signin-callback.html',
      silent_redirect_uri: 'http://localhost:4200/silent-renew.html',
      post_logout_redirect_uri: 'http://localhost:4200/',
      //we receive an authorization code in return from the authorization endpoint
      //https://www.scottbrady91.com/Angular/Migrating-oidc-client-js-to-use-the-OpenID-Connect-Authorization-Code-Flow-and-PKCE

      //https://manfredsteyer.github.io/angular-oauth2-oidc/docs/additional-documentation/code-flow-+-pcke.html
      //To configure your solution for code flow + PKCE you have to set the responseType to code:
      response_type: 'code',
      scope: 'openid profile email api'
    };

    //put settings object in UserManager.
    //after that an user login, you can manage what you get back from OIDC Provider like the access token.
    //https://github.com/IdentityModel/oidc-client-js/wiki#configuration
    this.userManager = new UserManager(conf);
  }

  //authorization
  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }


  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  //API
  public callApi(): Promise<any> {
    //PS. this follows only the happy path. When you click on API without being logged in. 
    //You'll get this error: 'Unhandled Rejection (TypeError): Cannot read property 'access_token' of null'

    //After initializing getUser() above, we want to do something with it
    //and below you can see that with axios (similar as with fetch) we want to get a http request from api/test and get the access token
    return this.getUser().then(data => {
      return axios.get('https://demo.identityserver.io/api/test', {
        headers: {
          Accept: 'application/json', 'Authorization': 'Bearer ' + data.access_token
        }
      });
    });
  }



}
