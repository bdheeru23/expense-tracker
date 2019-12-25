package com.db.spendingtracker.expensetracker.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.db.spendingtracker.expensetracker.model.DAOUser;

@Repository
public interface UserDao extends CrudRepository<DAOUser, Integer> {
	DAOUser findByUsername(String username);
}
