package com.venividicode.bilfit.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Tournament {

	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private long ID;
	private String name;
	private LocalDateTime deadline;
	private int maxQuota;
	@OneToMany
	private List<TournamentRegistration> registrations;
	private String description;
	@OneToMany
	private List<Field> fields;

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

	public List<TournamentRegistration> getRegistrations() {
		return this.registrations;
	}

	/**
	 * 
	 * @param registrations
	 */
	public void setRegistrations(List<TournamentRegistration> registrations) {
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

	public List<Field> getFields() {
		return this.fields;
	}

	/**
	 * 
	 * @param fields
	 */
	public void setFields(List<Field> fields) {
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