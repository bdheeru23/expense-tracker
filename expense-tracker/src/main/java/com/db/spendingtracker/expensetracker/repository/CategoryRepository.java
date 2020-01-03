package com.db.spendingtracker.expensetracker.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.db.spendingtracker.expensetracker.model.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {
	Category findByName(String name);
	
	@Query(value="select c from Category c where c.user.username = ?#{principal.username}")
	Collection<Category> getCategoriesForUser();

}
