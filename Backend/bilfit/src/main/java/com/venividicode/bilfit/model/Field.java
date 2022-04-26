package com.venividicode.bilfit.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Field {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long ID;
	@OneToOne
	private SportActivity activity;
	private int maxQuota;
	@ElementCollection(targetClass=String.class)
	private List<String> occupiableTimeSlots;
	public SportActivity getActivity() {
		return this.activity;
	}

	/**
	 * 
	 * @param activity
	 */
	public void setActivity(SportActivity activity) {
		this.activity = activity;
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

	public List<String> getOccupiableTimeSlots() {
		return this.occupiableTimeSlots;
	}

	/**
	 * 
	 * @param occupiableTimeSlots
	 */
	public void setOccupiableTimeSlots(List<String> occupiableTimeSlots) {
		this.occupiableTimeSlots = occupiableTimeSlots;
	}

	/**
	 * 
	 * @param timeSlot
	 * @param date
	 */
	public boolean isReservationAvailable(String timeSlot, LocalDateTime date) {
		// TODO - implement Field.isReservationAvailable
		throw new UnsupportedOperationException();
	}

	public long getID() {
		// TODO - implement Field.getID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 */
	public void setID(long ID) {
		// TODO - implement Field.setID
		throw new UnsupportedOperationException();
	}

}