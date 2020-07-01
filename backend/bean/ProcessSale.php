<?php include_once '../model/ClassSaleDAO.php' ?>

<?php
$type = $_POST['type'];
$saleDAO = new ClassSaleDAO();

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
        parse_str($_POST['saleData'], $saleData);

        $saleDAO::$sale->setCustomerCpf($saleData['customerCpf2']);
        $saleDAO::$sale->setProductId($saleData['productId2']);
        $saleDAO::$sale->setAmount($saleData['amount2']);

        // formata o valor de monetário para float/double
        $saleDAO::$sale->setProductPrice(str_replace(',', '.', str_replace('.', '', $saleData['productPrice2'])));

        echo $saleDAO->create();
        break;
    case 1:
        $result = $saleDAO->read();
        
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
        parse_str($_POST['saleData'], $saleData);
        
        $saleDAO::$sale->setId($saleData['saleId1']);
        $saleDAO::$sale->setCustomerCpf($saleData['customerCpf1']);
        
        echo $saleDAO->update();
        break;
    case 3:
        $saleDAO::$sale->setId($_POST['saleId']);

        echo $saleDAO->delete();
        break;
    case 4:
        $result = $saleDAO->search($_POST['character']);
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
            'totalSales' => $saleDAO->getTotalSales(),
            'totalSalesMonth' => $saleDAO->getTotalSalesMonth(),
            'biggestSale' => $saleDAO->getBiggestSale(),
            'biggestSaleMonth' => $saleDAO->getBiggestSaleMonth(),
            'lastSale' => $saleDAO->getLastSale()
        );

        echo json_encode($array);
        break;
}
?>