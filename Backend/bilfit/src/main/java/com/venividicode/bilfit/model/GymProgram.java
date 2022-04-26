package com.venividicode.bilfit.model;

import javax.persistence.*;

@Entity
public class GymProgram {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long ID;

	@OneToOne
	private GymMember owner;

	@OneToOne
	private GymStaff author;
	private String description;


	public GymMember getOwner() {
		return this.owner;
	}

	/**
	 * 
	 * @param owner
	 */
	public void setOwner(GymMember owner) {
		this.owner = owner;
	}

	public GymStaff getAuthor() {
		return this.author;
	}

	/**
	 * 
	 * @param author
	 */
	public void setAuthor(GymStaff author) {
		this.author = author;
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

	public long getID() {
		// TODO - implement GymProgram.getID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 */
	public void setID(long ID) {
		// TODO - implement GymProgram.setID
		throw new UnsupportedOperationException();
	}

}