package com.db.spendingtracker.expensetracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.db.spendingtracker.expensetracker.model.Expense;
import com.db.spendingtracker.expensetracker.model.ExpenseByCategory;
import com.db.spendingtracker.expensetracker.model.ExpenseByPaymentType;
import com.db.spendingtracker.expensetracker.repository.ExpenseRepository;

@Transactional
@Service("expenseService")
public class ExpenseServiceImpl implements ExpenseService{
	
	@Autowired
	private ExpenseRepository expenseRepository;
	
	@Override
	public Double totalExpenses() {
		return expenseRepository.totalExpenses();
	}
	
	@Override
	public List<ExpenseByCategory> getExpensesPerCategory() {
		return expenseRepository.getExpensesPerCategory();
	}
	
	@Override
	public List<ExpenseByPaymentType> getExpensesByPaymentType() {
		return expenseRepository.getExpensesByPaymentType();
	}
	
	
}
