<?php include_once 'InterfaceModelDAO.php' ?>
<?php include_once '../controller/ClassCustomer.php' ?>
<?php include_once 'FactoryConnection.php' ?>

<?php
class ClassCustomerDAO implements InterfaceModelDAO
{

    private static $connection;
    public static $customer;

    public function __construct()
    {
        self::$customer = new ClassCustomer();
    }

    public function create()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'CALL SP_CRIAR_CLIENTE(:name, :dateBirth, :gender, :phoneNumber, :cpf)';

            $stmt = self::$connection->prepare($query);
            $stmt->bindValue(':name', self::$customer->getName());
            $stmt->bindValue(':dateBirth', self::$customer->getdateBirth());
            $stmt->bindValue(':gender', self::$customer->getGender());
            $stmt->bindValue(':phoneNumber', self::$customer->getPhoneNumber());
            $stmt->bindValue(':cpf', self::$customer->getCpf());
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

            $query = 'SELECT * FROM VW_LISTAR_CLIENTES';

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

            $query = 'CALL SP_EDITAR_CLIENTE(:name, :dateBirth, :gender, :phoneNumber, :cpf)';

            $stmt = self::$connection->prepare($query);
            $stmt->bindValue(':name', self::$customer->getName());
            $stmt->bindValue(':dateBirth', self::$customer->getDateBirth());
            $stmt->bindValue(':gender', self::$customer->getGender());
            $stmt->bindValue(':phoneNumber', self::$customer->getPhoneNumber());
            $stmt->bindValue(':cpf', self::$customer->getCpf());
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

            $query = 'CALL SP_DELETAR_CLIENTE(:cpf)';

            $stmt = self::$connection->prepare($query);
            $stmt->bindValue(':cpf', self::$customer->getCpf());
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

            $query = 'CALL SP_PESQUISAR_REGISTRO(:character, 1)';

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

    public function getNumberCustomers()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_QTD_CLIENTES';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_OBJ)->qtdClientes;
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function getAmountMaleCustomers()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_QTD_CLIENTES_MASC';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_OBJ)->qtdClientesHomens;
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function getAmountFemaleCustomers()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_QTD_CLIENTES_FEM';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_OBJ)->qtdClientesMulheres;
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function getBestCustomer()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_MELHOR_CLIENTE';

            $stmt = self::$connection->prepare($query);
            $stmt->execute();

            return $stmt->fetch();
        } catch (PDOException $e) {
            echo $e->getMessage();
        } finally {
            self::$connection = null;
        }
    }

    public function getBestCustomerMonth()
    {
        try {
            self::$connection = FactoryConnection::getConnection();

            $query = 'SELECT * FROM VW_MELHOR_CLIENTE_MES';

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