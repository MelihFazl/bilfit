package com.venividicode.bilfit.models;

public class InstructorTypeStrategy implements MemberTypeStrategy {

	@Override
	public boolean makeReservation(Reservation reservation) {
		return false;
	}

	@Override
	public boolean enrollCourse(SportCourse course) {
		return false;
	}

	@Override
	public boolean registerToTournament(Tournament tournament) {
		return false;
	}

	@Override
	public boolean cancelReservation(long reservationID) {
		return false;
	}

	@Override
	public boolean disenrollCourse(long courseID) {
		return false;
	}

	@Override
	public boolean cancelTournamentRegisteration(TournamentRegistration tournamentRegistration) {
		return false;
	}
}