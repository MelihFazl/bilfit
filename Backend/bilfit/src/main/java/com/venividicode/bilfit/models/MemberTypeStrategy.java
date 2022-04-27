package com.venividicode.bilfit.models;


public interface MemberTypeStrategy
{
	public boolean makeReservation(Reservation reservation);
	public boolean enrollCourse(SportCourse course);
	public boolean registerToTournament(Tournament tournament);
	public boolean cancelReservation(long reservationID);
	public boolean disenrollCourse(long courseID);
	public boolean cancelTournamentRegisteration(TournamentRegistration tournamentRegistration);
}