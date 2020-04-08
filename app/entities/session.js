class Session
{
    constructor()
    {

    }

    getAcquisitionSWVersion() 
    {
        return this.acquisition_sw_version;
    }

    setAcquisitionSWVersion(acquisition_sw_version) 
    {
        this.acquisition_sw_version = acquisition_sw_version;
    }


    getAnimalDateOfBirth() 
    {
        return this.animal_date_of_birth;
    }

    setAnimalDateOfBirth(animal_date_of_birth) 
    {
        this.animal_date_of_birth = animal_date_of_birth;
    }

    getAnimalID() 
    {
        return this.animal_id;
    }


    setAnimalID(animal_id) 
    {
        this.animal_id = animal_id;
    }


    getAnimalSex() 
    {
        return this.animal_sex;
    }

    setAnimalSex(animal_sex) 
    {
        this.animal_sex = animal_sex;
    }


    getAnimalSpecies() 
    {
        return this.animal_species;
    }


    setAnimalSpecies(animal_species) 
    {
        this.animal_species = animal_species;
    }


    getAnimalWeight() 
    {
        return animal_weight;
    }


    setAnimalWeight(animal_weight) 
    {
        this.animal_weight = animal_weight;
    }


    getExperimenterName() 
    {
        return this.experimenter_name;
    }


    setExperimenterName(experimenter_name) 
    {
        this.experimenter_name = experimenter_name;
    }


    getMicroscopeEXLEDPower() 
    {
        return this.microscope_ex_led_power;
    }


    setMicroscopeEXLEDPower(microscope_ex_led_power) 
    {
        this.microscope_ex_led_power = microscope_ex_led_power;
    }


    getMicroscopeOGLEDPower() 
    {
        return this.microscope_og_led_power;
    }


    setMicroscopeOGLEDPower(microscope_og_led_power) 
    {
        this.microscope_og_led_power = microscope_og_led_power;
    }


    getSamplingRate() 
    {
        return this.sampling_rate;
    }


    setSamplingRate(sampling_rate) 
    {
        this.sampling_rate = sampling_rate;
    }


    getSessionId() 
    {
        return this.session_id;
    }


    setSessionId(session_id) 
    {
        this.session_id = session_id;
    }


    getRecordingStartTime() 
    {
        return this.recording_start_time;
    }


    setRecordingStartTime(recording_start_time) 
    {
        this.recording_start_time = recording_start_time;
    }

}

module.exports  = Session;