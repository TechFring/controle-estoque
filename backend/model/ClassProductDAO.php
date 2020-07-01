<?php include_once 'InterfaceModelDAO.php' ?>
<?php include_once '../controller/ClassProduct.php' ?>
<?php include_once 'FactoryConnection.php' ?>

<?php
class ClassProductDAO implements InterfaceModelDAO
{

    private static $connection;
    public static $product;

    public function __construct()
    {
        self::$product = new ClassProduct();
    }

    public function create()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'CALL SP_CRIAR_PRODUTO(:name, :stock, :price)';

            $stmt = self::$connection->prepare($query);
            $stmt->bindValue(':name', self::$product->getName());
            $stmt->bindValue(':stock', self::$product->getStock());
            $stmt->bindValue(':price', self::$product->getPrice());
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

            $query = 'SELECT * FROM VW_LISTAR_PRODUTOS';

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

            $query = 'CALL SP_EDITAR_PRODUTO(:name, :stock, :price, :id)';

            $stmt = self::$connection->prepare($query);
            $stmt->bindValue(':name', self::$product->getName());
            $stmt->bindValue(':stock', self::$product->getStock());
            $stmt->bindValue(':price', self::$product->getPrice());
            $stmt->bindValue(':id', self::$product->getId());
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

            $query = 'CALL SP_DELETAR_PRODUTO(:id)';

            $stmt = self::$connection->prepare($query);
            $stmt->bindValue(':id', self::$product->getId());
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

            $query = 'CALL SP_PESQUISAR_REGISTRO(:character, 2)';

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

    public function getLastProduct() {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_ULTIMO_PRODUTO';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch();
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function getLargerStock() {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_MAIOR_ESTOQUE';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch();
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function getSmallerStock() {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_MENOR_ESTOQUE';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch();
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function getBestSellingProduct() {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'CALL SP_PRODUTO_MAIS_VENDIDO()';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch();
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function getQuantifyProducts() {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_QTD_PRODUTOS';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_OBJ)->qtd;
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }
}
?>