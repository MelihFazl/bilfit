package model;

public class GymProgram {

	private GymMember owner;
	private GymStaff author;
	private String description;
	private long ID;

	public GymMember getOwner() {
		return this.owner;
	}

	/**
	 * 
	 * @param owner
	 */
	public void setOwner(GymMember owner) {
		this.owner = owner;
	}

	public GymStaff getAuthor() {
		return this.author;
	}

	/**
	 * 
	 * @param author
	 */
	public void setAuthor(GymStaff author) {
		this.author = author;
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

	public long getID() {
		// TODO - implement GymProgram.getID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 */
	public void setID(long ID) {
		// TODO - implement GymProgram.setID
		throw new UnsupportedOperationException();
	}

}