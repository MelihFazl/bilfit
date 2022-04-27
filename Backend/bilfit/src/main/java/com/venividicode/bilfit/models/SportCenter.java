package com.venividicode.bilfit.models;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class SportCenter {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long ID;
	private String name;
	@OneToMany
	private List<SportActivity> availableActivities;
	@OneToMany
	private List<GymStaff> staff;
	private LocalDateTime opensAt;
	private LocalDateTime closesAt;
	private int latestReservationStepValue;
	@OneToMany
	private List<Tournament> tournaments;
	@OneToMany
	private List<SportCourse> courses;
	private double balance;

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

	public List<SportActivity> getAvailableActivities() {
		return this.availableActivities;
	}

	/**
	 * 
	 * @param availableActivities
	 */
	public void setAvailableActivities(List<SportActivity> availableActivities) {
		this.availableActivities = availableActivities;
	}

	public List<GymStaff> getStaff() {
		return this.staff;
	}

	/**
	 * 
	 * @param staff
	 */
	public void setStaff(List<GymStaff> staff) {
		this.staff = staff;
	}

	public LocalDateTime getOpensAt() {
		return this.opensAt;
	}

	/**
	 * 
	 * @param opensAt
	 */
	public void setOpensAt(LocalDateTime opensAt) {
		this.opensAt = opensAt;
	}

	public LocalDateTime getClosesAt() {
		return this.closesAt;
	}

	/**
	 * 
	 * @param closesAt
	 */
	public void setClosesAt(LocalDateTime closesAt) {
		this.closesAt = closesAt;
	}

	/**
	 * 
	 * @param sportActivity
	 * @param TimeSlot
	 * @param date
	 */
	public List<Reservation> reservationsForAnActivityForTimeSlot(SportActivity sportActivity, String TimeSlot, LocalDateTime date) {
		// TODO - implement SportCenter.reservationsForAnActivityForTimeSlot
		throw new UnsupportedOperationException();
	}

	public int getLatestReservationStepValue() {
		return this.latestReservationStepValue;
	}

	/**
	 * 
	 * @param latestReservationStepValue
	 */
	public void setLatestReservationStepValue(int latestReservationStepValue) {
		this.latestReservationStepValue = latestReservationStepValue;
	}

	public List<Tournament> getTournaments() {
		return this.tournaments;
	}

	/**
	 * 
	 * @param tournaments
	 */
	public void setTournaments(List<Tournament> tournaments) {
		this.tournaments = tournaments;
	}

	/**
	 * 
	 * @param tournament
	 */
	public void addTournament(Tournament tournament) {
		// TODO - implement SportCenter.addTournament
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param date
	 */
	public boolean isStepValueExceeded(LocalDateTime date) {
		// TODO - implement SportCenter.isStepValueExceeded
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param tournament
	 */
	public void deleteTournament(Tournament tournament) {
		// TODO - implement SportCenter.deleteTournament
		throw new UnsupportedOperationException();
	}

	public List<SportCourse> getCourses() {
		return this.courses;
	}

	/**
	 * 
	 * @param courses
	 */
	public void setCourses(List<SportCourse> courses) {
		this.courses = courses;
	}

	/**
	 * 
	 * @param course
	 */
	public void addCourse(SportCourse course) {
		// TODO - implement SportCenter.addCourse
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param course
	 */
	public void deleteCourse(SportCourse course) {
		// TODO - implement SportCenter.deleteCourse
		throw new UnsupportedOperationException();
	}

	public double getBalance() {
		return this.balance;
	}

	/**
	 * 
	 * @param balance
	 */
	public void setBalance(double balance) {
		this.balance = balance;
	}

}