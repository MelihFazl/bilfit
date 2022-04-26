package com.venividicode.bilfit.model;

public class AlumniTypeStrategy extends MemberTypeStrategy {

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

	/**
	 * 
	 * @param amount
	 */
	public boolean makePayment(double amount) {
		// TODO - implement AlumniTypeStrategy.makePayment
		throw new UnsupportedOperationException();
	}

}