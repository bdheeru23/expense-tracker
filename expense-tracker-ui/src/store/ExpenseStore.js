import {observable, action,decorate,runInAction} from 'mobx';
import axios from 'axios';

let requestHeaders = {
    'Authorization': `Bearer ${sessionStorage.getItem("authToken")}`,
    'Content-type':'application/json'
}

class ExpenseStore {
    expenses = [];
    totalExpenses = 0;
    isLoading = true;

    async loadExpenses(){
        await axios.get('/api/getexpensesforuser',
        {headers:requestHeaders})
        .then(responseExp => {
            runInAction(() => {
                this.expenses = responseExp.data;
                this.isLoading = false;
            });
        })
        .catch(function(error){
            console.log(error);
        })
    }

    async loadTotalExpenses(){
        await axios.get('/api/expenses/total',{headers:requestHeaders})
        .then(responseExp => {
            runInAction(() => {
                this.totalExpenses = responseExp.data;
                this.isLoading = false;
            });
        })
        .catch(function(error){
            console.log(error);
        })
    }

    deleteExpense = async(id) => {
        axios.delete(`/api/expense/${id}`,{headers:requestHeaders}
        ).then(() => {
            let updatedExpenses = this.expenses.filter(i => i.id !== id);
            this.expenses = updatedExpenses;
        });
    }

    editExpense = async(id) => {
        axios.put(`/api/expense/${id}`,{headers:requestHeaders}
        ).then(responseExp => {
            runInAction(() => {
                this.totalExpenses = responseExp.data;
                this.isLoading = false;
            });
        })
        .catch(function(error){
            console.log(error);
        })
    }

    addExpense = async(expense) => {
        axios.post('/api/expense',expense,{headers:requestHeaders}
        ).catch(function(error){
            console.log(error);
        })
    }

}

decorate(ExpenseStore,{
    expenses : observable,
    isLoading :  observable,
    totalExpenses : observable,
    loadExpenses : action
})
export default new ExpenseStore();