package com.db.spendingtracker.expensetracker;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.db.spendingtracker.expensetracker.service.ExpenseRepositoryCustom;
import com.db.spendingtracker.expensetracker.service.ExpenseRepositoryImpl;


@Configuration
@EnableAutoConfiguration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = { "com.db.spendingtracker.expensetracker.repository" })
@ComponentScan("com.demo")
@PropertySource("classpath:application.properties")
public class JPAConfiguration {

	@Bean
	public ExpenseRepositoryCustom productService() {
		return new ExpenseRepositoryImpl();
	}
	

}
