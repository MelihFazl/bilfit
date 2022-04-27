package com.venividicode.bilfit.models;

import javax.persistence.*;
import java.util.List;

@Entity
public class SportCourse {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long ID;
	private String type;
	private String description;
	@OneToMany
	private List<GymStaff> instructors;
	@OneToMany
	private List<GymMember> participants;
	@OneToOne
	private SportCenter location;


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

	public List<GymStaff> getInstructors() {
		return this.instructors;
	}

	/**
	 * 
	 * @param instructors
	 */
	public void setInstructors(List<GymStaff> instructors) {
		this.instructors = instructors;
	}

	public List<GymMember> getParticipants() {
		return this.participants;
	}

	/**
	 * 
	 * @param participants
	 */
	public void setParticipants(List<GymMember> participants) {
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