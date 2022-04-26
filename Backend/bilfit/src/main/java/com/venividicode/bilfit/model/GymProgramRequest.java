package com.venividicode.bilfit.model;

public class GymProgramRequest {

	private GymMember owner;
	private String description;
	private RequestStatus status;
	private long ID;

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