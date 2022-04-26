package com.venividicode.bilfit.model;

import java.util.ArrayList;

public class TournamentRegistration {

	private GymMember registerer;
	private ArrayList<Long> teamMembersID;
	private long ID;

	public GymMember getRegisterer() {
		return this.registerer;
	}

	/**
	 * 
	 * @param registerer
	 */
	public void setRegisterer(GymMember registerer) {
		this.registerer = registerer;
	}

	public ArrayList<Long> getTeamMembersID() {
		return this.teamMembersID;
	}

	/**
	 * 
	 * @param teamMembersID
	 */
	public void setTeamMembersID(ArrayList<Long> teamMembersID) {
		this.teamMembersID = teamMembersID;
	}

	public long getID() {
		// TODO - implement TournamentRegistration.getID
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param ID
	 */
	public void setID(long ID) {
		// TODO - implement TournamentRegistration.setID
		throw new UnsupportedOperationException();
	}

}