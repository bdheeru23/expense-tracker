import {observable,decorate,action,runInAction} from 'mobx';
import axios from 'axios';


let requestHeaders = {
    'Authorization': `Bearer ${sessionStorage.getItem("authToken")}`,
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
}

class CategoryStore {

    categories = [];
    isLoading = true;

    async loadCategories(){
        await axios.get('/api/getcategoriesforuser',{headers:requestHeaders})
        .then(response => {
            runInAction(() => {
                this.categories = response.data;
                this.isLoading = false;
            });
        })
        .catch(function(error){
            console.log(error);
        })
    }

    addCategory = async(category)=>{
        await axios.post('/api/category',category,{headers:requestHeaders}
        ).catch(function(error){
            console.log(error);
        })
    }

    editCategory = async(category) => {
        await axios.post('/api/category',category,{headers:requestHeaders}
        ).catch(function(error){
            console.log(error);
        })
    }

}

decorate(CategoryStore,{
    categories:observable,
    isLoading:observable,
    loadCategories:action
});


export default new CategoryStore();