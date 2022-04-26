package com.venividicode.bilfit.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

public class GymMember extends User {

	private double height;
	private double weight;
	private String gender;
	private Date birthday;
	private ArrayList<Reservation> reservations;
	private boolean isRestricted;
	private GymProgram program;
	private MemberTypeStrategy typeStrategy;

	public double getHeight() {
		return this.height;
	}

	/**
	 * 
	 * @param height
	 */
	public void setHeight(double height) {
		this.height = height;
	}

	public double getWeight() {
		return this.weight;
	}

	/**
	 * 
	 * @param weight
	 */
	public void setWeight(double weight) {
		this.weight = weight;
	}

	public String getGender() {
		return this.gender;
	}

	/**
	 * 
	 * @param gender
	 */
	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getBirthday() {
		return this.birthday;
	}

	/**
	 * 
	 * @param birthday
	 */
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public ArrayList<Reservation> getReservations() {
		return this.reservations;
	}

	/**
	 * 
	 * @param reservations
	 */
	public void setReservations(ArrayList<Reservation> reservations) {
		this.reservations = reservations;
	}

	/**
	 * 
	 * @param reservation
	 */
	public boolean addReservation(Reservation reservation) {
		// TODO - implement GymMember.addReservation
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param requestDescription
	 */
	public boolean requestGymProgram(String requestDescription) {
		// TODO - implement GymMember.requestGymProgram
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param tournament
	 */
	public boolean registerToTournament(Tournament tournament) {
		// TODO - implement GymMember.registerToTournament
		throw new UnsupportedOperationException();
	}

	public boolean getIsRestricted() {
		return this.isRestricted;
	}

	/**
	 * 
	 * @param isRestricted
	 */
	public void setIsRestricted(boolean isRestricted) {
		this.isRestricted = isRestricted;
	}

	public GymProgram getProgram() {
		return this.program;
	}

	/**
	 * 
	 * @param program
	 */
	public void setProgram(GymProgram program) {
		this.program = program;
	}

	public void getTypeStrategy() {
		// TODO - implement GymMember.getTypeStrategy
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param typeStrategy
	 */
	public void setTypeStrategy(int typeStrategy) {
		// TODO - implement GymMember.setTypeStrategy
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param course
	 */
	public boolean enrollCourse(SportCourse course) {
		// TODO - implement GymMember.enrollCourse
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param registration
	 */
	public void cancelTournamentRegistration(TournamentRegistration registration) {
		// TODO - implement GymMember.cancelTournamentRegistration
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param requestID
	 */
	public void cancelProgramRequest(long requestID) {
		// TODO - implement GymMember.cancelProgramRequest
		throw new UnsupportedOperationException();
	}

	@Override
	public boolean cancelReservation(long reservationID) {
		return false;
	}

	@Override
	public HashMap<String, Object> getProfileInfo(long ID) {
		return null;
	}
}