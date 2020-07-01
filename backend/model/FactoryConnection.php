<?php
abstract class FactoryConnection {
    
    private static $host = 'localhost:3309';
    private static $dbname = 'trabalho';
    private static $charset = 'utf8';
    private static $user = 'root';
    private static $password = '';
    private static $options = array(PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC);
    
    public static function getConnection()
    {
        try {
            $pdo = new PDO(
                'mysql:host=' . self::$host . ';dbname=' . self::$dbname . ';charset=' . self::$charset,
                self::$user,
                self::$password,
                self::$options
            );

            return $pdo;
        } catch (PDOException $e) {
            echo $e->getMessage();
        } 
    }
}
?>