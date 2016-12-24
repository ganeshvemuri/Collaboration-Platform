package com.chat.Dao;

import java.util.List;

import com.chat.model.Career;
import com.chat.model.jobRegistration;

public interface CareerDao {

	void createJob(Career career);
	List<Career> viewCareers();
	void updateCareers(Career career);
	//void deleteCareers(Career career);
	void deleteJobs(int job_Id);
	void registerJob(jobRegistration jobReg);

}
