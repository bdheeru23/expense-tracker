package com.db.spendingtracker.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.db.spendingtracker.expensetracker.model.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {
	Category findByName(String name);

}
