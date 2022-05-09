package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.*;
import com.venividicode.bilfit.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/initConstants")
@CrossOrigin
public class initConstants {
    @Autowired
    FieldRepository fieldRepository;
    @Autowired
    SportActivityRepository sportActivityRepository;
    @Autowired
    SportCenterRepository sportCenterRepository;
    @Autowired
    GymStaffRepository gymStaffRepository;
    @Autowired
    private TimeSlotOnDayRepository timeSlotOnDayRepository;

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    @GetMapping
    public boolean initConstants() {
        List<String> occupiableTimeSlots = new ArrayList<>();
        occupiableTimeSlots.add("10.00-12.00");
        occupiableTimeSlots.add("13.00-15.00");
        occupiableTimeSlots.add("15.00-17.00");
        occupiableTimeSlots.add("17.00-19.00");
        occupiableTimeSlots.add("19.00-21.00");
        occupiableTimeSlots.add("21.00-23.00");

        Field badmintonNorth = new Field();
        badmintonNorth.setName("Main Badminton-North");
        badmintonNorth.setMaxQuota(4);
        TimeSlotOnDay timeSlotOnDay = new TimeSlotOnDay();
        timeSlotOnDay.setDate(LocalDate.of(2022, 05, 11));
        TimeSlot timeSlot1 = new TimeSlot();
        timeSlot1.setTimeSlot("10.00-12.00");
        timeSlot1.setCurrentCount(0);
        TimeSlot timeSlot2 = new TimeSlot();
        timeSlot2.setTimeSlot("13.00-15.00");
        timeSlot2.setCurrentCount(0);
        TimeSlot timeSlot3 = new TimeSlot();
        timeSlot3.setTimeSlot("15.00-17.00");
        timeSlot3.setCurrentCount(0);
        TimeSlot timeSlot4 = new TimeSlot();
        timeSlot4.setTimeSlot("17.00-19.00");
        timeSlot4.setCurrentCount(0);
        TimeSlot timeSlot5 = new TimeSlot();
        timeSlot5.setTimeSlot("19.00-21.00");
        timeSlot5.setCurrentCount(0);
        TimeSlot timeSlot6 = new TimeSlot();
        timeSlot6.setTimeSlot("21.00-23.00");
        timeSlot6.setCurrentCount(0);
        timeSlotRepository.save(timeSlot1);
        timeSlotRepository.save(timeSlot2);
        timeSlotRepository.save(timeSlot3);
        timeSlotRepository.save(timeSlot4);
        timeSlotRepository.save(timeSlot5);
        timeSlotRepository.save(timeSlot6);
        List<TimeSlot> timeSlots = new ArrayList<>();
        timeSlots.add(timeSlot1);
        timeSlots.add(timeSlot2);
        timeSlots.add(timeSlot3);
        timeSlots.add(timeSlot4);
        timeSlots.add(timeSlot5);
        timeSlots.add(timeSlot6);
        timeSlotOnDay.setTimeSlotList(timeSlots);
        List<TimeSlotOnDay> timeSlotOnDays = new ArrayList<>();
        timeSlotOnDays.add(timeSlotOnDay);
        timeSlotOnDayRepository.save(timeSlotOnDay);
        badmintonNorth.setOccupiableTimeSlotsOnDay(timeSlotOnDays);
        Field badmintonSouth = new Field();
        badmintonSouth.setName("Main Badminton-South");
        badmintonSouth.setMaxQuota(4);
        badmintonSouth.setOccupiableTimeSlotsOnDay(timeSlotOnDays);


        fieldRepository.save(badmintonNorth);
        System.out.println("NORTH: " + badmintonNorth.getID());
        System.out.println("SOTUH: " + badmintonSouth.getID());
        if (badmintonNorth.getID() == badmintonSouth.getID()) {
            //fieldRepository.save(badmintonSouth);
        }


        SportActivity badminton = new SportActivity();
        badminton.setActivity("Badminton");
        badminton.setFields(fieldRepository.findAll());
        sportActivityRepository.save(badminton);

        SportCenter sportCenter = new SportCenter();
        sportCenter.setBalance(10.0);
        sportCenter.setAvailableActivities(sportActivityRepository.findAll());
        sportCenter.setName("Main Sports Hall");

        sportCenter.setClosesAt(LocalDateTime.of(0, 1, 1, 23, 0));
        sportCenter.setClosesAt(LocalDateTime.of(0, 1, 1, 10, 0));
        sportCenter.setLatestReservationStepValue(5);
        sportCenter.setStaff(gymStaffRepository.findById(21));
        sportCenterRepository.save(sportCenter);
        return true;
    }
}
