package com.db.spendingtracker.expensetracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.db.spendingtracker.expensetracker.model.Expense;
import com.db.spendingtracker.expensetracker.model.ExpenseByCategory;
import com.db.spendingtracker.expensetracker.model.ExpenseByPaymentType;

@Repository("expenseRepository")
public interface ExpenseRepository extends JpaRepository<Expense,Long> {
	
	@Query(value="SELECT sum(e.amount) from Expense e")
	public Double totalExpenses();
	
	@Query(value="select c.name as category, sum(e.amount) as amount from Category c, Expense e where c.id=e.category.id group by c.name")
	public List<ExpenseByCategory> getExpensesPerCategory();
	
	@Query(value="select e.paymentType as paymentType, sum(e.amount) as amount from Expense e group by e.paymentType")
	public List<ExpenseByPaymentType> getExpensesByPaymentType();
	
	
}
