package com.venividicode.bilfit.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Reservation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long ID;
	private String reservedTimeInterval;
	@OneToOne
	private SportActivity reservationActivity;
	@OneToOne
	private SportCenter reservationPlace;
	@Enumerated
	private ReservationStatus status;
	@OneToOne
	private GymMember reserver;
	private LocalDateTime reservationDay;
	@OneToOne
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
		return reserver;
	}

	public void setReserver(GymMember reserver) {
		this.reserver = reserver;
	}

	public LocalDateTime getReservationDay() {
		return this.reservationDay;
	}

	/**
	 * 
	 * @param reservationDay
	 */
	public void setReservationDay(LocalDateTime reservationDay) {
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