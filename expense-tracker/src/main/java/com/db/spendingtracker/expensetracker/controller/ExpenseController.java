package com.db.spendingtracker.expensetracker.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.hibernate.criterion.Order;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.db.spendingtracker.expensetracker.model.DailyExpensesForAMonth;
import com.db.spendingtracker.expensetracker.model.Expense;
import com.db.spendingtracker.expensetracker.model.ExpenseByCategory;
import com.db.spendingtracker.expensetracker.model.ExpenseByPaymentType;
import com.db.spendingtracker.expensetracker.repository.ExpenseRepository;

@RestController
@RequestMapping("/api")
public class ExpenseController {
	
	private ExpenseRepository expenseRepository;
	
	public ExpenseController(ExpenseRepository expenseRepository) {
		super();
		this.expenseRepository = expenseRepository;
	}
	
	@GetMapping("/getexpensesforuser")
	List<Expense> getExpensesForUser(){
		return expenseRepository.getExpensesForUser();
	}
	
	@GetMapping("/expense/{id}")
	Optional<Expense> getExpense(@PathVariable Long id){
		return expenseRepository.findById(id);
	}
	
	@PostMapping("/expense")
	ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense)throws URISyntaxException{
		Expense result = expenseRepository.save(expense);
		return ResponseEntity.created(new URI("/api/expense" + result.getId())).body(result);
	}
	
	@PutMapping("/expense")
	ResponseEntity<Expense> updateCategory(@Valid @RequestBody Expense expense){
		Expense result = expenseRepository.save(expense);
		return ResponseEntity.ok().body(result);
	}
	
	@DeleteMapping("/expense/{id}")
	ResponseEntity<?> deleteExpense(@PathVariable Long id){
		expenseRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/expenses/total")
	Double getTotalExpenses() {
		return expenseRepository.totalExpenses();
	}
	
	@GetMapping("/analysis/expense-by-category")
	List<ExpenseByCategory> getExpensesByCategory() {
		return expenseRepository.getExpensesPerCategory();
	}
	
	@GetMapping("/analysis/expense-by-payment-type")
	List<ExpenseByPaymentType> getExpensesByPaymentType() {
		return expenseRepository.getExpensesByPaymentType();
	}
	
	@GetMapping("/analysis/dailyexpenses")
	List<DailyExpensesForAMonth> getDailyExpensesForAMonth(){
		return expenseRepository.getDailyExpensesForAMonth();
	}

}
