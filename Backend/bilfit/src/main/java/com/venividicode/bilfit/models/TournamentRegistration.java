package com.venividicode.bilfit.models;


import javax.persistence.*;

import java.util.List;

@Entity
public class TournamentRegistration {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long ID;

	@OneToOne
	private GymMember registerer;
	@ElementCollection(targetClass=Long.class)
	private List<Long> teamMembersID;


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

	public List<Long> getTeamMembersID() {
		return this.teamMembersID;
	}

	/**
	 * 
	 * @param teamMembersID
	 */
	public void setTeamMembersID(List<Long> teamMembersID) {
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