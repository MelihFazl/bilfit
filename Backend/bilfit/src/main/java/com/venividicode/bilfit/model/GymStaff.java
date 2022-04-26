package model;

public class GymStaff extends User {

	private ArrayList<SportCenter> workplaces;

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
	public boolean determineTimeIntervals(SportActivity sportActivity, ArrayList<String> timeIntervals) {
		// TODO - implement GymStaff.determineTimeIntervals
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param opensAt
	 * @param closesAt
	 */
	public boolean setOpenHours(Time opensAt, Time closesAt) {
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

	public ArrayList<SportCenter> getWorkplaces() {
		return this.workplaces;
	}

	/**
	 * 
	 * @param workplaces
	 */
	public void setWorkplaces(ArrayList<SportCenter> workplaces) {
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

}