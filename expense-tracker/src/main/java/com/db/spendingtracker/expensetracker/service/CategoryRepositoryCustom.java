package com.db.spendingtracker.expensetracker.service;

import java.util.Collection;

import com.db.spendingtracker.expensetracker.model.Category;

public interface CategoryRepositoryCustom {
	
	Collection<Category> getCategoriesForUser();

}
