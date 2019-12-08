import {observable, action,decorate,runInAction} from 'mobx';
import axios from 'axios';

class AnalysisStore {

    categories = [];
    amounts=[];
    paymentTypes=[];
    isLoading = true;

    async loadExpenseByCategory(){
        await axios.get('/api/analysis/expense-by-category')
        .then(responseExp => {
            runInAction(() => {
                this.categories = responseExp.data.map((dataRow) => dataRow.category);
                this.amounts = responseExp.data.map((dataRow) => dataRow.amount);
                this.isLoading = false;

            });
        })
        .catch(function(error){
            console.log(error);
        })
    }

    async loadExpensesByPaymentTypes(){
        await axios.get('/api/analysis/expense-by-payment-type')
        .then(responseExp => {
            runInAction(() => {
                this.paymentTypes = responseExp.data.map((dataRow) => dataRow.paymentType);
                this.amounts = responseExp.data.map((dataRow) => dataRow.amount);
                this.isLoading = false;
            });
        }).catch(function(error){
            console.log(error);
        })
    }
}

decorate(AnalysisStore,{
    categories : observable,
    amounts: observable,
    paymentTypes: observable,
    isLoading : observable,
    loadExpenseByCategory:action,
    loadExpensesByPaymentTypes:action
})

export default new AnalysisStore();