package com.venividicode.bilfit.model;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Entity
public class GymStaff extends User {

	@OneToMany
	private List<SportCenter> workplaces;

	/**
	 * 
	 * @param gymMember
	 */
	public boolean restrictUser(GymMember gymMember) {
		// TODO - implement GymStaff.restrictUser
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param sportActivity
	 * @param quota
	 */
	public boolean determineMaxQuota(SportActivity sportActivity, int quota) {
		// TODO - implement GymStaff.determineMaxQuota
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param sportActivity
	 * @param timeIntervals
	 */
	public boolean determineTimeIntervals(SportActivity sportActivity, List<String> timeIntervals) {
		// TODO - implement GymStaff.determineTimeIntervals
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param opensAt
	 * @param closesAt
	 */
	public boolean setOpenHours(LocalDateTime opensAt, LocalDateTime closesAt) {
		// TODO - implement GymStaff.setOpenHours
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param stepValue
	 */
	public boolean determineLatestReservationDay(int stepValue) {
		// TODO - implement GymStaff.determineLatestReservationDay
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param tournament
	 */
	public boolean createTournament(Tournament tournament) {
		// TODO - implement GymStaff.createTournament
		throw new UnsupportedOperationException();
	}

	public HashMap<String, Object> viewGymProgramRequests() {
		// TODO - implement GymStaff.viewGymProgramRequests
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param memberName
	 */
	public void approveGymProgramRequest(String memberName) {
		// TODO - implement GymStaff.approveGymProgramRequest
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param reservationID
	 * @param status
	 */
	public boolean setStatus(long reservationID, String status) {
		// TODO - implement GymStaff.setStatus
		throw new UnsupportedOperationException();
	}

	public List<SportCenter> getWorkplaces() {
		return this.workplaces;
	}

	/**
	 * 
	 * @param workplaces
	 */
	public void setWorkplaces(List<SportCenter> workplaces) {
		this.workplaces = workplaces;
	}

	/**
	 * 
	 * @param tournamentID
	 */
	public void cancelTournament(long tournamentID) {
		// TODO - implement GymStaff.cancelTournament
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param course
	 */
	public boolean openCourse(SportCourse course) {
		// TODO - implement GymStaff.openCourse
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param courseID
	 */
	public void cancelCourse(long courseID) {
		// TODO - implement GymStaff.cancelCourse
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param announcement
	 */
	public void makeAnnouncement(Announcement announcement) {
		// TODO - implement GymStaff.makeAnnouncement
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 */
	public boolean deleteAnnouncementByID(long ID) {
		// TODO - implement GymStaff.deleteAnnouncementByID
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