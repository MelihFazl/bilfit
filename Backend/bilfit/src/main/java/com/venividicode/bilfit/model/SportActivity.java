package com.venividicode.bilfit.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class SportActivity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long ID;

	private String activity;

	@OneToMany
	private List<Field> fields;

	public String getActivity() {
		return this.activity;
	}

	/**
	 * 
	 * @param activity
	 */
	public void setActivity(String activity) {
		this.activity = activity;
	}

	public List<Field> getFields() {
		return this.fields;
	}

	/**
	 * 
	 * @param fields
	 */
	public void setFields(List<Field> fields) {
		this.fields = fields;
	}

}