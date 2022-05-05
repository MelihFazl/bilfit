package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.Field;
import com.venividicode.bilfit.models.SportActivity;
import com.venividicode.bilfit.models.SportCenter;
import com.venividicode.bilfit.models.TimeSlotOnDay;
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
        timeSlotOnDay.setDate(LocalDate.of(2022, 05, 15));
        timeSlotOnDay.setTimeSlots(occupiableTimeSlots);
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
            fieldRepository.save(badmintonSouth);
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
