package model;

public class Tournament {

	private String name;
	private Date deadline;
	private int maxQuota;
	private ArrayList<TournamentRegistration> registrations;
	private String description;
	private ArrayList<Fields> fields;
	private long ID;

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

	public Date getDeadline() {
		return this.deadline;
	}

	/**
	 * 
	 * @param deadline
	 */
	public void setDeadline(Date deadline) {
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

	public ArrayList<TournamentRegistration> getRegistrations() {
		return this.registrations;
	}

	/**
	 * 
	 * @param registrations
	 */
	public void setRegistrations(ArrayList<TournamentRegistration> registrations) {
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

	public ArrayList<Fields> getFields() {
		return this.fields;
	}

	/**
	 * 
	 * @param fields
	 */
	public void setFields(ArrayList<Fields> fields) {
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