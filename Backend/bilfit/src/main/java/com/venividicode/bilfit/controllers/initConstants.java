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

/**
 * A class for putting initial entities
 * into the database
 * @author Veni Vidi Code
 */
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
    AdminRepository adminRepository;
    @Autowired
    private TimeSlotOnDayRepository timeSlotOnDayRepository;

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    @GetMapping
    public boolean initConstants() {
        SportCenter main = new SportCenter();
        main.setBalance(1250.50);
        main.setClosesAt(LocalDateTime.of(2022, 11, 5,21,55));
        main.setOpensAt(LocalDateTime.of(2022, 11, 5,9,0));
        main.setLatestReservationStepValue(2);
        main.setName("Main Sports Hall");

        List<SportActivity> sportActivities = new ArrayList<>();
        SportActivity badminton = new SportActivity();
        badminton.setActivity("Badminton");
        List<Field> badmintonFields = new ArrayList<>();
        Field badmintonSouth = new Field();
        Field badmintonNorth = new Field();
        badmintonSouth.setMaxQuota(4);
        badmintonNorth.setMaxQuota(4);
        badmintonSouth.setName("Main Badminton South");
        badmintonNorth.setName("Main Badminton North");
        fieldRepository.save(badmintonNorth);
        fieldRepository.save(badmintonSouth);
        badmintonFields.add(badmintonNorth);
        badmintonFields.add(badmintonSouth);
        badminton.setFields(badmintonFields);
        sportActivityRepository.save(badminton);
        sportActivities.add(badminton);


        //Checkpoint Pass
        SportActivity basketball = new SportActivity();
        basketball.setActivity("Basketball");
        List<Field> basketballFields = new ArrayList<>();
        Field basketballOpen = new Field();
        Field basketballClosed = new Field();

        basketballOpen.setMaxQuota(21);
        basketballOpen.setName("Main Basketball - Open");
        basketballClosed.setMaxQuota(21);
        basketballClosed.setName("Main Basketball - Closed");

        fieldRepository.save(basketballOpen);
        fieldRepository.save(basketballClosed);
        basketballFields.add(basketballOpen);
        basketballFields.add(basketballClosed);
        basketball.setFields(basketballFields);
        sportActivityRepository.save(basketball);
        sportActivities.add(basketball);

        //Checkpoint Pass
        SportActivity volleyball = new SportActivity();
        volleyball.setActivity("Volleyball");
        List<Field> volleyBallFields = new ArrayList<>();
        Field volleyballOpen = new Field();
        Field volleyballClosed = new Field();
        volleyballOpen.setMaxQuota(21);
        volleyballOpen.setName("Main Volleyball - Open");
        volleyballClosed.setMaxQuota(21);
        volleyballClosed.setName("Main Volleyball - Closed");
        fieldRepository.save(volleyballClosed);
        fieldRepository.save(volleyballOpen);
        volleyBallFields.add(volleyballOpen);
        volleyBallFields.add(volleyballClosed);
        volleyball.setFields(volleyBallFields);
        sportActivityRepository.save(volleyball);
        sportActivities.add(volleyball);
        //Checkpoint Pass
        SportActivity fitness = new SportActivity();
        fitness.setActivity("Fitness");
        List<Field> fitnessFields = new ArrayList<>();
        Field fitnessFloor1 = new Field();
        fitnessFloor1.setMaxQuota(10);
        fitnessFloor1.setName("Fitness - Floor 1");
        fieldRepository.save(fitnessFloor1);
        fitnessFields.add(fitnessFloor1);
        fitness.setFields(fitnessFields);
        sportActivityRepository.save(fitness);
        sportActivities.add(fitness);

        //Checkpoint pass
        SportActivity multipurpose = new SportActivity();
        multipurpose.setActivity("Multi Purpose");
        List<Field> multipurposeFields = new ArrayList<>();
        Field multipurposeRoom = new Field();
        multipurposeRoom.setMaxQuota(7);
        multipurposeRoom.setName("Multi Purpose Room");
        fieldRepository.save(multipurposeRoom);
        multipurposeFields.add(multipurposeRoom);
        multipurpose.setFields(multipurposeFields);
        sportActivityRepository.save(multipurpose);
        sportActivities.add(multipurpose);

        //Checkpoint Pass
        SportActivity tableTennis = new SportActivity();
        tableTennis.setActivity("Table Tennis");
        List<Field> tableTennisFields = new ArrayList<>();
        Field table1 = new Field();
        Field table2 = new Field();
        Field table3 = new Field();
        table1.setMaxQuota(4);
        table1.setName("Table-1");
        table2.setMaxQuota(4);
        table2.setName("Table-2");
        table3.setMaxQuota(4);
        table3.setName("Table-3");
        fieldRepository.save(table1);
        fieldRepository.save(table2);
        fieldRepository.save(table3);
        tableTennisFields.add(table1);
        tableTennisFields.add(table2);
        tableTennisFields.add(table3);
        tableTennis.setFields(tableTennisFields);
        sportActivityRepository.save(tableTennis);
        sportActivities.add(tableTennis);
        //Checkpoint pass

        SportActivity climbing = new SportActivity();
        climbing.setActivity("Climbing");
        List<Field> climbingFields = new ArrayList<>();
        Field wall = new Field();
        wall.setMaxQuota(13);
        wall.setName("Wall Main");
        fieldRepository.save(wall);
        climbingFields.add(wall);
        climbing.setFields(climbingFields);
        sportActivityRepository.save(climbing);
        sportActivities.add(climbing);
        //Checkpoint pass
        main.setAvailableActivities(sportActivities);
        sportCenterRepository.save(main);
        //Main Pass




        //New Center
        SportCenter dorm = new SportCenter();
        dorm.setBalance(750.0);
        dorm.setClosesAt(LocalDateTime.of(2022, 11, 5,21,55));
        dorm.setOpensAt(LocalDateTime.of(2022, 11, 5,9,0));
        dorm.setLatestReservationStepValue(2);
        dorm.setName("Dormitories Sports Hall");
        List<SportActivity> sportActivitiesDorm = new ArrayList<>();

        SportActivity archery = new SportActivity();
        archery.setActivity("Archery");
        List<Field> archeryFields = new ArrayList<>();
        Field archeryPolygon = new Field();
        archeryPolygon.setMaxQuota(15);
        archeryPolygon.setName("Archery Polygon");
        fieldRepository.save(archeryPolygon);
        archeryFields.add(archeryPolygon);
        archery.setFields(archeryFields);
        sportActivityRepository.save(archery);
        sportActivitiesDorm.add(archery);
        //Checkpoint pass

        SportActivity basketballDorm = new SportActivity();
        basketballDorm.setActivity("Basketball");
        List<Field> basketballDormFields = new ArrayList<>();
        Field basketballOpenDorm = new Field();
        Field basketballClosedDorm = new Field();

        basketballOpenDorm.setMaxQuota(21);
        basketballOpenDorm.setName("Dorm Basketball - Open");
        basketballClosedDorm.setMaxQuota(21);
        basketballClosedDorm.setName("Dorm Basketball - Closed");

        fieldRepository.save(basketballOpenDorm);
        fieldRepository.save(basketballClosedDorm);
        basketballDormFields.add(basketballOpenDorm);
        basketballDormFields.add(basketballClosedDorm);
        basketballDorm.setFields(basketballDormFields);
        sportActivityRepository.save(basketballDorm);
        sportActivitiesDorm.add(basketballDorm);


        SportActivity volleyballDorm = new SportActivity();
        volleyballDorm.setActivity("Volleyball");
        List<Field> volleyBallDormFields = new ArrayList<>();
        Field volleyballDormOpen = new Field();
        Field volleyballDormClosed = new Field();
        volleyballDormOpen.setMaxQuota(21);
        volleyballDormOpen.setName("Dorm Volleyball - Open");
        volleyballDormClosed.setMaxQuota(21);
        volleyballDormClosed.setName("Dorm Volleyball - Closed");
        fieldRepository.save(volleyballDormClosed);
        fieldRepository.save(volleyballDormOpen);
        volleyBallDormFields.add(volleyballDormOpen);
        volleyBallDormFields.add(volleyballDormClosed);
        volleyballDorm.setFields(volleyBallDormFields);
        sportActivityRepository.save(volleyballDorm);
        sportActivitiesDorm.add(volleyballDorm);

        //Checkpoint pass
        SportActivity fitnessDorm = new SportActivity();
        fitnessDorm.setActivity("Fitness");
        List<Field> fitnessDormFields = new ArrayList<>();
        Field fitnessFloor2 = new Field();
        fitnessFloor2.setMaxQuota(10);
        fitnessFloor2.setName("Fitness - Floor 2");
        fieldRepository.save(fitnessFloor2);
        fitnessDormFields.add(fitnessFloor2);
        fitnessDorm.setFields(fitnessDormFields);
        sportActivityRepository.save(fitnessDorm);
        sportActivitiesDorm.add(fitnessDorm);

        //Checkpoint pass


        SportActivity tableTennisDorm = new SportActivity();
        tableTennisDorm.setActivity("Table Tennis");
        List<Field> tableTennisDormFields = new ArrayList<>();
        Field table1Dorm = new Field();
        Field table2Dorm = new Field();
        Field table3Dorm = new Field();
        Field table4Dorm = new Field();
        table1Dorm.setMaxQuota(4);
        table1Dorm.setName("Table-1");
        table2Dorm.setMaxQuota(4);
        table2Dorm.setName("Table-2");
        table3Dorm.setMaxQuota(4);
        table3Dorm.setName("Table-3");
        table4Dorm.setMaxQuota(4);
        table4Dorm.setName("Table-4");
        fieldRepository.save(table1Dorm);
        fieldRepository.save(table2Dorm);
        fieldRepository.save(table3Dorm);
        fieldRepository.save(table4Dorm);
        tableTennisDormFields.add(table1Dorm);
        tableTennisDormFields.add(table2Dorm);
        tableTennisDormFields.add(table3Dorm);
        tableTennisDormFields.add(table4Dorm);
        tableTennisDorm.setFields(tableTennisDormFields);
        sportActivityRepository.save(tableTennisDorm);
        sportActivitiesDorm.add(tableTennisDorm);
        //Checkpoint pass

        SportActivity swimming = new SportActivity();
        swimming.setActivity("Swimming");
        List<Field> swimmingFields = new ArrayList<>();
        Field dormPool = new Field();
        dormPool.setName("Dormitories Swimming Pool");
        dormPool.setMaxQuota(10);
        fieldRepository.save(dormPool);
        swimmingFields.add(dormPool);
        swimming.setFields(swimmingFields);
        sportActivityRepository.save(swimming);
        sportActivitiesDorm.add(swimming);
        //checkpoint pass
        dorm.setAvailableActivities(sportActivitiesDorm);
        sportCenterRepository.save(dorm);
        //Dorm passs.



        SportCenter east = new SportCenter();
        east.setBalance(350.0);
        east.setClosesAt(LocalDateTime.of(2022, 11, 5,21,55));
        east.setOpensAt(LocalDateTime.of(2022, 11, 5,9,0));
        east.setLatestReservationStepValue(2);
        east.setName("East Sports Hall");
        List<SportActivity> sportActivitiesEast = new ArrayList<>();

        SportActivity basketballEast = new SportActivity();
        basketballEast.setActivity("Basketball");
        List<Field> basketballFieldsEast = new ArrayList<>();
        Field basketballOpenEast = new Field();
        Field basketballClosedEast = new Field();

        basketballOpenEast.setMaxQuota(21);
        basketballOpenEast.setName("East Basketball - Open");
        basketballClosedEast.setMaxQuota(21);
        basketballClosedEast.setName("East Basketball - Closed");

        fieldRepository.save(basketballOpenEast);
        fieldRepository.save(basketballClosedEast);
        basketballFieldsEast.add(basketballOpenEast);
        basketballFieldsEast.add(basketballClosedEast);
        basketballEast.setFields(basketballFieldsEast);
        sportActivityRepository.save(basketballEast);
        sportActivitiesEast.add(basketballEast);


        SportActivity volleyballEast = new SportActivity();
        volleyballEast.setActivity("Volleyball");
        List<Field> volleyBallFieldsEast = new ArrayList<>();
        Field volleyballOpenEast = new Field();
        Field volleyballClosedEast = new Field();
        volleyballOpenEast.setMaxQuota(21);
        volleyballOpenEast.setName("East Volleyball - Open");
        volleyballClosedEast.setMaxQuota(21);
        volleyballClosedEast.setName("East Volleyball - Closed");
        fieldRepository.save(volleyballClosedEast);
        fieldRepository.save(volleyballOpenEast);
        volleyBallFieldsEast.add(volleyballOpenEast);
        volleyBallFieldsEast.add(volleyballClosedEast);
        volleyballEast.setFields(volleyBallFieldsEast);
        sportActivityRepository.save(volleyballEast);
        sportActivitiesEast.add(volleyballEast);

        //Checkpoint pass

        SportActivity fitnessEast = new SportActivity();
        fitnessEast.setActivity("Fitness");
        List<Field> fitnessEastFields = new ArrayList<>();
        Field fitnessFloor0 = new Field();
        fitnessFloor0.setMaxQuota(10);
        fitnessFloor0.setName("Fitness - Floor 0");
        fieldRepository.save(fitnessFloor0);
        fitnessEastFields.add(fitnessFloor0);
        fitnessEast.setFields(fitnessEastFields);
        sportActivityRepository.save(fitnessEast);
        sportActivitiesEast.add(fitnessEast);

        //checkpoint pass
        SportActivity badmintonEast = new SportActivity();
        badmintonEast.setActivity("Badminton");
        List<Field> badmintonEastFields = new ArrayList<>();
        Field badmintonCourt = new Field();
        badmintonCourt.setMaxQuota(10);
        badmintonCourt.setName("East - Badminton Court");
        fieldRepository.save(badmintonCourt);
        badmintonEastFields.add(badmintonCourt);
        badmintonEast.setFields(badmintonEastFields );
        sportActivityRepository.save(badmintonEast);
        sportActivitiesEast.add(badmintonEast);

        east.setAvailableActivities(sportActivitiesEast);
        sportCenterRepository.save(east);

        Admin admin = new Admin();
        admin.setHashedPassword("8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"); //admin
        admin.setID(444L);
        adminRepository.save(admin);

        return true;
    }
}
