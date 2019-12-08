import {observable, action,decorate,runInAction} from 'mobx';
import axios from 'axios';

class ExpenseStore {
    expenses = [];
    totalExpenses = 0;
    isLoading = true;

    async loadExpenses(){
        await axios.get('/api/expenses')
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
        await axios.get('/api/expenses/total')
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
        axios.delete(`/api/expense/${id}`,
        {
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }
        ).then(() => {
            let updatedExpenses = this.expenses.filter(i => i.id !== id);
            this.expenses = updatedExpenses;
        });
    }

    editExpense = async(id) => {
        axios.put(`/api/expense/${id}`,
        {
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }
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

}

decorate(ExpenseStore,{
    expenses : observable,
    isLoading :  observable,
    totalExpenses : observable,
    loadExpenses : action
})
export default new ExpenseStore();