package com.employee;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.employee.model.Employee;
import com.employee.model.UserCredentials;
import com.employee.repository.EmployeeRepository;
import com.employee.repository.UserRepository;

@Component
class DataLoadListener implements ApplicationListener<ApplicationReadyEvent> {

	private static Logger log = Logger.getLogger(DataLoadListener.class);

	@Autowired
	private UserRepository userDAO;
	
	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public void onApplicationEvent(ApplicationReadyEvent event) {
		log.info("Loading initial data...");
		try {
			UserCredentials userCredentials = new UserCredentials("usr1", bcryptEncoder.encode("pwd"), "USER");
			userDAO.save(userCredentials);
			
			Employee employee = new Employee("Raju","MLN", "narasimha@gmail.com");
			employeeRepository.save(employee);
		
		} catch (Exception e) {
			log.error("Exception loading initial data...", e);
			e.printStackTrace();
		}
	}

}
