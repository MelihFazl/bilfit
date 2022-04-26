package com.venividicode.bilfit.model;

import javax.persistence.*;
import java.util.HashMap;

@MappedSuperclass
public abstract class User {

	@Id
	private long ID;
	private String name;
	private String email;
	private String phoneNumber;
	private String hashedPassword;

	/**
	 * 
	 * @param reservationID
	 */
	public abstract boolean cancelReservation(long reservationID);

	/**
	 * 
	 * @param ID
	 */
	public abstract HashMap<String, Object> getProfileInfo(long ID);

	public long getID() {
		// TODO - implement User.getID
		throw new UnsupportedOperationException();
	}

	public String getName() {
		return this.name;
	}

	/**
	 * 
	 * @param name
	 */
	public void setName(String name) {
		this.name = name;
	}

	public void getEmail() {
		// TODO - implement User.getEmail
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param email
	 */
	public void setEmail(int email) {
		// TODO - implement User.setEmail
		throw new UnsupportedOperationException();
	}

	public String getPhoneNumber() {
		return this.phoneNumber;
	}

	/**
	 * 
	 * @param phoneNumber
	 */
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
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