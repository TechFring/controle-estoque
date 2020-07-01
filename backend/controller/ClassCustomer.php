<?php
class ClassCustomer {

    private $name;
    private $dateBirth;
    private $gender;
    private $phoneNumber;
    private $cpf;

    public function getName() 
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getDateBirth() 
    {
        return $this->dateBirth;
    }

    public function setDateBirth($dateBirth)
    {
        $this->dateBirth = $dateBirth;
    }

    public function getGender() 
    {
        return $this->gender;
    }

    public function setGender($gender)
    {
        $this->gender = $gender;
    }

    public function getPhoneNumber() 
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber($phoneNumber)
    {
        $this->phoneNumber = $phoneNumber;
    }

    public function getCpf() 
    {
        return $this->cpf;
    }

    public function setCpf($cpf)
    {
        $this->cpf = $cpf;
    }
}
?>