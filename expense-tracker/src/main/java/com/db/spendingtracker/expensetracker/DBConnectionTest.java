package com.db.spendingtracker.expensetracker;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DBConnectionTest {
	
	public static void main(String args[]){  
		try{  
		Class.forName("com.mysql.jdbc.Driver");  
		Connection con=DriverManager.getConnection(  
		"jdbc:mysql://expenses-mysql-db:3306/expensedb","root","password");  
		//here sonoo is database name, root is username and password
		System.out.println("Connection establised");
		con.close();  
		}catch(Exception e){ System.out.println(e);}  
		}  

}
