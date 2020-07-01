<?php
interface InterfaceModelDAO
{

    public function create();

    public function read();

    public function update();

    public function delete();

    public function search($character);

}
?>