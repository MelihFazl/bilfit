package com.venividicode.bilfit.model;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class SportCenter {

	private String name;
	private ArrayList<SportActivity> availableActivities;
	private ArrayList<GymStaff> staff;
	private LocalDateTime opensAt;
	private LocalDateTime closesAt;
	private int latestReservationStepValue;
	private ArrayList<Tournament> tournaments;
	private ArrayList<SportCourse> courses;
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

	public ArrayList<SportActivity> getAvailableActivities() {
		return this.availableActivities;
	}

	/**
	 * 
	 * @param availableActivities
	 */
	public void setAvailableActivities(ArrayList<SportActivity> availableActivities) {
		this.availableActivities = availableActivities;
	}

	public ArrayList<GymStaff> getStaff() {
		return this.staff;
	}

	/**
	 * 
	 * @param staff
	 */
	public void setStaff(ArrayList<GymStaff> staff) {
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
	public ArrayList<Reservation> reservationsForAnActivityForTimeSlot(SportActivity sportActivity, String TimeSlot, LocalDateTime date) {
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

	public ArrayList<Tournament> getTournaments() {
		return this.tournaments;
	}

	/**
	 * 
	 * @param tournaments
	 */
	public void setTournaments(ArrayList<Tournament> tournaments) {
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

	public ArrayList<SportCourse> getCourses() {
		return this.courses;
	}

	/**
	 * 
	 * @param courses
	 */
	public void setCourses(ArrayList<SportCourse> courses) {
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