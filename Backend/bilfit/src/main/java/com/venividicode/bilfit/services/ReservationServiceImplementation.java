package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.*;
import com.venividicode.bilfit.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
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
    @Autowired
    TimeSlotRepository timeSlotRepository;
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
        LocalDate reservationDate = reservation.getReservationDate();
        SportActivity matchedActivity = null;
        for(int i = 0; availableActivities.size() > i; i++)
        {
            if(availableActivities.get(i).getActivity().equals(reservationActivity.getActivity())) {
                matchedActivity = availableActivities.get(i);
                break;
            }
        }
        if(matchedActivity == null)
            return "There is not any activity named " + reservationActivity.getActivity() + " under the sport center " + reservationPlace.getName();

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

        TimeSlot matchedTimeSlot = null;
        int indexTimeSlot = 0;
        int indexTimeSlotSlot = 0;

        List<TimeSlotOnDay> timeSlotOnDays = matchedField.getOccupiableTimeSlotsOnDay();
        for(int i = 0; timeSlotOnDays.size() > i; i++ )
        {
            if(timeSlotOnDays.get(i).getDate().toString().equals(reservationDate.toString()))
            {
                for(int j = 0; timeSlotOnDays.get(i).getTimeSlotList().size() > j; j++)
                {
                    if(timeSlotOnDays.get(i).getTimeSlotList().get(j).getTimeSlot().equals(timeInterval))
                    {
                        indexTimeSlot = i;
                        indexTimeSlotSlot = j;
                        matchedTimeSlot = timeSlotOnDays.get(i).getTimeSlotList().get(j);
                        break;
                    }
                }
            }
        }

        if(matchedTimeSlot.getCurrentCount() >= matchedField.getMaxQuota())
            return "The activity " + reservationActivity.getActivity() + " has no quota at "
                    + timeInterval + " on "  + reservationDate.getDayOfMonth() + "-" + reservationDate.getMonthValue() + "-" + reservationDate.getYear();


        matchedTimeSlot.setCurrentCount(matchedTimeSlot.getCurrentCount() + 1);
        timeSlotRepository.save(matchedTimeSlot);
        //timeSlotOnDays.get(indexTimeSlot).getTimeSlotList().remove(matchedTimeSlot);
        timeSlotOnDayRepository.save(timeSlotOnDays.get(indexTimeSlot));
        fieldRepository.save(matchedField);
        matchedActivity.setFields(fields);
        sportActivityRepository.save(matchedActivity);
        sportCenterRepository.save(reservationPlace);
        reservation.setReservationField(reservationField);
        reservation.setReservationPlace(reservationPlace);
        reservation.setReservationActivity(reservationActivity);
        reservation.setReserver(reserver);
        gymMemberRepository.save(reserver);
        reservationRepository.save(reservation);
        return "Your reservation for activity " + reservationActivity.getActivity() + " in field " + reservationField.getName()
                + " on " + reservationDate + " on time slot " + matchedTimeSlot.getTimeSlot() + " was successfully made.";
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

    @Override
    public Reservation deleteReservationByID(long reservationID)
    {
        List<Reservation> checkList = reservationRepository.findById(reservationID);
        if(checkList == null)
            return null;
        Reservation reservation = checkList.get(0);
        Field matchedField = reservation.getReservationField();
        TimeSlot matchedTimeSlot = null;
        int indexTimeSlot = 0;
        List<TimeSlotOnDay> timeSlotOnDays = matchedField.getOccupiableTimeSlotsOnDay();
        for(int i = 0; timeSlotOnDays.size() > i; i++ )
        {
            if(timeSlotOnDays.get(i).getDate().toString().equals(reservation.getReservationDate().toString()))
            {
                for(int j = 0; timeSlotOnDays.get(i).getTimeSlotList().size() > j; j++)
                {
                    if(timeSlotOnDays.get(i).getTimeSlotList().get(j).getTimeSlot().equals(reservation.getReservedTimeInterval()))
                    {
                        indexTimeSlot = i;
                        matchedTimeSlot = timeSlotOnDays.get(i).getTimeSlotList().get(j);
                        break;
                    }
                }
            }
        }
        matchedTimeSlot.setCurrentCount(matchedTimeSlot.getCurrentCount() - 1);
        timeSlotRepository.save(matchedTimeSlot);
        timeSlotOnDayRepository.save(timeSlotOnDays.get(indexTimeSlot));
        reservationRepository.deleteById(reservation.getID());
        return reservation;
    }

    @Override
    public List<Reservation> getByReserver(long reserverID) {
        List<Reservation> checklist = getAllReservations();
        List<Reservation> result = new ArrayList<>();
        for (int i = 0; checklist.size() > i; i++)
        {
            if(checklist.get(i).getReserver().getID() == reserverID)
                result.add(checklist.get(i));
        }
        return result;
    }

    @Override
    public List<SportCenter> getAllSportCenters() {
        return sportCenterRepository.findAll();
    }

    @Override
    public String cancel(Reservation reservation) {

        reservation.setStatus(ReservationStatus.Cancelled);
        LocalDate resDate = reservation.getReservationDate();
        Field resField = reservation.getReservationField();

        TimeSlotOnDay matchedTimeSlotOnDay = null;
        TimeSlot matchedTimeSlot = null;
        int index = 0;
        int index2 = 0;
        for (int i = 0; resField.getOccupiableTimeSlotsOnDay().size() > i; i++) {
            if (resField.getOccupiableTimeSlotsOnDay().get(i).getDate().toString().equals(resDate.toString())) {
                index = i;
                matchedTimeSlotOnDay = resField.getOccupiableTimeSlotsOnDay().get(i);
                List<TimeSlot> timeSlots = resField.getOccupiableTimeSlotsOnDay().get(i).getTimeSlotList();
                for (int j = 0; timeSlots.size() > j; j++) {
                    if (timeSlots.get(j).getTimeSlot().equals(reservation.getReservedTimeInterval())) {
                        index = j;
                        matchedTimeSlot = timeSlots.get(j);
                        System.out.println("NULL GELİRSE PİÇİM");
                        timeSlots.get(j).setCurrentCount(timeSlots.get(j).getCurrentCount() - 1);
                    }
                }
            }
        }
        timeSlotRepository.save(matchedTimeSlot);
        timeSlotOnDayRepository.save(matchedTimeSlotOnDay);
        fieldRepository.save(resField);
        sportActivityRepository.save(reservation.getReservationActivity());
        sportCenterRepository.save(reservation.getReservationPlace());
        return "The reservation on " + reservation.getReservationDate() + " between " + reservation.getReservedTimeInterval()
                + " has been successfully cancelled.";

    }

    @Override
    public String dateTimeSet(long sportCenterID, long sportActivityID, long fieldID, LocalDate begin, LocalDate end, List<String> timeSlots) {
        List<SportCenter> sportCenters = sportCenterRepository.findById(sportCenterID);
        if(sportCenters == null)
            return "Sport Center with ID " + sportCenterID + " was not found.";
        List<SportActivity> sportActivities = sportActivityRepository.findById(sportActivityID);
        if(sportActivities == null)
            return "Sport Activity with ID " + sportActivityID + " was not found.";
        List<Field> fields = fieldRepository.findById(fieldID);
        if(fields == null)
            return "Field with ID " + fieldID + " was not found.";

        SportCenter sportCenter = sportCenters.get(0);
        SportActivity sportActivity = sportActivities.get(0);
        Field field = fields.get(0);
        for(LocalDate date = begin; date.isBefore(end); date=date.plusDays(1))
        {
            for(int i = 0; field.getOccupiableTimeSlotsOnDay().size() > i; i++)
            {
                TimeSlotOnDay cur =  field.getOccupiableTimeSlotsOnDay().get(i);
                field.getOccupiableTimeSlotsOnDay().get(i).setTimeSlotList(new ArrayList<TimeSlot>());
                timeSlotOnDayRepository.save(cur);
                for(int j = 0; cur.getTimeSlotList().size() > j; j++)
                {
                    timeSlotRepository.delete(cur.getTimeSlotList().get(j));
                }
                //timeSlotOnDayRepository.delete(field.getOccupiableTimeSlotsOnDay().get(i)); //? should I delete this?
            }
        }
        for(LocalDate date = begin; date.isBefore(end); date= date.plusDays(1)) //All dates between begin and end
        {
            TimeSlotOnDay cur = new TimeSlotOnDay();
            cur.setDate(date);
            List<TimeSlot> timeSlots1 = new ArrayList<>();
            for(int i = 0; timeSlots.size() > i; i++)
            {
                TimeSlot curTimeSlot = new TimeSlot();
                curTimeSlot.setTimeSlot(timeSlots.get(i));
                curTimeSlot.setCurrentCount(0);
                timeSlotRepository.save(curTimeSlot);
                timeSlots1.add(curTimeSlot);
            }
            cur.setTimeSlotList(timeSlots1);
            timeSlotOnDayRepository.save(cur);
            field.getOccupiableTimeSlotsOnDay().add(cur);
            fieldRepository.save(field);
        }
        return "Pass";
    }
}
