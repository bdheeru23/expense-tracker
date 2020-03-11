package com.db.spendingtracker.expensetracker.service;

import java.util.List;
import java.util.Optional;

import com.db.spendingtracker.expensetracker.model.DailyExpensesForAMonth;
import com.db.spendingtracker.expensetracker.model.Expense;
import com.db.spendingtracker.expensetracker.model.ExpenseByCategory;
import com.db.spendingtracker.expensetracker.model.ExpenseByPaymentType;

public interface ExpenseRepositoryCustom {
	
	public List<Expense> getExpensesForUser();
	
	public Optional<Expense> getExpense(Long id);
	
	public Double totalExpenses();
	
	public List<ExpenseByCategory> getExpensesPerCategory();
	
	public List<ExpenseByPaymentType> getExpensesByPaymentType();
	
	public List<DailyExpensesForAMonth> getDailyExpensesForAMonth();
}
