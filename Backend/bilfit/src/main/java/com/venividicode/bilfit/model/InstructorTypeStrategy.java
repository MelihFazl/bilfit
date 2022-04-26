package com.venividicode.bilfit.model;

public class InstructorTypeStrategy extends MemberTypeStrategy {

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