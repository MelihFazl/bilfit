package com.venividicode.bilfit.model;

import java.util.ArrayList;

public class SportActivity {

	private String activity;
	private ArrayList<Field> fields;

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

	public ArrayList<Field> getFields() {
		return this.fields;
	}

	/**
	 * 
	 * @param fields
	 */
	public void setFields(ArrayList<Field> fields) {
		this.fields = fields;
	}

}