<?php include_once 'InterfaceModelDAO.php' ?>
<?php include_once '../controller/ClassSale.php' ?>
<?php include_once 'FactoryConnection.php' ?>

<?php
class ClassSaleDAO implements InterfaceModelDAO
{

    private static $connection;
    public static $sale;

    public function __construct()
    {
        self::$sale = new ClassSale();
    }

    public function create()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'CALL SP_CRIAR_VENDA(:customerCpf, :productId, :productPrice, :amount)';

            $stmt = self::$connection->prepare($query);
            $stmt->bindValue(':customerCpf', self::$sale->getCustomerCpf());
            $stmt->bindValue(':productId', self::$sale->getProductId());
            $stmt->bindValue(':productPrice', self::$sale->getProductPrice());
            $stmt->bindValue(':amount', self::$sale->getAmount());
            $stmt->execute();

            return $stmt->rowCount() > 0 ? 1 : 0;
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function read()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_LISTAR_VENDAS';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function update()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'CALL SP_EDITAR_VENDA(:customerCpf, :saleId)';

            $stmt = self::$connection->prepare($query);
            $stmt->bindValue(':customerCpf', self::$sale->getCustomerCpf());
            $stmt->bindValue(':saleId', self::$sale->getId());

            $stmt->execute();

            return $stmt->rowCount() > 0 ? 1 : 0;
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function delete()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'CALL SP_DELETAR_VENDA(:id)';

            $stmt = self::$connection->prepare($query);
            $stmt->bindValue(':id', self::$sale->getId());

            $stmt->execute();

            return $stmt->rowCount() > 0 ? 1 : 0;
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function search($character)
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'CALL SP_PESQUISAR_REGISTRO(:character, 3)';

            $stmt = self::$connection->prepare($query);
            $stmt->bindValue(':character', $character);
            $stmt->execute();

            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function getTotalSales()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_TOTAL_VENDAS';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch();
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function getTotalSalesMonth()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_TOTAL_VENDAS_MES';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_OBJ)->vendasMes;
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function getBiggestSale()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_MAIOR_VENDA';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch();
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function getBiggestSaleMonth()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_MAIOR_VENDA_MES';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch();
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function getLastSale()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_ULTIMA_VENDA';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch();
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }
}
?>