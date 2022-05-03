package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.Field;
import com.venividicode.bilfit.models.SportActivity;
import com.venividicode.bilfit.repositories.FieldRepository;
import com.venividicode.bilfit.repositories.SportActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityFieldServiceImplementation implements ActivityFieldService
{
    @Autowired
    SportActivityRepository sportActivityRepository;
    @Autowired
    FieldRepository fieldRepository;

    @Override
    public List<SportActivity> getAllSportActivities()
    {
        return sportActivityRepository.findAll();
    }

    @Override
    public List<SportActivity> getSportActivityByID(long id)
    {
        return sportActivityRepository.findById(id);
    }

    @Override
    public SportActivity saveSportActivity(SportActivity sportActivity)
    {
        return sportActivityRepository.save(sportActivity);
    }

    @Override
    public SportActivity deleteSportActivityByID(long id)
    {
        return sportActivityRepository.deleteById(id);
    }

    @Override
    public List<Field> getAllFields()
    {
        return fieldRepository.findAll();
    }

    @Override
    public List<Field> getFieldByID(long id)
    {
        return fieldRepository.findById(id);
    }

    @Override
    public Field saveField(Field field)
    {
        return fieldRepository.save(field);
    }

    @Override
    public Field deleteFieldByID(long id)
    {
        return fieldRepository.deleteById(id);
    }
}
