package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.*;
import com.venividicode.bilfit.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
public class ReservationServiceImplementation implements ReservationService{
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    FieldRepository fieldRepository;
    @Autowired
    SportActivityRepository sportActivityRepository;
    @Autowired
    SportCenterRepository sportCenterRepository;
    @Autowired
    GymMemberRepository gymMemberRepository;
    @Autowired
    TimeSlotOnDayRepository timeSlotOnDayRepository;
    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public String saveReservation(Reservation reservation, long fieldID, long activityID, long sportCenterID, long reserverID) {
        Field reservationField = fieldRepository.getById(fieldID);
        SportActivity reservationActivity = sportActivityRepository.getById(activityID);
        SportCenter reservationPlace =  sportCenterRepository.getById(sportCenterID);
        GymMember reserver = gymMemberRepository.getById(reserverID);
        List<SportActivity> availableActivities = reservationPlace.getAvailableActivities();
        String timeInterval = reservation.getReservedTimeInterval();
        LocalDateTime reservationTime = reservation.getReservationTime();
        SportActivity matchedActivity = null;
        for(int i = 0; availableActivities.size() > i; i++)
        {
            if(availableActivities.get(i).getActivity().equals(reservationActivity.getActivity())) {
                matchedActivity = availableActivities.get(i);
                break;
            }
        }
        if(matchedActivity == null)
            return "There is not a activity named " + reservationActivity.getActivity() + "under the sport center " + reservationPlace.getName();

        Field matchedField = null;
        List<Field> fields = matchedActivity.getFields();
        int index = 0;
        for(int i = 0; fields.size() > i; i++)
        {
            if(fields.get(i).getName().equals(reservationField.getName()))
            {
                matchedField = fields.get(i);
                index = i;
                break;
            }
        }
        if(matchedField == null)
            return "There is no field named " + reservationField.getName() + " under the sport center " + reservationPlace.getName() + " under the activity " + reservationActivity.getActivity();

        String matchedTimeSlot = null;
        int indexTimeSlot = 0;
        Instant instant = reservationTime.toInstant(ZoneOffset.UTC);
        LocalDate localDate = LocalDate.of(2022, 5, 15); //THIS WILL BE AUTOMATIC CHANGE THIS
        List<TimeSlotOnDay> timeSlotOnDays = matchedField.getOccupiableTimeSlotsOnDay();
        for(int i = 0; timeSlotOnDays.size() > i; i++ )
        {
            if(timeSlotOnDays.get(i).getDate().toString().equals(localDate.toString()))
            {
                if(timeSlotOnDays.get(i).getTimeSlots().contains(timeInterval))
                {
                    indexTimeSlot = i;
                    matchedTimeSlot = timeInterval;
                    break;
                }
            }
        }

        if(matchedTimeSlot == null)
            return "The activity " + reservationActivity.getActivity() + " is already occupied at "
                    + timeInterval + " on "  + reservationTime.getDayOfMonth() + "-" + reservationTime.getMonthValue() + "-" + reservationTime.getYear();


        timeSlotOnDays.get(indexTimeSlot).getTimeSlots().remove(matchedTimeSlot);
        timeSlotOnDayRepository.save(timeSlotOnDays.get(indexTimeSlot));
        fieldRepository.save(matchedField);
        matchedActivity.setFields(fields);
        sportActivityRepository.save(matchedActivity);
        sportCenterRepository.save(reservationPlace);
        reservation.setReservationField(reservationField);
        reservation.setReservationPlace(reservationPlace);
        reservation.setReservationActivity(reservationActivity);
        reserver.getReservations().add(reservation);
        reservationRepository.save(reservation);
        gymMemberRepository.save(reserver);
        return "Your reservation for activity " + reservationActivity.getActivity() + " in field " + reservationField.getName()
                + " on " + localDate + " on time slot " + matchedTimeSlot + " was successfully made.";
    }

    @Override
    public Reservation getReservationById(long reservationId) {
        if(reservationRepository.findById(reservationId) == null)
            return null;
        return reservationRepository.findById(reservationId).get(0);
    }

    @Override
    public Reservation patchReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> getByReservationField(Field reservationField) {
        return reservationRepository.findByReservationField(reservationField);
    }

    @Override
    public List<Reservation> getByReservationPlace(SportCenter reservationPlace) {
        return reservationRepository.findByReservationPlace(reservationPlace);
    }

    @Override
    public List<Reservation> getByReservationActivity(SportActivity reservationActivity) {
        return reservationRepository.findByReservationActivity(reservationActivity);
    }
}
