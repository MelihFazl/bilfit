package com.venividicode.bilfit.models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long ID;
	@ElementCollection(targetClass=Long.class)
	private List<Long> targetIDs;
	private String content;
	private String title;

	public List<Long> getTargetIDs() {
		return targetIDs;
	}

	public void setTargetIDs(List<Long> targetIDs) {
		this.targetIDs = targetIDs;
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

	public void sendNotification() {
		// TODO - implement Notification.notify
		throw new UnsupportedOperationException();
	}

	public long getID() {
		return this.ID;
	}

	/**
	 * 
	 * @param ID
	 */
	public void setID(long ID) {
		this.ID = ID;
	}

}