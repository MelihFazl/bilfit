package com.venividicode.bilfit.model;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class Tournament {

	private String name;
	private LocalDateTime deadline;
	private int maxQuota;
	private ArrayList<TournamentRegistration> registrations;
	private String description;
	private ArrayList<Field> fields;
	private long ID;

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

	public LocalDateTime getDeadline() {
		return this.deadline;
	}

	/**
	 * 
	 * @param deadline
	 */
	public void setDeadline(LocalDateTime deadline) {
		this.deadline = deadline;
	}

	public int getMaxQuota() {
		return this.maxQuota;
	}

	/**
	 * 
	 * @param maxQuota
	 */
	public void setMaxQuota(int maxQuota) {
		this.maxQuota = maxQuota;
	}

	public ArrayList<TournamentRegistration> getRegistrations() {
		return this.registrations;
	}

	/**
	 * 
	 * @param registrations
	 */
	public void setRegistrations(ArrayList<TournamentRegistration> registrations) {
		this.registrations = registrations;
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

	public long getID() {
		// TODO - implement Tournament.getID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 */
	public void setID(long ID) {
		// TODO - implement Tournament.setID
		throw new UnsupportedOperationException();
	}

}