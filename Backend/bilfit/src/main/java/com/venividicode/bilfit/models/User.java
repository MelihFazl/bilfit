package com.venividicode.bilfit.models;

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

	public long getID() {
		return ID;
	}

	public void setID(long ID) {
		this.ID = ID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getHashedPassword() {
		return hashedPassword;
	}

	public void setHashedPassword(String hashedPassword) {
		this.hashedPassword = hashedPassword;
	}
}