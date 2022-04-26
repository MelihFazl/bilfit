package com.venividicode.bilfit.model;

import java.util.ArrayList;

public class SportCourse {

	private String type;
	private String description;
	private ArrayList<GymStaff> instructors;
	private ArrayList<GymMember> participants;
	private SportCenter location;
	private long ID;

	public String getType() {
		return this.type;
	}

	/**
	 * 
	 * @param type
	 */
	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return this.description;
	}

	/**
	 * 
	 * @param description
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	public ArrayList<GymStaff> getInstructors() {
		return this.instructors;
	}

	/**
	 * 
	 * @param instructors
	 */
	public void setInstructors(ArrayList<GymStaff> instructors) {
		this.instructors = instructors;
	}

	public ArrayList<GymMember> getParticipants() {
		return this.participants;
	}

	/**
	 * 
	 * @param participants
	 */
	public void setParticipants(ArrayList<GymMember> participants) {
		this.participants = participants;
	}

	public SportCenter getLocation() {
		return this.location;
	}

	/**
	 * 
	 * @param location
	 */
	public void setLocation(SportCenter location) {
		this.location = location;
	}

	public long getID() {
		// TODO - implement SportCourse.getID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 */
	public void setID(long ID) {
		// TODO - implement SportCourse.setID
		throw new UnsupportedOperationException();
	}

}