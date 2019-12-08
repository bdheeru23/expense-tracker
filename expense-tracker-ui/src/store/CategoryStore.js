import {observable,decorate,action,runInAction} from 'mobx';
import axios from 'axios';

class CategoryStore {

    categories = [];
    isLoading = true;

    async loadCategories(){
        await axios.get('/api/categories')
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

}

decorate(CategoryStore,{
    categories:observable,
    isLoading:observable,
    loadCategories:action
});


export default new CategoryStore();