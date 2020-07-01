<?php
class ClassSale {

    private $id;
    private $dateSale;
    private $customerCpf;
    private $productId;
    private $productPrice;
    private $amount;
    private $totalPrice;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getDateSale()
    {
        return $this->dateSale;
    }

    public function setDateSale($dateSale)
    {
        $this->dateSale = $dateSale;
    }

    public function getCustomerCpf()
    {
        return $this->customerCpf;
    }

    public function setCustomerCpf($customerCpf)
    {
        $this->customerCpf = $customerCpf;
    }

    public function getProductId()
    {
        return $this->productId;
    }

    public function setProductId($productId)
    {
        $this->productId = $productId;
    }

    public function getProductPrice()
    {
        return $this->productPrice;
    }

    public function setProductPrice($productPrice)
    {
        $this->productPrice = $productPrice;
    }

    public function getAmount()
    {
        return $this->amount;
    }

    public function setAmount($amount)
    {
        $this->amount = $amount;
    }

    public function getTotalPrice()
    {
        return $this->totalPrice;
    }

    public function setTotalPrice($totalPrice)
    {
        $this->totalPrice = $totalPrice;
    }
}
?>