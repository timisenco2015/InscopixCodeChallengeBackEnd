let errorList=[];
let sessionData={};
class Sessions 
{  
    
    create(session)
    {
        
            if(session.session_id==null)
            {
                
               
                  errorList.push("session.session_id  cannot be null");
            }
            if (session.sampling_rate==null)
            {
               
                errorList.push("\n session.sampling_rate cannot be null");
            }
            if (session.microscope_og_led_power==null)
            {
              
                errorList.push("\n session.microscope_og_led_power cannot be null");
            }
            if (session.microscope_ex_led_power==null)
            {
                
                errorList.push("\n session.microscope_ex_led_power cannot be null");
            }
            if (session.experimenter_name==null)
            {
               
                errorList.push("\n session.experimenter_name cannot be null");
            }
            if (session.animal_weight==null)
            {
                
                errorList.push("\n session.animal_weight cannot be null");
                
            }
            if (session.animal_sex==null)
            {

                  errorList.push("\n session.animal_sex cannot be null");
            }

            if (session.animal_id==null)
            {
               
                  errorList.push("\n session.animal_id  cannot be null");
               
            }

            if (session.animal_date_of_birth==null)
            {
                
                  errorList.push("\n session.animal_date_of_birth cannot be null");
            }
            if (session.acquisition_sw_version==null)
            {
                
                  errorList.push("\n session.acquisition_sw_version cannot be null");
            }
            if (session.animal_species==null)
            {
                
                  errorList.push("\n session.animal_species cannot be null");
            }
           else
           {
            errorList=[];
            sessionData = 
               {
                    dataValues: 
                    {
                        id: '',
                        acquisition_sw_version: '',
                        animal_date_of_birth: '',
                        animal_id: '',
                        animal_sex: '',
                        animal_species: '',
                        animal_weight: '',
                        experimenter_name: '',
                        microscope_ex_led_power: 0,
                        microscope_og_led_power: 0,
                        sampling_rate: 30,
                        session_id: '',
                        recording_start_time: '2020-01-24T17:00:00+00:00',
                        updatedAt: '2020-05-21T01:23:23.291Z',
                        createdAt: '2020-05-21T01:23:23.291Z'
                  },
               }
            
               sessionData.dataValues.acquisition_sw_version=session.acquisition_sw_version;
               sessionData.dataValues.animal_date_of_birth= session.animal_date_of_birth;
               sessionData.dataValues.animal_id= session.animal_id;
               sessionData.dataValues.animal_sex= session.animal_sex;
               sessionData.dataValues.animal_species= session.animal_species;
               sessionData.dataValues.animal_weight=session.animal_weight;
               sessionData.dataValues.experimenter_name= session.experimenter_name;
               sessionData.dataValues.microscope_ex_led_power= session.microscope_ex_led_power;
               sessionData.dataValues.microscope_og_led_power= session.microscope_og_led_power;
               sessionData.dataValues.sampling_rate= session.sampling_rate;
               sessionData.dataValues.session_id= session.session_id;
               sessionData.dataValues.recording_start_time= '2020-01-24T17:00:00+00:00';

              
              // return this.returned.dataValues;
            }
           
         return this;
            
    }

    catch(error, callback) 
    {
     

        if(errorList.length==0)
        {
               
            return sessionData;
        }
        else
        {
                
            return new Error(errorList);
        }

        
    }
}




module.exports  = new Sessions();