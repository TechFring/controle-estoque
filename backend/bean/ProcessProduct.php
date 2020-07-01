<?php include_once '../model/ClassProductDAO.php' ?>

<?php
$type = $_POST['type'];
$productDAO = new ClassProductDAO();

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
        parse_str($_POST['productData'], $productData);

        $productDAO::$product->setName($productData['productName2']);
        $productDAO::$product->setStock($productData['productStock2']);
        $productDAO::$product->setPrice($productData['productPrice2']);

        echo $productDAO->create();
        break;
    case 1:
        $result = $productDAO->read();
        
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
        parse_str($_POST['productData'], $productData);
        
        $productDAO::$product->setId($productData['productId1']);
        $productDAO::$product->setName($productData['productName1']);
        $productDAO::$product->setStock($productData['productStock1']);
        
        // formata o valor de monetário para float/double
        $productDAO::$product->setPrice(str_replace(',', '.', str_replace('.', '', $productData['productPrice1'])));
        
        echo $productDAO->update();
        break;
    case 3:
        $productDAO::$product->setId($_POST['productId']);

        echo $productDAO->delete();
        break;
    case 4:
        $result = $productDAO->search($_POST['character']);
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
            'lastProduct' => $productDAO->getLastProduct(),
            'largerStock' => $productDAO->getLargerStock(),
            'smallerStock' => $productDAO->getSmallerStock(),
            'bestSellingProduct' => $productDAO->getBestSellingProduct(),
            'quantifyProducts' => $productDAO->getQuantifyProducts(),
        );

        echo json_encode($array);
        break;
}
?>