package com.venividicode.bilfit.model;

import javax.persistence.*;

@Entity
public class GymProgramRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long ID;
	@OneToOne
	private GymMember owner;
	private String description;
	@Enumerated
	private RequestStatus status;

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

	public RequestStatus getStatus() {
		return this.status;
	}

	/**
	 * 
	 * @param status
	 */
	public void setStatus(RequestStatus status) {
		this.status = status;
	}

	public long getID() {
		// TODO - implement GymProgramRequest.getID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 */
	public void setID(long ID) {
		// TODO - implement GymProgramRequest.setID
		throw new UnsupportedOperationException();
	}

}