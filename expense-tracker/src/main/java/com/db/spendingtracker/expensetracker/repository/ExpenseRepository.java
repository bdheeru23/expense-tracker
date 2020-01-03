package com.db.spendingtracker.expensetracker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.db.spendingtracker.expensetracker.model.Expense;
import com.db.spendingtracker.expensetracker.model.ExpenseByCategory;
import com.db.spendingtracker.expensetracker.model.ExpenseByPaymentType;
import com.db.spendingtracker.expensetracker.service.ExpenseRepositoryCustom;

@Repository("expenseRepository")
public interface ExpenseRepository extends JpaRepository<Expense,Long>,ExpenseRepositoryCustom {
	
	@Query(value="select e from Expense e")
	public List<Expense> getExpenses();
	
	@Query(value="select e from Expense e where e.id=?1")
	public Optional<Expense> getExpense(Long id);
	
	@Query(value="SELECT sum(e.amount) from Expense e")
	public Double totalExpenses();
	
	@Query(value="select c.name as category, sum(e.amount) as amount from Category c, Expense e where c.id=e.category.id and c.user.username=e.user.username and e.user.username=?#{principal.username} group by c.name")
	public List<ExpenseByCategory> getExpensesPerCategory();
	
	@Query(value="select e.paymentType as paymentType, sum(e.amount) as amount from Expense e where e.user.username = ?#{principal.username} group by e.paymentType")
	public List<ExpenseByPaymentType> getExpensesByPaymentType();
	
	@Query(value="select e from Expense e where e.user.username = ?#{principal.username}")
	public List<Expense> getExpensesForUser();
	
}
