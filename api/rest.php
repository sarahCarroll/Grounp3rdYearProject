<?php

class RestServer
{
    //Debugger class
    private $debug;
    //List of exposed methods
    private $functions = array();

    public function __construct($debug)
    {
        //Trun debugger on/off
        $this->debug = new Debugger($debug);
    }

    //Function used to register a new method
    public function register($function_name, $field_inputs)
    {
        //Add the method to the list
        $this->functions[$function_name] = array("fields" => $field_inputs);

    }

    //Function used to validate the inputs
    private function validateFileds($function_name, $field_inputs)
    {
        $this->debug->add("In fields validation. Method: " . $function_name);
        //Return array
        $return = array();
        //Check if the input is an array
        if (is_array($field_inputs)) {
            $this->debug->add("Field input is array");
            //Loop the inputs
            foreach ($this->functions[$function_name]["fields"] as $key) {
                $this->debug->add("Looking for key:" . $key);
                //Check if the filed exists
                if (array_key_exists($key, $field_inputs)) {
                    $this->debug->add("Key " . $key . " exists");
                    //Add it to the return array
                    $return[$key] = $field_inputs[$key];
                }
            }
        }
        //If all the required fields are found
        if (sizeof($return) == sizeof($this->functions[$function_name]["fields"])) {
            $this->debug->add("Validation succed");
            //if(sizeof($this->functions[$function_name]["fields"])==0) $field_inputs=array();
            //Return the fileds
            return $return;
        } else {
            $this->debug->add("Validation failed");
            //Return false
            return false;
        }
    }

    //Function used to call an exposed method
    private function callFunction($function_name, $field_inputs)
    {
        $this->debug->add("In function call: " . $function_name);
        //Check if the function e
        if (array_key_exists($function_name, $this->functions) && function_exists($function_name)) {
            $this->debug->add("Function exists");
            //Validate the files
            $field_inputs = $this->validateFileds($function_name, $field_inputs);
            //If the validation was succesful
            if (is_array($field_inputs)) {
                //Call the function
                $return = call_user_func_array($function_name, $field_inputs);
                //var_dump(array($function_name,$field_inputs,$return));
                $this->debug->add("Function call succed: \n" . json_encode($return));
                return $return;
            }
        }

        $this->debug->add("Function call failed");
        //Return false if something went wrong
        return false;
    }

    //Function used to validate json data
    private function validateJsonData($data)
    {
        $this->debug->add("In json data validation");
        //If there is any data
        if (!empty($data) && is_string($data)) {
            //decode the string from json
            $data = @json_decode($data, true);
            //Check if there was any error
            if (json_last_error() === JSON_ERROR_NONE) {
                $this->debug->add("Data is json");
                //Check if it si empty
                if (!empty($data) && is_array($data)) {
                    $this->debug->add("Json data array is not empty");
                    //Check if function exists
                    if (array_key_exists("_fn", $data)) {
                        $this->debug->add("Function field exists");
                        //Separate the function
                        $return = array("function" => $data["_fn"]);
                        unset($data["_fn"]);
                        //Add the fields
                        $return["fields"] = $data;

                        $this->debug->add("Json data validation succed");
                        //Return the data
                        return $return;
                    }
                }
            }
        }
        $this->debug->add("Json data validation failed");
        return false;
    }

    //Function used to serve the api
    public function serve($data)
    {
        $this->debug->add("\n\n[" . date('Y-m-d G:i:s') . "] Service called with data: \n" . $data);
        //validate the incoming data
        $data = $this->validateJsonData($data);
        if ($data != false) {
            //Call the method
            $return = $this->callFunction($data["function"], $data["fields"]);
            //Write out the answer if the input is correct
            if ($return !== false) {
                echo (json_encode($return));
                return;
            }
        }
        //If something went wrong
        echo '{"error": "invalid request"}';
    }
}

//Simple debugger class
class Debugger
{
    private $isOn = false;

    public function __construct($isOn)
    {
        $this->isOn = $isOn;
    }

    public function add($string)
    {
        if ($this->isOn) {
            $this->writeToFile($string);
        }
//echo("<br>".$string);
    }

    public function trunOn()
    {
        $this->isOn = true;
    }

    public function turnOff()
    {
        $this->isOn = false;
    }

    private function writeToFile($data)
    {
        file_put_contents(__DIR__ . '/debug.txt', $data . PHP_EOL, FILE_APPEND | LOCK_EX);
    }
}
