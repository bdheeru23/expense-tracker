import {observable,decorate,action,runInAction} from 'mobx';
import axios from 'axios';

let requestHeaders = {
    'Authorization': `Bearer ${sessionStorage.getItem("authToken")}`,
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
}

class AuthStore {
    userdetails = ''

    async getUserDetails(){
        let userName = sessionStorage.getItem("userDetails");
        await axios.get(`/getuserdetails/${userName}`,
        {headers : requestHeaders}).then(response => {
            runInAction(() => {
                console.log("userDetails: "+response.data);
                this.userdetails = response.data;
            });
        }).catch(function(error){
            console.log(error);
        });
    }
}

decorate(AuthStore,{
    userdetails:observable,
    getUserDetails:action
});


export default new AuthStore();