package model;

public class Field {

	private SportActivity activity;
	private int maxQuota;
	private ArrayList<String> occupiableTimeSlots;
	private long ID;

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

	public ArrayList<String> getOccupiableTimeSlots() {
		return this.occupiableTimeSlots;
	}

	/**
	 * 
	 * @param occupiableTimeSlots
	 */
	public void setOccupiableTimeSlots(ArrayList<String> occupiableTimeSlots) {
		this.occupiableTimeSlots = occupiableTimeSlots;
	}

	/**
	 * 
	 * @param timeSlot
	 * @param date
	 */
	public boolean isReservationAvailable(String timeSlot, Date date) {
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