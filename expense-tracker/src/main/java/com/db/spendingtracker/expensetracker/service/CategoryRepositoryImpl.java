package com.db.spendingtracker.expensetracker.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import com.db.spendingtracker.expensetracker.model.Category;
import com.db.spendingtracker.expensetracker.repository.CategoryRepository;

public class CategoryRepositoryImpl implements CategoryRepositoryCustom {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public Collection<Category> getCategoriesForUser(){
		return categoryRepository.getCategoriesForUser();
	}

}
