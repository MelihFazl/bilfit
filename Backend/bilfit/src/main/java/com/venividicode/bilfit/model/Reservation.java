package model;

public class Reservation {

	GymMember generates;
	private long ID;
	private String reservedTimeInterval;
	private SportActivity reservationActivity;
	private SportCenter reservationPlace;
	private ReservationStatus status;
	private GymMember Reserver;
	private Date reservationDay;
	private Field reservationField;

	public long getID() {
		// TODO - implement Reservation.getID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 */
	public void setID(long ID) {
		// TODO - implement Reservation.setID
		throw new UnsupportedOperationException();
	}

	public String getReservedTimeInterval() {
		return this.reservedTimeInterval;
	}

	/**
	 * 
	 * @param reservedTimeInterval
	 */
	public void setReservedTimeInterval(String reservedTimeInterval) {
		this.reservedTimeInterval = reservedTimeInterval;
	}

	public SportActivity getReservationActivity() {
		return this.reservationActivity;
	}

	/**
	 * 
	 * @param reservationActivity
	 */
	public void setReservationActivity(SportActivity reservationActivity) {
		this.reservationActivity = reservationActivity;
	}

	public SportCenter getReservationPlace() {
		return this.reservationPlace;
	}

	/**
	 * 
	 * @param reservationPlace
	 */
	public void setReservationPlace(SportCenter reservationPlace) {
		this.reservationPlace = reservationPlace;
	}

	public ReservationStatus getStatus() {
		return this.status;
	}

	/**
	 * 
	 * @param status
	 */
	public void setStatus(ReservationStatus status) {
		this.status = status;
	}

	public GymMember getReserver() {
		// TODO - implement Reservation.getReserver
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param Reserver
	 */
	public void setReserver(GymMember Reserver) {
		// TODO - implement Reservation.setReserver
		throw new UnsupportedOperationException();
	}

	public Date getReservationDay() {
		return this.reservationDay;
	}

	/**
	 * 
	 * @param reservationDay
	 */
	public void setReservationDay(Date reservationDay) {
		this.reservationDay = reservationDay;
	}

	public Field getReservationField() {
		return this.reservationField;
	}

	/**
	 * 
	 * @param reservationField
	 */
	public void setReservationField(Field reservationField) {
		this.reservationField = reservationField;
	}

}