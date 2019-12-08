package com.db.spendingtracker.expensetracker.service;

import java.util.List;

import com.db.spendingtracker.expensetracker.model.Expense;
import com.db.spendingtracker.expensetracker.model.ExpenseByCategory;
import com.db.spendingtracker.expensetracker.model.ExpenseByPaymentType;

public interface ExpenseService {
	
	public Double totalExpenses();
	
	public List<ExpenseByCategory> getExpensesPerCategory();
	
	public List<ExpenseByPaymentType> getExpensesByPaymentType();
}
