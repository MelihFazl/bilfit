package model;

public class Notification {

	private ArrayList<User> targets;
	private String content;
	private String title;
	private long ID;

	public ArrayList<User> getTargets() {
		return this.targets;
	}

	/**
	 * 
	 * @param targets
	 */
	public void setTargets(ArrayList<User> targets) {
		this.targets = targets;
	}

	public String getContent() {
		return this.content;
	}

	/**
	 * 
	 * @param content
	 */
	public void setContent(String content) {
		this.content = content;
	}

	public String getTitle() {
		return this.title;
	}

	/**
	 * 
	 * @param title
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	public void notify() {
		// TODO - implement Notification.notify
		throw new UnsupportedOperationException();
	}

	public long getID() {
		// TODO - implement Notification.getID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 */
	public void setID(long ID) {
		// TODO - implement Notification.setID
		throw new UnsupportedOperationException();
	}

}