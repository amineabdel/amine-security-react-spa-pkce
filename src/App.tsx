import './App.scss';
import * as React from 'react';
import { ServAuthAPi } from './service/ServAuthAPi';



class App extends React.Component<any, any> {
    public ServAuthAPi: ServAuthAPi;


    constructor(props: any) {
        super(props);

        this.ServAuthAPi = new ServAuthAPi();
        //initializing 
        this.state = { user: {}, api: {} };

    }

    public componentDidMount() {
        this.getUser();
    }


    public login = () => {
        this.ServAuthAPi.login();

    };

    public callApi = () => {
        this.ServAuthAPi.callApi().then(data => {
            this.setState({ api: data.data });
        })
    };


    public logout = () => {
        this.ServAuthAPi.logout();
    };


    public getUser = () => {
        this.ServAuthAPi.getUser().then(user => {
            this.setState({ user });
        });
    };


    public render() {
        //https://codepen.io/joellesenne/pen/mdCHA
        //I couldn't see the problem at first why in the p tag the profile isn't visible. 
        // those errors is what I got:
        //https://stackoverflow.com/questions/51008159/reactjs-error-if-you-meant-to-render-a-collection-of-children-use-an-array-ins
        //https://stackoverflow.com/questions/37997893/promise-error-objects-are-not-valid-as-a-react-child
        //https://www.quora.com/How-can-I-solve-the-Uncaught-Error-Objects-are-not-valid-as-a-React-child-found-object-with-keys-original-thumbnail-If-you-meant-to-render-a-collection-of-children-can-you-use-an-array-instead

        //Well As you can see below the solution was to stringify it haha. I've been too long looking for a solution.
        const isLoggedIn = this.state.user;
        return (
            <div className="App">
                <h1>Assignment Security.</h1>
                <h2>Security react spa pkce oidc.</h2>
                <p>profile =  <b>{isLoggedIn ? JSON.stringify(isLoggedIn.profile) : <button type="submit" className="b1" onClick={this.login}>sorry you're not logged in yet.Click <span>here</span> to login</button>}</b> </p>
                <button className="b2" onClick={this.callApi}>API</button>
                <p>api =<b>{JSON.stringify(this.state.api)}</b> </p>
                <button className="b3" onClick={this.logout}>Logout</button>
            </div>
        );
    }
}


export default App;