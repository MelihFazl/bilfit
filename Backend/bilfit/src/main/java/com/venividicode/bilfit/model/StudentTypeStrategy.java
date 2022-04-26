package com.venividicode.bilfit.model;

public class StudentTypeStrategy extends MemberTypeStrategy {

	private GymMemberType memberType;

	public GymMemberType getMemberType() {
		return this.memberType;
	}

	/**
	 * 
	 * @param memberType
	 */
	public void setMemberType(GymMemberType memberType) {
		this.memberType = memberType;
	}

}