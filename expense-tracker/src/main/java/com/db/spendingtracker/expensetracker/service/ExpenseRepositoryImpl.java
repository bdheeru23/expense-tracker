package com.db.spendingtracker.expensetracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.db.spendingtracker.expensetracker.model.DailyExpensesForAMonth;
import com.db.spendingtracker.expensetracker.model.Expense;
import com.db.spendingtracker.expensetracker.model.ExpenseByCategory;
import com.db.spendingtracker.expensetracker.model.ExpenseByPaymentType;
import com.db.spendingtracker.expensetracker.repository.ExpenseRepository;

@Transactional
@Service("expenseService")
public class ExpenseRepositoryImpl implements ExpenseRepositoryCustom{
	
	@Autowired
	private ExpenseRepository expenseRepository;
	
	@Override
	public Optional<Expense> getExpense(Long id){
		return expenseRepository.findById(id);
	}
	
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
	
	@Override
	public List<Expense> getExpensesForUser() {
		return expenseRepository.getExpensesForUser();
	}
	
	@Override
	public List<DailyExpensesForAMonth> getDailyExpensesForAMonth(){
		return expenseRepository.getDailyExpensesForAMonth();
	}
	
	
}
