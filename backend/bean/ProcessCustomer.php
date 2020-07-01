<?php include_once '../model/ClassCustomerDAO.php' ?>

<?php
$type = $_POST['type'];
$customerDAO = new ClassCustomerDAO();

switch ($type) {
    /**
     * 0 -> create
     * 1 -> read
     * 2 -> update
     * 3 -> delete
     * 4 -> search
     * 5 -> statistics
     */
    case 0:
        // converte os dados da url em um array
        parse_str($_POST['customerData'], $customerData);
        
        $customerDAO::$customer->setName($customerData['customerName2']);
        $customerDAO::$customer->setDateBirth($customerData['customerDateBirth2']);
        $customerDAO::$customer->setGender($customerData['customerGender2']);
        $customerDAO::$customer->setPhoneNumber($customerData['customerPhoneNumber2']);
        $customerDAO::$customer->setCpf($customerData['customerCpf2']);
        
        echo $customerDAO->create();
        break;
    case 1:
        $result = $customerDAO->read();
        
        $data = '';
        
        foreach ($result as $r) {
            if ($r == end($result)) {
                $data .= json_encode($r);
            } else {
                $data .= json_encode($r) . '+';
            }
        }
        
        echo $data;
        break;
    case 2:
        // converte os dados da url em um array
        parse_str($_POST['customerData'], $customerData);

        $customerDAO::$customer->setName($customerData['customerName1']);
        $customerDAO::$customer->setDateBirth($customerData['customerDateBirth1']);
        $customerDAO::$customer->setGender($customerData['customerGender1']);
        $customerDAO::$customer->setPhoneNumber($customerData['customerPhoneNumber1']);
        $customerDAO::$customer->setCpf($customerData['customerCpf1']);

        echo $customerDAO->update();
        break;
    case 3:
        $customerDAO::$customer->setCpf($_POST['customerCpf']);

        echo $customerDAO->delete();
        break;
    case 4:
        $result = $customerDAO->search($_POST['character']);
        $data = '';

        foreach ($result as $r) {
            if ($r == end($result)) {
                $data .= json_encode($r);
            } else {
                $data .= json_encode($r) . '+';
            }
        }
        
        echo $data;
        break;
    case 5:      
        $array = array(
            'numberCustomers' => $customerDAO->getNumberCustomers(),
            'amountMaleCustomers' => $customerDAO->getAmountMaleCustomers(),
            'amountFemaleCustomers' => $customerDAO->getAmountFemaleCustomers(),
            'bestCustomer' => $customerDAO->getBestCustomer(),
            'bestCustomerMonth' => $customerDAO->getBestCustomerMonth()
        );

        echo json_encode($array);    
        break;
}

?>