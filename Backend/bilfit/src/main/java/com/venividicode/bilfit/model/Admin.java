package com.venividicode.bilfit.model;

public class Admin {

	private long ID;
	private String hashedPassword;

	/**
	 * 
	 * @param ID
	 * @param name
	 * @param hashedPassword
	 * @param email
	 * @param phoneNumber
	 */
	public boolean addGymMember(long ID, String name, String hashedPassword, String email, String phoneNumber) {
		// TODO - implement Admin.addGymMember
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 * @param name
	 * @param hashedPassword
	 * @param email
	 * @param phoneNumber
	 */
	public boolean addGymStaff(long ID, String name, String hashedPassword, String email, String phoneNumber) {
		// TODO - implement Admin.addGymStaff
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 */
	public boolean deleteGymStaff(long ID) {
		// TODO - implement Admin.deleteGymStaff
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 */
	public boolean deleteGymMember(long ID) {
		// TODO - implement Admin.deleteGymMember
		throw new UnsupportedOperationException();
	}

	public long getID() {
		// TODO - implement Admin.getID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 */
	public void setID(long ID) {
		// TODO - implement Admin.setID
		throw new UnsupportedOperationException();
	}

	public String getHashedPassword() {
		return this.hashedPassword;
	}

	/**
	 * 
	 * @param hashedPassword
	 */
	public void setHashedPassword(String hashedPassword) {
		this.hashedPassword = hashedPassword;
	}

}